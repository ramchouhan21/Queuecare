from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl

from app.models.hospital import HospitalTypeEnum


class HospitalBase(BaseModel):
    name: str = Field(..., max_length=255)
    hospital_type: HospitalTypeEnum = Field(...)
    registration_number: Optional[str] = Field(None, max_length=128)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=32)
    website: Optional[HttpUrl] = None
    address_line_1: Optional[str] = Field(None, max_length=255)
    address_line_2: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    country: Optional[str] = Field(None, max_length=100)
    postal_code: Optional[str] = Field(None, max_length=32)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    total_beds: Optional[int] = None
    available_beds: Optional[int] = None
    total_icu_beds: Optional[int] = None
    available_icu_beds: Optional[int] = None
    emergency_available: bool = False
    is_active: bool = True


class HospitalCreate(HospitalBase):
    pass


class HospitalUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=255)
    hospital_type: Optional[HospitalTypeEnum] = None
    registration_number: Optional[str] = Field(None, max_length=128)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=32)
    website: Optional[HttpUrl] = None
    address_line_1: Optional[str] = Field(None, max_length=255)
    address_line_2: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    country: Optional[str] = Field(None, max_length=100)
    postal_code: Optional[str] = Field(None, max_length=32)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    total_beds: Optional[int] = None
    available_beds: Optional[int] = None
    total_icu_beds: Optional[int] = None
    available_icu_beds: Optional[int] = None
    emergency_available: Optional[bool] = None
    is_active: Optional[bool] = None


class HospitalResponse(HospitalBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
