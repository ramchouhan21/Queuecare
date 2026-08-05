import uuid
from enum import Enum

from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class QueueStatusEnum(str, Enum):
    WAITING = "waiting"
    CALLED = "called"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    SKIPPED = "skipped"
    CANCELLED = "cancelled"


class Queue(Base):
    __tablename__ = "queues"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    appointment_id = Column(
        UUID(as_uuid=True),
        ForeignKey("appointments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    queue_number = Column(Integer, nullable=False, index=True)
    current_position = Column(Integer, nullable=True)
    estimated_wait_time = Column(Integer, nullable=True)
    queue_status = Column(
        SQLEnum(
            QueueStatusEnum,
            name="queue_status",
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
        ),
        nullable=False,
        default=QueueStatusEnum.WAITING.value,
    )
    called_at = Column(DateTime(timezone=True), nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    skipped = Column(Boolean, nullable=False, default=False)
    cancelled = Column(Boolean, nullable=False, default=False)
    notes = Column(String(2000), nullable=True)
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

    appointment = relationship(
        "Appointment",
        back_populates="queues",
    )
