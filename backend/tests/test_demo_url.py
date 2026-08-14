import pytest

from app.core.demo_url import is_public_demo_url


@pytest.mark.parametrize(
    "url",
    [
        "http://localhost:8501",
        "http://localhost:8000/app",
        "http://127.0.0.1:8000",
        "http://0.0.0.0:8080",
        "http://192.168.1.10:8501",
        "http://10.0.0.5",
        "http://monposte.local",
        "",
        None,
        "pas-une-url",
        "ftp://exemple.com",
        "file:///home/roger/index.html",
    ],
)
def test_rejette_les_urls_injoignables(url):
    assert is_public_demo_url(url) is False


@pytest.mark.parametrize(
    "url",
    [
        "https://exemple.com",
        "https://mon-app.streamlit.app",
        "http://exemple.com:3000/demo",
        "  https://exemple.com  ",
    ],
)
def test_accepte_les_urls_publiques(url):
    assert is_public_demo_url(url) is True
