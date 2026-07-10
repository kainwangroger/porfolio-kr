def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["ok", "degraded"]
    assert "version" in data
    assert "database" in data


def test_health_check_database(client):
    response = client.get("/api/v1/health")
    data = response.json()
    assert data["database"] == "healthy"
