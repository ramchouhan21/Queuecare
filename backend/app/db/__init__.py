"""Database integration helpers for the FastAPI backend."""

from app.db.session import get_db, engine

__all__ = ["get_db", "engine"]
