import pytest
from pydantic import ValidationError

from app.core.config import MIN_SECRET_KEY_LENGTH, PLACEHOLDER_SECRETS, Settings


def _settings(secret: str) -> Settings:
    # `_env_file=None` isole le test du .env local, qui fournirait sinon une
    # clé valide et masquerait la validation.
    return Settings(SECRET_KEY=secret, _env_file=None)


def test_accepte_une_cle_suffisamment_longue():
    secret = "a" * MIN_SECRET_KEY_LENGTH
    assert _settings(secret).SECRET_KEY == secret


@pytest.mark.parametrize("secret", sorted(PLACEHOLDER_SECRETS))
def test_refuse_les_cles_dexemple(secret):
    with pytest.raises(ValidationError, match="valeur d'exemple"):
        _settings(secret)


def test_refuse_une_cle_dexemple_quelle_que_soit_la_casse():
    with pytest.raises(ValidationError, match="valeur d'exemple"):
        _settings("Change-Me-In-Production")


def test_refuse_une_cle_trop_courte():
    with pytest.raises(ValidationError, match="au moins"):
        _settings("a" * (MIN_SECRET_KEY_LENGTH - 1))


def test_refuse_une_cle_absente(monkeypatch):
    # conftest pose SECRET_KEY dans l'environnement pour que l'application
    # démarre ; on l'en retire le temps de vérifier le cas « non définie ».
    monkeypatch.delenv("SECRET_KEY", raising=False)
    with pytest.raises(ValidationError):
        Settings(_env_file=None)
