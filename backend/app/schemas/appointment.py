from datetime import date, datetime, time
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.appointment import AppointmentStatusEnum, PriorityLevelEnum


class AppointmentBase(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    hospital_id: UUID
    department_id: UUID
    appointment_date: date
    appointment_time: time
    appointment_status: AppointmentStatusEnum
    visit_reason: Optional[str] = Field(None, max_length=255)
    symptoms: Optional[str] = Field(None, max_length=1024)
    priority_level: PriorityLevelEnum
    token_number: Optional[int] = None
    estimated_wait_time: Optional[int] = None
    checked_in: bool = False
    notes: Optional[str] = Field(None, max_length=2000)
    is_active: bool = True


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(BaseModel):
    patient_id: Optional[UUID] = None
    doctor_id: Optional[UUID] = None
    hospital_id: Optional[UUID] = None
    department_id: Optional[UUID] = None
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    appointment_status: Optional[AppointmentStatusEnum] = None
    visit_reason: Optional[str] = Field(None, max_length=255)
    symptoms: Optional[str] = Field(None, max_length=1024)
    priority_level: Optional[PriorityLevelEnum] = None
    token_number: Optional[int] = None
    estimated_wait_time: Optional[int] = None
    checked_in: Optional[bool] = None
    notes: Optional[str] = Field(None, max_length=2000)
    is_active: Optional[bool] = None


class AppointmentResponse(AppointmentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
