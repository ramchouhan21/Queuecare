# QueueCare AI — API Design Document

**Product:** QueueCare AI — AI-Based Smart Hospital Queue Management and Wait Time Prediction System
**Document ID:** 12
**Version:** 1.0 (Draft)
**Status:** Pending Approval
**Last Updated:** August 1, 2026
**Author:** Ram Chauhan
**Related Documents:** `05_Product_Requirements_Document.md`, `10_System_Architecture.md`, `11_Database_Design.md`

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [API Design Principles](#2-api-design-principles)
3. [Authentication and Authorization](#3-authentication-and-authorization)
4. [API Versioning Strategy](#4-api-versioning-strategy)
5. [Standard Request and Response Format](#5-standard-request-and-response-format)
6. [Error Handling Standards](#6-error-handling-standards)
7. [API Modules](#7-api-modules)
8. [API Security](#8-api-security)
9. [Rate Limiting Strategy](#9-rate-limiting-strategy)
10. [API Workflow Examples](#10-api-workflow-examples)
11. [Future API Extensions](#11-future-api-extensions)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction

### 1.1 Purpose

This document defines the complete REST API specification for QueueCare AI. It serves as the authoritative contract between the backend and all consumer surfaces — the patient Progressive Web App, the staff web dashboard, and any future integrations. It is the primary reference for backend developers implementing endpoints and frontend developers integrating with them.

This document covers:
- API design principles and naming conventions
- Authentication and role-based authorization model using Firebase and custom RBAC
- Standard request/response envelope and error format
- Complete endpoint specifications for all 11 API modules
- Security controls, rate limiting, and workflow examples

This document does not include implementation code, FastAPI route definitions, database queries, or frontend component specifications.

### 1.2 Technology Context

| Component | Technology |
|-----------|-----------|
| Backend framework | FastAPI (Python 3.11+) |
| Authentication | Firebase Authentication (JWT ID tokens) |
| Authorization | Role-based claims embedded in Firebase custom tokens |
| Transport | HTTPS only (TLS 1.2+) |
| Data format | JSON (application/json) |
| Real-time | WebSocket (separate from REST; documented in `10_System_Architecture.md`) |
| API documentation | Auto-generated Swagger UI at `/docs` and ReDoc at `/redoc` |

### 1.3 Base URL Convention

| Environment | Base URL |
|-------------|---------|
| Development | `http://localhost:8000/v1` |
| Staging | `https://api-staging.queuecare.ai/v1` |
| Production | `https://api.queuecare.ai/v1` |

All endpoints in this document are relative to the base URL. Example: `POST /auth/staff/login` means `POST https://api.queuecare.ai/v1/auth/staff/login`.

---

## 2. API Design Principles

### 2.1 Resource-Oriented Design

All endpoints model resources, not actions. URLs identify nouns (resources); HTTP methods identify verbs (actions).

| Correct (Resource-Oriented) | Incorrect (Action-Oriented) |
|----------------------------|----------------------------|
| `PATCH /v1/tokens/{id}` with `{ "status": "SERVED" }` | `POST /v1/markTokenServed` |
| `POST /v1/sessions` to create a session | `POST /v1/openQueue` |
| `GET /v1/departments/{id}/queue` | `GET /v1/getDepartmentQueue` |

### 2.2 HTTP Method Semantics

| Method | Semantics | Idempotent | Body |
|--------|----------|-----------|------|
| `GET` | Retrieve a resource or collection | Yes | No |
| `POST` | Create a new resource | No | Yes |
| `PUT` | Replace a resource entirely | Yes | Yes |
| `PATCH` | Partially update a resource | Yes | Yes |
| `DELETE` | Remove a resource | Yes | No |

### 2.3 URL Naming Conventions

| Rule | Example |
|------|---------|
| Lowercase plural nouns for collections | `/hospitals`, `/tokens`, `/departments` |
| UUID path parameters for specific resources | `/hospitals/{hospital_id}` |
| Sub-resources via nesting (max 2 levels deep) | `/hospitals/{id}/departments` |
| No verbs in URLs | `/tokens/{id}` + `PATCH` — not `/tokens/{id}/serve` |
| Query parameters for filtering, sorting, pagination | `/tokens?status=QUEUED&sort=queue_position` |
| Hyphenated multi-word resource names | `/audit-logs`, `/staff-assignments` |

### 2.4 Pagination Convention

All list endpoints that may return more than 20 items support cursor-based pagination:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | `20` | Number of records to return (max: 100) |
| `cursor` | string | null | Opaque cursor returned by the previous page response |
| `sort` | string | `created_at_desc` | Sort field and direction |

Paginated responses include a `meta.pagination` object with `total`, `limit`, `has_next`, and `next_cursor`.

### 2.5 Response Code Usage

| Code | Meaning | When Used |
|------|---------|----------|
| `200 OK` | Successful GET, PUT, PATCH | Resource retrieved or updated |
| `201 Created` | Successful POST that creates a resource | Token issued, department created |
| `204 No Content` | Successful DELETE or action with no return body | Account deactivated |
| `400 Bad Request` | Validation failure; malformed request | Missing required field, invalid data type |
| `401 Unauthorized` | Missing or invalid Firebase token | No auth header, expired token |
| `403 Forbidden` | Valid token but insufficient permissions | Receptionist accessing admin endpoint |
| `404 Not Found` | Resource does not exist | Invalid UUID, deleted resource |
| `409 Conflict` | State conflict | Queue full, duplicate token, session already open |
| `422 Unprocessable Entity` | Request body syntax valid but semantically invalid | Pydantic validation failure |
| `423 Locked` | Account locked | 5 failed login attempts |
| `429 Too Many Requests` | Rate limit exceeded | — |
| `500 Internal Server Error` | Unhandled exception | Bug, unexpected database error |
| `503 Service Unavailable` | External dependency unavailable | Firebase Auth unreachable |

---

## 3. Authentication and Authorization

### 3.1 Authentication Model

QueueCare AI uses **Firebase Authentication** for identity management. The API never stores session cookies or issues its own JWTs. All tokens are issued by Firebase and verified using the Firebase Admin SDK.

**Two authentication flows exist:**

#### 3.1.1 Patient Authentication (OTP / Phone)

1. Patient initiates sign-in via Firebase SDK on the client (phone number → OTP)
2. Firebase SDK returns a signed **Firebase ID Token** (JWT) after OTP verification
3. Client includes the ID Token in every API request: `Authorization: Bearer <firebase_id_token>`
4. FastAPI middleware calls `firebase_admin.auth.verify_id_token(token)` to validate
5. Decoded claims (`uid`, `phone_number`) are injected into the request context

#### 3.1.2 Staff Authentication (Credentials → Custom Token)

1. Staff member submits `{ phone, password }` to `POST /v1/auth/staff/login`
2. API verifies credentials against the `staff_accounts` table (bcrypt comparison)
3. API calls `firebase_admin.auth.create_custom_token(uid, { role, hospital_id, dept_ids })`
4. Custom token returned to client
5. Client exchanges the custom token for a Firebase ID Token via the Firebase SDK
6. All subsequent requests use the Firebase ID Token with embedded role/hospital claims

---

### 3.2 Authorization Model (Role-Based Access Control)

Authorization is enforced at the route-handler level. The authentication middleware decodes the token and injects context; the route handler checks permissions.

#### Roles

| Role Value | Who | Assigned By |
|-----------|-----|------------|
| `patient` | Walk-in patients | Auto-assigned on registration |
| `receptionist` | Front-desk OPD staff | Hospital administrator |
| `doctor` | OPD consulting physicians | Hospital administrator |
| `admin` | Hospital operations manager | QueueCare AI platform team |

#### Claims in Firebase Custom Token (Staff Only)

| Claim | Type | Description |
|-------|------|-------------|
| `role` | `string` | One of: `receptionist`, `doctor`, `admin` |
| `hospital_id` | `UUID string` | The hospital this staff member belongs to |
| `dept_ids` | `UUID[]` | Department UUIDs the staff member is assigned to |

#### Route-Level Permission Matrix

| Resource | Patient | Receptionist | Doctor | Admin |
|----------|---------|-------------|--------|-------|
| `GET /v1/hospitals` | ✅ | ✅ | ✅ | ✅ |
| `POST /v1/hospitals` | ❌ | ❌ | ❌ | Platform only |
| `GET /v1/departments` | ✅ | ✅ | ✅ | ✅ |
| `POST /v1/departments` | ❌ | ❌ | ❌ | ✅ |
| `POST /v1/sessions` | ❌ | ✅ (assigned dept) | ❌ | ✅ |
| `POST /v1/tokens` | ✅ | ✅ | ❌ | ❌ |
| `PATCH /v1/tokens/{id}` | ✅ (own cancel) | ✅ | ✅ (own dept) | ✅ |
| `GET /v1/analytics/sessions` | ❌ | ❌ | ❌ | ✅ |
| `GET /v1/audit-logs` | ❌ | ❌ | ❌ | ✅ |
| `POST /v1/staff` | ❌ | ❌ | ❌ | ✅ |

---

### 3.3 Authorization Header

All protected endpoints require:
```
Authorization: Bearer <firebase_id_token>
```

Missing header → `401 Unauthorized`
Invalid or expired token → `401 Unauthorized`
Valid token but insufficient role → `403 Forbidden`

---

### 3.4 Hospital Scope Enforcement

For all staff endpoints, the `hospital_id` in the request context (from the token claim) is used to scope all database queries. No endpoint accepts `hospital_id` as a path or query parameter from the caller — the hospital scope is always derived from the authenticated token.

---

## 4. API Versioning Strategy

### 4.1 Versioning Scheme: URI Path Versioning

All API endpoints are prefixed with a version segment: `/v1/`, `/v2/`, etc.

**Rationale:**
- Most explicit versioning mechanism — the version is visible in every URL
- Easy for clients to pin to a specific version
- Standard in healthcare and enterprise APIs
- Allows two versions to run simultaneously during migration periods

### 4.2 Current Version

The current and only version is **v1**. All endpoints documented in this file are under `/v1/`.

### 4.3 Deprecation Policy

When a new version is introduced:

| Phase | Duration | Behaviour |
|-------|----------|-----------|
| **Active** | Indefinite | Current version; fully supported |
| **Deprecated** | 6 months minimum | Old version still works; `Deprecation: true` header added to responses; warnings in docs |
| **Sunset** | Post-deprecation | Old version returns `410 Gone` |

### 4.4 Non-Breaking Changes (No Version Bump Required)

- Adding new optional fields to response bodies
- Adding new optional query parameters
- Adding new endpoints
- Adding new error codes

### 4.5 Breaking Changes (Require New Version)

- Removing or renaming fields in response bodies
- Changing the type of an existing field
- Removing endpoints
- Changing authentication requirements on existing endpoints

### 4.6 Version Response Header

Every API response includes:
```
X-API-Version: v1
```

---

## 5. Standard Request and Response Format

### 5.1 Content Type

All requests and responses use JSON:
```
Content-Type: application/json
Accept: application/json
```

### 5.2 Standard Response Envelope

Every API response is wrapped in a consistent JSON envelope:

```json
{
  "data": { ... },
  "meta": {
    "request_id": "uuid-trace-id",
    "version": "v1",
    "timestamp": "2026-08-01T09:15:30Z"
  },
  "error": null
}
```

| Field | Type | Description |
|-------|------|-------------|
| `data` | object / array / null | The response payload; null on errors |
| `meta` | object | Request metadata; always present |
| `meta.request_id` | string | UUID trace ID; matches `X-Trace-ID` response header |
| `meta.version` | string | API version |
| `meta.timestamp` | string | Server-side ISO 8601 UTC timestamp |
| `error` | object / null | Error details; null on success |

### 5.3 Successful Single Resource Response

```json
{
  "data": {
    "id": "a1b2c3d4-...",
    "name": "General Medicine",
    "status": "ACTIVE"
  },
  "meta": { "request_id": "...", "version": "v1", "timestamp": "..." },
  "error": null
}
```

### 5.4 Successful List Response

```json
{
  "data": [
    { "id": "...", "name": "..." },
    { "id": "...", "name": "..." }
  ],
  "meta": {
    "request_id": "...",
    "version": "v1",
    "timestamp": "...",
    "pagination": {
      "total": 142,
      "limit": 20,
      "has_next": true,
      "next_cursor": "eyJpZCI6Ii4uLiJ9"
    }
  },
  "error": null
}
```

### 5.5 Empty List Response

An empty list returns `200 OK` with an empty array — never `404`:

```json
{ "data": [], "meta": { "pagination": { "total": 0, "has_next": false } }, "error": null }
```

### 5.6 Standard Response Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/json` | Always |
| `X-Trace-ID` | UUID | Matches `meta.request_id`; for log correlation |
| `X-API-Version` | `v1` | Current API version |
| `X-RateLimit-Limit` | integer | Requests allowed per window |
| `X-RateLimit-Remaining` | integer | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp | When the rate limit window resets |

---

## 6. Error Handling Standards

### 6.1 Error Response Envelope

All error responses have `data: null` and a populated `error` object:

```json
{
  "data": null,
  "meta": { "request_id": "...", "version": "v1", "timestamp": "..." },
  "error": {
    "code": "QUEUE_FULL",
    "message": "The queue for this department has reached its maximum capacity.",
    "details": {
      "department_id": "a1b2c3d4-...",
      "max_capacity": 80,
      "current_depth": 80
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `error.code` | string | Machine-readable error code — used by clients to branch on specific errors |
| `error.message` | string | Human-readable message suitable for display to the user |
| `error.details` | object | Optional contextual data for debugging; never includes passwords or tokens |

### 6.2 Validation Error Format (422)

Pydantic validation failures return structured field-level errors:

```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields failed validation.",
    "details": {
      "fields": [
        { "field": "phone", "message": "Must be a valid 10-digit Indian mobile number" },
        { "field": "age", "message": "Must be between 0 and 120" }
      ]
    }
  }
}
```

### 6.3 Error Code Registry

| HTTP Status | Error Code | Trigger |
|-------------|-----------|---------|
| 400 | `INVALID_REQUEST` | Malformed JSON; missing required field |
| 400 | `SESSION_NOT_OPEN` | Token issuance attempted with no open session |
| 400 | `INVALID_OTP` | Incorrect or expired OTP |
| 400 | `INVALID_CREDENTIALS` | Wrong phone/password on staff login |
| 401 | `UNAUTHORIZED` | Missing `Authorization` header |
| 401 | `TOKEN_EXPIRED` | Firebase ID token has expired |
| 401 | `TOKEN_INVALID` | Firebase token verification failed |
| 403 | `FORBIDDEN` | Valid token; insufficient role |
| 403 | `ACCOUNT_INACTIVE` | Staff account has been deactivated |
| 403 | `WRONG_HOSPITAL` | Staff accessing data outside their hospital |
| 403 | `WRONG_DEPARTMENT` | Staff accessing queue outside their department |
| 404 | `NOT_FOUND` | Resource UUID does not exist |
| 409 | `QUEUE_FULL` | Department queue at maximum capacity |
| 409 | `QUEUE_PAUSED` | Queue is currently paused |
| 409 | `QUEUE_CLOSED` | Session is closed |
| 409 | `DUPLICATE_TOKEN` | Patient already has an active token for this department |
| 409 | `SESSION_ALREADY_OPEN` | An open session already exists for this department today |
| 409 | `DUPLICATE_PHONE` | Phone number already registered |
| 409 | `DUPLICATE_DEPARTMENT_NAME` | Department name already exists in this hospital |
| 410 | `API_VERSION_SUNSET` | Deprecated API version has been removed |
| 422 | `VALIDATION_ERROR` | Pydantic model validation failure |
| 423 | `ACCOUNT_LOCKED` | Staff account locked after 5 failed login attempts |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests from this client |
| 500 | `INTERNAL_ERROR` | Unhandled exception; unexpected database error |
| 503 | `SERVICE_UNAVAILABLE` | Firebase Auth or FCM temporarily unreachable |

---

## 7. API Modules

Each module below documents all endpoints with full specifications. The module list follows the product's functional areas.

---

### 7.1 Module: Authentication

**Purpose:** Handles staff credential verification, custom token issuance, and password management. Patient authentication is handled entirely client-side via the Firebase SDK; only registration and profile synchronisation touch the API.

---

#### `POST /v1/auth/staff/login`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/auth/staff/login` |
| **Description** | Verify staff credentials and return a Firebase custom token. The client exchanges this custom token for a Firebase ID Token using the Firebase SDK. |
| **Auth Required** | No |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `phone` | string | Yes | 10-digit Indian mobile number |
| `password` | string | Yes | Minimum 8 characters |

**Example Request:**
```json
{ "phone": "9876543210", "password": "securepass123" }
```

**Response Body (200):**
```json
{
  "data": {
    "custom_token": "eyJhbGciOi...",
    "staff": {
      "id": "uuid",
      "name": "Ramesh Kumar",
      "role": "receptionist",
      "hospital_id": "uuid",
      "dept_ids": ["uuid-1", "uuid-2"]
    }
  }
}
```

**Response Codes:**

| Code | Condition |
|------|-----------|
| `200 OK` | Credentials valid; custom token issued |
| `400 INVALID_CREDENTIALS` | Wrong phone or password |
| `403 ACCOUNT_INACTIVE` | Account deactivated |
| `423 ACCOUNT_LOCKED` | 5 failed attempts; password reset required |

**Validation Rules:**
- Phone must be a 10-digit numeric string
- After successful login, `failed_login_count` is reset to 0
- After failed login, `failed_login_count` increments; locks at 5

---

#### `POST /v1/auth/staff/password-reset/request`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/auth/staff/password-reset/request` |
| **Description** | Send a password reset OTP to the staff member's registered phone via Firebase. |
| **Auth Required** | No |

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `phone` | string | Yes |

**Response Body (200):**
```json
{ "data": { "message": "Reset OTP sent to your registered number." } }
```

**Response Codes:** `200 OK`, `404 NOT_FOUND` (phone not registered)

---

#### `POST /v1/auth/staff/password-reset/confirm`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/auth/staff/password-reset/confirm` |
| **Description** | Verify OTP and set a new password. |
| **Auth Required** | No |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `phone` | string | Yes | — |
| `otp` | string | Yes | 6-digit code |
| `new_password` | string | Yes | Min 8 characters; at least 1 digit |

**Response Codes:** `200 OK`, `400 INVALID_OTP`, `422 VALIDATION_ERROR`

---

#### `POST /v1/auth/patient/register`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/auth/patient/register` |
| **Description** | Create or update a patient record after Firebase OTP verification. Called by the client after the patient signs in with Firebase (OTP already verified). |
| **Auth Required** | Yes — Firebase ID Token (patient) |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | string | Yes | 2–200 characters |
| `age` | integer | No | 0–120 |
| `gender` | string | No | `male`, `female`, `other`, `prefer_not_to_say` |

**Response Body (200 / 201):**
```json
{
  "data": {
    "id": "uuid",
    "firebase_uid": "abc123",
    "name": "Priya Sharma",
    "phone": "+919876543210",
    "age": 38,
    "gender": "female",
    "notifications_enabled": true,
    "preferred_language": "en",
    "created_at": "2026-08-01T08:30:00Z"
  }
}
```

**Response Codes:** `201 Created` (new patient), `200 OK` (existing patient updated), `409 DUPLICATE_PHONE`

---

#### `PATCH /v1/auth/patient/fcm-token`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/auth/patient/fcm-token` |
| **Description** | Update the patient's FCM device token. Called by the client when Firebase issues a new FCM token (on app launch or token refresh). |
| **Auth Required** | Yes — Firebase ID Token (patient) |

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `fcm_token` | string | Yes |

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

### 7.2 Module: Hospitals

**Purpose:** Allows hospital administrators to view and update their hospital's profile. Hospital creation is reserved for the platform super-admin and is not exposed in the public API.

---

#### `GET /v1/hospitals`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/hospitals` |
| **Description** | List all active hospitals on the platform. Used by patients on the hospital selection screen. |
| **Auth Required** | Yes (any authenticated role) |

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | — | Filter by hospital name (case-insensitive, partial match) |
| `limit` | integer | 20 | Page size |
| `cursor` | string | — | Pagination cursor |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Apollo Hospital",
      "address": "Baner, Pune",
      "city": "Pune",
      "state": "Maharashtra",
      "phone": "02012345678",
      "active_department_count": 5
    }
  ],
  "meta": { "pagination": { "total": 12, "has_next": false } }
}
```

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

#### `GET /v1/hospitals/{hospital_id}`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/hospitals/{hospital_id}` |
| **Description** | Get full details of a specific hospital. Admins see all fields; patients see a public subset. |
| **Auth Required** | Yes |

**Path Parameters:** `hospital_id` (UUID)

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 WRONG_HOSPITAL` (staff from another hospital)

---

#### `PATCH /v1/hospitals/{hospital_id}`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/hospitals/{hospital_id}` |
| **Description** | Update hospital profile details. Admin role only. |
| **Auth Required** | Yes — admin only; must match their own hospital |

**Request Body (all fields optional):**

| Field | Type | Validation |
|-------|------|-----------|
| `name` | string | 2–200 characters |
| `address` | string | Max 500 characters |
| `city` | string | Max 100 characters |
| `phone` | string | Valid phone format |
| `email` | string | Valid email format |

**Response Codes:** `200 OK`, `403 FORBIDDEN`, `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### 7.3 Module: Staff Accounts (Users)

**Purpose:** Hospital administrators create, manage, and deactivate staff accounts (receptionists and doctors). Staff cannot self-register.

---

#### `GET /v1/staff`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/staff` |
| **Description** | List all staff accounts for the authenticated administrator's hospital. |
| **Auth Required** | Yes — admin only |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `role` | string | Filter by role: `receptionist`, `doctor` |
| `is_active` | boolean | Filter by active status (default: `true`) |
| `limit` | integer | Page size |
| `cursor` | string | Pagination cursor |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Ramesh Kumar",
      "phone": "9876543210",
      "role": "receptionist",
      "is_active": true,
      "assigned_departments": [
        { "id": "uuid", "name": "General Medicine" }
      ],
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

---

#### `POST /v1/staff`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/staff` |
| **Description** | Create a new staff account. Admin only. |
| **Auth Required** | Yes — admin only |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | string | Yes | 2–200 characters |
| `phone` | string | Yes | 10-digit mobile number |
| `email` | string | No | Valid email |
| `role` | string | Yes | `receptionist` or `doctor` |
| `password` | string | Yes | Min 8 chars, at least 1 digit |
| `dept_ids` | UUID[] | No | Array of department UUIDs to assign immediately |

**Response Body (201):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Dr. Anita Desai",
    "phone": "9876500001",
    "role": "doctor",
    "is_active": true,
    "hospital_id": "uuid",
    "assigned_departments": []
  }
}
```

**Response Codes:** `201 Created`, `409 DUPLICATE_PHONE`, `403 FORBIDDEN`, `422 VALIDATION_ERROR`

---

#### `GET /v1/staff/{staff_id}`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/staff/{staff_id}` |
| **Description** | Get full details of a specific staff account including department assignments. Admin only. |
| **Auth Required** | Yes — admin only; same hospital |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `PATCH /v1/staff/{staff_id}`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/staff/{staff_id}` |
| **Description** | Update staff name, role, or password. Admin only. |
| **Auth Required** | Yes — admin only |

**Request Body (all optional):**

| Field | Type | Validation |
|-------|------|-----------|
| `name` | string | 2–200 characters |
| `role` | string | `receptionist` or `doctor` |
| `new_password` | string | Min 8 chars; at least 1 digit |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `PATCH /v1/staff/{staff_id}/deactivate`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/staff/{staff_id}/deactivate` |
| **Description** | Deactivate a staff account. The staff member cannot log in after deactivation. Deactivation is reversible via the activate endpoint. |
| **Auth Required** | Yes — admin only |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `PATCH /v1/staff/{staff_id}/activate`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/staff/{staff_id}/activate` |
| **Description** | Reactivate a previously deactivated staff account. |
| **Auth Required** | Yes — admin only |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `POST /v1/staff/{staff_id}/department-assignments`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/staff/{staff_id}/department-assignments` |
| **Description** | Assign a staff member to a department. |
| **Auth Required** | Yes — admin only |

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `department_id` | UUID | Yes |

**Response Codes:** `201 Created`, `409 Conflict` (already assigned), `404 NOT_FOUND`

---

#### `DELETE /v1/staff/{staff_id}/department-assignments/{department_id}`

| Field | Value |
|-------|-------|
| **Method** | `DELETE` |
| **URL** | `/v1/staff/{staff_id}/department-assignments/{department_id}` |
| **Description** | Remove a staff member's assignment to a department. |
| **Auth Required** | Yes — admin only |

**Response Codes:** `204 No Content`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

### 7.4 Module: Departments

**Purpose:** Allows hospital administrators to create, configure, and manage OPD departments. Patients use the read endpoints to discover available departments and their queue status.

---

#### `GET /v1/hospitals/{hospital_id}/departments`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/hospitals/{hospital_id}/departments` |
| **Description** | List all departments for a hospital. Patients see only active departments with current queue status. Admin sees all including inactive. |
| **Auth Required** | Yes (any role) |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `is_active` | boolean | Filter by active status; defaults to `true` for patients, all for admin |
| `include_queue_status` | boolean | If `true`, includes live queue depth and session status (default: `true`) |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "General Medicine",
      "status": "ACTIVE",
      "is_active": true,
      "max_capacity": 80,
      "notification_threshold": 3,
      "session_start_time": "09:00",
      "session_end_time": "13:00",
      "queue_status": {
        "session_id": "uuid",
        "session_status": "OPEN",
        "current_depth": 24,
        "currently_serving_token": 12,
        "estimated_wait_for_new_arrival": "35-50 min"
      }
    }
  ]
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND` (hospital not found)

---

#### `POST /v1/hospitals/{hospital_id}/departments`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/hospitals/{hospital_id}/departments` |
| **Description** | Create a new OPD department. Admin only. |
| **Auth Required** | Yes — admin only |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | string | Yes | 2–200 chars; unique within hospital |
| `max_capacity` | integer | No | 1–500; default 100 |
| `session_start_time` | string | No | `HH:MM` format; default `"09:00"` |
| `session_end_time` | string | No | `HH:MM`; must be after start; default `"13:00"` |
| `notification_threshold` | integer | No | 1–10; default 3 |

**Response Codes:** `201 Created`, `409 DUPLICATE_DEPARTMENT_NAME`, `403 FORBIDDEN`, `422 VALIDATION_ERROR`

---

#### `PATCH /v1/hospitals/{hospital_id}/departments/{dept_id}`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/hospitals/{hospital_id}/departments/{dept_id}` |
| **Description** | Update department configuration. Admin only. Changes to session times take effect from the next session. |
| **Auth Required** | Yes — admin only |

**Request Body (all optional):**

| Field | Type |
|-------|------|
| `name` | string |
| `max_capacity` | integer |
| `session_start_time` | string |
| `session_end_time` | string |
| `notification_threshold` | integer |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `409 DUPLICATE_DEPARTMENT_NAME`, `403 FORBIDDEN`

---

#### `PATCH /v1/hospitals/{hospital_id}/departments/{dept_id}/deactivate`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/hospitals/{hospital_id}/departments/{dept_id}/deactivate` |
| **Description** | Deactivate a department. It will no longer appear in the patient-facing department list. Admin only. |
| **Auth Required** | Yes — admin only |

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `GET /v1/hospitals/{hospital_id}/departments/{dept_id}/qr-code`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/hospitals/{hospital_id}/departments/{dept_id}/qr-code` |
| **Description** | Get the QR code data for a department. Returns the encoded URL/payload that the QR code represents. The client renders this as an image. |
| **Auth Required** | Yes — admin only |

**Response Body (200):**
```json
{
  "data": {
    "department_id": "uuid",
    "department_name": "General Medicine",
    "qr_payload": "queuecare://join?hospital_id=uuid&dept_id=uuid",
    "qr_image_url": "https://api.queuecare.ai/v1/.../qr-code.png"
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

### 7.5 Module: Patients

**Purpose:** Manages patient profile data and provides a patient lookup endpoint for receptionist desk registration.

---

#### `GET /v1/patients/me`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/patients/me` |
| **Description** | Get the authenticated patient's own profile. |
| **Auth Required** | Yes — patient only |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Priya Sharma",
    "phone": "+919876543210",
    "age": 38,
    "gender": "female",
    "notifications_enabled": true,
    "preferred_language": "en",
    "active_tokens": [
      {
        "token_id": "uuid",
        "department_name": "General Medicine",
        "token_number": 22,
        "queue_position": 4,
        "status": "QUEUED"
      }
    ]
  }
}
```

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

#### `PATCH /v1/patients/me`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/patients/me` |
| **Description** | Update the authenticated patient's profile. |
| **Auth Required** | Yes — patient only |

**Request Body (all optional):**

| Field | Type | Validation |
|-------|------|-----------|
| `name` | string | 2–200 characters |
| `age` | integer | 0–120 |
| `gender` | string | `male`, `female`, `other`, `prefer_not_to_say` |
| `notifications_enabled` | boolean | — |
| `preferred_language` | string | `en` or `hi` |

**Response Codes:** `200 OK`, `422 VALIDATION_ERROR`

---

#### `DELETE /v1/patients/me`

| Field | Value |
|-------|-------|
| **Method** | `DELETE` |
| **URL** | `/v1/patients/me` |
| **Description** | Request account deletion. Sets `deleted_at` on the patient record. Data is fully anonymised within 7 days. Any active tokens are cancelled. |
| **Auth Required** | Yes — patient only |

**Response Body (200):**
```json
{ "data": { "message": "Your account will be deleted within 7 days." } }
```

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

#### `GET /v1/patients/lookup`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/patients/lookup` |
| **Description** | Look up a patient by phone number. Used by receptionists at the desk to find returning patients. Returns a minimal patient profile — no sensitive data. |
| **Auth Required** | Yes — receptionist or admin |

**Query Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `phone` | string | Yes |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Priya Sharma",
    "phone": "+919876543210",
    "age": 38,
    "gender": "female"
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

### 7.6 Module: Queue Management

**Purpose:** The core operational module. Covers session lifecycle management, token issuance and lifecycle, queue status retrieval, and priority management. This module is the most critical in the system — correctness, concurrency safety, and real-time responsiveness are paramount.

---

#### `POST /v1/departments/{dept_id}/sessions`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/departments/{dept_id}/sessions` |
| **Description** | Open a new daily session for a department. Token numbering resets to 1. Only one open session is permitted per department per calendar day. |
| **Auth Required** | Yes — receptionist (assigned to dept) or admin |

**Request Body:** None required. Session date defaults to `CURRENT_DATE`.

**Response Body (201):**
```json
{
  "data": {
    "id": "uuid",
    "department_id": "uuid",
    "session_date": "2026-08-01",
    "status": "OPEN",
    "token_sequence": 0,
    "opened_at": "2026-08-01T08:30:00Z"
  }
}
```

**Response Codes:** `201 Created`, `409 SESSION_ALREADY_OPEN`, `403 FORBIDDEN`, `403 WRONG_DEPARTMENT`

---

#### `GET /v1/departments/{dept_id}/sessions/today`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/departments/{dept_id}/sessions/today` |
| **Description** | Get the current day's session for a department, including live stats. Returns `404` if no session has been opened today. |
| **Auth Required** | Yes (any role with access to this hospital) |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "department_id": "uuid",
    "session_date": "2026-08-01",
    "status": "OPEN",
    "token_sequence": 38,
    "consult_count": 14,
    "avg_consult_duration_seconds": 480,
    "queue_depth": 24,
    "currently_serving_token": 15,
    "opened_at": "2026-08-01T09:00:00Z",
    "closed_at": null
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND` (no session today), `403 FORBIDDEN`

---

#### `PATCH /v1/sessions/{session_id}`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/sessions/{session_id}` |
| **Description** | Update session status: pause, resume, or close. Used by receptionists and admins to control queue flow. |
| **Auth Required** | Yes — receptionist (assigned dept) or admin |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `status` | string | Yes | `PAUSED`, `OPEN` (resume), or `CLOSED` |
| `pause_reason` | string | No | Required when `status = PAUSED`; max 500 chars |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "status": "PAUSED",
    "pause_reason": "Doctor temporarily unavailable",
    "updated_at": "2026-08-01T10:15:00Z"
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`, `400 INVALID_REQUEST` (invalid status transition)

**Valid Status Transitions:**

| From | To | Permitted By |
|------|-----|-------------|
| `OPEN` | `PAUSED` | Receptionist, Admin |
| `PAUSED` | `OPEN` | Receptionist, Admin |
| `OPEN` | `CLOSED` | Receptionist, Admin |
| `PAUSED` | `CLOSED` | Receptionist, Admin |
| `CLOSED` | any | ❌ Not permitted |

---

#### `POST /v1/sessions/{session_id}/tokens`

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/v1/sessions/{session_id}/tokens` |
| **Description** | Issue a new queue token. The most critical write endpoint in the system. Executed under a database-level lock to prevent duplicate token numbers under concurrent load. Can be called by the patient (self-join) or by a receptionist (desk registration). |
| **Auth Required** | Yes — patient or receptionist |

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `patient_id` | UUID | No | Provided by receptionist for desk registration; omitted for patient self-join (derived from auth token) |
| `priority` | string | No | Default `STANDARD`; receptionist can set: `SENIOR`, `PREGNANT`, `CHILD`, `EMERGENCY` |
| `is_guest` | boolean | No | `true` for patients without an account; requires `guest_name` |
| `guest_name` | string | Conditional | Required when `is_guest = true` |

**Response Body (201):**
```json
{
  "data": {
    "id": "uuid",
    "session_id": "uuid",
    "patient_id": "uuid",
    "token_number": 39,
    "priority": "STANDARD",
    "status": "QUEUED",
    "queue_position": 25,
    "estimated_wait_minutes": 38,
    "estimated_wait_range": "30-45 min",
    "issued_at": "2026-08-01T10:22:00Z",
    "session": {
      "department_name": "General Medicine",
      "hospital_name": "Apollo Hospital",
      "currently_serving_token": 14
    }
  }
}
```

**Response Codes:** `201 Created`, `409 QUEUE_FULL`, `409 QUEUE_PAUSED`, `409 QUEUE_CLOSED`, `409 DUPLICATE_TOKEN`, `400 SESSION_NOT_OPEN`, `403 FORBIDDEN`

**Validation Rules:**
- A patient can hold at most one active (`QUEUED` or `CALLED`) token per department per day
- `priority` other than `STANDARD` can only be set by a receptionist or admin
- `is_guest = true` bypasses the patient account requirement; `guest_name` is stored on the token directly

---

#### `GET /v1/sessions/{session_id}/tokens`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/sessions/{session_id}/tokens` |
| **Description** | Get the full ordered queue list for a session. Returns tokens in queue order (priority first, then by position). Used by receptionist and doctor dashboards. |
| **Auth Required** | Yes — receptionist, doctor (assigned dept), or admin |

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | `QUEUED,CALLED` | Comma-separated statuses to include |
| `limit` | integer | 100 | Page size |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "token_number": 16,
      "patient_name": "Anjali Mehta",
      "priority": "EMERGENCY",
      "status": "CALLED",
      "queue_position": 1,
      "estimated_wait_minutes": 0,
      "issued_at": "2026-08-01T09:45:00Z",
      "called_at": "2026-08-01T10:20:00Z"
    },
    {
      "id": "uuid",
      "token_number": 17,
      "patient_name": "Ravi Kumar",
      "priority": "SENIOR",
      "status": "QUEUED",
      "queue_position": 2,
      "estimated_wait_minutes": 8
    }
  ]
}
```

**Response Codes:** `200 OK`, `403 FORBIDDEN`, `404 NOT_FOUND`

---

#### `GET /v1/tokens/{token_id}`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/tokens/{token_id}` |
| **Description** | Get the current state of a specific token. Used by the patient's live queue screen. Returns the token's position, estimate, and session status. |
| **Auth Required** | Yes — patient (own token), receptionist, doctor, admin |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "token_number": 22,
    "priority": "STANDARD",
    "status": "QUEUED",
    "queue_position": 4,
    "patients_ahead": 3,
    "estimated_wait_minutes": 24,
    "estimated_wait_range": "20-30 min",
    "currently_serving_token": 18,
    "session_status": "OPEN",
    "department_name": "General Medicine",
    "hospital_name": "Apollo Hospital",
    "issued_at": "2026-08-01T09:30:00Z"
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN` (patient accessing another patient's token)

---

#### `PATCH /v1/tokens/{token_id}`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/tokens/{token_id}` |
| **Description** | Update a token's status or priority. This single endpoint handles: calling a patient (doctor/receptionist), marking served (doctor/receptionist), marking no-show (doctor/receptionist), cancelling (patient or receptionist), and changing priority (receptionist). |
| **Auth Required** | Yes — role and permitted action varies by field |

