import uuid
from enum import Enum

from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, Float, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class HospitalTypeEnum(str, Enum):
    GOVERNMENT = "Government"
    PRIVATE = "Private"
    TRUST = "Trust"
    CLINIC = "Clinic"


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    name = Column(String(255), nullable=False)
    hospital_type = Column(
        SQLEnum(
            HospitalTypeEnum,
            name="hospital_type",
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
        ),
        nullable=False,
    )
    registration_number = Column(String(128), nullable=True, unique=True, index=True)
    email = Column(String(255), nullable=True, unique=True, index=True)
    phone_number = Column(String(32), nullable=True)
    website = Column(String(255), nullable=True)
    address_line_1 = Column(String(255), nullable=True)
    address_line_2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True, index=True)
    state = Column(String(100), nullable=True, index=True)
    country = Column(String(100), nullable=True)
    postal_code = Column(String(32), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    total_beds = Column(Integer, nullable=True)
    available_beds = Column(Integer, nullable=True)
    total_icu_beds = Column(Integer, nullable=True)
    available_icu_beds = Column(Integer, nullable=True)
    emergency_available = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
