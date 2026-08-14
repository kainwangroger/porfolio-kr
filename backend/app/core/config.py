from pydantic import field_validator
from pydantic_settings import BaseSettings

#: Valeurs qui ont circulé comme exemples dans le dépôt. Les accepter en
#: production reviendrait à publier la clé de signature des jetons.
PLACEHOLDER_SECRETS = {
    "change-me-in-production",
    "change-me-with-openssl-rand-hex-32",
    "secret",
    "changeme",
}

MIN_SECRET_KEY_LENGTH = 32


class Settings(BaseSettings):
    APP_NAME: str = "Porfolio Kr API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    DATABASE_URL: str = "sqlite:///./porfolio.db"

    # Aucune valeur par défaut : l'application doit refuser de démarrer plutôt
    # que de signer ses jetons avec une clé connue de tous. Générer avec
    # `openssl rand -hex 32`.
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    RESEND_API_KEY: str = ""
    CONTACT_EMAIL_TO: str = ""
    GITHUB_TOKEN: str = ""

    @field_validator("SECRET_KEY")
    @classmethod
    def secret_key_must_be_strong(cls, value: str) -> str:
        if value.strip().lower() in PLACEHOLDER_SECRETS:
            raise ValueError(
                "SECRET_KEY reprend une valeur d'exemple. "
                "Générez-en une avec : openssl rand -hex 32"
            )
        if len(value) < MIN_SECRET_KEY_LENGTH:
            raise ValueError(
                f"SECRET_KEY fait {len(value)} caractères, "
                f"il en faut au moins {MIN_SECRET_KEY_LENGTH}. "
                "Générez-en une avec : openssl rand -hex 32"
            )
        return value

    class Config:
        env_file = ".env"


settings = Settings()