**Request Body:**

| Field | Type | Who Can Set | Valid Values |
|-------|------|------------|-------------|
| `status` | string | See table below | `CALLED`, `SERVED`, `NO_SHOW`, `CANCELLED` |
| `priority` | string | Receptionist, Admin | `STANDARD`, `SENIOR`, `PREGNANT`, `CHILD`, `EMERGENCY` |

**Status Transition Permissions:**

| New Status | Who Can Set | Business Rule |
|-----------|------------|--------------|
| `CALLED` | Receptionist, Doctor | Token must be in `QUEUED` state |
| `SERVED` | Receptionist, Doctor | Token must be in `CALLED` state |
| `NO_SHOW` | Receptionist, Doctor | Token must be in `CALLED` state |
| `CANCELLED` | Patient (own token), Receptionist, Admin | Token must be in `QUEUED` state |

**Response Body (200):**
```json
{
  "data": {
    "id": "uuid",
    "token_number": 22,
    "status": "SERVED",
    "served_at": "2026-08-01T10:45:00Z",
    "actual_wait_minutes": 75
  }
}
```

**Response Codes:** `200 OK`, `400 INVALID_REQUEST` (invalid state transition), `403 FORBIDDEN`, `404 NOT_FOUND`

---

#### `PATCH /v1/sessions/{session_id}/reorder`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/sessions/{session_id}/reorder` |
| **Description** | Manually reorder patients in the queue. Only doctors can reorder. Each reorder creates an audit log entry. |
| **Auth Required** | Yes — doctor (assigned dept) only |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token_id` | UUID | Yes | The token to move |
| `new_position` | integer | Yes | The target queue position (1-indexed) |

**Response Body (200):**
```json
{
  "data": {
    "message": "Queue reordered successfully.",
    "affected_tokens": 5
  }
}
```

**Response Codes:** `200 OK`, `400 INVALID_REQUEST` (invalid position), `403 FORBIDDEN`, `404 NOT_FOUND`

---

#### `GET /v1/departments/{dept_id}/overview`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/departments/{dept_id}/overview` |
| **Description** | Get a lightweight real-time summary of a department's current queue status. Used by the admin live overview dashboard polling. |
| **Auth Required** | Yes — admin |

