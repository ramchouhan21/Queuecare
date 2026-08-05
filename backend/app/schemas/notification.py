from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.notification import NotificationTypeEnum


class NotificationBase(BaseModel):
    user_id: UUID
    title: str = Field(..., max_length=255)
    message: str = Field(..., max_length=2000)
    notification_type: NotificationTypeEnum = NotificationTypeEnum.INFO
    is_read: bool = False
    read_at: Optional[datetime] = None


class NotificationCreate(NotificationBase):
    pass


class NotificationUpdate(BaseModel):
    user_id: Optional[UUID] = None
    title: Optional[str] = Field(None, max_length=255)
    message: Optional[str] = Field(None, max_length=2000)
    notification_type: Optional[NotificationTypeEnum] = None
    is_read: Optional[bool] = None
    read_at: Optional[datetime] = None


class NotificationResponse(NotificationBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
