import logging
import ssl as _ssl

from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

from app.config import settings

logger = logging.getLogger(__name__)


def _build_connect_args() -> dict:
    """Return driver-specific connect args for asyncpg.

    asyncpg expects an `ssl` argument (an SSLContext or bool) rather than
    `sslmode` in the URL query string. For local development `DB_SSL_MODE`
    will typically be `disable`, in which case no SSL args are provided.
    """
    mode = (settings.db_ssl_mode or "").lower()
    if mode in ("require", "verify-ca", "verify-full"):
        ctx = _ssl.create_default_context()
        return {"ssl": ctx}
    # 'prefer' and 'disable' — do not provide an ssl arg and let the driver
    # negotiate or connect without SSL.
    return {}


def get_engine() -> AsyncEngine:
    try:
        connect_args = _build_connect_args()
        engine = create_async_engine(
            settings.database_url,
            echo=settings.debug,
            pool_pre_ping=True,
            pool_size=20,
            max_overflow=10,
            future=True,
            connect_args=connect_args,
        )
        return engine
    except SQLAlchemyError as exc:
        logger.exception("Failed to create async SQLAlchemy engine.")
        raise RuntimeError("Database engine initialization failed.") from exc


engine = get_engine()
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    future=True,
)


async def get_db():
    try:
        async with async_session() as session:
            yield session
    except SQLAlchemyError as exc:
        logger.exception("Database session error.")
        raise RuntimeError("Database session error.") from exc