**Response Body (200):**
```json
{
  "data": {
    "department_id": "uuid",
    "department_name": "General Medicine",
    "session_status": "OPEN",
    "queue_depth": 31,
    "currently_serving_token": 17,
    "patients_served_today": 16,
    "avg_wait_minutes_today": 42,
    "is_congested": true
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

#### `GET /v1/hospitals/{hospital_id}/overview`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/hospitals/{hospital_id}/overview` |
| **Description** | Get the live multi-department queue overview for the admin dashboard. Returns a summary card for every active department. |
| **Auth Required** | Yes — admin |

**Response Body (200):**
```json
{
  "data": {
    "hospital_id": "uuid",
    "departments": [
      {
        "department_id": "uuid",
        "name": "General Medicine",
        "session_status": "OPEN",
        "queue_depth": 31,
        "currently_serving_token": 17,
        "is_congested": true
      },
      {
        "department_id": "uuid",
        "name": "Orthopedics",
        "session_status": "PAUSED",
        "queue_depth": 12,
        "currently_serving_token": 7,
        "is_congested": false
      }
    ],
    "summary": {
      "total_tokens_today": 143,
      "total_served_today": 112,
      "avg_wait_minutes": 39
    }
  }
}
```

**Response Codes:** `200 OK`, `403 FORBIDDEN`, `404 NOT_FOUND`

