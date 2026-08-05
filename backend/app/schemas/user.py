from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.roles import RoleEnum


class UserBase(BaseModel):
    firebase_uid: str = Field(..., max_length=128)
    full_name: str = Field(..., max_length=200)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=32)
    role: RoleEnum = RoleEnum.PATIENT
    is_active: bool = True


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, max_length=200)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=32)
    role: Optional[RoleEnum] = None
    is_active: Optional[bool] = None


class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
