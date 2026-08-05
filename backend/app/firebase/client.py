import json
import logging
from pathlib import Path
from typing import Any

import firebase_admin
from firebase_admin import credentials, auth

from app.config import settings

logger = logging.getLogger(__name__)


def _load_service_account_credentials() -> credentials.Certificate:
    if settings.firebase_credentials_json:
        payload = json.loads(settings.firebase_credentials_json)
        return credentials.Certificate(payload)

    if settings.google_application_credentials:
        path = Path(settings.google_application_credentials)
        if not path.exists():
            raise FileNotFoundError(
                f"Firebase credentials file not found: {path}"
            )
        return credentials.Certificate(str(path))

    raise RuntimeError(
        "Firebase credentials are not configured. "
        "Set FIREBASE_CREDENTIALS_JSON or GOOGLE_APPLICATION_CREDENTIALS."
    )


def get_firebase_app() -> firebase_admin.App:
    if firebase_admin._apps:
        return firebase_admin.get_app()

    logger.info("Initializing Firebase Admin SDK")
    credential = _load_service_account_credentials()
    return firebase_admin.initialize_app(credential)


def verify_firebase_token(id_token: str) -> dict[str, Any]:
    app = get_firebase_app()
    return auth.verify_id_token(id_token, app=app)