---

### 7.7 Module: Notifications

**Purpose:** Provides patients access to their notification history. Notification dispatch is handled internally by the backend (fire-and-forget) — there are no endpoints for sending notifications directly.

---

#### `GET /v1/notifications`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/notifications` |
| **Description** | Get the authenticated patient's notification history, most recent first. Used by the patient's notification centre screen. |
| **Auth Required** | Yes — patient only |

**Query Parameters:**

| Parameter | Type | Default |
|-----------|------|---------|
| `limit` | integer | 20 |
| `cursor` | string | — |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "notification_type": "CALLED",
      "delivery_status": "DELIVERED",
      "payload": {
        "token_number": 22,
        "department_name": "General Medicine",
        "message": "Please proceed to the consultation room now."
      },
      "sent_at": "2026-08-01T10:44:00Z"
    },
    {
      "id": "uuid",
      "notification_type": "APPROACHING",
      "delivery_status": "DELIVERED",
      "payload": {
        "token_number": 22,
        "department_name": "General Medicine",
        "message": "Your turn is approaching. Please return to the waiting area."
      },
      "sent_at": "2026-08-01T10:30:00Z"
    }
  ],
  "meta": { "pagination": { "total": 8, "has_next": false } }
}
```

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

#### `PATCH /v1/notifications/read-all`

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `/v1/notifications/read-all` |
| **Description** | Mark all of the patient's unread notifications as read. |
| **Auth Required** | Yes — patient only |

**Response Codes:** `200 OK`, `401 UNAUTHORIZED`

---

### 7.8 Module: AI Predictions

**Purpose:** Exposes the wait-time prediction engine. Predictions are automatically generated on token issuance and included in the token response. This module provides endpoints for retrieving stored predictions and requesting a fresh prediction for a queued token.

---

#### `GET /v1/tokens/{token_id}/prediction`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/tokens/{token_id}/prediction` |
| **Description** | Get the most recent wait-time prediction for a queued token. Returns `null` if fewer than 5 consultations have completed in the session (cold-start state). |
| **Auth Required** | Yes — patient (own token), receptionist, doctor, admin |

