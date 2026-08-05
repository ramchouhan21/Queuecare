from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DepartmentBase(BaseModel):
    hospital_id: UUID
    name: str = Field(..., max_length=255)
    code: str = Field(..., max_length=64)
    description: Optional[str] = Field(None, max_length=1024)
    floor: Optional[str] = Field(None, max_length=50)
    consultation_fee: Optional[float] = None
    is_active: bool = True


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(BaseModel):
    hospital_id: Optional[UUID] = None
    name: Optional[str] = Field(None, max_length=255)
    code: Optional[str] = Field(None, max_length=64)
    description: Optional[str] = Field(None, max_length=1024)
    floor: Optional[str] = Field(None, max_length=50)
    consultation_fee: Optional[float] = None
    is_active: Optional[bool] = None


class DepartmentResponse(DepartmentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
