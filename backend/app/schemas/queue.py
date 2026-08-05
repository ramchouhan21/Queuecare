from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.queue import QueueStatusEnum


class QueueBase(BaseModel):
    appointment_id: UUID
    queue_number: int
    current_position: Optional[int] = None
    estimated_wait_time: Optional[int] = None
    queue_status: QueueStatusEnum = QueueStatusEnum.WAITING
    called_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    skipped: bool = False
    cancelled: bool = False
    notes: Optional[str] = Field(None, max_length=2000)
    is_active: bool = True


class QueueCreate(QueueBase):
    pass


class QueueUpdate(BaseModel):
    appointment_id: Optional[UUID] = None
    queue_number: Optional[int] = None
    current_position: Optional[int] = None
    estimated_wait_time: Optional[int] = None
    queue_status: Optional[QueueStatusEnum] = None
    called_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    skipped: Optional[bool] = None
    cancelled: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=2000)
    is_active: Optional[bool] = None


class QueueResponse(QueueBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