**Response Body (200):**
```json
{
  "data": {
    "token_id": "uuid",
    "is_available": true,
    "predicted_minutes": 28.5,
    "lower_bound": 23.0,
    "upper_bound": 34.0,
    "display_range": "23-34 min",
    "label": "approximately",
    "queue_position_at_prediction": 4,
    "avg_duration_at_prediction": 8.6,
    "predicted_at": "2026-08-01T10:22:00Z"
  }
}
```

**Cold-Start Response (200, not enough data):**
```json
{
  "data": {
    "token_id": "uuid",
    "is_available": false,
    "message": "Estimate not yet available — check back shortly.",
    "predicted_at": null
  }
}
```

**Response Codes:** `200 OK`, `404 NOT_FOUND`, `403 FORBIDDEN`

---

### 7.9 Module: Reports and Analytics

**Purpose:** Provides hospital administrators with session analytics — current session summary and historical trends. All analytics endpoints are admin-only and scoped to the authenticated administrator's hospital.

---

#### `GET /v1/analytics/sessions/today`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/analytics/sessions/today` |
| **Description** | Get today's session summary across all departments for the administrator's hospital. |
| **Auth Required** | Yes — admin only |

**Response Body (200):**
```json
{
  "data": {
    "hospital_id": "uuid",
    "date": "2026-08-01",
    "departments": [
      {
        "department_id": "uuid",
        "department_name": "General Medicine",
        "tokens_issued": 38,
        "tokens_served": 14,
        "no_shows": 2,
        "cancellations": 1,
        "avg_wait_minutes": 42,
        "peak_queue_depth": 31,
        "session_status": "OPEN"
      }
    ],
    "totals": {
      "tokens_issued": 143,
      "tokens_served": 112,
      "no_shows": 9,
      "avg_wait_minutes": 39
    }
  }
}
```

