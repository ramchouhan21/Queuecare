import uuid

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    hospital_id = Column(
        UUID(as_uuid=True),
        ForeignKey("hospitals.id"),
        nullable=False,
        index=True,
    )
    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id"),
        nullable=False,
        index=True,
    )
    license_number = Column(
        String(128),
        nullable=False,
        unique=True,
        index=True,
    )
    specialization = Column(String(128), nullable=False)
    qualification = Column(String(255), nullable=False)
    experience_years = Column(Integer, nullable=True)
    consultation_fee = Column(Numeric(10, 2), nullable=True)
    available_today = Column(Boolean, nullable=False, default=False)
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

    user = relationship(
        "User",
        back_populates="doctor",
        uselist=False,
    )
    hospital = relationship(
        "Hospital",
        back_populates="doctors",
    )
    department = relationship(
        "Department",
        back_populates="doctors",
    )
