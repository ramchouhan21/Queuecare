from typing import List
from urllib.parse import quote_plus

from pydantic import Field, ValidationError, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


def _parse_comma_separated_list(value: str | List[str] | None) -> List[str]:
    if not value:
        return []
    if isinstance(value, list):
        return value
    return [item.strip() for item in value.split(",") if item.strip()]


class Settings(BaseSettings):
    environment: str = Field("development", env="ENVIRONMENT")
    debug: bool = Field(False, env="DEBUG")
    api_version: str = Field("/v1", env="API_VERSION")
    root_path: str = Field("", env="ROOT_PATH")

    cors_origins: List[str] = Field(default_factory=list, env="BACKEND_CORS_ORIGINS")
    allowed_hosts: List[str] = Field(default_factory=lambda: ["*"], env="ALLOWED_HOSTS")

    db_host: str = Field(..., env="DB_HOST")
    db_port: int = Field(5432, env="DB_PORT")
    db_user: str = Field(..., env="DB_USER")
    db_password: str = Field(..., env="DB_PASSWORD")
    db_name: str = Field(..., env="DB_NAME")
    db_ssl_mode: str = Field("prefer", env="DB_SSL_MODE")
    database_url: str | None = Field(None, env="DATABASE_URL")

    log_level: str = Field("INFO", env="LOG_LEVEL")

    firebase_project_id: str | None = Field(None, env="FIREBASE_PROJECT_ID")
    firebase_credentials_json: str | None = Field(None, env="FIREBASE_CREDENTIALS_JSON")
    google_application_credentials: str | None = Field(None, env="GOOGLE_APPLICATION_CREDENTIALS")

    # Firebase client config values (present in root .env and used by frontend)
    firebase_storage_bucket: str | None = Field(None, env="FIREBASE_STORAGE_BUCKET")
    firebase_messaging_sender_id: str | None = Field(None, env="FIREBASE_MESSAGING_SENDER_ID")
    firebase_app_id: str | None = Field(None, env="FIREBASE_APP_ID")
    # Additional firebase client vars used by the project
    firebase_api_key: str | None = Field(None, env="FIREBASE_API_KEY")
    firebase_auth_domain: str | None = Field(None, env="FIREBASE_AUTH_DOMAIN")
    firebase_measurement_id: str | None = Field(None, env="FIREBASE_MEASUREMENT_ID")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @field_validator("cors_origins", mode="before")
    def parse_cors_origins(cls, value):
        return _parse_comma_separated_list(value)

    @field_validator("allowed_hosts", mode="before")
    def parse_allowed_hosts(cls, value):
        parsed = _parse_comma_separated_list(value)
        return parsed or ["*"]

    @model_validator(mode="before")
    def assemble_database_url(cls, values):
        if values.get("database_url"):
            return values

        host = values.get("db_host")
        port = values.get("db_port")
        user = values.get("db_user")
        password = values.get("db_password")
        name = values.get("db_name")
        ssl_mode = values.get("db_ssl_mode")

        if not all([host, port, user, password, name]):
            raise ValueError(
                "Database credentials are incomplete. "
                "Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME."
            )
        # URL-encode username/password to safely include special characters
        # such as '@' or ':' which would otherwise break the DSN parsing.
        quoted_user = quote_plus(str(user))
        quoted_password = quote_plus(str(password))

        values["database_url"] = (
            f"postgresql+asyncpg://{quoted_user}:{quoted_password}@{host}:{port}/{name}"
        )
        return values


try:
    settings = Settings()
except ValidationError as exc:
    raise RuntimeError(f"Environment configuration is invalid:\n{exc}") from exc
