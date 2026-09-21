from app.core.security import hash_password
from app.models.user import User


def test_login_success(client, db_session):
    user = User(
        username="admin",
        email="admin@test.com",
        hashed_password=hash_password("admin123"),
    )
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "admin123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, db_session):
    user = User(
        username="admin",
        email="admin@test.com",
        hashed_password=hash_password("admin123"),
    )
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "wrongpassword"},
    )
    assert response.status_code == 401


def test_login_nonexistent_user(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "nonexistent", "password": "password"},
    )
    assert response.status_code == 401


def test_me_returns_username_for_valid_token(client, db_session):
    db_session.add(
        User(
            username="admin",
            email="admin@test.com",
            hashed_password=hash_password("admin123"),
        )
    )
    db_session.commit()

    token = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "admin123"},
    ).json()["access_token"]

    response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == {"username": "admin"}


def test_me_rejects_invalid_token(client):
    response = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer nimportequoi"})
    assert response.status_code == 401


def test_me_rejects_missing_token(client):
    response = client.get("/api/v1/auth/me")
    assert response.status_code in (401, 403)
