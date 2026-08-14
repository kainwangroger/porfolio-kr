from app.core.security import hash_password
from app.models.event import Event
from app.models.user import User


def _create_admin(db_session):
    db_session.add(
        User(
            username="admin",
            email="admin@test.com",
            hashed_password=hash_password("admin123"),
        )
    )
    db_session.commit()


def _token(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "admin", "password": "admin123"},
    )
    return response.json()["access_token"]


def _payload(**overrides):
    data = {
        "title": "HSIL Hackathon",
        "slug": "hsil-hackathon",
        "organizer": "Harvard T.H. Chan School of Public Health",
        "location": "Accra, Ghana",
        "period": "Avril 2026",
        "images": "/events/a.jpg\n/events/b.jpg",
    }
    data.update(overrides)
    return data


def test_list_events_empty(client):
    response = client.get("/api/v1/events")
    assert response.status_code == 200
    assert response.json() == []


def test_create_and_get_event(client, db_session):
    _create_admin(db_session)
    token = _token(client)

    response = client.post(
        "/api/v1/events",
        json=_payload(),
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    assert response.json()["organizer"].startswith("Harvard")

    response = client.get("/api/v1/events/hsil-hackathon")
    assert response.status_code == 200
    assert response.json()["images"] == "/events/a.jpg\n/events/b.jpg"


def test_create_event_requires_auth(client):
    response = client.post("/api/v1/events", json=_payload())
    assert response.status_code in (401, 403)


def test_duplicate_slug_is_rejected(client, db_session):
    _create_admin(db_session)
    token = _token(client)
    headers = {"Authorization": f"Bearer {token}"}

    assert client.post("/api/v1/events", json=_payload(), headers=headers).status_code == 201
    assert client.post("/api/v1/events", json=_payload(), headers=headers).status_code == 409


def test_events_are_sorted_by_sort_order(client, db_session):
    db_session.add(Event(title="Ancien", slug="ancien", sort_order=1))
    db_session.add(Event(title="Récent", slug="recent", sort_order=10))
    db_session.commit()

    slugs = [event["slug"] for event in client.get("/api/v1/events").json()]
    assert slugs == ["recent", "ancien"]


def test_update_and_delete_event(client, db_session):
    _create_admin(db_session)
    token = _token(client)
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/api/v1/events", json=_payload(), headers=headers)

    response = client.put(
        "/api/v1/events/hsil-hackathon",
        json={"role": "Participant — équipe Togo AI Lab"},
        headers=headers,
    )
    assert response.status_code == 200
    assert response.json()["role"] == "Participant — équipe Togo AI Lab"
    # Un champ absent de la requête n'est pas écrasé.
    assert response.json()["location"] == "Accra, Ghana"

    assert client.delete("/api/v1/events/hsil-hackathon", headers=headers).status_code == 204
    assert client.get("/api/v1/events/hsil-hackathon").status_code == 404


def test_get_unknown_event_returns_404(client):
    assert client.get("/api/v1/events/inconnu").status_code == 404
