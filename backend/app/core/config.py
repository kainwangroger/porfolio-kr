from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Porfolio Kr API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    DATABASE_URL: str = "sqlite:///./porfolio.db"
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    RESEND_API_KEY: str = ""
    CONTACT_EMAIL_TO: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
