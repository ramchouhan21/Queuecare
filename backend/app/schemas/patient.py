from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PatientBase(BaseModel):
    user_id: UUID
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=32)
    blood_group: Optional[str] = Field(None, max_length=8)
    emergency_contact_name: Optional[str] = Field(None, max_length=200)
    emergency_contact_phone: Optional[str] = Field(None, max_length=32)
    address: Optional[str] = Field(None, max_length=500)


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=32)
    blood_group: Optional[str] = Field(None, max_length=8)
    emergency_contact_name: Optional[str] = Field(None, max_length=200)
    emergency_contact_phone: Optional[str] = Field(None, max_length=32)
    address: Optional[str] = Field(None, max_length=500)


class PatientResponse(PatientBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
