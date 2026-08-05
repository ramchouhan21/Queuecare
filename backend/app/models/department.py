import uuid

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    hospital_id = Column(
        UUID(as_uuid=True),
        ForeignKey("hospitals.id"),
        nullable=False,
    )
    name = Column(String(255), nullable=False)
    code = Column(String(64), nullable=False, index=True)
    description = Column(String(1024), nullable=True)
    floor = Column(String(50), nullable=True)
    consultation_fee = Column(Numeric(10, 2), nullable=True)
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

    hospital = relationship(
        "Hospital",
        back_populates="departments",
    )

    doctors = relationship(
        "Doctor",
        back_populates="department",
        cascade="all, delete-orphan",
    )

    appointments = relationship(
        "Appointment",
        back_populates="department",
        cascade="all, delete-orphan",
    )
