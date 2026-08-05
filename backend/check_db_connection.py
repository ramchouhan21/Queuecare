import asyncio
import logging
import re

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import engine
from app.config import settings


def run_check() -> None:
    async def _check():
        try:
            # Print DB settings for debugging (mask password in URL)
            db_host = settings.db_host
            db_port = settings.db_port
            db_user = settings.db_user
            db_name = settings.db_name
            db_ssl_mode = settings.db_ssl_mode
            database_url = settings.database_url or ""

            masked_db_url = database_url
            m = re.search(r'^(?P<scheme>[^:]+://)(?P<creds>[^@]+)@', database_url)
            if m:
                creds = m.group('creds')
                if ':' in creds:
                    user, _ = creds.split(':', 1)
                    masked_creds = f"{user}:********"
                else:
                    masked_creds = creds
                masked_db_url = database_url.replace(m.group(0), f"{m.group('scheme')}{masked_creds}@")

            print(f"settings.db_host={db_host}")
            print(f"settings.db_port={db_port}")
            print(f"settings.db_user={db_user}")
            print(f"settings.db_name={db_name}")
            print(f"settings.db_ssl_mode={db_ssl_mode}")
            print(f"settings.database_url={masked_db_url}")

            async with engine.connect() as conn:
                result = await conn.execute(text("SELECT 1"))
                value = result.scalar_one_or_none()

            if value == 1:
                print("PostgreSQL connection test succeeded: connected and query returned 1.")
            else:
                print("PostgreSQL connection test failed: query did not return expected value.")
        except SQLAlchemyError as exc:
            logging.exception("PostgreSQL connection test failed.")
            print(f"PostgreSQL connection test failed: {exc}")
        except Exception as exc:
            logging.exception("Unexpected error during PostgreSQL connection test.")
            print(f"Unexpected error during PostgreSQL connection test: {exc}")

    asyncio.run(_check())


if __name__ == "__main__":
    run_check()
