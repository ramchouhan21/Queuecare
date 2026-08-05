# QueueCare AI Backend

This directory contains the FastAPI backend scaffold for QueueCare AI.

## Purpose

The backend is organized for production-ready deployment, with:
- FastAPI application entrypoint
- environment configuration management via Pydantic
- structured logging
- CORS middleware
- preparatory integration layers for PostgreSQL and Firebase

## Layout

- `app/main.py` - application factory and ASGI entrypoint
- `app/config.py` - environment settings and configuration management
- `app/logger.py` - centralized logging configuration
- `app/api/` - API routing package
- `app/db/` - database integration helpers and session factory placeholders
- `app/firebase/` - Firebase authentication preparation and initialization helpers

## Run locally

Install dependencies in a Python 3.11+ environment and run:

```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend loads environment variables from `.env` in the `backend` directory. A sample file is provided as `.env.example`.
