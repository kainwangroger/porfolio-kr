from app.core.security import hash_password
from app.models.user import User


def _create_admin(db_session):
    user = User(
        username="admin",
        email="admin@test.com",
        hashed_password=hash_password("admin123"),
    )
    db_session.add(user)
    db_session.commit()
    return user


def _get_token(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "admin123"},
    )
    return response.json()["access_token"]


def test_list_skills_empty(client):
    response = client.get("/api/v1/skills")
    assert response.status_code == 200
    assert response.json() == []


def test_create_skill(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    response = client.post(
        "/api/v1/skills",
        json={"category": "Data Engineering", "name": "Python"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Python"


def test_create_skill_unauthorized(client):
    response = client.post(
        "/api/v1/skills",
        json={"category": "Data Engineering", "name": "Python"},
    )
    assert response.status_code == 403


def test_update_skill(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    create_response = client.post(
        "/api/v1/skills",
        json={"category": "Data Engineering", "name": "Python"},
        headers={"Authorization": f"Bearer {token}"},
    )
    skill_id = create_response.json()["id"]

    response = client.put(
        f"/api/v1/skills/{skill_id}",
        json={"name": "Python 3"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Python 3"


def test_delete_skill(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    create_response = client.post(
        "/api/v1/skills",
        json={"category": "Data Engineering", "name": "Python"},
        headers={"Authorization": f"Bearer {token}"},
    )
    skill_id = create_response.json()["id"]

    response = client.delete(
        f"/api/v1/skills/{skill_id}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 204
