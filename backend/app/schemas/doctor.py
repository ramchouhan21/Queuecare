from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DoctorBase(BaseModel):
    user_id: UUID
    hospital_id: UUID
    department_id: UUID
    license_number: str = Field(..., max_length=128)
    specialization: str = Field(..., max_length=128)
    qualification: str = Field(..., max_length=255)
    experience_years: Optional[int] = None
    consultation_fee: Optional[float] = None
    available_today: bool = False
    is_active: bool = True


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(BaseModel):
    user_id: Optional[UUID] = None
    hospital_id: Optional[UUID] = None
    department_id: Optional[UUID] = None
    license_number: Optional[str] = Field(None, max_length=128)
    specialization: Optional[str] = Field(None, max_length=128)
    qualification: Optional[str] = Field(None, max_length=255)
    experience_years: Optional[int] = None
    consultation_fee: Optional[float] = None
    available_today: Optional[bool] = None
    is_active: Optional[bool] = None


class DoctorResponse(DoctorBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
