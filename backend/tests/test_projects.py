from app.core.security import hash_password
from app.models.user import User
from app.models.project import Project


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


def test_list_projects_empty(client):
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    assert response.json() == []


def test_create_project(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    response = client.post(
        "/api/v1/projects",
        json={
            "title": "Test Project",
            "slug": "test-project",
            "description": "A test project",
            "tech_stack": "Python,FastAPI",
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Project"
    assert data["slug"] == "test-project"


def test_get_project(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    client.post(
        "/api/v1/projects",
        json={
            "title": "Test Project",
            "slug": "test-project",
            "description": "A test project",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.get("/api/v1/projects/test-project")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Project"


def test_get_project_not_found(client):
    response = client.get("/api/v1/projects/nonexistent")
    assert response.status_code == 404


def test_update_project(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    client.post(
        "/api/v1/projects",
        json={
            "title": "Test Project",
            "slug": "test-project",
            "description": "A test project",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.put(
        "/api/v1/projects/test-project",
        json={"title": "Updated Project"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Project"


def test_delete_project(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    client.post(
        "/api/v1/projects",
        json={
            "title": "Test Project",
            "slug": "test-project",
            "description": "A test project",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.delete(
        "/api/v1/projects/test-project",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 204

    response = client.get("/api/v1/projects/test-project")
    assert response.status_code == 404


def test_create_project_unauthorized(client):
    response = client.post(
        "/api/v1/projects",
        json={
            "title": "Test Project",
            "slug": "test-project",
            "description": "A test project",
        },
    )
    assert response.status_code == 403
