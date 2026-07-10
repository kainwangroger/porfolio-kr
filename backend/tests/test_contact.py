def test_send_message(client):
    response = client.post(
        "/api/v1/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "message": "Hello, this is a test message.",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test User"
    assert data["email"] == "test@example.com"


def test_list_messages_unauthorized(client):
    response = client.get("/api/v1/contact")
    assert response.status_code == 403
