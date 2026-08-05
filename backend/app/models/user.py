import uuid

from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, String, func
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base
from app.models.roles import RoleEnum


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    firebase_uid = Column(String(128), nullable=False, unique=True, index=True)
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=True, unique=True, index=True)
    phone_number = Column(String(32), nullable=True, unique=True, index=True)
    role = Column(
        SQLEnum(RoleEnum, name="user_role", values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
        default=RoleEnum.PATIENT.value,
    )
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
