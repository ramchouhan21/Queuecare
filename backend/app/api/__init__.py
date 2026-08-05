"""API routing package for the FastAPI application."""

from fastapi import APIRouter
from app.api.health import router as health_router

api_router = APIRouter()
api_router.include_router(health_router)

# Additional routers should be registered here when endpoints are added.
