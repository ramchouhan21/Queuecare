import json
import os

import firebase_admin
from firebase_admin import credentials


def get_firebase_admin_credentials():
    service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY")
    if service_account_json:
        try:
            service_account_info = json.loads(service_account_json)
        except json.JSONDecodeError as exc:
            raise RuntimeError(
                "FIREBASE_SERVICE_ACCOUNT_KEY must contain valid JSON."
            ) from exc
        return credentials.Certificate(service_account_info)

    service_account_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if service_account_path:
        return credentials.Certificate(service_account_path)

    raise RuntimeError(
        "Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS."
    )


def initialize_firebase_admin():
    if not firebase_admin._apps:
        firebase_admin.initialize_app(
            get_firebase_admin_credentials(),
            {"projectId": os.getenv("FIREBASE_PROJECT_ID")},
        )