**Response Codes:** `200 OK`, `403 FORBIDDEN`

---

#### `GET /v1/analytics/sessions`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/analytics/sessions` |
| **Description** | Get historical session analytics for a date range. Returns daily summaries per department. |
| **Auth Required** | Yes — admin only |

**Query Parameters:**

| Parameter | Type | Required | Validation |
|-----------|------|----------|-----------|
| `start_date` | string | Yes | `YYYY-MM-DD`; max 30 days before `end_date` |
| `end_date` | string | Yes | `YYYY-MM-DD`; not in the future |
| `department_id` | UUID | No | Filter by specific department |
| `limit` | integer | No | Page size; default 20 |

**Response Body (200):**
```json
{
  "data": [
    {
      "session_date": "2026-08-01",
      "department_id": "uuid",
      "department_name": "General Medicine",
      "tokens_issued": 127,
      "tokens_served": 115,
      "no_shows": 8,
      "avg_wait_minutes": 42,
      "peak_queue_depth": 51
    }
  ],
  "meta": { "pagination": { "total": 60, "has_next": true } }
}
```

**Response Codes:** `200 OK`, `400 INVALID_REQUEST` (date range > 30 days), `403 FORBIDDEN`

---

#### `GET /v1/analytics/sessions/{session_id}/export`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/analytics/sessions/{session_id}/export` |
| **Description** | Export a session's complete token data as a CSV file. The response is `text/csv`. |
| **Auth Required** | Yes — admin only |

**Response:** `Content-Type: text/csv` with filename header `Content-Disposition: attachment; filename="session-{date}-{dept}.csv"`

**CSV Columns:** `token_number`, `patient_name`, `department`, `priority`, `status`, `issued_at`, `called_at`, `served_at`, `actual_wait_minutes`

**Response Codes:** `200 OK` (CSV file), `404 NOT_FOUND`, `403 FORBIDDEN`

---

### 7.10 Module: Audit Log

**Purpose:** Provides hospital administrators with read-only access to the immutable audit log for their hospital.

---

#### `GET /v1/audit-logs`

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/v1/audit-logs` |
| **Description** | Get paginated audit log entries for the administrator's hospital. |
| **Auth Required** | Yes — admin only |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | string | `YYYY-MM-DD` |
| `end_date` | string | `YYYY-MM-DD` |
| `department_id` | UUID | Filter by department |
| `action_type` | string | Filter by action type (e.g., `TOKEN_ISSUED`, `QUEUE_PAUSED`) |
| `actor_role` | string | Filter by actor role |
| `limit` | integer | Default 25; max 100 |
| `cursor` | string | Pagination cursor |

**Response Body (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "actor_name": "Ramesh Kumar",
      "actor_role": "receptionist",
      "action_type": "QUEUE_PAUSED",
      "target_type": "session",
      "target_id": "uuid",
      "details": {
        "department_name": "General Medicine",
        "reason": "Doctor temporarily unavailable"
      },
      "created_at": "2026-08-01T10:15:00Z"
    }
  ],
  "meta": { "pagination": { "total": 312, "has_next": true } }
}
```

**Response Codes:** `200 OK`, `403 FORBIDDEN`

---

### 7.11 Module: WebSocket (Real-Time)

**Purpose:** The WebSocket endpoint is not a REST endpoint — it is a persistent connection for real-time queue state updates. Documented here for completeness.

---

#### `WS /v1/ws/queue/{dept_id}`

| Field | Value |
|-------|-------|
| **Protocol** | WebSocket (`wss://`) |
| **URL** | `/v1/ws/queue/{dept_id}` |
| **Description** | Subscribe to real-time queue state updates for a department. The server broadcasts a full queue state snapshot to all subscribers whenever any token status changes, priority is updated, or session status changes. |
| **Auth Required** | Yes — Firebase ID Token passed as query parameter: `?token=<firebase_id_token>` |

**Server Push Message Format:**
```json
{
  "type": "QUEUE_UPDATE",
  "dept_id": "uuid",
  "session_status": "OPEN",
  "queue_depth": 24,
  "currently_serving_token": 15,
  "tokens": [
    { "id": "uuid", "token_number": 16, "queue_position": 1, "priority": "EMERGENCY", "status": "CALLED" },
    { "id": "uuid", "token_number": 17, "queue_position": 2, "priority": "STANDARD", "status": "QUEUED" }
  ],
  "timestamp": "2026-08-01T10:45:00Z"
}
```

**Connection Lifecycle:**
- Client connects with a valid Firebase token
- Server verifies the token and adds the client to the `dept_id` channel
- Server sends an initial state snapshot immediately on connection
- Server broadcasts updates on any queue state change for that department
- Client reconnects automatically with exponential backoff on disconnection

---

## 8. API Security

### 8.1 Transport Security

