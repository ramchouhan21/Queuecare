from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api import api_router
from app.config import settings
from app.logger import configure_logging
from app.core import APP_NAME, API_DESCRIPTION

configure_logging()

app = FastAPI(
    title=APP_NAME,
    description=API_DESCRIPTION,
    version=settings.api_version,
    root_path=settings.root_path,
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.allowed_hosts,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_version)
