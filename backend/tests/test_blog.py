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


def test_list_posts_empty(client):
    response = client.get("/api/v1/blog")
    assert response.status_code == 200
    assert response.json() == []


def test_create_post(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    response = client.post(
        "/api/v1/blog",
        json={
            "title": "Test Post",
            "slug": "test-post",
            "content": "Test content",
            "published": 1,
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Post"


def test_get_post(client, db_session):
    _create_admin(db_session)
    token = _get_token(client)

    client.post(
        "/api/v1/blog",
        json={
            "title": "Test Post",
            "slug": "test-post",
            "content": "Test content",
            "published": 1,
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.get("/api/v1/blog/test-post")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Post"


def test_get_post_not_found(client):
    response = client.get("/api/v1/blog/nonexistent")
    assert response.status_code == 404


def test_create_post_unauthorized(client):
    response = client.post(
        "/api/v1/blog",
        json={
            "title": "Test Post",
            "slug": "test-post",
            "content": "Test content",
        },
    )
    assert response.status_code == 403
