from enum import Enum


class RoleEnum(str, Enum):
    PATIENT = "Patient"
    DOCTOR = "Doctor"
    RECEPTIONIST = "Receptionist"
    ADMIN = "Admin"