All API communication occurs over **HTTPS with TLS 1.2 minimum**. The NGINX reverse proxy:
- Terminates TLS — the FastAPI application receives plain HTTP internally
- Redirects all `http://` requests to `https://`
- Sets `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS)
- Enforces TLS 1.2+ — older versions are rejected

WebSocket connections use `wss://` — TLS-encrypted WebSocket via NGINX proxy pass.

---

### 8.2 CORS Configuration

The API enforces a strict Cross-Origin Resource Sharing (CORS) policy. Only explicitly configured frontend origins are allowed to call the API.

| Setting | Value |
|---------|-------|
| `Access-Control-Allow-Origin` | Explicit allowlist (e.g., `https://app.queuecare.ai`, `https://staging.queuecare.ai`) |
| `Access-Control-Allow-Methods` | `GET, POST, PUT, PATCH, DELETE, OPTIONS` |
| `Access-Control-Allow-Headers` | `Authorization, Content-Type, X-Trace-ID` |
| `Access-Control-Max-Age` | `86400` (24 hours — preflight cache) |
| Wildcard `*` origins | Never permitted |

---

### 8.3 Request Validation

All request bodies are validated by **Pydantic v2 models** before any business logic executes:
- Extra fields beyond the defined schema are rejected (`extra = 'forbid'` in Pydantic models)
- String fields have maximum length constraints enforced at the model level
- Numeric fields have range constraints enforced
- Status values are validated against explicit allowed sets
- UUID fields are validated as proper UUIDs — malformed strings return `400`

---

### 8.4 SQL Injection Prevention

- All database queries use SQLAlchemy ORM parameterised statements
- No raw string concatenation in any database query
- No direct SQL execution in application code except in reviewed Alembic migration scripts

---

### 8.5 Sensitive Data Exclusions

The following data is **never** included in any API response:
- `staff_accounts.password_hash` — excluded from all serialisation models
- Patient phone numbers in analytics or audit log responses
- Firebase Admin SDK private key or credentials
- Internal database UUIDs that are not resource identifiers (e.g., internal audit system IDs)
- Stack traces — unhandled exceptions return a structured `INTERNAL_ERROR` response with a `request_id` for log correlation; never a raw stack trace

---

### 8.6 Authentication Token Security

| Measure | Implementation |
|---------|---------------|
| Token verification | Firebase Admin SDK validates signature, expiry, and issuer on every request |
| Token expiry | Firebase ID tokens expire after 1 hour; auto-refresh via Firebase SDK |
| Token revocation | Firebase Auth supports token revocation; admin can invalidate a staff member's active sessions |
| Hospital scope | `hospital_id` is extracted from the token claim — never from the request body |
| No token storage | The backend never stores Firebase ID tokens; they are verified in-memory and discarded |

---

### 8.7 Idempotency for Critical Operations

Token issuance (`POST /v1/sessions/{session_id}/tokens`) supports an optional `Idempotency-Key` request header. If a request is retried with the same key within 24 hours, the server returns the original response without issuing a duplicate token. This protects against double-issuance caused by network retries.

| Header | Value |
|--------|-------|
| `Idempotency-Key` | Client-generated UUID; unique per request intent |

---

## 9. Rate Limiting Strategy

### 9.1 Rate Limiting Approach

Rate limiting is applied at the NGINX layer before requests reach the FastAPI application. Limits are applied per IP address (unauthenticated requests) and per authenticated user UID (authenticated requests).

---

### 9.2 Rate Limits by Endpoint Category

| Category | Endpoints | Limit | Window | Scope |
|----------|----------|-------|--------|-------|
| **Authentication** | `POST /auth/staff/login`, password reset | 10 requests | 15 minutes | Per IP |
| **OTP verification** | Firebase OTP (client-side) | Managed by Firebase | — | Firebase-enforced |
| **Patient read** | `GET /tokens/{id}`, `GET /patients/me` | 120 requests | 1 minute | Per authenticated UID |
| **Token issuance** | `POST /sessions/{id}/tokens` | 5 requests | 1 minute | Per authenticated UID |
| **Queue operations** | `PATCH /tokens/{id}`, `PATCH /sessions/{id}` | 60 requests | 1 minute | Per authenticated UID |
| **Admin reads** | `GET /analytics/sessions`, `GET /audit-logs` | 30 requests | 1 minute | Per authenticated UID |
| **CSV export** | `GET /analytics/sessions/{id}/export` | 5 requests | 1 minute | Per authenticated UID |
| **General API** | All other endpoints | 300 requests | 1 minute | Per authenticated UID |

---

### 9.3 Rate Limit Response

When the rate limit is exceeded, the API returns:

```
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1754044860
Retry-After: 47
```

```json
{
  "data": null,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait 47 seconds before retrying.",
    "details": { "retry_after_seconds": 47 }
  }
}
```

---

### 9.4 Staff Dashboard Exemptions

The staff dashboard (receptionist and doctor) operates under higher limits because:
- A receptionist may issue 130 tokens in a 4-hour period (approximately 1 every 2 minutes)
- A doctor may call `PATCH /tokens/{id}` 40–50 times per session

These are well within the 60-requests-per-minute operational limit. No staff dashboard exemptions are needed at MVP scale.

---

## 10. API Workflow Examples

These end-to-end examples show how multiple API calls chain together to complete real operational scenarios. They are intended as integration guides for frontend developers.

---

### 10.1 Workflow: Patient Joins a Queue via QR Code

**Trigger:** Patient scans a department QR code in the hospital waiting area.

**Step 1:** QR code decodes to: `queuecare://join?hospital_id=H1&dept_id=D1`

**Step 2:** Patient app checks if the user is authenticated.
- If not: executes Firebase OTP login, then calls `POST /v1/auth/patient/register`

**Step 3:** App calls `GET /v1/hospitals/H1/departments` to verify the department is active and show the confirmation screen with current queue depth and estimate.

**Step 4:** Patient confirms. App calls:
```
POST /v1/sessions/{session_id}/tokens
Authorization: Bearer <firebase_id_token>
Body: {}   ← patient_id derived from auth token
```

**Step 5:** Response: `201 Created` with token object including `token_number`, `queue_position`, and `estimated_wait_range`.

**Step 6:** App renders the Queue Status screen and connects to:
```
wss://api.queuecare.ai/v1/ws/queue/{dept_id}?token=<firebase_id_token>
```

**Step 7:** Server pushes queue updates in real time. Patient's position decrements automatically.

---

### 10.2 Workflow: Receptionist Issues a Token at the Desk

**Trigger:** Patient arrives at the registration desk without using the app.

**Step 1:** Receptionist opens the receptionist dashboard. App calls:
```
GET /v1/departments/{dept_id}/sessions/today
```
to confirm the session is open.

**Step 2:** Receptionist types the patient's phone number. App calls:
```
GET /v1/patients/lookup?phone=9876543210
```

**Step 3a:** If patient found — app shows the patient record. Receptionist confirms.

**Step 3b:** If not found — receptionist registers the patient. App calls:
```
POST /v1/auth/patient/register
Body: { "name": "...", "age": 62, "gender": "male" }
```

**Step 4:** Receptionist selects "Senior Citizen" priority. App calls:
```
POST /v1/sessions/{session_id}/tokens
Body: { "patient_id": "uuid", "priority": "SENIOR" }
```

**Step 5:** Response: `201 Created`. Token appears in the live queue list via WebSocket broadcast.

**Step 6:** Session summary counter updates via WebSocket — Queued count increments by 1.

---

### 10.3 Workflow: Doctor Calls Next Patient and Marks Consultation Complete

**Trigger:** Doctor is ready to see the next patient after finishing the previous consultation.

**Step 1:** Doctor's dashboard connects to:
```
wss://api.queuecare.ai/v1/ws/queue/{dept_id}?token=<firebase_id_token>
```
Queue list with priority ordering is displayed.

**Step 2:** Doctor clicks "Call Next Patient". App calls:
```
PATCH /v1/tokens/{next_token_id}
Body: { "status": "CALLED" }
```

**Step 3:** Backend updates token status, logs audit entry, sends FCM notification to patient, broadcasts WebSocket update to all subscribers.

**Step 4:** Doctor conducts consultation. Doctor clicks "Mark Complete". App calls:
```
PATCH /v1/tokens/{token_id}
Body: { "status": "SERVED" }
```

**Step 5:** Backend updates token, increments `sessions.consult_count`, updates rolling average, recalculates estimates for all remaining queued patients, broadcasts WebSocket update.

---

### 10.4 Workflow: Administrator Pauses and Resumes a Department Queue

**Trigger:** Doctor is delayed. Administrator sees congestion on the overview dashboard.

**Step 1:** Admin dashboard polls:
```
GET /v1/hospitals/{hospital_id}/overview
```
Overview shows General Medicine: queue depth 42, `is_congested: true`.

**Step 2:** Admin clicks Pause on the General Medicine card. App calls:
```
PATCH /v1/sessions/{session_id}
Body: { "status": "PAUSED", "pause_reason": "Doctor temporarily unavailable" }
```

**Step 3:** Backend updates session status, sends bulk FCM notifications to all queued patients, broadcasts WebSocket update. All patient screens show "Queue Paused".

**Step 4:** When doctor returns, admin clicks Resume. App calls:
```
PATCH /v1/sessions/{session_id}
Body: { "status": "OPEN" }
```

**Step 5:** Queue resumes. All patients notified. WebSocket broadcasts "Queue Active" status.

---

### 10.5 Workflow: Administrator Exports Session Report

**Step 1:** Admin navigates to Analytics. App calls:
```
GET /v1/analytics/sessions/today
```
to display today's summary.

**Step 2:** Admin clicks Export. App calls:
```
GET /v1/analytics/sessions/{session_id}/export
```

**Step 3:** Browser receives a CSV download response. File contains per-token data for the selected session. No patient PII (phone, age, gender) is included.

---

## 11. Future API Extensions

This section documents planned API additions for future product releases. These endpoints are not part of the v1 API but are listed here so that v1 design decisions do not inadvertently block them.

---

### 11.1 Phase 2 — SMS Notification Preferences

```
PATCH /v1/patients/me
```
Extended to accept `sms_enabled: boolean` and `alternate_phone: string` when SMS notification infrastructure is added.

No new endpoint required — this is an additive change to the existing patient profile update endpoint.

---

### 11.2 Phase 2 — ABDM / ABHA Check-in

```
POST /v1/auth/patient/abha-checkin
```

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **Description** | Authenticate a patient by scanning their ABHA (Ayushman Bharat Health Account) QR code. Exchanges the ABHA token for a QueueCare patient identity. |
| **Auth Required** | No (or receptionist) |

**Request Body:**
```json
{ "abha_token": "<scanned ABHA QR payload>" }
```

---

### 11.3 Phase 2 — Doctor Session Analytics

```
GET /v1/staff/{staff_id}/session-analytics
```

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **Description** | Get session pace analytics for a specific doctor: average consultation duration, patients seen per session, trend over date range. |
| **Auth Required** | Yes — admin only |

---

### 11.4 Phase 3 — Multi-Department Patient Journey

```
POST /v1/visits
GET /v1/visits/{visit_id}
```

A **visit** groups a patient's sequential tokens across multiple departments in one day (e.g., consultation → lab → pharmacy). These endpoints manage visit creation and multi-stage tracking.

---

### 11.5 Phase 3 — Appointment Booking Integration

```
POST /v1/departments/{dept_id}/appointments
GET  /v1/departments/{dept_id}/appointments
POST /v1/appointments/{id}/convert-to-token
```

Allows pre-booking appointment slots that convert to queue tokens at the scheduled time. The `/convert-to-token` endpoint is called either automatically by a scheduled job or manually by a receptionist.

---

### 11.6 Phase 3 — Self-Service Hospital Onboarding

```
POST /v1/onboarding/hospitals
```

A new hospital can register on the platform without manual involvement from the QueueCare AI team. Replaces the current platform super-admin manual account creation process.

---

### 11.7 Phase 4 — SLA Performance Benchmarks

```
POST   /v1/hospitals/{hospital_id}/sla-config
GET    /v1/hospitals/{hospital_id}/sla-config
PATCH  /v1/hospitals/{hospital_id}/sla-config
```

Allows administrators to configure target maximum average wait times per department. The analytics API is extended to include SLA compliance indicators (percentage of sessions meeting the target).

---

### 11.8 Phase 4 — Webhook Subscriptions

```
POST   /v1/webhooks
GET    /v1/webhooks
DELETE /v1/webhooks/{webhook_id}
```

Allows hospitals to subscribe to real-time event webhooks (e.g., `token.served`, `session.closed`) for integration with their existing HMS systems. Follows the standard webhook pattern: the server sends a signed POST request to the registered URL on each event.

---

### 11.9 API v2 Candidates

The following changes would require a `/v2/` version increment when implemented:

| Change | Reason |
|--------|--------|
| Split `PATCH /tokens/{id}` into separate `PATCH /tokens/{id}/status` and `PATCH /tokens/{id}/priority` | Cleaner separation of concerns; eliminates the mixed-field ambiguity in v1 |
| Restructure notification payload to use `data.message` instead of `payload.message` | Normalises the response schema to match the standard envelope |
| Move `dept_ids` claim from Firebase custom token to a separate `GET /v1/staff/me/assignments` endpoint | Reduces token size; supports dynamic assignment changes without re-authentication |

---

## 12. Conclusion

### 12.1 What This Document Defines

`12_API_Design.md` is the complete REST API specification for QueueCare AI v1. It defines:

| Area | Content |
|------|---------|
| Design principles | Resource-oriented URLs, HTTP method semantics, pagination, response codes |
| Authentication | Firebase OTP (patient), credential + custom token (staff), RBAC permission matrix |
| Versioning | URI path versioning (`/v1/`), deprecation policy, breaking vs non-breaking change rules |
| Request/Response format | Standard JSON envelope, paginated list format, standard headers |
| Error handling | 25-code error registry, validation error format, structured error envelope |
| 11 API Modules | 50+ endpoint specifications with method, URL, auth, request body, response body, codes, and validation rules |
| Security | TLS, CORS, input validation, SQL injection prevention, idempotency |
| Rate limiting | Per-category limits table, 429 response format |
| Workflow examples | 5 complete end-to-end integration scenarios |
| Future extensions | 9 planned v2 / Phase 2-4 additions |

---

### 12.2 Endpoint Summary

| Module | Endpoints |
|--------|----------|
| Authentication | 5 |
| Hospitals | 3 |
| Staff Accounts | 8 |
| Departments | 5 |
| Patients | 4 |
| Queue Management | 10 |
| Notifications | 2 |
| AI Predictions | 1 |
| Reports & Analytics | 3 |
| Audit Log | 1 |
| WebSocket | 1 |
| **Total** | **43** |

---

### 12.3 How to Use This Document

**For backend developers:** Every endpoint specification defines the complete contract — method, URL, auth requirement, request schema, response schema, and all error conditions. Implement exactly to spec. Document deviations in a changelog.

**For frontend developers:** Use the workflow examples in Section 10 as integration guides. Use the error code registry in Section 6 to handle specific error conditions in the UI. Every `error.code` maps to a specific user-facing error screen defined in `09_UI_UX_Design.md`.

**For QA engineers:** Each endpoint's "Response Codes" and "Validation Rules" sections define testable acceptance criteria. Every listed error code must have a corresponding test case.

**For technical reviewers:** The design decisions — resource orientation, RBAC via Firebase claims, hospital_id from token not request, idempotency key, fire-and-forget notifications — are each justified in the sections where they appear or in the system architecture document (`10_System_Architecture.md`).

---

### 12.4 API Documentation (Swagger / ReDoc)

FastAPI generates interactive API documentation automatically from the Python type annotations and Pydantic models:

| Tool | URL | Description |
|------|-----|-------------|
| Swagger UI | `https://api.queuecare.ai/docs` | Interactive testing interface |
| ReDoc | `https://api.queuecare.ai/redoc` | Clean reference documentation |
| OpenAPI JSON | `https://api.queuecare.ai/openapi.json` | Machine-readable schema for client generation |

These auto-generated docs supplement (not replace) this document — they provide parameter-level detail; this document provides the design rationale, workflow context, and security requirements that cannot be expressed in an OpenAPI schema alone.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 (Draft) | 2026-08-01 | Ram Chauhan | Initial document — all 12 sections complete, 43 endpoints specified |

---

*Pending approval. Next document in sequence: `13_Development_Plan.md`*
