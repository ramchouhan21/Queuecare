# QueueCare AI — User Stories

**Product:** QueueCare AI — AI-Based Smart Hospital Queue Management and Wait Time Prediction System
**Document ID:** 07
**Version:** 1.0 (Draft)
**Status:** Pending Approval
**Last Updated:** August 1, 2026
**Author:** Ram Chauhan
**Related Documents:** `05_Product_Requirements_Document.md`, `06_User_Personas.md`

---

## Table of Contents

1. [About This Document](#1-about-this-document)
2. [Story Format and Conventions](#2-story-format-and-conventions)
3. [MoSCoW Priority Legend](#3-moscow-priority-legend)
4. [User Roles Quick Reference](#4-user-roles-quick-reference)
5. [Module 1 — Authentication](#5-module-1--authentication)
6. [Module 2 — Profile Management](#6-module-2--profile-management)
7. [Module 3 — Hospital and Department Management](#7-module-3--hospital-and-department-management)
8. [Module 4 — Queue Management](#8-module-4--queue-management)
9. [Module 5 — Dashboard](#9-module-5--dashboard)
10. [Module 6 — AI Wait-Time Prediction](#10-module-6--ai-wait-time-prediction)
11. [Module 7 — Notifications](#11-module-7--notifications)
12. [Module 8 — Reports and Analytics](#12-module-8--reports-and-analytics)
13. [Module 9 — User and Role Management](#13-module-9--user-and-role-management)
14. [Future Enhancements — Won't Have (MVP)](#14-future-enhancements--wont-have-mvp)
15. [User Story Summary Table](#15-user-story-summary-table)
16. [Traceability Matrix](#16-traceability-matrix)
17. [Document History](#17-document-history)

---

## 1. About This Document

This document defines all user stories for QueueCare AI. User stories describe the product from the perspective of the people who use it — capturing what each user wants to accomplish and why it matters to them.

Stories are the primary tool for communicating requirements between stakeholders and development teams in an Agile product environment. Each story in this document is:

- Written from the perspective of a named user role
- Grounded in the goals and pain points defined in `06_User_Personas.md`
- Traceable to functional requirements in `05_Product_Requirements_Document.md`
- Accompanied by testable acceptance criteria
- Assigned a MoSCoW priority reflecting the MVP delivery plan

This document covers **155 user stories** across **9 modules** and **4 future enhancement stories**.

Stories are grouped by product module, not by user role, because the most important design decisions happen at module boundaries — where multiple roles interact with the same system.

---

## 2. Story Format and Conventions

### Standard Story Format

Every user story follows this format:

> **As a** `[user role]`, **I want** `[goal]` **so that** `[benefit / reason]`.

### Story ID Convention

Each story is assigned a unique ID in the format `US-NNN` (e.g., US-001). IDs are sequential within the document and are used for traceability.

### Acceptance Criteria Format

Each story includes one or more acceptance criteria (AC) written as testable **Given / When / Then** or direct **pass/fail** statements. Acceptance criteria define the specific conditions that must be true for the story to be considered done.

### Story Fields

Each story entry includes:

| Field | Description |
|-------|-------------|
| **ID** | Unique story identifier |
| **Role** | The user role this story belongs to |
| **Story** | The user story statement |
| **Priority** | MoSCoW classification |
| **Linked FR** | Related functional requirement(s) from the PRD |
| **Acceptance Criteria** | Testable conditions for story completion |

---

## 3. MoSCoW Priority Legend

| Priority | Label | Meaning |
|----------|-------|---------|
| 🔴 **Must Have** | MVP — non-negotiable | Core functionality required for the product to work. Absence makes the MVP non-deliverable. |
| 🟡 **Should Have** | MVP — high value | Important but not critical for day-one operation. Included in MVP if time permits. |
| 🟢 **Could Have** | MVP — nice to have | Adds meaningful value but can be deferred without breaking core workflows. |
| ⚪ **Won't Have** | Not in MVP | Explicitly deferred to a future release. Listed here for completeness and future planning. |

---

## 4. User Roles Quick Reference

| Role | Description | Primary Interface |
|------|-------------|-------------------|
| **Patient** | Walk-in outpatient visiting the hospital for consultation | Mobile app (web or native) |
| **Receptionist** | Hospital front-desk staff managing the OPD queue | Staff web dashboard |
| **Doctor** | OPD consulting doctor managing their patient queue | Staff web dashboard |
| **Hospital Administrator** | Operations manager configuring and monitoring the hospital | Staff web dashboard |

---

---

## 5. Module 1 — Authentication

This module covers all user stories related to account creation, login, logout, session management, and account security for all four roles.

---

### US-001 — Patient Account Registration

| Field | Detail |
|-------|--------|
| **ID** | US-001 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-001, FR-002 |

**Story:**
> As a patient, I want to create an account using my mobile phone number so that I can join queues and track my position without visiting the reception desk every time.

**Acceptance Criteria:**

- **AC-001a:** Given I am a new user, when I enter a valid 10-digit Indian mobile number and submit, then the system sends an OTP to that number within 30 seconds.
- **AC-001b:** Given I enter the correct OTP, when I submit it before it expires, then my account is created and I am logged in immediately.
- **AC-001c:** Given I enter an incorrect OTP, when I submit it, then the system displays a clear error message and does not create an account. I am offered a resend option.
- **AC-001d:** Given the OTP has been unused for more than 5 minutes, when I attempt to use it, then the system rejects it, shows an expiry message, and offers me a new OTP without re-entering my phone number.
- **AC-001e:** Given I attempt to register with a phone number that already has an account, when I submit, then the system informs me the number is registered and directs me to the login flow instead.

---

### US-002 — Patient Login with OTP

| Field | Detail |
|-------|--------|
| **ID** | US-002 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-003, FR-004 |

**Story:**
> As a registered patient, I want to log in using my phone number and an OTP so that I can access my queue status securely without remembering a password.

**Acceptance Criteria:**

- **AC-002a:** Given I am a registered patient, when I enter my phone number and request an OTP, then I receive the OTP within 30 seconds and can use it to log in.
- **AC-002b:** Given I am logged in, when I close and reopen the app within 24 hours of last activity, then I remain logged in without needing to re-authenticate.
- **AC-002c:** Given my session has been inactive for more than 24 hours, when I attempt any action, then the system redirects me to the login screen.

---

### US-003 — Patient Logout

| Field | Detail |
|-------|--------|
| **ID** | US-003 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-006 |

**Story:**
> As a patient, I want to be able to log out of my account from any screen so that I can protect my personal information when I hand my phone to someone else.

**Acceptance Criteria:**

- **AC-003a:** Given I am logged in, when I select the logout option, then my session is terminated immediately and I am redirected to the login screen.
- **AC-003b:** Given I have logged out, when I press the back button on my device, then the app does not return me to any authenticated screen.

---

### US-004 — Staff Login with Credentials

| Field | Detail |
|-------|--------|
| **ID** | US-004 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-097, FR-098, FR-100 |

**Story:**
> As a hospital staff member (receptionist, doctor, or administrator), I want to log in using my credentials so that I can access the tools specific to my role without seeing functions that do not apply to me.

**Acceptance Criteria:**

- **AC-004a:** Given I am a staff member with an active account, when I enter valid credentials and submit, then I am logged in and taken directly to my role-specific dashboard.
- **AC-004b:** Given I am a receptionist, when I log in, then I see only the receptionist dashboard — not the doctor or administrator dashboards.
- **AC-004c:** Given I am a doctor, when I log in, then I see only the doctor dashboard for my assigned department.
- **AC-004d:** Given I am an administrator, when I log in, then I see the full administrator dashboard for my hospital only.
- **AC-004e:** The logged-in user's name and role are visible on every dashboard screen at all times.

---

### US-005 — Staff Session Expiry

| Field | Detail |
|-------|--------|
| **ID** | US-005 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-022 |

**Story:**
> As a hospital administrator, I want staff sessions to expire automatically after a period of inactivity so that unattended terminals do not expose sensitive queue data to unauthorised users.

**Acceptance Criteria:**

- **AC-005a:** Given a staff account has been inactive for exactly 8 hours, when the user next performs any action, then the system terminates the session and redirects to the login screen.
- **AC-005b:** Given a session is approaching expiry, when the user performs an action within the 8-hour window, then the session timer resets.
- **AC-005c:** Given a session is expired and the user is on a dashboard screen, when they attempt to navigate or interact, then they see a "Session expired — please log in again" message before being redirected.

---

### US-006 — Account Lockout After Failed Login Attempts

| Field | Detail |
|-------|--------|
| **ID** | US-006 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-024 |

**Story:**
> As a hospital administrator, I want staff accounts to be locked after repeated failed login attempts so that the platform is protected against unauthorised access attempts.

**Acceptance Criteria:**

- **AC-006a:** Given a user enters an incorrect password 5 consecutive times, when they attempt a 6th login, then the account is locked and displays an "Account locked" message.
- **AC-006b:** Given an account is locked, when the user attempts to log in, then the system does not grant access and instructs them to reset their password.
- **AC-006c:** Given an account is locked, when the user resets their password through the verified phone number flow, then the account is unlocked and they can log in with the new credential.

---

### US-007 — Password Reset

| Field | Detail |
|-------|--------|
| **ID** | US-007 |
| **Role** | Patient, Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-099 |

**Story:**
> As any user, I want to reset my login credential via my registered phone number so that I can regain access to my account if I forget my password or if my account is locked.

**Acceptance Criteria:**

- **AC-007a:** Given I request a password reset, when I enter my registered phone number, then the system sends a reset OTP to that number within 30 seconds.
- **AC-007b:** Given I enter the correct reset OTP, when I submit a new password meeting the minimum strength requirements, then my password is updated and I can log in with it immediately.
- **AC-007c:** Given I enter an incorrect or expired reset OTP, when I submit, then the system rejects it and offers me a resend option.

---

### US-008 — Deactivated Account Cannot Log In

| Field | Detail |
|-------|--------|
| **ID** | US-008 |
| **Role** | Receptionist, Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-096 |

**Story:**
> As a hospital administrator, I want deactivated staff accounts to be blocked from logging in so that former or suspended employees cannot access hospital queue data.

**Acceptance Criteria:**

- **AC-008a:** Given an administrator has deactivated a staff account, when that staff member attempts to log in, then the system displays an "Account inactive — please contact your administrator" message and denies access.
- **AC-008b:** Given a deactivated account, when a password reset is attempted, then the reset is blocked and the user is directed to contact their administrator.

---

### US-009 — Unauthenticated Access Prevention

| Field | Detail |
|-------|--------|
| **ID** | US-009 |
| **Role** | Patient, Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-098, NFR-023 |

**Story:**
> As a system, I want to prevent unauthenticated users from accessing any protected screen so that patient and operational data is never exposed without a valid login.

**Acceptance Criteria:**

- **AC-009a:** Given a user is not logged in, when they navigate directly to a protected URL (e.g., queue screen, dashboard), then the system redirects them to the login screen without displaying any protected content.
- **AC-009b:** Given a receptionist attempts to access an administrator-only URL, when they are authenticated as a receptionist, then the system returns an access-denied response and displays no administrator data.
- **AC-009c:** Given a patient attempts to access any staff dashboard URL, when they are authenticated as a patient, then the system returns an access-denied response.

---

### US-010 — Privacy Notice at Registration

| Field | Detail |
|-------|--------|
| **ID** | US-010 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-032 |

**Story:**
> As a patient registering for the first time, I want to see a clear privacy notice explaining what data is collected and how it is used so that I can make an informed decision before creating my account.

**Acceptance Criteria:**

- **AC-010a:** Given I am on the registration screen, when I view the form, then a privacy notice is clearly visible before I can submit my details.
- **AC-010b:** Given the privacy notice is displayed, when I attempt to complete registration, then I must acknowledge the notice (e.g., by ticking a checkbox) before the system accepts my submission.
- **AC-010c:** Given I do not acknowledge the privacy notice, when I attempt to submit the registration form, then the system prevents submission and highlights the unacknowledged notice.

---

### US-011 — Staff Cannot Self-Register

| Field | Detail |
|-------|--------|
| **ID** | US-011 |
| **Role** | Receptionist, Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-097 |

**Story:**
> As a hospital administrator, I want staff accounts to be created only by me so that no unauthorised person can register themselves as a receptionist or doctor on the platform.

**Acceptance Criteria:**

- **AC-011a:** Given a person visits the QueueCare AI login page, when they look for a staff self-registration option, then no such option exists — staff accounts can only be created by a hospital administrator from within the admin dashboard.
- **AC-011b:** Given an administrator creates a new staff account, when the staff member receives their credentials, then they can log in immediately with those credentials without any additional registration step.

---

### US-012 — Cross-Hospital Data Isolation

| Field | Detail |
|-------|--------|
| **ID** | US-012 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-027 |

**Story:**
> As a hospital administrator, I want my hospital's data to be completely isolated from other hospitals on the platform so that no staff member or patient from another hospital can ever access our queue or configuration data.

**Acceptance Criteria:**

- **AC-012a:** Given an administrator from Hospital A is authenticated, when they attempt to access a URL referencing Hospital B's data, then the system returns an error and serves no data from Hospital B.
- **AC-012b:** Given a receptionist from Hospital A is authenticated, when they use the platform, then they can only see patients, queues, and departments belonging to Hospital A.

---

---

## 6. Module 2 — Profile Management

This module covers user stories related to managing personal account information, notification preferences, and data privacy rights.

---

### US-013 — Update Patient Profile

| Field | Detail |
|-------|--------|
| **ID** | US-013 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-005 |

**Story:**
> As a patient, I want to update my name, age, and gender in my profile so that the hospital has accurate details associated with my visits.

**Acceptance Criteria:**

- **AC-013a:** Given I am logged in, when I navigate to my profile and update my name, age, or gender, then the changes are saved and reflected immediately without requiring a logout.
- **AC-013b:** Given I attempt to save a profile with an empty name field, when I submit, then the system displays a validation error and does not save the incomplete data.
- **AC-013c:** Given I update my profile, when I view my active token (if I have one), then the token continues to display the correct details without disruption.

---

### US-014 — View My Active Token from Profile

| Field | Detail |
|-------|--------|
| **ID** | US-014 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-027 |

**Story:**
> As a patient, I want to quickly see my active queue token from my profile screen so that I can return to my queue status view without searching through the app.

**Acceptance Criteria:**

- **AC-014a:** Given I have an active queue token, when I open the profile screen, then I see a visible indicator or shortcut showing my current token and department.
- **AC-014b:** Given I have no active token, when I view the profile screen, then no queue indicator is shown and I see an option to join a queue.

---

### US-015 — Enable or Disable Push Notifications

| Field | Detail |
|-------|--------|
| **ID** | US-015 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-054 |

**Story:**
> As a patient, I want to choose whether I receive push notifications so that I can control my phone's notification experience based on my personal preference.

**Acceptance Criteria:**

- **AC-015a:** Given I am in my profile settings, when I toggle push notifications off, then I stop receiving any push notifications from the app.
- **AC-015b:** Given I have disabled push notifications, when I view my queue screen, then my live queue position and wait-time estimate still update automatically on screen.
- **AC-015c:** Given I have disabled push notifications and then re-enable them, when a notification event occurs (e.g., 3 patients ahead), then I receive the notification as expected.

---

### US-016 — Request Account and Data Deletion

| Field | Detail |
|-------|--------|
| **ID** | US-016 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-033 |

**Story:**
> As a patient, I want to be able to request deletion of my account and personal data so that I can exercise my right to privacy and remove my information from the platform at any time.

**Acceptance Criteria:**

- **AC-016a:** Given I am on my profile screen, when I request account deletion, then the system confirms my intent with a clear warning message before proceeding.
- **AC-016b:** Given I confirm the deletion request, when the system processes it, then I receive a confirmation that my account and personal data will be deleted within 7 days.
- **AC-016c:** Given my account deletion is processed, when I attempt to log in with my former phone number, then the system treats the number as unregistered and requires fresh registration.

---

### US-017 — View My Role and Assigned Department (Staff)

| Field | Detail |
|-------|--------|
| **ID** | US-017 |
| **Role** | Receptionist, Doctor |
| **Priority** | 🟢 Could Have |
| **Linked FR** | FR-100 |

**Story:**
> As a receptionist or doctor, I want to see my name, role, and assigned department displayed on my dashboard so that I can confirm I am logged in with the correct account before starting a session.

**Acceptance Criteria:**

- **AC-017a:** Given I am logged in as a receptionist, when I view any dashboard screen, then my name, the label "Receptionist," and my assigned department(s) are visible.
- **AC-017b:** Given I am logged in as a doctor, when I view any dashboard screen, then my name, the label "Doctor," and my assigned department are visible.
- **AC-017c:** Given my role or department changes and I log in again, when I view the dashboard, then the updated role and department are reflected correctly.

---

### US-018 — View Hospital Name on Staff Dashboard

| Field | Detail |
|-------|--------|
| **ID** | US-018 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🟢 Could Have |
| **Linked FR** | FR-100 |

**Story:**
> As a staff member, I want to see the hospital name on my dashboard so that I can confirm I am working within the correct hospital context, especially in a multi-hospital environment.

**Acceptance Criteria:**

- **AC-018a:** Given I am logged in as any staff role, when I view the dashboard, then the hospital name associated with my account is displayed on every screen.
- **AC-018b:** Given I am assigned to a specific department, when I view the dashboard, then my hospital name and department name are both visible simultaneously.

---

### US-019 — Staff Password Change

| Field | Detail |
|-------|--------|
| **ID** | US-019 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-099 |

**Story:**
> As a staff member, I want to change my password from within my account settings so that I can maintain my account security without needing to contact the administrator.

**Acceptance Criteria:**

- **AC-019a:** Given I am logged in as a staff member, when I navigate to account settings and enter my current password followed by a new password, then the password is updated and I can use the new password on my next login.
- **AC-019b:** Given I enter an incorrect current password during a password change attempt, when I submit, then the system rejects the change and displays an error message.
- **AC-019c:** Given the new password does not meet minimum strength requirements, when I submit, then the system displays the specific requirement that was not met and does not save the password.

---

### US-020 — Data Minimisation Transparency

| Field | Detail |
|-------|--------|
| **ID** | US-020 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-031, NFR-032 |

**Story:**
> As a patient, I want to understand exactly what personal information QueueCare AI collects about me so that I can trust the platform with my data.

**Acceptance Criteria:**

- **AC-020a:** Given I am on the registration screen, when I read the privacy notice, then it clearly states that only my name, phone number, age, and gender are collected and explains how each is used.
- **AC-020b:** Given the privacy notice, when I look for any mention of clinical, health, or medical data being collected, then there is none — the notice explicitly states that no clinical data is collected.

---

---

## 7. Module 3 — Hospital and Department Management

This module covers stories related to setting up and configuring the hospital, managing departments, generating QR codes, and controlling session parameters. All stories in this module belong to the Hospital Administrator role.

---

### US-021 — Create Hospital Profile

| Field | Detail |
|-------|--------|
| **ID** | US-021 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-010 |

**Story:**
> As a hospital administrator, I want to create and configure my hospital's profile so that the hospital appears correctly on the platform for patients and staff.

**Acceptance Criteria:**

- **AC-021a:** Given I am a first-time administrator, when I complete the hospital profile form (name, address, contact information) and save, then the hospital profile is created and visible on the platform.
- **AC-021b:** Given I leave the hospital name field empty, when I attempt to save, then the system displays a validation error and does not create the profile.
- **AC-021c:** Given a hospital profile already exists for my account, when I edit the name or address and save, then the updated information is reflected immediately across the platform.

---

### US-022 — Create an OPD Department

| Field | Detail |
|-------|--------|
| **ID** | US-022 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-011 |

**Story:**
> As a hospital administrator, I want to create OPD departments such as General Medicine, Orthopedics, and Pediatrics so that patients can join the right queue for their consultation.

**Acceptance Criteria:**

- **AC-022a:** Given I am on the departments management screen, when I create a new department with a valid name and set its status to Active, then the department appears in the hospital's department list immediately.
- **AC-022b:** Given a new department is created, when a patient opens the app and selects my hospital, then the new department appears in their department list.
- **AC-022c:** Given I attempt to create a department with a name that already exists in my hospital, when I submit, then the system displays a duplicate name error and does not create a second department with the same name.

---

### US-023 — Edit Department Details

| Field | Detail |
|-------|--------|
| **ID** | US-023 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-012 |

**Story:**
> As a hospital administrator, I want to edit a department's name and assigned doctor so that the department configuration stays current as the hospital's operations evolve.

**Acceptance Criteria:**

- **AC-023a:** Given I edit a department name and save, when staff or patients view that department, then the updated name is displayed immediately.
- **AC-023b:** Given I change the assigned doctor for a department, when the doctor logs in, then they see the queue for their newly assigned department.
- **AC-023c:** Given I remove a doctor assignment from a department, when the previously assigned doctor logs in, then they no longer see that department's queue.

---

### US-024 — Deactivate a Department

| Field | Detail |
|-------|--------|
| **ID** | US-024 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-013 |

**Story:**
> As a hospital administrator, I want to deactivate a department so that patients cannot join its queue when the department is not operating (for example, during a public holiday or when a doctor is on leave).

**Acceptance Criteria:**

- **AC-024a:** Given I deactivate a department, when a patient opens the app and selects my hospital, then the deactivated department does not appear in their selectable department list.
- **AC-024b:** Given a department is deactivated, when a patient tries to scan its existing QR code, then the system displays a "Department not available" message and does not issue a token.
- **AC-024c:** Given I reactivate a previously deactivated department, when a patient views the hospital's departments, then the department appears again in the list with an active status.

---

### US-025 — Configure Maximum Queue Capacity

| Field | Detail |
|-------|--------|
| **ID** | US-025 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-017, FR-018 |

**Story:**
> As a hospital administrator, I want to set a maximum number of patients per department session so that the queue does not grow beyond what the doctor can realistically see in one day.

**Acceptance Criteria:**

- **AC-025a:** Given I set a maximum capacity of 80 for the General Medicine department, when the 81st patient attempts to join that queue, then the system displays a "Queue is full" message and does not issue a token.
- **AC-025b:** Given the queue is at full capacity and a patient cancels their token, when the capacity drops below the limit, then the next patient who attempts to join is successful.
- **AC-025c:** Given I change the maximum capacity mid-session to a value lower than the current queue depth, when I save, then the system does not remove existing patients — it only prevents new patients from joining.

---

### US-026 — Configure Department Session Times

| Field | Detail |
|-------|--------|
| **ID** | US-026 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-019, FR-108 |

**Story:**
> As a hospital administrator, I want to configure each department's daily session start and end times so that the system automatically manages when queues open and close.

**Acceptance Criteria:**

- **AC-026a:** Given I configure a session end time of 1:00 PM for Orthopedics, when the clock reaches 1:00 PM and the session has not been manually closed, then the system automatically closes the session and stops accepting new tokens.
- **AC-026b:** Given a session is auto-closed at the configured end time, when a patient scans the department QR code after that time, then the system displays a "Session closed" message and does not issue a token.
- **AC-026c:** Given I update session times for a department, when I save, then the change applies from the next session — it does not disrupt any currently active session.

---

### US-027 — Configure Notification Threshold Per Department

| Field | Detail |
|-------|--------|
| **ID** | US-027 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-048 |

**Story:**
> As a hospital administrator, I want to set the number of patients remaining ahead that triggers a "your turn is approaching" notification for each department so that I can calibrate alerts to match each department's consultation pace.

**Acceptance Criteria:**

- **AC-027a:** Given I set the notification threshold for General Medicine to 5 patients, when a queued patient has exactly 5 patients ahead of them, then they receive a turn-approaching notification.
- **AC-027b:** Given the threshold is configurable between 1 and 10, when I attempt to set it below 1 or above 10, then the system displays a validation error and does not save the invalid value.
- **AC-027c:** Given the threshold defaults to 3 for a new department, when I do not change it, then all patients in that department receive notifications when 3 patients remain ahead.

---

### US-028 — Generate Department QR Code

| Field | Detail |
|-------|--------|
| **ID** | US-028 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-024 |

**Story:**
> As a hospital administrator, I want to generate a printable QR code for each OPD department so that I can display it in the waiting area and allow patients to join the queue by scanning it with their smartphones.

**Acceptance Criteria:**

- **AC-028a:** Given an active department exists, when I select "Generate QR Code" for that department, then a unique QR code is generated that is specific to that department and hospital.
- **AC-028b:** Given the QR code is generated, when a patient scans it with their smartphone, then the system initiates the join-queue flow for the correct department in the correct hospital automatically.
- **AC-028c:** Given I generate a new QR code for a department, when a patient scans the previously generated (old) QR code, then the old code either still works or displays an "outdated QR code" message — it does not silently fail or route to the wrong department.
- **AC-028d:** Given the QR code is generated, when I select the download or print option, then a printable version of the QR code is available for physical display.

---

### US-029 — View All Departments in My Hospital

| Field | Detail |
|-------|--------|
| **ID** | US-029 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-086 |

**Story:**
> As a hospital administrator, I want to see a list of all departments in my hospital with their current status so that I have a clear operational overview of what is active and what is not.

**Acceptance Criteria:**

- **AC-029a:** Given I am on the departments management screen, when I view the list, then I can see all departments with their name, status (Active / Inactive), assigned doctor, and session configuration.
- **AC-029b:** Given a new department is created, when I return to the department list, then the new department appears immediately without a page refresh.
- **AC-029c:** Given I deactivate a department, when I view the list, then that department shows an "Inactive" status clearly distinguishable from active departments.

---

### US-030 — Patient Selects Hospital from List

| Field | Detail |
|-------|--------|
| **ID** | US-030 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-014 |

**Story:**
> As a patient, I want to browse and select a hospital from the list of hospitals on the platform so that I can find the right facility and join its queue.

**Acceptance Criteria:**

- **AC-030a:** Given I am logged in and on the home screen, when I select "Find Hospital," then I see a list of all active hospitals on the platform.
- **AC-030b:** Given I select a hospital from the list, when I proceed, then I see only the active departments of that hospital.
- **AC-030c:** Given a hospital has no active departments, when I select it, then the system informs me that no departments are currently available at that hospital.

---

### US-031 — Patient Views Department Queue Status Before Joining

| Field | Detail |
|-------|--------|
| **ID** | US-031 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-015, FR-016 |

**Story:**
> As a patient, I want to see whether a department's queue is active, paused, or closed before I attempt to join so that I do not waste time trying to join a queue that is not accepting patients.

**Acceptance Criteria:**

- **AC-031a:** Given I am viewing a hospital's department list, when I look at each department, then I can see a clear status indicator: Active, Paused, or Closed.
- **AC-031b:** Given a department's status is Paused, when I select it, then the system informs me the queue is temporarily paused and does not let me join until it resumes.
- **AC-031c:** Given a department's status is Closed, when I select it, then the system informs me the queue is closed for the day and does not issue a token.

---

### US-032 — Session Opens and Closes Cleanly Each Day

| Field | Detail |
|-------|--------|
| **ID** | US-032 |
| **Role** | Receptionist, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-105, FR-106, FR-107, FR-109, FR-110 |

**Story:**
> As a receptionist, I want each department to have a clearly defined daily session that opens and closes so that token numbers reset fresh each day and session data is kept clean and separate.

**Acceptance Criteria:**

- **AC-032a:** Given a new day begins, when a receptionist or administrator opens a session for a department, then token numbering begins at 1.
- **AC-032b:** Given a session is closed, when a patient scans the QR code or selects the department, then the system displays a "Session closed" message and no new tokens are issued.
- **AC-032c:** Given a session is closed with patients still in the queue, when those patients view the app, then their tokens retain their status — they are not automatically cancelled.
- **AC-032d:** Given a session is completed, when the administrator later views historical analytics, then that session's data is retained and accessible for the configured retention period.

---

### US-033 — Hospital Is Isolated from Other Hospitals on Platform

| Field | Detail |
|-------|--------|
| **ID** | US-033 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-027, NFR-028 |

**Story:**
> As a hospital administrator, I want adding a new department to my hospital to have no effect on other hospitals on the platform so that my configuration changes are always contained within my own facility.

**Acceptance Criteria:**

- **AC-033a:** Given I add a new department to my hospital, when staff and patients at other hospitals use the platform simultaneously, then they experience no disruption.
- **AC-033b:** Given I deactivate a department in my hospital, when patients at another hospital use the platform, then they see no change to their hospital's department list.

---

### US-034 — Admin Configures Hospital Without IT Support

| Field | Detail |
|-------|--------|
| **ID** | US-034 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-010, FR-011, FR-019 |

**Story:**
> As a hospital administrator, I want to complete the initial hospital setup entirely through the admin dashboard without needing IT support so that I can go live quickly without being dependent on technical assistance.

**Acceptance Criteria:**

- **AC-034a:** Given I am a new administrator, when I follow the setup flow (hospital profile → departments → staff accounts → QR codes), then I can complete all steps through the dashboard interface without requiring any external technical assistance.
- **AC-034b:** Given I have completed setup, when I run a test queue session, then I can verify the end-to-end flow (token issuance, queue tracking, notifications) without IT involvement.

---

### US-035 — New Department Does Not Disrupt Existing Departments

| Field | Detail |
|-------|--------|
| **ID** | US-035 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-029 |

**Story:**
> As a hospital administrator, I want to add a new department to my hospital without causing any disruption to existing departments that are currently running active sessions so that I can expand operations mid-day if needed.

**Acceptance Criteria:**

- **AC-035a:** Given an active session is running in General Medicine, when I create a new Dermatology department, then the General Medicine queue, its active patients, and its notifications continue without interruption.
- **AC-035b:** Given the new department is created, when I immediately open a session for it, then it operates independently of all other departments.

---

---

## 8. Module 4 — Queue Management

This is the core operational module. Stories are grouped by role: Patient, Receptionist, Doctor, and Hospital Administrator.

---

### 8.1 Queue Management — Patient

---

### US-036 — Join Queue by Scanning a QR Code

| Field | Detail |
|-------|--------|
| **ID** | US-036 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-023, FR-026 |

**Story:**
> As a patient, I want to join an OPD queue by scanning a QR code displayed in the waiting area so that I can get a digital token quickly without visiting the reception desk.

**Acceptance Criteria:**

- **AC-036a:** Given I am logged in and scan a valid department QR code, when the scan is processed, then I receive a digital token within 3 seconds displaying my token number, department name, queue position, and estimated wait time.
- **AC-036b:** Given I scan a QR code for a department that is currently active, when I receive my token, then my name and token number appear in the live queue on the receptionist and doctor dashboards immediately.
- **AC-036c:** Given I scan a QR code for a department that is paused or closed, when the scan is processed, then the system displays the current queue status clearly and does not issue a token.

---

### US-037 — Join Queue by Selecting Department Manually

| Field | Detail |
|-------|--------|
| **ID** | US-037 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-014, FR-015 |

**Story:**
> As a patient who cannot scan a QR code, I want to select my hospital and department from a list in the app so that I can still join the queue even if my camera is not working or the QR code is unavailable.

**Acceptance Criteria:**

- **AC-037a:** Given I am logged in, when I navigate to "Find Hospital" and select a hospital followed by a department, then I am taken to the queue join screen for that department.
- **AC-037b:** Given I select a department that is Active, when I confirm the join, then a token is issued to me with the same details as a QR scan.
- **AC-037c:** Given I select a department that is Paused or Closed, when I view it in the list, then a clear status label is shown and I cannot proceed to join.

---

### US-038 — Receive a Digital Queue Token

| Field | Detail |
|-------|--------|
| **ID** | US-038 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-020, FR-021, FR-022 |

**Story:**
> As a patient, I want to receive a digital token with my token number and queue position after joining so that I have a clear reference for my place in the queue.

**Acceptance Criteria:**

- **AC-038a:** Given I successfully join a queue, when the token is issued, then it displays: my name, my sequential token number, the department name, my current position in the queue, and an estimated wait time — all on a single screen.
- **AC-038b:** Given multiple patients join the queue, when token numbers are issued, then they are sequential starting from 1 at the beginning of each session, incrementing by 1 for each new patient.
- **AC-038c:** Given I have been issued a token, when I close and reopen the app, then my token screen is still visible and my position reflects the current live queue state.

---

### US-039 — View Live Queue Position in Real Time

| Field | Detail |
|-------|--------|
| **ID** | US-039 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-030, FR-031, FR-032, FR-033, FR-034 |

**Story:**
> As a patient, I want my queue position to update automatically on my screen whenever a patient ahead of me is called or removed so that I always know exactly where I stand without having to refresh the app.

**Acceptance Criteria:**

- **AC-039a:** Given I am queued and a patient ahead of me is marked Served, when the queue advances, then my displayed position decrements by 1 within 5 seconds — without me refreshing the screen.
- **AC-039b:** Given I am queued and a patient ahead of me is marked No-Show, when they are removed from the queue, then my position updates within 5 seconds.
- **AC-039c:** Given I am viewing my queue screen, when I look at the information shown, then I can see: my token number, department name, current queue position, number of patients ahead, the token number currently being served, and the estimated wait time — all on one view.

---

### US-040 — See Queue Status (Active, Paused, Closed)

| Field | Detail |
|-------|--------|
| **ID** | US-040 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-035 |

**Story:**
> As a patient who is already in the queue, I want to see whether the queue is currently active, paused, or closed so that I understand why the queue may have stopped moving.

**Acceptance Criteria:**

- **AC-040a:** Given the queue is paused by a receptionist, when I view my queue screen, then a "Queue Paused" status indicator is clearly visible within 5 seconds of the pause action.
- **AC-040b:** Given the queue is active, when I view my queue screen, then the status shows "Active" and my position continues to update normally.
- **AC-040c:** Given the queue is closed after session end, when I view my queue screen, then the status shows "Closed" and I understand that no new patients will be added.

---

### US-041 — Cannot Hold Two Active Tokens for the Same Department

| Field | Detail |
|-------|--------|
| **ID** | US-041 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-027 |

**Story:**
> As a patient, I want the system to prevent me from accidentally joining the same queue twice so that I do not create a duplicate token that confuses the doctor or the queue order.

**Acceptance Criteria:**

- **AC-041a:** Given I already hold an active token for General Medicine, when I scan the General Medicine QR code again or select it from the list, then the system displays my existing token and current position instead of issuing a new one.
- **AC-041b:** Given I hold a token for General Medicine, when I attempt to join the Orthopedics queue, then the system allows me to join — each department is treated independently.

---

### US-042 — Cancel My Queue Token

| Field | Detail |
|-------|--------|
| **ID** | US-042 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-028 |

**Story:**
> As a patient, I want to cancel my active token and remove myself from the queue so that I do not waste the doctor's time if I decide to leave the hospital before my consultation.

**Acceptance Criteria:**

- **AC-042a:** Given I have an active token, when I select "Cancel Token" and confirm, then my token is removed from the queue immediately.
- **AC-042b:** Given I cancel my token, when all patients who were behind me view their screens, then their queue positions have decremented by 1 within 5 seconds.
- **AC-042c:** Given I cancel my token, when I view the app, then no active token is shown and I am offered the option to rejoin.
- **AC-042d:** Given I attempt to cancel a token that has already been called by the doctor, when I submit the cancellation, then the system informs me the token has already been called and the cancellation is not processed.

---

### US-043 — Cannot Join a Full Queue

| Field | Detail |
|-------|--------|
| **ID** | US-043 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-017, FR-018 |

**Story:**
> As a patient, I want to be informed clearly if the queue is full so that I know to try again later or visit the reception desk for assistance rather than waiting indefinitely.

**Acceptance Criteria:**

- **AC-043a:** Given the queue has reached its maximum configured capacity, when I attempt to join (via QR scan or manual selection), then the system displays a clear "Queue is full" message and does not issue a token.
- **AC-043b:** Given the "Queue is full" message is shown, when I read it, then the message suggests that I check again later or speak to the reception desk.

---

### US-044 — Cannot Join a Closed or Paused Queue

| Field | Detail |
|-------|--------|
| **ID** | US-044 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-016 |

**Story:**
> As a patient, I want a helpful message when I try to join a paused or closed queue so that I understand the situation and know what to do next.

**Acceptance Criteria:**

- **AC-044a:** Given I attempt to join a Paused queue, when I scan the QR code or select the department, then the system shows a "Queue is temporarily paused — please try again shortly" message and does not issue a token.
- **AC-044b:** Given I attempt to join a Closed queue, when I scan the QR code or select the department, then the system shows a "Queue is closed for today" message.
- **AC-044c:** In both cases, the message is plain-language, user-friendly, and does not show a technical error.

---

### US-045 — Guest Token for Patients Without a Smartphone

| Field | Detail |
|-------|--------|
| **ID** | US-045 |
| **Role** | Patient (registered by Receptionist) |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-009 |

**Story:**
> As a patient without a smartphone, I want the receptionist to be able to register me as a guest and issue me a token so that I can still be part of the digital queue even without creating an account.

**Acceptance Criteria:**

- **AC-045a:** Given a patient does not have a smartphone, when a receptionist registers them as a guest without entering a phone number, then a token is issued and appears in the live queue alongside registered patients.
- **AC-045b:** Given a guest token is issued, when the doctor calls that token, then the notification is not sent (as there is no device) — the receptionist or doctor must call the patient verbally.
- **AC-045c:** Given a guest token exists in the queue, when the queue is viewed on the receptionist or doctor dashboard, then the guest token is displayed clearly with a "Guest" indicator.

---

### US-046 — Returning Patient Found at Desk

| Field | Detail |
|-------|--------|
| **ID** | US-046 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-008 |

**Story:**
> As a receptionist, I want to search for an existing patient by their phone number when they arrive at the desk so that I do not create duplicate records for returning patients.

**Acceptance Criteria:**

- **AC-046a:** Given a returning patient visits the desk, when I search by their registered phone number, then their existing record is found and displayed.
- **AC-046b:** Given I find an existing patient record, when I issue them a token, then the token is linked to their existing profile — no duplicate record is created.
- **AC-046c:** Given the phone number entered does not match any existing record, when I search, then the system clearly indicates the patient is not found and offers the option to register them as new.

---

### US-047 — Receptionist Registers a New Patient at the Desk

| Field | Detail |
|-------|--------|
| **ID** | US-047 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-007 |

**Story:**
> As a receptionist, I want to register a new patient at the desk and issue them a token so that patients who have not used the app before can still join the queue through me.

**Acceptance Criteria:**

- **AC-047a:** Given a new patient arrives at the desk without an existing account, when I enter their name, phone number, age, and gender and issue a token, then a new patient record is created and the token appears in the live queue.
- **AC-047b:** Given I register a new patient, when the process completes, then the entire registration and token issuance takes no longer than 60 seconds.
- **AC-047c:** Given a patient is registered by the receptionist, when they later download the app and register with the same phone number, then the system recognises their existing record.

---

### US-048 — Patient Stays in Queue When Queue Is Closed After Joining

| Field | Detail |
|-------|--------|
| **ID** | US-048 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-109 |

**Story:**
> As a patient who joined the queue before it was closed, I want to remain in the queue after closure so that I still get to see the doctor even though no new patients can join.

**Acceptance Criteria:**

- **AC-048a:** Given I joined the queue before session closure, when the receptionist closes the queue, then my token remains active and my position is preserved.
- **AC-048b:** Given the queue is closed with me still in it, when new patients try to join, then they are blocked — but my position and wait estimate continue to update as patients ahead of me are served.

---

### US-049 — Patient Understands the Queue Is Auto-Refreshing

| Field | Detail |
|-------|--------|
| **ID** | US-049 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-034 |

**Story:**
> As a patient, I want my queue screen to refresh automatically so that I never have to manually pull-to-refresh to see my current position.

**Acceptance Criteria:**

- **AC-049a:** Given I am on the queue screen with an active token, when a queue event occurs (e.g., the doctor calls a patient), then my screen updates within 5 seconds without me performing any action.
- **AC-049b:** Given my screen has been in the background on my phone, when I bring it back to the foreground, then it refreshes and shows the current queue state immediately.

---

### US-050 — Patient Sees a Graceful Error if Service Is Unavailable

| Field | Detail |
|-------|--------|
| **ID** | US-050 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-010 |

**Story:**
> As a patient, I want to see a friendly error message if the app cannot connect to the server so that I understand what is happening and am not left looking at a blank or broken screen.

**Acceptance Criteria:**

- **AC-050a:** Given the server is temporarily unavailable, when I open the queue screen, then a user-friendly message is shown (e.g., "Unable to load queue status — please check your connection and try again") instead of a blank screen or technical error.
- **AC-050b:** Given connectivity is restored, when I remain on the screen, then the app recovers and shows the correct queue state without me needing to restart the app.

---

---

### 8.2 Queue Management — Receptionist

---

### US-051 — Issue a Token at the Desk Within 60 Seconds

| Field | Detail |
|-------|--------|
| **ID** | US-051 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-025, FR-064 |

**Story:**
> As a receptionist, I want to issue a queue token to a patient at the desk in under 60 seconds so that I can process patients quickly during the peak-hour rush without creating a backlog at the registration counter.

**Acceptance Criteria:**

- **AC-051a:** Given I am on the receptionist dashboard, when I search for a patient by phone number, select their record (or create a new one), and issue a token, then the entire process is completable in under 60 seconds.
- **AC-051b:** Given a token is issued, when I view the dashboard, then the new token appears at the correct position in the live queue immediately.
- **AC-051c:** Given I complete my first-ever token issuance after initial login, when I time the action, then it takes no longer than 5 minutes from first login to first token issued — with no prior training.

---

### US-052 — Mark a Token as Called

| Field | Detail |
|-------|--------|
| **ID** | US-052 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-065, FR-066 |

**Story:**
> As a receptionist, I want to mark a patient's token as Called so that the system notifies the patient on their phone and they know to proceed to the consultation room.

**Acceptance Criteria:**

- **AC-052a:** Given I mark a token as Called, when the action is saved, then a push notification is sent to the patient associated with that token within 10 seconds.
- **AC-052b:** Given the token is marked Called, when I view the queue, then that token's status changes from Queued to Called and is visually distinct from other statuses.
- **AC-052c:** Given a patient has disabled push notifications, when I mark their token as Called, then the notification attempt is made but no error is shown — the token status still updates to Called on my dashboard.

---

### US-053 — Mark a Token as Served

| Field | Detail |
|-------|--------|
| **ID** | US-053 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-065 |

**Story:**
> As a receptionist, I want to mark a token as Served once the patient's consultation is complete so that the queue advances correctly and the session count stays accurate.

**Acceptance Criteria:**

- **AC-053a:** Given I mark a token as Served, when the action is saved, then the token is removed from the active queue and the served count in the session summary increments by 1.
- **AC-053b:** Given a token is marked Served, when patients behind it view their screens, then their positions have each decreased by 1 within 5 seconds.

---

### US-054 — Mark a Token as No-Show

| Field | Detail |
|-------|--------|
| **ID** | US-054 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-065, FR-067 |

**Story:**
> As a receptionist, I want to mark a token as No-Show when a patient does not appear after being called so that the queue advances and we do not waste time waiting for someone who has left.

**Acceptance Criteria:**

- **AC-054a:** Given I mark a token as No-Show, when the action is saved, then the token is removed from the active queue and the no-show count in the session summary increments by 1.
- **AC-054b:** Given a token is marked No-Show, when all patients behind it view their screens, then their positions have decremented by 1 within 5 seconds.
- **AC-054c:** Given a token is marked No-Show, when the patient who was skipped views their screen, then they receive a notification informing them their token was skipped, within 30 seconds.

---

### US-055 — Cancel a Patient's Token at the Desk

| Field | Detail |
|-------|--------|
| **ID** | US-055 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-029 |

**Story:**
> As a receptionist, I want to cancel a patient's token on their behalf so that I can remove patients from the queue when they decide to leave the hospital or have been sent to a different department.

**Acceptance Criteria:**

- **AC-055a:** Given I select a token and mark it as Cancelled, when the action is saved, then the token is removed from the active queue immediately and the cancelled count in the session summary increments.
- **AC-055b:** Given a token is cancelled, when patients behind it view their screens, then their positions have decremented by 1 within 5 seconds.
- **AC-055c:** Given I cancel a token, when I view the session summary, then the cancelled entry is listed and visible for reference.

---

### US-056 — Flag a Patient as Priority

| Field | Detail |
|-------|--------|
| **ID** | US-056 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-055, FR-056, FR-057, FR-058, FR-059, FR-060 |

**Story:**
> As a receptionist, I want to flag a patient as a specific priority category (Senior Citizen, Pregnant, Child, Emergency) so that the system repositions them in the queue transparently without me having to argue with other waiting patients.

**Acceptance Criteria:**

- **AC-056a:** Given I mark a patient as Senior Citizen, Pregnant, or Child priority, when the action is saved, then their token moves ahead of all Standard tokens in the queue and a priority badge is visible in both the receptionist and doctor dashboards.
- **AC-056b:** Given I mark a patient as Emergency, when the action is saved, then their token moves to position 1 in the queue — ahead of all other patients including other priority categories.
- **AC-056c:** Given a priority patient is inserted, when all affected patients' screens update, then their positions reflect the change within 5 seconds.
- **AC-056d:** Given I flag a priority patient, when I view the queue, then the patient is visually distinguished from Standard patients with a clear colour indicator or badge showing their specific priority category.
- **AC-056e:** Given I flag priority after the token has already been issued (not at time of issuance), when I apply the flag, then the queue repositions immediately as if the flag were set at join time.

---

### US-057 — Pause the Queue

| Field | Detail |
|-------|--------|
| **ID** | US-057 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-069 |

**Story:**
> As a receptionist, I want to pause the queue for my department so that I can temporarily stop new consultations from being called when the doctor is unavailable or an operational issue arises.

**Acceptance Criteria:**

- **AC-057a:** Given I pause the queue, when I optionally enter a reason and confirm, then the queue status changes to Paused and no new Call Next actions can be triggered until it is resumed.
- **AC-057b:** Given the queue is paused, when all currently queued patients view their screens, then a "Queue Paused" status indicator is visible within 5 seconds.
- **AC-057c:** Given I enter a pause reason, when the audit log is reviewed later, then the reason is stored alongside the pause action entry.

---

### US-058 — Resume the Queue

| Field | Detail |
|-------|--------|
| **ID** | US-058 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-069 |

**Story:**
> As a receptionist, I want to resume a paused queue so that patients are informed the wait is continuing and the doctor can resume calling patients.

**Acceptance Criteria:**

- **AC-058a:** Given the queue is currently paused, when I click Resume, then the queue status changes to Active immediately.
- **AC-058b:** Given the queue resumes, when all currently queued patients view their screens, then the status changes back to Active within 5 seconds.

---

### US-059 — Close the Queue at End of Session

| Field | Detail |
|-------|--------|
| **ID** | US-059 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-070, FR-109 |

**Story:**
> As a receptionist, I want to close the queue at the end of the session so that no new patients can join while ensuring patients already in the queue still get to see the doctor.

**Acceptance Criteria:**

- **AC-059a:** Given I close the queue, when a new patient attempts to scan the QR code or join via the department list, then the system displays a "Queue closed" message and does not issue a token.
- **AC-059b:** Given the queue is closed, when I view the queue, then all patients who were already queued remain in their positions with their existing statuses.
- **AC-059c:** Given I close the queue, when the doctor continues marking consultations complete, then the queue advances normally until all remaining patients are served.

---

### US-060 — View Live Session Summary Counts

| Field | Detail |
|-------|--------|
| **ID** | US-060 |
| **Role** | Receptionist |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-071 |

**Story:**
> As a receptionist, I want to see a live count of queued, called, served, no-show, and cancelled tokens at the bottom of my dashboard so that I can track the session's progress without manually counting paper stubs.

**Acceptance Criteria:**

- **AC-060a:** Given I am on the receptionist dashboard during an active session, when I view the session summary section, then I see a live count for each status: Queued, Called, Served, No-Show, and Cancelled.
- **AC-060b:** Given I mark a token as Served, when I view the summary, then the Served count increments by 1 and the Queued count decrements by 1 immediately.
- **AC-060c:** Given the session ends, when I review the final summary, then the total across all statuses equals the total number of tokens issued during the session.

---

### US-061 — Receptionist Cannot Access Other Departments

| Field | Detail |
|-------|--------|
| **ID** | US-061 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-072 |

**Story:**
> As a hospital administrator, I want each receptionist to see and manage only their assigned department's queue so that one receptionist cannot accidentally modify another department's queue.

**Acceptance Criteria:**

- **AC-061a:** Given I am logged in as a receptionist assigned only to General Medicine, when I look for Orthopedics in my dashboard, then it does not appear — I cannot view or interact with it.
- **AC-061b:** Given a receptionist is assigned to two departments, when they log in, then they can see and manage both assigned departments but no others.

---

### US-062 — Open a Session for a Department

| Field | Detail |
|-------|--------|
| **ID** | US-062 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-107 |

**Story:**
> As a receptionist, I want to manually open a session for my department at the start of the day so that the queue is ready to accept patients and token numbers start fresh from 1.

**Acceptance Criteria:**

- **AC-062a:** Given a new day has started and no session is open, when I open a session for my department, then the queue becomes active and is ready to accept tokens starting from number 1.
- **AC-062b:** Given a session is already open for my department, when I view the dashboard, then there is no option to open a second session for the same day.

---

### US-063 — Token Status Updates Are Reflected in Audit Log

| Field | Detail |
|-------|--------|
| **ID** | US-063 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-101, FR-102 |

**Story:**
> As a hospital administrator, I want every significant token action taken by a receptionist to be recorded in the audit log so that I can review the complete history of any session if a dispute or complaint arises.

**Acceptance Criteria:**

- **AC-063a:** Given a receptionist marks a token as Called, Served, No-Show, or Cancelled, when the action is completed, then an audit log entry is created recording: the action type, receptionist's name, affected token number, and timestamp.
- **AC-063b:** Given a receptionist pauses or closes the queue, when the action is completed, then an audit log entry is created with the same fields plus any reason entered.
- **AC-063c:** Given the audit log is reviewed, when I look for a specific action, then the entries are accurate and uneditable.

---

### US-064 — Receptionist Sees Current Wait Estimate for New Arrivals

| Field | Detail |
|-------|--------|
| **ID** | US-064 |
| **Role** | Receptionist |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-068 |

**Story:**
> As a receptionist, I want to see the current estimated wait time for a new patient joining the queue right now so that I can give arriving patients a quick, honest estimate when they ask at the desk.

**Acceptance Criteria:**

- **AC-064a:** Given the queue has sufficient session data to generate an estimate, when I view the receptionist dashboard, then a "Current estimated wait for new arrivals" figure is displayed.
- **AC-064b:** Given fewer than 5 consultations have been completed in the session, when I view the dashboard, then the estimate shows "Not yet available" rather than a potentially misleading number.
- **AC-064c:** Given the queue length changes, when I view the estimate, then it updates to reflect the current queue depth and service rate.

---

### US-065 — Priority Flag Visible to Both Receptionist and Doctor

| Field | Detail |
|-------|--------|
| **ID** | US-065 |
| **Role** | Receptionist, Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-057, FR-078 |

**Story:**
> As a receptionist, I want the priority flag I set on a patient to be immediately visible to the doctor on their dashboard so that the doctor can see who needs priority attention without me having to call or send a message.

**Acceptance Criteria:**

- **AC-065a:** Given I flag a patient as Emergency from the receptionist dashboard, when the doctor views their queue, then that patient's token appears at position 1 with a clearly visible Emergency indicator.
- **AC-065b:** Given I flag a patient as Senior Citizen, when the doctor views their queue, then that patient's token is above all Standard tokens and shows a Senior Citizen badge.
- **AC-065c:** Given different priority categories are in the queue simultaneously, when I view either the receptionist or doctor dashboard, then each category is visually distinguishable from the others.

---

---

### 8.3 Queue Management — Doctor

---

### US-066 — View Full Patient Queue Before Session Starts

| Field | Detail |
|-------|--------|
| **ID** | US-066 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-074, FR-078 |

**Story:**
> As a doctor, I want to see the full list of patients waiting for me before I call the first one so that I can review queue depth, spot any priority cases, and mentally prepare for the session.

**Acceptance Criteria:**

- **AC-066a:** Given I log in and an active session is open for my department, when I view the dashboard, then I can see all currently queued patients in token order with each patient's name, token number, and any priority flag — without performing any additional action.
- **AC-066b:** Given priority patients are in the queue, when I view the list, then they appear visually above standard patients with a clear colour indicator showing their specific category.
- **AC-066c:** Given no patients are currently queued, when I view the dashboard, then I see a clear "No patients in queue" state rather than a blank or error screen.

---

### US-067 — Call the Next Patient with One Action

| Field | Detail |
|-------|--------|
| **ID** | US-067 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-076 |

**Story:**
> As a doctor, I want to call the next patient in my queue with a single click so that I can signal readiness without leaving the consultation room, shouting through the door, or relying on an attendant.

**Acceptance Criteria:**

- **AC-067a:** Given there are patients in the queue, when I click "Call Next Patient," then the next patient's token status changes to Called and a push notification is sent to them within 10 seconds.
- **AC-067b:** Given I click "Call Next Patient," when I view the dashboard, then the called patient is highlighted as "Currently Serving" and the next patient in line is visible as "Up Next."
- **AC-067c:** Given the queue is empty, when I look at the "Call Next Patient" button, then it is either disabled or hidden — I cannot call a patient that does not exist.

---

### US-068 — Mark Consultation as Complete

| Field | Detail |
|-------|--------|
| **ID** | US-068 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-077 |

**Story:**
> As a doctor, I want to mark the current consultation as complete so that the queue advances to the next patient and the session record stays accurate — without requiring any data entry from me.

**Acceptance Criteria:**

- **AC-068a:** Given I am currently serving a patient, when I click "Mark Complete," then that patient's token status changes to Served and the queue advances.
- **AC-068b:** Given a consultation is marked complete, when all patients behind that token view their screens, then their positions have decremented by 1 within 5 seconds.
- **AC-068c:** Given I mark a consultation complete, when I view the dashboard, then the next patient in the queue is now shown as "Up Next" and I can call them with one action.
- **AC-068d:** Given I mark a consultation complete, when I check the session count, then the Served count has incremented by 1.

---

### US-069 — Mark a Called Patient as No-Show

| Field | Detail |
|-------|--------|
| **ID** | US-069 |
| **Role** | Doctor |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-079 |

**Story:**
> As a doctor, I want to mark a called patient as a no-show when they do not arrive at the consultation room so that the queue advances without me waiting indefinitely for someone who has left.

**Acceptance Criteria:**

- **AC-069a:** Given I have called a patient and they have not arrived, when I mark them as No-Show, then their token is removed from the active queue and the no-show count increments.
- **AC-069b:** Given a patient is marked No-Show from my dashboard, when the remaining patients view their screens, then their positions update within 5 seconds.
- **AC-069c:** Given I mark a patient No-Show, when the audit log is reviewed, then an entry records my name, the token number, the action type, and the timestamp.

---

### US-070 — See How Many Patients Remain in the Queue

| Field | Detail |
|-------|--------|
| **ID** | US-070 |
| **Role** | Doctor |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-080 |

**Story:**
> As a doctor, I want to see the count of patients still waiting in my queue so that I can pace my consultations appropriately and know when I am approaching the end of the session.

**Acceptance Criteria:**

- **AC-070a:** Given I am in an active session, when I view my dashboard, then a "Patients remaining" count is displayed and updates automatically after every consultation is completed or patient is removed.
- **AC-070b:** Given all patients have been served or removed, when I view the dashboard, then the remaining count shows 0 and the queue is clearly in an empty state.

---

### US-071 — Manually Reorder Patients in My Queue

| Field | Detail |
|-------|--------|
| **ID** | US-071 |
| **Role** | Doctor |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-061 |

**Story:**
> As a doctor, I want to manually move a patient's position in my queue when clinical judgment requires it so that I can act on urgent situations without waiting for a receptionist to intervene.

**Acceptance Criteria:**

- **AC-071a:** Given I select a patient and move them from position 5 to position 2, when I confirm the reorder, then the queue immediately reflects the new order and all affected patients' positions update within 5 seconds.
- **AC-071b:** Given I perform a manual reorder, when the audit log is reviewed, then an entry records my name, the patient's token number, the original position, the new position, and the timestamp.
- **AC-071c:** Given I reorder a patient, when that patient views their queue screen, then their position reflects the change within 5 seconds.

---

### US-072 — Doctor Cannot Access Other Departments

| Field | Detail |
|-------|--------|
| **ID** | US-072 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-081 |

**Story:**
> As a hospital administrator, I want each doctor to see only their assigned department's queue so that doctors cannot inadvertently view or modify patient queues for departments they are not responsible for.

**Acceptance Criteria:**

- **AC-072a:** Given I am logged in as a doctor assigned to General Medicine, when I attempt to navigate to Orthopedics or any other department, then the system denies access and shows an appropriate message.
- **AC-072b:** Given a doctor's department assignment changes, when they log out and log back in, then they see the queue for the newly assigned department only.

---

### US-073 — Doctor Queue Requires Zero Additional Data Entry

| Field | Detail |
|-------|--------|
| **ID** | US-073 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-073, FR-076, FR-077 |

**Story:**
> As a doctor, I want to manage my entire OPD session queue — calling patients, marking completions, and handling no-shows — without entering any data so that the queue tool adds no documentation burden to my clinical work.

**Acceptance Criteria:**

- **AC-073a:** Given I am managing an active session, when I perform any queue action (call next, mark complete, mark no-show, reorder), then none of these actions require me to type, fill in a form, or enter any field — all are single-click or single-tap actions.
- **AC-073b:** Given I log in at the start of a session, when I am ready to see the first patient, then I can call them immediately with one action — no setup steps are required on my part.

---

### US-074 — Doctor Sees Priority Patients Clearly

| Field | Detail |
|-------|--------|
| **ID** | US-074 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-074, FR-078 |

**Story:**
> As a doctor, I want priority patients in my queue to be clearly distinguishable from standard patients so that I can identify and act on urgent cases without having to read through every entry.

**Acceptance Criteria:**

- **AC-074a:** Given an Emergency patient is in my queue, when I view the dashboard, then their entry appears at the top of the list with a visually distinct indicator (e.g., red badge labelled "Emergency") that is immediately noticeable.
- **AC-074b:** Given multiple priority categories are present (e.g., Senior Citizen and Emergency), when I view the queue, then each category has a distinct and clearly labelled visual treatment that differentiates it from others.
- **AC-074c:** Given a standard patient is in the queue, when I view their entry, then it has no priority badge — the absence of a badge is itself meaningful and clear.

---

### US-075 — Doctor Dashboard Updates Without Manual Refresh

| Field | Detail |
|-------|--------|
| **ID** | US-075 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-037, NFR-001 |

**Story:**
> As a doctor, I want my queue dashboard to update automatically when patients are added, prioritised, or removed so that I always have an accurate view of my queue without needing to refresh the page between consultations.

**Acceptance Criteria:**

- **AC-075a:** Given a new patient joins my department queue, when I view the dashboard without refreshing, then the new patient appears in the queue list within 5 seconds.
- **AC-075b:** Given a receptionist flags a patient as priority, when I view the dashboard without refreshing, then the patient's priority badge appears and their position updates within 5 seconds.
- **AC-075c:** Given a patient cancels their token, when I view the dashboard without refreshing, then their entry is removed and remaining positions update within 5 seconds.

---

### 8.4 Queue Management — Hospital Administrator

---

### US-076 — Override and Pause Any Department Queue

| Field | Detail |
|-------|--------|
| **ID** | US-076 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-085 |

**Story:**
> As a hospital administrator, I want to pause the queue for any department in my hospital so that I can respond to operational incidents — like a doctor emergency or a facility issue — without waiting for the receptionist to act.

**Acceptance Criteria:**

- **AC-076a:** Given I am on the administrator dashboard, when I select a department and choose Pause, then the queue status for that department changes to Paused immediately.
- **AC-076b:** Given I pause a department's queue from the admin dashboard, when currently queued patients view their screens, then the "Queue Paused" status is visible within 5 seconds.
- **AC-076c:** Given I pause a queue, when I later select Resume, then the queue returns to Active status and patients are notified of the resumption.

---

### US-077 — Close Any Department Queue

| Field | Detail |
|-------|--------|
| **ID** | US-077 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-085 |

**Story:**
> As a hospital administrator, I want to close the queue for any department so that I can end a session early if the doctor finishes ahead of schedule or an unplanned department closure is required.

**Acceptance Criteria:**

- **AC-077a:** Given I close a department queue from the admin dashboard, when new patients attempt to join, then the system displays a "Queue closed" message and no new tokens are issued.
- **AC-077b:** Given I close a queue, when patients already in the queue view their screens, then their tokens remain active and they continue to be served in order.
- **AC-077c:** Given I close a queue from the admin dashboard, when the receptionist views their dashboard, then the closed status is immediately reflected.

---

### US-078 — Admin Queue Actions Are Audit Logged

| Field | Detail |
|-------|--------|
| **ID** | US-078 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-101, FR-102 |

**Story:**
> As a hospital administrator, I want all queue override actions I take to be recorded in the audit log so that there is a complete, tamper-proof record of all operational interventions.

**Acceptance Criteria:**

- **AC-078a:** Given I pause, resume, or close a department queue from the admin dashboard, when the action is completed, then an audit log entry is created recording: my name, my role, the action type, the affected department, and the timestamp.
- **AC-078b:** Given I view the audit log, when I look for an action I performed, then I find an accurate record that cannot be edited or deleted.

---

### US-079 — Session Auto-Closes at Configured End Time

| Field | Detail |
|-------|--------|
| **ID** | US-079 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-108 |

**Story:**
> As a hospital administrator, I want sessions to close automatically at the configured end time if they have not been manually closed so that queues do not remain open accidentally after operating hours.

**Acceptance Criteria:**

- **AC-079a:** Given a session's configured end time is 1:00 PM, when the clock reaches 1:00 PM and the session is still open, then the system automatically closes it and no new tokens can be issued.
- **AC-079b:** Given a session is auto-closed, when I view the admin dashboard, then the department's status shows Closed.
- **AC-079c:** Given patients are still in the queue when auto-close occurs, when they view the app, then their tokens remain active and continue to be served — the auto-close only stops new patients from joining.

---

### US-080 — Session Data Retained After Close

| Field | Detail |
|-------|--------|
| **ID** | US-080 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-110 |

**Story:**
> As a hospital administrator, I want the data from every completed session to be retained after it closes so that I can review historical analytics and reconstruct any session's events if needed.

**Acceptance Criteria:**

- **AC-080a:** Given a session is closed, when I navigate to historical analytics the following day, then that session's data (patient volume, average wait time, no-show count) is present and accurate.
- **AC-080b:** Given a session is closed, when I view the audit log, then all actions from that session are still accessible and readable.
- **AC-080c:** Given session data retention is set to 90 days, when a session is older than 90 days, then its patient-identifiable data is anonymised or deleted — but aggregate session metrics remain.

---

### US-081 — Admin Can Override Any Queue Without Receptionist Action

| Field | Detail |
|-------|--------|
| **ID** | US-081 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-085 |

**Story:**
> As a hospital administrator, I want to be able to pause, resume, or close any department queue directly from my dashboard without needing to ask the receptionist to do it so that I can respond to urgent operational situations independently.

**Acceptance Criteria:**

- **AC-081a:** Given I identify an operational issue in Orthopedics, when I pause that department's queue from the admin dashboard, then the queue status changes immediately — without any action required from the Orthopedics receptionist.
- **AC-081b:** Given the receptionist is unavailable or unresponsive, when I take a queue override action from the admin dashboard, then the action is effective and reflected on all user screens.

---

### US-082 — Token Numbers Reset Each Day

| Field | Detail |
|-------|--------|
| **ID** | US-082 |
| **Role** | Receptionist, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-106 |

**Story:**
> As a receptionist, I want token numbers to start from 1 at the beginning of each new session so that patients and staff are not confused by large token numbers carried over from previous days.

**Acceptance Criteria:**

- **AC-082a:** Given today's session is opened for a department, when the first token is issued, then its number is 1 regardless of how many tokens were issued in yesterday's session.
- **AC-082b:** Given token numbers reset each day, when I look at yesterday's session in historical analytics, then yesterday's token numbers are preserved correctly in the historical record.

---

---

## 9. Module 5 — Dashboard

This module covers the purpose-built dashboard experiences for each staff role: the receptionist's operational queue management screen, the doctor's consultation room view, and the administrator's live multi-department overview.

---

### 9.1 Receptionist Dashboard

---

### US-083 — Single-Screen Queue Management for Receptionist

| Field | Detail |
|-------|--------|
| **ID** | US-083 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-062, FR-063 |

**Story:**
> As a receptionist, I want all my queue management tasks — registration, token issuance, status updates, and session control — to be available on a single dashboard screen so that I never have to switch between multiple pages during a busy session.

**Acceptance Criteria:**

- **AC-083a:** Given I am logged in, when I view the receptionist dashboard, then I can see the live queue list, session summary counts, a patient search/registration area, and session control buttons (pause, resume, close) all on one screen without navigating away.
- **AC-083b:** Given a new patient joins via QR scan or desk registration, when I view the queue list, then their entry appears immediately without a page reload.
- **AC-083c:** Given I perform any action (issue token, change status, pause queue), when the action completes, then I remain on the same dashboard screen — I am not redirected to a different page.

---

### US-084 — Receptionist Dashboard Loads Within 3 Seconds

| Field | Detail |
|-------|--------|
| **ID** | US-084 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-003 |

**Story:**
> As a receptionist, I want my dashboard to load completely within 3 seconds of logging in so that I can start processing patients immediately without waiting for a slow interface.

**Acceptance Criteria:**

- **AC-084a:** Given I log in to my account, when the dashboard loads, then all queue data, summary counts, and controls are fully rendered and interactive within 3 seconds under normal load.
- **AC-084b:** Given the dashboard is already loaded and I navigate away and return, when the dashboard is shown again, then it refreshes to the current queue state within 3 seconds.

---

### US-085 — Queue List Ordered by Token Number and Priority

| Field | Detail |
|-------|--------|
| **ID** | US-085 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-063 |

**Story:**
> As a receptionist, I want the queue list to be ordered with priority patients at the top and standard patients below in token number order so that I can immediately see who should be served next without having to scan through the full list.

**Acceptance Criteria:**

- **AC-085a:** Given priority and standard patients are in the queue, when I view the queue list, then Emergency patients appear first, followed by other priority categories, followed by standard patients in ascending token number order.
- **AC-085b:** Given two patients with the same priority category, when I view the list, then they are ordered by token number within their category (lower token number first).
- **AC-085c:** Given a standard patient is added to a queue that already has a priority patient, when I view the list, then the new standard patient appears below all priority patients regardless of their token number.

---

### US-086 — Each Queue Entry Shows Key Patient Details

| Field | Detail |
|-------|--------|
| **ID** | US-086 |
| **Role** | Receptionist |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-063 |

**Story:**
> As a receptionist, I want each patient entry in the queue list to show the token number, patient name, priority badge, and current status at a glance so that I can make quick decisions without clicking into individual records.

**Acceptance Criteria:**

- **AC-086a:** Given the queue list is displayed, when I look at any patient entry, then I can see all four pieces of information — token number, patient name, priority badge (if any), and current status (Queued / Called / No-Show / Cancelled / Served) — without clicking or expanding.
- **AC-086b:** Given a patient has no priority flag, when I view their entry, then no badge is shown and the entry looks clean and uncluttered.

---

### 9.2 Doctor Dashboard

---

### US-087 — Doctor Sees Currently Serving and Up Next at a Glance

| Field | Detail |
|-------|--------|
| **ID** | US-087 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-075 |

**Story:**
> As a doctor, I want the currently serving patient and the next patient to be prominently displayed at the top of my dashboard so that I can see the most important information immediately without scanning the full queue list.

**Acceptance Criteria:**

- **AC-087a:** Given a session is active with patients queued, when I view the doctor dashboard, then the "Currently Serving" patient (token number and name) is prominently displayed, and the "Up Next" patient is shown directly below it.
- **AC-087b:** Given the consultation is marked complete, when I view the dashboard, then the previously "Up Next" patient is now shown as "Currently Serving" and the next patient in line is shown as "Up Next."
- **AC-087c:** Given only one patient remains in the queue, when I view the dashboard, then "Currently Serving" shows the active patient and "Up Next" shows an empty or "No more patients" state.

---

### US-088 — Doctor Dashboard Loads Within 3 Seconds

| Field | Detail |
|-------|--------|
| **ID** | US-088 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-003 |

**Story:**
> As a doctor, I want my queue dashboard to load fully within 3 seconds so that I can begin my session immediately on entering the consultation room without waiting for the screen to populate.

**Acceptance Criteria:**

- **AC-088a:** Given I log in as a doctor, when my dashboard loads, then the full patient queue, priority indicators, and all action buttons are fully rendered and usable within 3 seconds.
- **AC-088b:** Given the dashboard is open and a new patient joins the queue, when I view the screen without refreshing, then the new entry appears within 5 seconds automatically.

---

### US-089 — Call Next and Mark Complete Are the Primary Actions

| Field | Detail |
|-------|--------|
| **ID** | US-089 |
| **Role** | Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-076, FR-077, NFR-019 |

**Story:**
> As a doctor, I want "Call Next Patient" and "Mark Complete" to be the most prominent and easily reachable actions on my dashboard so that I can manage my entire session with minimal effort and no risk of pressing the wrong control.

**Acceptance Criteria:**

- **AC-089a:** Given I am on the doctor dashboard, when I look at the primary action area, then "Call Next Patient" and "Mark Complete" are clearly visible, large, and reachable within 1 click or tap from the main view.
- **AC-089b:** Given a consultation is in progress, when I view the dashboard, then "Mark Complete" is the most prominent active action — "Call Next Patient" is present but secondary until the current patient is resolved.
- **AC-089c:** Given no patient is currently being served, when I view the dashboard, then "Call Next Patient" is the primary active action.

---

### US-090 — Doctor Dashboard Works in the Consultation Room Environment

| Field | Detail |
|-------|--------|
| **ID** | US-090 |
| **Role** | Doctor |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-015 |

**Story:**
> As a doctor, I want the dashboard to work reliably on a standard desktop or laptop computer so that I can use it on the workstation already in my consultation room without needing a dedicated device.

**Acceptance Criteria:**

- **AC-090a:** Given the dashboard is opened on a standard desktop browser, when I use it throughout a 4-hour session, then it remains responsive and functional without requiring a page reload.
- **AC-090b:** Given the dashboard is on a screen in landscape orientation, when I view the queue list and action buttons, then all elements are correctly laid out and readable at standard monitor resolutions.

---

### 9.3 Administrator Live Overview Dashboard

---

### US-091 — View All Departments in One Live Overview

| Field | Detail |
|-------|--------|
| **ID** | US-091 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-082, FR-083 |

**Story:**
> As a hospital administrator, I want to see all active OPD departments and their current queue status on a single dashboard screen so that I can monitor the entire hospital's patient flow from my desk without walking the floor.

**Acceptance Criteria:**

- **AC-091a:** Given I am logged in as an administrator, when I view the dashboard, then I can see a summary card for each active department showing: department name, current queue length, currently serving token number, and queue status (Active / Paused / Closed).
- **AC-091b:** Given a department's queue length changes, when I view the dashboard without refreshing, then the updated count is reflected within 5 seconds.
- **AC-091c:** Given a department's status changes to Paused, when I view the dashboard, then that department's card shows a visible "Paused" indicator within 5 seconds.

---

### US-092 — Drill Into a Department's Full Queue

| Field | Detail |
|-------|--------|
| **ID** | US-092 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-084 |

**Story:**
> As a hospital administrator, I want to click into any department's queue from the overview to see the full patient list so that I can investigate a specific bottleneck in detail when the overview indicates a problem.

**Acceptance Criteria:**

- **AC-092a:** Given I select a department from the overview, when the detail view loads, then I can see the complete patient queue for that department with all patient entries in the same format as the receptionist dashboard.
- **AC-092b:** Given I am in a department detail view, when I navigate back, then I return to the full multi-department overview.
- **AC-092c:** Given I drill into a department's queue, when I view the data, then it reflects the live current state — not a snapshot from when I first loaded the page.

---

### US-093 — Admin Dashboard Loads Within 3 Seconds

| Field | Detail |
|-------|--------|
| **ID** | US-093 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-003 |

**Story:**
> As a hospital administrator, I want the multi-department overview to load within 3 seconds so that I can check the hospital's operational status immediately, especially during peak morning hours.

**Acceptance Criteria:**

- **AC-093a:** Given I log in as an administrator, when the overview dashboard loads, then all department cards with live data are fully rendered and interactive within 3 seconds.
- **AC-093b:** Given I return to the dashboard after navigating to a sub-page, when it loads, then it shows the current live state within 3 seconds.

---

### US-094 — Admin Dashboard Auto-Updates Without Manual Refresh

| Field | Detail |
|-------|--------|
| **ID** | US-094 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-083, NFR-001 |

**Story:**
> As a hospital administrator, I want the overview dashboard to refresh automatically so that I see live queue data without needing to reload the page every time I want an updated picture.

**Acceptance Criteria:**

- **AC-094a:** Given I am watching the admin dashboard, when any department's queue length changes, then the updated count appears on the dashboard within 5 seconds without a manual page reload.
- **AC-094b:** Given a department is paused by a receptionist, when I view the overview dashboard, then that department's status changes to "Paused" within 5 seconds.

---

### US-095 — Admin Can Identify Congested Departments at a Glance

| Field | Detail |
|-------|--------|
| **ID** | US-095 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-083 |

**Story:**
> As a hospital administrator, I want departments with unusually long queues to be visually distinct on the overview dashboard so that I can identify bottlenecks at a glance rather than reading each card individually.

**Acceptance Criteria:**

- **AC-095a:** Given a department's queue length exceeds a threshold (to be configurable), when I view the overview, then that department's card is visually highlighted or has a distinct indicator drawing attention to it.
- **AC-095b:** Given a previously congested department's queue drops below the threshold, when I view the overview, then the highlight is removed and the card returns to its normal appearance.

---

### US-096 — Receptionist Dashboard Is Accessible on Any Modern Browser

| Field | Detail |
|-------|--------|
| **ID** | US-096 |
| **Role** | Receptionist |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-015 |

**Story:**
> As a receptionist, I want the dashboard to work in a standard web browser on the hospital's existing computers so that I do not need to install any software or use a dedicated device.

**Acceptance Criteria:**

- **AC-096a:** Given I open the receptionist dashboard on Chrome, Firefox, or Edge on a standard desktop or laptop, when I use it throughout a session, then all features function correctly without browser-specific issues.
- **AC-096b:** Given I use the dashboard on a computer with a minimum 1024×768 screen resolution, when I view the queue list and controls, then all elements are correctly rendered and usable.

---

### US-097 — Doctor Dashboard Is Accessible on Any Modern Browser

| Field | Detail |
|-------|--------|
| **ID** | US-097 |
| **Role** | Doctor |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-015 |

**Story:**
> As a doctor, I want my queue dashboard to work in a standard browser on my consultation room workstation so that I can use it without installing any software.

**Acceptance Criteria:**

- **AC-097a:** Given I open the doctor dashboard on any modern browser (Chrome, Firefox, Edge), when I use it for a full session, then all queue management actions (call next, mark complete, no-show, reorder) function correctly.
- **AC-097b:** Given the browser tab is in the background while I type clinical notes in another window, when I switch back to the queue dashboard, then it shows the current queue state immediately.

---

### US-098 — Critical Actions Reachable in 3 or Fewer Clicks

| Field | Detail |
|-------|--------|
| **ID** | US-098 |
| **Role** | Receptionist, Doctor, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-019 |

**Story:**
> As any staff user, I want all critical actions to be reachable in 3 or fewer clicks from the main dashboard screen so that I can act quickly under the time pressure of a busy OPD session.

**Acceptance Criteria:**

- **AC-098a:** Given I am a receptionist on my dashboard, when I count the clicks required to issue a token to a patient already in the system, then it requires no more than 3 clicks from the main screen.
- **AC-098b:** Given I am a doctor on my dashboard, when I count the clicks required to call the next patient, then it requires exactly 1 click from the main screen.
- **AC-098c:** Given I am an administrator on the overview, when I count the clicks required to pause a specific department's queue, then it requires no more than 3 clicks from the main overview screen.

---

---

## 10. Module 6 — AI Wait-Time Prediction

This module covers user stories related to how wait-time estimates are generated, displayed, updated, and communicated — for both patients and staff.

---

### US-099 — Patient Sees a Wait-Time Estimate After Joining

| Field | Detail |
|-------|--------|
| **ID** | US-099 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-039, FR-040, FR-042 |

**Story:**
> As a patient, I want to see an estimated wait time displayed on my queue screen as soon as I join so that I can immediately plan my time at the hospital rather than sitting in uncertainty.

**Acceptance Criteria:**

- **AC-099a:** Given I have joined a queue and the department has sufficient session data (5+ consultations completed), when I view my token screen, then an estimated wait time is displayed as a range (e.g., "approximately 20–30 minutes").
- **AC-099b:** Given the wait estimate is displayed, when I read it, then it is clearly presented as an estimate — not a guarantee — through its wording or a supporting label.
- **AC-099c:** Given the estimate is calculated, when I view it, then the value is proportional to my position — a patient at position 10 sees a longer estimate than one at position 3 in the same session.

---

### US-100 — Estimate Displayed as a Range, Not a Precise Time

| Field | Detail |
|-------|--------|
| **ID** | US-100 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-042 |

**Story:**
> As a patient, I want the wait-time estimate shown as a range (e.g., "20–30 minutes") rather than a precise time so that I understand it is an approximation and do not become frustrated if I am called slightly outside the stated window.

**Acceptance Criteria:**

- **AC-100a:** Given an estimate is available, when I view it on screen, then it is always displayed as a range (e.g., "approximately 15–25 minutes") — never as a single exact time (e.g., "exactly 18 minutes").
- **AC-100b:** Given the estimate range is displayed, when I check it, then the lower bound and upper bound are both clearly visible and form a meaningful spread.
- **AC-100c:** Given the estimate is labeled, when I read the label, then language such as "approximately," "estimated," or "around" is used to set the right expectation.

---

### US-101 — Estimate Updates Automatically as Queue Moves

| Field | Detail |
|-------|--------|
| **ID** | US-101 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-041, FR-045 |

**Story:**
> As a patient, I want my wait-time estimate to update automatically whenever patients ahead of me are served so that the estimate stays relevant and I always have an accurate picture of how long remains.

**Acceptance Criteria:**

- **AC-101a:** Given I am in the queue and a patient ahead of me is marked Served, when I view my screen without refreshing, then the estimate updates to reflect the shorter remaining wait within 5 seconds.
- **AC-101b:** Given my position decreases from 8 to 7, when the estimate updates, then the new estimate is shorter than the previous one.
- **AC-101c:** Given a priority patient is inserted ahead of me, when I view the estimate, then it increases to reflect my longer remaining wait within 5 seconds.

---

### US-102 — Estimate Not Available Early in Session

| Field | Detail |
|-------|--------|
| **ID** | US-102 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-043 |

**Story:**
> As a patient who joins at the very start of a session, I want the system to tell me honestly that a reliable estimate is not yet available so that I am not misled by an inaccurate number based on insufficient data.

**Acceptance Criteria:**

- **AC-102a:** Given fewer than 5 consultations have been completed in the current session and no prior session data is available for this department, when I view my token screen, then the estimate area shows a message such as "Estimate not yet available — check back shortly" rather than a numerical range.
- **AC-102b:** Given I am in this "not yet available" state, when the 5th consultation is marked complete in the session, then my screen updates to show a numerical estimate range within 5 seconds.
- **AC-102c:** Given the estimate is not yet available, when I read the message, then it is plain-language and reassuring — not a technical error or blank space.

---

### US-103 — Estimate Calculation Uses Session Data

| Field | Detail |
|-------|--------|
| **ID** | US-103 |
| **Role** | Patient, Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-040, FR-044, FR-045 |

**Story:**
> As a patient, I want the wait-time estimate to be based on the actual pace of consultations happening today so that the estimate reflects the real operational rhythm of the current session rather than a static or outdated assumption.

**Acceptance Criteria:**

- **AC-103a:** Given the doctor has completed 10 consultations this session with an average duration of 8 minutes, when a patient at position 5 views their estimate, then the displayed range is based on approximately 5 × 8 = 40 minutes, expressed as a range.
- **AC-103b:** Given a particularly fast or slow session is in progress, when the rolling average is updated, then the estimate for all queued patients updates to reflect the new pace within 5 seconds.
- **AC-103c:** Given each consultation is completed, when the system processes it, then the actual wait time (token issue time to call time) is logged for use in the rolling average calculation.

---

### US-104 — Estimate Is Clearly Labeled as an Estimate

| Field | Detail |
|-------|--------|
| **ID** | US-104 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-042 |

**Story:**
> As a patient, I want the wait-time estimate to be clearly labeled as an estimate so that I understand the system is providing a prediction, not a guaranteed appointment time.

**Acceptance Criteria:**

- **AC-104a:** Given an estimate is displayed, when I view the queue screen, then the estimate is accompanied by a visible label or prefix making clear it is an estimate (e.g., "Estimated wait," "Approximately," or similar).
- **AC-104b:** Given the estimate label is present, when I read it, then there is no language implying certainty (e.g., "Your wait is exactly X minutes" or "You will be seen at X time").

---

### US-105 — Receptionist Sees Estimate for New Arrivals on Dashboard

| Field | Detail |
|-------|--------|
| **ID** | US-105 |
| **Role** | Receptionist |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-068 |

**Story:**
> As a receptionist, I want to see the current estimated wait for a patient joining the queue right now so that I can give an honest verbal answer when patients at the desk ask "how long is the wait?"

**Acceptance Criteria:**

- **AC-105a:** Given the session has sufficient data, when I view the receptionist dashboard, then a "Current estimated wait for new patients" figure is displayed and updates as the queue changes.
- **AC-105b:** Given fewer than 5 consultations have been completed, when I view the dashboard, then the estimate area shows "Estimate not yet available" — not a number.
- **AC-105c:** Given the estimate is shown, when I read it, then it is a range consistent with what the next patient who joins would see on their phone.

---

### US-106 — Administrator Views Average Wait Time in Session Analytics

| Field | Detail |
|-------|--------|
| **ID** | US-106 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-046 |

**Story:**
> As a hospital administrator, I want to see the average wait time per department in the session analytics so that I can measure whether queue management is working and identify departments that need improvement.

**Acceptance Criteria:**

- **AC-106a:** Given a session is in progress, when I view the current session analytics on the admin dashboard, then I see the average wait time (time from token issue to being called) for each active department.
- **AC-106b:** Given a session has ended, when I view it in historical analytics, then the final average wait time for that session is recorded accurately per department.

---

### US-107 — Wait Estimate Accuracy Is Tracked Over Time

| Field | Detail |
|-------|--------|
| **ID** | US-107 |
| **Role** | Hospital Administrator |
| **Priority** | 🟢 Could Have |
| **Linked FR** | FR-044 |

**Story:**
> As a hospital administrator, I want the system to log actual versus estimated wait times so that estimate accuracy can be reviewed and improved over time as more session data is accumulated.

**Acceptance Criteria:**

- **AC-107a:** Given a patient is called after waiting, when I review session data, then the actual wait time (issue to call) is logged alongside any estimate that was active at the time of the patient's token issuance.
- **AC-107b:** Given multiple sessions of historical data exist, when the system calculates estimates for a new session, then it uses the accumulated historical average as a baseline where available.

---

### US-108 — Estimate Does Not Show Clinical Information

| Field | Detail |
|-------|--------|
| **ID** | US-108 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-026 |

**Story:**
> As a patient, I want the wait-time estimate to be based only on queue position and service pace so that I know the system is not using or displaying any of my medical or clinical information to generate it.

**Acceptance Criteria:**

- **AC-108a:** Given the wait-time estimate is displayed, when I examine what it is based on, then it is derived solely from my queue position and the department's average service duration — no clinical, diagnostic, or medical data is used or shown.
- **AC-108b:** Given the system generates a wait estimate, when I look at the estimate screen, then no medical information, diagnosis, or treatment details appear anywhere on the screen.

---

---

## 11. Module 7 — Notifications

This module covers all push notification stories — the triggers, content, delivery expectations, and patient control over notification preferences.

---

### US-109 — Receive a Notification When Turn Is Approaching

| Field | Detail |
|-------|--------|
| **ID** | US-109 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-047, FR-048, FR-051 |

**Story:**
> As a patient who has stepped away from the waiting area, I want to receive a push notification when a configured number of patients remain ahead of me so that I have enough time to return before my turn arrives.

**Acceptance Criteria:**

- **AC-109a:** Given the default notification threshold is 3 patients remaining ahead, when exactly 3 patients remain ahead of me, then I receive a push notification within 10 seconds of the queue reaching that state.
- **AC-109b:** Given the notification is received, when I read it, then it contains my token number, the department name, and a message prompting me to return to the waiting area.
- **AC-109c:** Given the threshold is set to 5 for a specific department, when exactly 5 patients remain ahead of me in that department, then I receive the notification at the 5-patient threshold — not at 3.
- **AC-109d:** Given I have already received the turn-approaching notification, when the queue moves further and I become next, then I receive the "next in queue" notification as a separate, distinct alert.

---

### US-110 — Receive a Notification When Next in Queue

| Field | Detail |
|-------|--------|
| **ID** | US-110 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-049, FR-051 |

**Story:**
> As a patient, I want to receive a push notification when I am next in the queue — only one patient ahead of me — so that I know to be ready and move toward the consultation room.

**Acceptance Criteria:**

- **AC-110a:** Given exactly 1 patient remains ahead of me, when the queue reaches that state, then I receive a push notification within 10 seconds.
- **AC-110b:** Given the notification is received, when I read it, then it clearly states I am next and includes my token number and department name.
- **AC-110c:** Given I was already notified at the turn-approaching threshold, when I receive the next-in-queue notification, then it is a distinct, second notification — not a duplicate of the first.

---

### US-111 — Receive a Notification When My Token Is Called

| Field | Detail |
|-------|--------|
| **ID** | US-111 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-050, FR-051 |

**Story:**
> As a patient, I want to receive a push notification the moment my specific token number is called by the doctor or receptionist so that I know to proceed to the consultation room immediately.

**Acceptance Criteria:**

- **AC-111a:** Given the doctor clicks "Call Next Patient" or the receptionist marks my token as Called, when the action completes, then I receive a push notification within 10 seconds.
- **AC-111b:** Given the notification is received, when I read it, then it includes my token number, the department name, and an instruction to proceed to the consultation room (e.g., "Please proceed to General Medicine now").
- **AC-111c:** Given the notification is sent, when it arrives on my device, then the token number in the notification matches my active token number exactly.

---

### US-112 — Receive a Notification When Queue Is Paused

| Field | Detail |
|-------|--------|
| **ID** | US-112 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-053 |

**Story:**
> As a patient waiting in a paused queue, I want to receive a push notification when the queue is paused so that I understand why the queue has stopped moving and I am not left wondering if something has gone wrong.

**Acceptance Criteria:**

- **AC-112a:** Given a receptionist or administrator pauses the queue, when I am currently in that queue, then I receive a push notification within 60 seconds of the pause action.
- **AC-112b:** Given the notification is received, when I read it, then it states clearly that the queue has been temporarily paused and that I will be notified when it resumes.
- **AC-112c:** Given the queue resumes after a pause, when I am still in the queue, then I receive a notification informing me the queue has resumed.

---

### US-113 — Receive a Notification When My Token Is Skipped

| Field | Detail |
|-------|--------|
| **ID** | US-113 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-052 |

**Story:**
> As a patient whose token was marked as no-show, I want to receive a notification informing me that I was skipped so that I know what happened and can decide whether to approach the reception desk.

**Acceptance Criteria:**

- **AC-113a:** Given my token is marked as No-Show by a receptionist or doctor, when the action completes, then I receive a push notification within 30 seconds.
- **AC-113b:** Given the notification is received, when I read it, then it clearly states that my token was skipped, includes my token number and department name, and suggests I contact reception if I believe this was an error.
- **AC-113c:** Given my token is skipped, when I view the app, then my token screen shows a "Skipped" or "No-Show" status rather than a still-active queue position.

---

### US-114 — Notifications Include Token Number and Department Name

| Field | Detail |
|-------|--------|
| **ID** | US-114 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-051 |

**Story:**
> As a patient, I want every notification I receive to include my token number and the department name so that I always know which queue the notification refers to, especially if I am visiting a large hospital with multiple departments.

**Acceptance Criteria:**

- **AC-114a:** Given any notification is sent (approaching, next, called, paused, skipped), when I receive and read it, then my token number and the department name are both present in the notification text.
- **AC-114b:** Given I have tokens in two different departments simultaneously (future feature), when I receive a notification for one of them, then the token number and department name in the notification clearly identify which queue it refers to.

---

### US-115 — Notifications Delivered Within 10 Seconds

| Field | Detail |
|-------|--------|
| **ID** | US-115 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-004 |

**Story:**
> As a patient, I want push notifications to arrive on my phone within 10 seconds of the triggering event so that I have enough lead time to return to the waiting area or consultation room.

**Acceptance Criteria:**

- **AC-115a:** Given a notification trigger occurs (turn approaching, next in queue, token called), when the notification is delivered to my device, then delivery happens within 10 seconds of the trigger event in the test environment.
- **AC-115b:** Given a notification is sent, when the notification delivery rate is measured across a test session, then at least 95% of notifications are delivered within the 10-second window.

---

### US-116 — Queue Status Always Visible Even Without Notifications

| Field | Detail |
|-------|--------|
| **ID** | US-116 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-054 |

**Story:**
> As a patient who has turned off push notifications or whose device does not support them, I want my live queue position to always be visible on the app screen so that I can still track my turn without relying on notifications.

**Acceptance Criteria:**

- **AC-116a:** Given I have disabled push notifications, when I open the app and view my queue screen, then my live position, patients ahead count, estimated wait time, and queue status all update automatically on screen — without any notifications being sent.
- **AC-116b:** Given notifications are disabled, when a queue event occurs (patient ahead served, queue paused), then my screen reflects the change within 5 seconds — proving that live updates are independent of the notification channel.

---

### US-117 — Patient Controls Their Notification Preferences

| Field | Detail |
|-------|--------|
| **ID** | US-117 |
| **Role** | Patient |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-054 |

**Story:**
> As a patient, I want to be able to turn push notifications on or off from my profile settings so that I can manage my own notification experience according to my preference.

**Acceptance Criteria:**

- **AC-117a:** Given I am on my profile settings screen, when I toggle notifications off, then I stop receiving all push notifications from the app immediately.
- **AC-117b:** Given I have turned notifications off and then turn them back on, when a notification event next occurs, then I receive the notification as expected.
- **AC-117c:** Given I toggle notifications off, when I view the settings screen later, then the toggle is clearly shown in the Off state — the setting is persisted across app restarts.

---

### US-118 — Notifications Do Not Contain Clinical Data

| Field | Detail |
|-------|--------|
| **ID** | US-118 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-026 |

**Story:**
> As a patient, I want push notifications to contain only queue operational information so that no personal health or medical information is ever transmitted through a phone notification that could be read by others seeing my screen.

**Acceptance Criteria:**

- **AC-118a:** Given any notification is sent, when I read it, then it contains only: my token number, the department name, and an operational prompt (e.g., "proceed to consultation room"). No health, diagnosis, or medical details appear.
- **AC-118b:** Given a notification is reviewed for compliance, when it is examined, then it passes a check confirming no clinical data, no age, no gender, and no phone number is included in the notification payload or display text.

---

### US-119 — Notifications Are Sent for All Relevant Queue Events

| Field | Detail |
|-------|--------|
| **ID** | US-119 |
| **Role** | Patient |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-047, FR-049, FR-050, FR-052, FR-053 |

**Story:**
> As a patient, I want to receive relevant notifications for all key moments in my queue journey — approaching turn, next, called, paused, and skipped — so that I am always informed at the moments that matter without having to watch the screen.

**Acceptance Criteria:**

- **AC-119a:** Given I am in an active queue, when the configured threshold of patients remain ahead, then I receive a turn-approaching notification.
- **AC-119b:** Given I am in an active queue, when I become next (1 ahead), then I receive a next-in-queue notification.
- **AC-119c:** Given I am in an active queue, when my token is called, then I receive a called notification.
- **AC-119d:** Given I am in an active queue, when the queue is paused, then I receive a paused notification within 60 seconds.
- **AC-119e:** Given my token is marked No-Show, when the action completes, then I receive a skipped notification within 30 seconds.

---

### US-120 — Notification Delivery Does Not Block Queue Operations

| Field | Detail |
|-------|--------|
| **ID** | US-120 |
| **Role** | Receptionist, Doctor |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-066 |

**Story:**
> As a receptionist or doctor, I want queue status updates and notification delivery to happen independently so that a failed notification delivery never prevents the queue from advancing or recording the correct status.

**Acceptance Criteria:**

- **AC-120a:** Given I mark a token as Called, when the push notification fails to deliver to the patient's device, then the token status still updates to Called on the dashboard and the queue records the action — the failed notification does not revert the status.
- **AC-120b:** Given a patient has no smartphone or has notifications disabled, when I mark their token as Called, then the action completes successfully and no error is shown to me — the system simply does not send a notification.

---

---

## 12. Module 8 — Reports and Analytics

This module covers stories for session summaries, historical analytics, data exports, and the audit log — all primarily used by the Hospital Administrator role.

---

### US-121 — View Live Session Summary on Dashboard

| Field | Detail |
|-------|--------|
| **ID** | US-121 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-088 |

**Story:**
> As a hospital administrator, I want to see a live session summary for each active department — including patients served, no-shows, and average wait time — so that I can assess operational performance at a glance without waiting until end of day.

**Acceptance Criteria:**

- **AC-121a:** Given I am on the admin dashboard during an active session, when I view the session analytics section, then I can see: total tokens issued, total patients served, total no-shows, and current average wait time — for each active department.
- **AC-121b:** Given a consultation is marked complete, when I view the session summary, then the Served count increments and the average wait time recalculates within 5 seconds.
- **AC-121c:** Given two departments are active simultaneously, when I view the summary, then each department's metrics are shown independently and clearly labelled.

---

### US-122 — View Historical Analytics for Up to 30 Days

| Field | Detail |
|-------|--------|
| **ID** | US-122 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-089 |

**Story:**
> As a hospital administrator, I want to view daily patient volume and average wait time per department for up to the past 30 days so that I can identify patterns, trends, and recurring bottlenecks over time.

**Acceptance Criteria:**

- **AC-122a:** Given I navigate to the historical analytics view, when I select a date range of up to 30 days, then the system displays total patients served and average wait time per department for each day in the selected range.
- **AC-122b:** Given data is available for the selected range, when I view it, then it is presented in a tabular or graphical format that is readable without requiring data export.
- **AC-122c:** Given I select a date range that includes days with no sessions, when I view those dates, then they are shown as zero or "No session" rather than being omitted silently.
- **AC-122d:** Given data is older than 90 days, when I attempt to view it, then the system does not show patient-identifiable data — only aggregate metrics are available beyond the retention period.

---

### US-123 — Identify Peak Volume Patterns by Day of Week

| Field | Detail |
|-------|--------|
| **ID** | US-123 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-089 |

**Story:**
> As a hospital administrator, I want to compare patient volume and wait times across different days of the week so that I can make informed staffing decisions — for example, adding an extra registration counter on Mondays when volume is consistently high.

**Acceptance Criteria:**

- **AC-123a:** Given I have 30 days of historical data, when I view the analytics, then I can see each day's patient volume and average wait time in a way that allows me to compare Mondays to Tuesdays to other days.
- **AC-123b:** Given I identify that a specific department consistently has long waits on Mondays, when I review the data, then the numbers support that conclusion with at least 4 weeks of Monday data visible.

---

### US-124 — Export Session Data as CSV

| Field | Detail |
|-------|--------|
| **ID** | US-124 |
| **Role** | Hospital Administrator |
| **Priority** | 🟢 Could Have |
| **Linked FR** | FR-090 |

**Story:**
> As a hospital administrator, I want to export the current session's queue data as a CSV file so that I can share it with the hospital's medical director or use it in external reporting tools.

**Acceptance Criteria:**

- **AC-124a:** Given I select the export option for the current session, when the file is downloaded, then it is a valid CSV file containing one row per token with the following columns: token number, patient name, department, join time, called time, served time, wait duration in minutes, and token status.
- **AC-124b:** Given the CSV is opened in a spreadsheet application, when I check the data, then all values are correctly populated and the wait duration in minutes is a numeric value matching the difference between join time and called time.
- **AC-124c:** Given the CSV contains patient names, when I review the file, then no patient phone numbers, ages, or genders are included — only the patient name associated with each token for operational reference.
- **AC-124d:** Given no tokens exist in the current session, when I attempt to export, then the system either exports an empty CSV with only headers or displays a message informing me there is no data to export.

---

### US-125 — View Audit Log Filtered by Date and Department

| Field | Detail |
|-------|--------|
| **ID** | US-125 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-103 |

**Story:**
> As a hospital administrator, I want to view and filter the audit log by date range, department, and action type so that I can quickly reconstruct the history of any queue session when a dispute or patient complaint arises.

**Acceptance Criteria:**

- **AC-125a:** Given I am on the audit log screen, when I filter by a specific department and date range, then only audit entries matching both filters are displayed.
- **AC-125b:** Given I filter by action type (e.g., "Queue Paused"), when the results are shown, then only entries of that action type are listed.
- **AC-125c:** Given I clear all filters, when I view the log, then all audit entries for my hospital are displayed in reverse chronological order.
- **AC-125d:** Given I am an administrator from Hospital A, when I view the audit log, then I see only entries from Hospital A — no entries from any other hospital are accessible.

---

### US-126 — Audit Log Is Tamper-Proof

| Field | Detail |
|-------|--------|
| **ID** | US-126 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-104 |

**Story:**
> As a hospital administrator, I want the audit log to be read-only so that no staff member — including me — can alter or delete historical records, ensuring the integrity of the operational history.

**Acceptance Criteria:**

- **AC-126a:** Given I am viewing the audit log as an administrator, when I look for edit or delete controls on any log entry, then no such controls exist — the log is read-only.
- **AC-126b:** Given a receptionist or doctor performs a queue action, when I view the resulting audit log entry, then it accurately reflects the action and cannot be modified by that staff member or by me.
- **AC-126c:** Given an audit entry records a "Queue Paused" action by a receptionist, when I cross-reference it with the queue timeline for that session, then the timestamp and actor name are consistent with what actually occurred.

---

### US-127 — Audit Log Records Every Significant Queue Action

| Field | Detail |
|-------|--------|
| **ID** | US-127 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-101, FR-102 |

**Story:**
> As a hospital administrator, I want the audit log to capture every significant queue action automatically so that I have a complete, uninterrupted record without relying on staff to manually log their actions.

**Acceptance Criteria:**

- **AC-127a:** Given any of the following actions occur — token issued, token called, token served, token marked no-show, token cancelled, patient priority changed, queue paused, queue resumed, queue closed, manual reorder — when the action completes, then an audit log entry is automatically created.
- **AC-127b:** Given an audit entry is created, when I view it, then it contains: the action type, the name and role of the user who performed it, the affected token number or department name, and the date and time.
- **AC-127c:** Given I review a full session in the audit log, when I look for any gap or missing action, then there are no gaps — every action taken during the session is represented in sequence.

---

### US-128 — Receptionist Session Summary Matches Audit Log

| Field | Detail |
|-------|--------|
| **ID** | US-128 |
| **Role** | Receptionist, Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-071, FR-101 |

**Story:**
> As a hospital administrator, I want the session summary counts visible on the receptionist dashboard to always match the audit log so that I can trust the summary figures without independently verifying them against the log.

**Acceptance Criteria:**

- **AC-128a:** Given a session has completed, when I compare the receptionist's session summary (served, no-show, cancelled counts) to the corresponding audit log entries, then both show the same numbers.
- **AC-128b:** Given a token is marked Served, when I immediately check both the session summary and the audit log, then the Served count in the summary increments and a matching "Token Served" entry appears in the log within 5 seconds.

---

### US-129 — Analytics Contains No Patient PII

| Field | Detail |
|-------|--------|
| **ID** | US-129 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-025 |

**Story:**
> As a hospital administrator, I want the analytics dashboards and exported reports to show only aggregate or anonymised data so that individual patients' personal information is never exposed in an operational report.

**Acceptance Criteria:**

- **AC-129a:** Given I view the historical analytics dashboard, when I examine all metrics shown, then no patient phone numbers, ages, or genders appear — only aggregate figures (count, average, totals) are shown.
- **AC-129b:** Given I export a session CSV, when I review all columns, then the only patient-identifying field is the patient name associated with each token for operational traceability — no phone, age, or gender data is present.

---

### US-130 — Session Data Retained for 90 Days

| Field | Detail |
|-------|--------|
| **ID** | US-130 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | NFR-034 |

**Story:**
> As a hospital administrator, I want session data to be retained for 90 days so that I have sufficient historical information for trend analysis, quality review, and responding to patient complaints.

**Acceptance Criteria:**

- **AC-130a:** Given a session was completed 89 days ago, when I view historical analytics and navigate to that date, then the session's aggregate data is still accessible.
- **AC-130b:** Given a session was completed more than 90 days ago, when I navigate to that date, then patient-identifiable data associated with that session has been anonymised or removed — only aggregate metrics remain if retained.

---

### US-131 — No-Show Rate Visible in Session Summary

| Field | Detail |
|-------|--------|
| **ID** | US-131 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-088 |

**Story:**
> As a hospital administrator, I want to see the no-show count in the current session summary so that I can detect whether a high no-show rate is affecting throughput and take corrective action.

**Acceptance Criteria:**

- **AC-131a:** Given an active session is in progress, when I view the session analytics, then I see a "No-Show" count alongside the Served and Queued counts for each department.
- **AC-131b:** Given a token is marked No-Show, when I view the session summary, then the No-Show count for that department increments by 1 immediately.

---

### US-132 — Peak Queue Depth Recorded per Session

| Field | Detail |
|-------|--------|
| **ID** | US-132 |
| **Role** | Hospital Administrator |
| **Priority** | 🟢 Could Have |
| **Linked FR** | FR-088 |

**Story:**
> As a hospital administrator, I want to see the peak queue depth (highest simultaneous queue length) for each session so that I can understand the maximum pressure the system experienced and compare it against the configured capacity.

**Acceptance Criteria:**

- **AC-132a:** Given a session is completed, when I view the session summary, then a "Peak queue depth" figure is shown representing the maximum number of patients simultaneously in the queue during that session.
- **AC-132b:** Given the peak depth is compared to the configured maximum capacity, when I view the data, then I can determine what percentage of capacity was used at peak — helping me calibrate the maximum capacity setting.

---

---

## 13. Module 9 — User and Role Management

This module covers all stories related to how the hospital administrator creates, configures, and manages staff accounts on the platform.

---

### US-133 — Create a Receptionist Account

| Field | Detail |
|-------|--------|
| **ID** | US-133 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-092, FR-097 |

**Story:**
> As a hospital administrator, I want to create a login account for each of my receptionists so that they can access the receptionist dashboard with their own credentials without sharing a single shared login.

**Acceptance Criteria:**

- **AC-133a:** Given I am on the staff management screen, when I enter a receptionist's name and phone number and confirm creation, then the account is created immediately and the receptionist can log in with the provided credentials.
- **AC-133b:** Given the receptionist account is created, when that receptionist logs in, then they see only the receptionist dashboard — not the doctor or administrator dashboards.
- **AC-133c:** Given I attempt to create a staff account with a phone number already registered to another staff member in my hospital, when I submit, then the system displays a duplicate account error and does not create a second account.

---

### US-134 — Create a Doctor Account

| Field | Detail |
|-------|--------|
| **ID** | US-134 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-092, FR-097 |

**Story:**
> As a hospital administrator, I want to create a login account for each doctor who runs OPD sessions so that they can access their own dedicated queue dashboard with their own credentials.

**Acceptance Criteria:**

- **AC-134a:** Given I create a doctor account with a name and phone number, when the doctor logs in, then they see only the doctor dashboard for their assigned department.
- **AC-134b:** Given the doctor account is created but no department is assigned yet, when the doctor logs in, then the system informs them they are not yet assigned to a department — they cannot view any queue data until assigned.
- **AC-134c:** Given I create two doctor accounts for the same department, when both doctors log in separately, then each sees the same department queue — they do not see each other's data or account details.

---

### US-135 — Assign a Receptionist to One or More Departments

| Field | Detail |
|-------|--------|
| **ID** | US-135 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-094 |

**Story:**
> As a hospital administrator, I want to assign each receptionist to one or more specific departments so that they can only manage the queues for the departments they are responsible for.

**Acceptance Criteria:**

- **AC-135a:** Given I assign a receptionist to General Medicine and Pediatrics, when that receptionist logs in, then they can see and manage both queues — and no others.
- **AC-135b:** Given I assign a receptionist to a single department, when they log in, then they see only that department's queue.
- **AC-135c:** Given I change a receptionist's department assignment, when they next log in, then they see the updated department list — the change takes effect on the next login.

---

### US-136 — Assign a Doctor to a Department

| Field | Detail |
|-------|--------|
| **ID** | US-136 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-095 |

**Story:**
> As a hospital administrator, I want to assign each doctor to their specific OPD department so that when they log in they see only the queue for the department they are consulting in that day.

**Acceptance Criteria:**

- **AC-136a:** Given I assign a doctor to Orthopedics, when that doctor logs in, then they see the Orthopedics queue only.
- **AC-136b:** Given I reassign a doctor from Orthopedics to General Medicine, when the doctor next logs in, then they see the General Medicine queue — Orthopedics is no longer visible.
- **AC-136c:** Given the department edit screen shows the currently assigned doctor, when I view it, then I can identify which doctor is assigned to each department without navigating to the staff accounts list separately.

---

### US-137 — Change a Staff Member's Role

| Field | Detail |
|-------|--------|
| **ID** | US-137 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-093 |

**Story:**
> As a hospital administrator, I want to change a staff member's role from Receptionist to Doctor (or vice versa) so that I can update the system when a staff member's responsibilities change without creating a new account.

**Acceptance Criteria:**

- **AC-137a:** Given I change a receptionist's role to Doctor and assign them a department, when they next log in, then they see the doctor dashboard — not the receptionist dashboard.
- **AC-137b:** Given a role change is made, when the staff member is currently logged in at the time of the change, then their current session continues with the old role until they log out and log back in — the change takes effect on next login.
- **AC-137c:** Given I change a role, when I view the staff list, then the updated role is immediately reflected next to that staff member's name.

---

### US-138 — Deactivate a Staff Account

| Field | Detail |
|-------|--------|
| **ID** | US-138 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | FR-096 |

**Story:**
> As a hospital administrator, I want to deactivate a staff account when an employee leaves the hospital so that they immediately lose access to all queue data and dashboards.

**Acceptance Criteria:**

- **AC-138a:** Given I deactivate a staff account, when that staff member attempts to log in, then the system displays an "Account inactive — please contact your administrator" message and denies access.
- **AC-138b:** Given a staff account is deactivated, when I view the active staff list, then the deactivated account no longer appears in it — it may appear in a separate "inactive" list if one exists.
- **AC-138c:** Given a deactivated account had an active session at the time of deactivation, when their session next performs an action, then the session is terminated and they are redirected to the login screen.
- **AC-138d:** Given I deactivate a staff account by mistake, when I reactivate it, then the staff member can log in again with their existing credentials — no new account creation is required.

---

### US-139 — View All Staff Accounts in My Hospital

| Field | Detail |
|-------|--------|
| **ID** | US-139 |
| **Role** | Hospital Administrator |
| **Priority** | 🟡 Should Have |
| **Linked FR** | FR-087 |

**Story:**
> As a hospital administrator, I want to see a list of all staff accounts in my hospital — including their name, role, assigned department, and account status — so that I have a clear picture of who has access to what.

**Acceptance Criteria:**

- **AC-139a:** Given I navigate to the staff management screen, when I view the list, then every staff account for my hospital is shown with: name, role (Receptionist / Doctor), assigned department(s), and status (Active / Inactive).
- **AC-139b:** Given I create a new staff account, when I return to the staff list, then the new account appears immediately without a page refresh.
- **AC-139c:** Given I deactivate an account, when I view the staff list, then that account shows an "Inactive" status — it is not removed from the list entirely.

---

### US-140 — Admin Cannot Access Staff from Another Hospital

| Field | Detail |
|-------|--------|
| **ID** | US-140 |
| **Role** | Hospital Administrator |
| **Priority** | 🔴 Must Have |
| **Linked FR** | NFR-027 |

**Story:**
> As a hospital administrator, I want my staff management screen to show only the staff accounts belonging to my hospital so that I cannot accidentally view or modify accounts from other hospitals on the platform.

**Acceptance Criteria:**

- **AC-140a:** Given I am logged in as Administrator of Hospital A, when I view the staff management screen, then only Hospital A's staff accounts are visible.
- **AC-140b:** Given I attempt to access a staff account from Hospital B by manipulating a URL or request parameter, when the request is processed, then the system returns an access-denied error and no Hospital B data is served.

---

## 14. Future Enhancements — Won't Have (MVP)

The following stories are explicitly out of scope for the MVP. They are included here to communicate product intent, inform architecture decisions, and provide a clear backlog for future releases. These stories map to the future features defined in Section 14 of the PRD.

---

### US-141 — SMS Notifications for Patients Without Smartphones

| Field | Detail |
|-------|--------|
| **ID** | US-141 |
| **Role** | Patient |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-01 (Release 2) |

**Story:**
> As a patient who does not have a smartphone or has push notifications blocked, I want to receive an SMS to my registered mobile number when my turn is approaching so that I can still benefit from turn alerts without using the app.

**Acceptance Criteria (future):**

- Given an SMS integration is active, when my turn-approaching threshold is reached, then an SMS is sent to my registered number containing my token number, department name, and a prompt to return.
- Given I do not have the app, when I receive the SMS, then the content is sufficient for me to act without needing to open any application.

---

### US-142 — ABDM / ABHA QR Code Integration

| Field | Detail |
|-------|--------|
| **ID** | US-142 |
| **Role** | Patient |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-02 (Release 2) |

**Story:**
> As a patient with an Ayushman Bharat Health Account (ABHA), I want to scan my ABHA QR code at the hospital to check in and join a queue so that I do not need to create a separate QueueCare AI account.

**Acceptance Criteria (future):**

- Given ABDM Scan-and-Share integration is active, when I scan my ABHA QR code at the OPD, then the system recognises my identity and issues a token linked to my health ID.

---

### US-143 — Multi-Department Patient Journey Tracking

| Field | Detail |
|-------|--------|
| **ID** | US-143 |
| **Role** | Patient |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-03 (Release 2) |

**Story:**
> As a patient who needs to visit multiple departments in one visit (consultation → lab → pharmacy), I want the system to guide me through each stage so that I know where to go next and how long each wait will be.

**Acceptance Criteria (future):**

- Given multi-department routing is active, when my consultation is marked complete, then the system automatically joins me to the next applicable queue (e.g., lab) and I receive a new token for that stage.

---

### US-144 — Predictive Crowd Forecasting

| Field | Detail |
|-------|--------|
| **ID** | US-144 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-04 (Release 2) |

**Story:**
> As a hospital administrator, I want to see a forecast of expected patient volumes for the upcoming week based on historical patterns so that I can proactively schedule additional staff on heavy days.

**Acceptance Criteria (future):**

- Given sufficient historical data is available, when I view the forecasting screen, then I see a predicted patient volume range per department for each day in the next 7 days.

---

### US-145 — Regional Language Support

| Field | Detail |
|-------|--------|
| **ID** | US-145 |
| **Role** | Patient |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-07 (Release 2) |

**Story:**
> As a patient whose primary language is Tamil, Telugu, Bengali, or Marathi, I want to use the QueueCare AI app in my preferred language so that I can navigate it comfortably without relying on English or Hindi.

**Acceptance Criteria (future):**

- Given a regional language is selected, when I use the app, then all patient-facing screens — including the token screen, queue status, and notifications — are displayed in the selected language.

---

### US-146 — Multi-Location Dashboard for Clinic Chains

| Field | Detail |
|-------|--------|
| **ID** | US-146 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-08 (Release 3) |

**Story:**
> As a clinic chain operations manager, I want to see live queue metrics for all my clinic locations from a single dashboard so that I can monitor cross-location performance without logging in and out of separate hospital accounts.

**Acceptance Criteria (future):**

- Given multi-location access is configured, when I log in to the chain dashboard, then I see a summary card for each location with its live queue status.

---

### US-147 — In-Waiting-Area Display Board (Kiosk Mode)

| Field | Detail |
|-------|--------|
| **ID** | US-147 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-10 (Release 3) |

**Story:**
> As a hospital administrator, I want to display the currently serving token number on a wall-mounted screen in the waiting area so that patients who do not have smartphones can still see the queue progress.

**Acceptance Criteria (future):**

- Given kiosk mode is activated for a department, when the screen is connected, then it displays the currently serving token number in a large, readable font that updates automatically.

---

### US-148 — Appointment and Walk-In Queue Integration

| Field | Detail |
|-------|--------|
| **ID** | US-148 |
| **Role** | Patient, Receptionist |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-09 (Release 3) |

**Story:**
> As a patient with a pre-booked appointment, I want my appointment slot to be automatically converted into a queue token at the appropriate time so that I join the same queue as walk-in patients in a fair, unified sequence.

**Acceptance Criteria (future):**

- Given a patient has a booked appointment, when their slot time arrives, then the system issues them a token and inserts them into the queue at the correct position relative to walk-in patients.

---

### US-149 — Advanced ML-Based Wait-Time Prediction

| Field | Detail |
|-------|--------|
| **ID** | US-149 |
| **Role** | Patient |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-17 (Release 4) |

**Story:**
> As a patient, I want my wait-time estimate to improve progressively as the platform learns from real operational data across many sessions so that estimates become more accurate and trustworthy over time.

**Acceptance Criteria (future):**

- Given the platform has accumulated sufficient real session data, when an ML model is trained and deployed, then wait-time estimates demonstrate measurably higher accuracy compared to the rule-based v1 model — validated against actual wait times in a test dataset.

---

### US-150 — HMS Integration

| Field | Detail |
|-------|--------|
| **ID** | US-150 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-15 (Release 4) |

**Story:**
> As a hospital administrator, I want QueueCare AI to exchange data with our existing Hospital Management System so that patient registration data from the HMS pre-populates in QueueCare AI and queue data can be recorded back in the HMS without double entry.

**Acceptance Criteria (future):**

- Given HMS integration is configured, when a patient is registered in the HMS, then their record is available in QueueCare AI without manual re-entry by the receptionist.

---

### US-151 — Self-Service Hospital Onboarding

| Field | Detail |
|-------|--------|
| **ID** | US-151 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-13 (Release 3) |

**Story:**
> As a new hospital administrator, I want to register my hospital on the QueueCare AI platform myself through a self-service portal so that I do not need to contact the QueueCare AI team to create my account.

**Acceptance Criteria (future):**

- Given a self-service onboarding portal is available, when a new administrator visits it, they can register their hospital, create their account, and configure departments without any manual involvement from the QueueCare AI team.

---

### US-152 — Doctor Session Pace Analytics

| Field | Detail |
|-------|--------|
| **ID** | US-152 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-05 (Release 2) |

**Story:**
> As a hospital administrator, I want to see consultation pace analytics per doctor so that I can identify whether a doctor's speed is contributing to queue delays and make informed scheduling decisions.

**Acceptance Criteria (future):**

- Given session analytics include doctor-level data, when I view the analytics for a department, then I can see the average consultation duration per doctor per session over a selected date range.

---

### US-153 — SLA-Based Queue Performance Benchmarks

| Field | Detail |
|-------|--------|
| **ID** | US-153 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-18 (Release 4) |

**Story:**
> As a hospital administrator, I want to set a target maximum average wait time per department so that the system alerts me when a department consistently exceeds the target and I can take action.

**Acceptance Criteria (future):**

- Given a wait-time SLA of 45 minutes is set for General Medicine, when the department's rolling average exceeds 45 minutes, then the admin dashboard highlights the department and an alert is triggered.

---

### US-154 — Compliance Certification Support

| Field | Detail |
|-------|--------|
| **ID** | US-154 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-19 (Release 4) |

**Story:**
> As a hospital administrator procuring QueueCare AI for a government hospital, I want the platform to carry a DISHA-aligned data privacy certification so that my procurement team can verify compliance before approving the deployment.

**Acceptance Criteria (future):**

- Given compliance certification is obtained, when an administrator reviews the platform, then certification documentation is available and verifiable through the platform or a published compliance statement.

---

### US-155 — PDF and Excel Performance Reports

| Field | Detail |
|-------|--------|
| **ID** | US-155 |
| **Role** | Hospital Administrator |
| **Priority** | ⚪ Won't Have (MVP) |
| **Linked FR** | F-12 (Release 3) |

**Story:**
> As a hospital administrator, I want to export performance reports as PDF or Excel files with charts and visualisations so that I can present queue performance data at management meetings without manually building slides.

**Acceptance Criteria (future):**

- Given the export feature is available, when I generate a PDF or Excel report for a selected date range, then the file includes charts showing patient volume, average wait time, and no-show rate per department — formatted for management presentation.

---

---

## 15. User Story Summary Table

The table below provides a complete index of all 155 user stories in this document.

| ID | Module | Role | Title | Priority |
|----|--------|------|-------|----------|
| US-001 | Authentication | Patient | Register with phone number and OTP | 🔴 Must Have |
| US-002 | Authentication | Patient | Log in with OTP | 🔴 Must Have |
| US-003 | Authentication | Patient | Log out | 🔴 Must Have |
| US-004 | Authentication | Staff | Log in with credentials to role-specific dashboard | 🔴 Must Have |
| US-005 | Authentication | Staff | Session expires after inactivity | 🔴 Must Have |
| US-006 | Authentication | Staff | Account lockout after 5 failed attempts | 🔴 Must Have |
| US-007 | Authentication | All | Reset password via phone number | 🔴 Must Have |
| US-008 | Authentication | Staff | Deactivated account blocked from login | 🔴 Must Have |
| US-009 | Authentication | All | Unauthenticated access prevented | 🔴 Must Have |
| US-010 | Authentication | Patient | Privacy notice shown at registration | 🔴 Must Have |
| US-011 | Authentication | Staff | Staff cannot self-register | 🔴 Must Have |
| US-012 | Authentication | Admin | Cross-hospital data isolation | 🔴 Must Have |
| US-013 | Profile Management | Patient | Update name, age, gender | 🟡 Should Have |
| US-014 | Profile Management | Patient | View active token from profile | 🟡 Should Have |
| US-015 | Profile Management | Patient | Enable or disable push notifications | 🟡 Should Have |
| US-016 | Profile Management | Patient | Request account and data deletion | 🟡 Should Have |
| US-017 | Profile Management | Staff | View role and assigned department | 🟢 Could Have |
| US-018 | Profile Management | Staff | View hospital name on dashboard | 🟢 Could Have |
| US-019 | Profile Management | Staff | Change password | 🟡 Should Have |
| US-020 | Profile Management | Patient | Data minimisation transparency | 🟡 Should Have |
| US-021 | Hospital Management | Admin | Create hospital profile | 🔴 Must Have |
| US-022 | Hospital Management | Admin | Create an OPD department | 🔴 Must Have |
| US-023 | Hospital Management | Admin | Edit department details | 🔴 Must Have |
| US-024 | Hospital Management | Admin | Deactivate a department | 🔴 Must Have |
| US-025 | Hospital Management | Admin | Configure maximum queue capacity | 🟡 Should Have |
| US-026 | Hospital Management | Admin | Configure session times | 🟡 Should Have |
| US-027 | Hospital Management | Admin | Configure notification threshold | 🟡 Should Have |
| US-028 | Hospital Management | Admin | Generate department QR code | 🔴 Must Have |
| US-029 | Hospital Management | Admin | View all departments | 🔴 Must Have |
| US-030 | Hospital Management | Patient | Select hospital from list | 🔴 Must Have |
| US-031 | Hospital Management | Patient | View department queue status before joining | 🔴 Must Have |
| US-032 | Hospital Management | Receptionist / Admin | Session opens and closes cleanly each day | 🔴 Must Have |
| US-033 | Hospital Management | Admin | Hospital isolated from other hospitals | 🔴 Must Have |
| US-034 | Hospital Management | Admin | Complete setup without IT support | 🟡 Should Have |
| US-035 | Hospital Management | Admin | New department does not disrupt existing departments | 🟡 Should Have |
| US-036 | Queue Management | Patient | Join queue by scanning QR code | 🔴 Must Have |
| US-037 | Queue Management | Patient | Join queue by selecting department manually | 🔴 Must Have |
| US-038 | Queue Management | Patient | Receive a digital queue token | 🔴 Must Have |
| US-039 | Queue Management | Patient | View live queue position in real time | 🔴 Must Have |
| US-040 | Queue Management | Patient | See queue status (Active/Paused/Closed) | 🔴 Must Have |
| US-041 | Queue Management | Patient | Cannot hold two active tokens for same department | 🔴 Must Have |
| US-042 | Queue Management | Patient | Cancel own token | 🔴 Must Have |
| US-043 | Queue Management | Patient | Cannot join a full queue | 🔴 Must Have |
| US-044 | Queue Management | Patient | Cannot join a closed or paused queue | 🔴 Must Have |
| US-045 | Queue Management | Patient | Guest token for patients without smartphone | 🔴 Must Have |
| US-046 | Queue Management | Receptionist | Returning patient found at desk by phone number | 🔴 Must Have |
| US-047 | Queue Management | Receptionist | Register new patient at desk | 🔴 Must Have |
| US-048 | Queue Management | Patient | Stays in queue when queue closes after joining | 🔴 Must Have |
| US-049 | Queue Management | Patient | Queue screen auto-refreshes | 🟡 Should Have |
| US-050 | Queue Management | Patient | Graceful error when service unavailable | 🟡 Should Have |
| US-051 | Queue Management | Receptionist | Issue token at desk within 60 seconds | 🔴 Must Have |
| US-052 | Queue Management | Receptionist | Mark token as Called | 🔴 Must Have |
| US-053 | Queue Management | Receptionist | Mark token as Served | 🔴 Must Have |
| US-054 | Queue Management | Receptionist | Mark token as No-Show | 🔴 Must Have |
| US-055 | Queue Management | Receptionist | Cancel a patient's token at the desk | 🔴 Must Have |
| US-056 | Queue Management | Receptionist | Flag patient as priority | 🔴 Must Have |
| US-057 | Queue Management | Receptionist | Pause the queue | 🔴 Must Have |
| US-058 | Queue Management | Receptionist | Resume the queue | 🔴 Must Have |
| US-059 | Queue Management | Receptionist | Close the queue at end of session | 🔴 Must Have |
| US-060 | Queue Management | Receptionist | View live session summary counts | 🟡 Should Have |
| US-061 | Queue Management | Receptionist | Cannot access other departments | 🔴 Must Have |
| US-062 | Queue Management | Receptionist | Open a session for a department | 🔴 Must Have |
| US-063 | Queue Management | Receptionist | Token actions reflected in audit log | 🔴 Must Have |
| US-064 | Queue Management | Receptionist | See current wait estimate for new arrivals | 🟡 Should Have |
| US-065 | Queue Management | Receptionist / Doctor | Priority flag visible to both receptionist and doctor | 🔴 Must Have |
| US-066 | Queue Management | Doctor | View full patient queue before session starts | 🔴 Must Have |
| US-067 | Queue Management | Doctor | Call next patient with one action | 🔴 Must Have |
| US-068 | Queue Management | Doctor | Mark consultation as complete | 🔴 Must Have |
| US-069 | Queue Management | Doctor | Mark called patient as no-show | 🟡 Should Have |
| US-070 | Queue Management | Doctor | See how many patients remain | 🟡 Should Have |
| US-071 | Queue Management | Doctor | Manually reorder patients | 🟡 Should Have |
| US-072 | Queue Management | Doctor | Cannot access other departments | 🔴 Must Have |
| US-073 | Queue Management | Doctor | Queue requires zero additional data entry | 🔴 Must Have |
| US-074 | Queue Management | Doctor | Priority patients clearly visible | 🔴 Must Have |
| US-075 | Queue Management | Doctor | Dashboard updates without manual refresh | 🔴 Must Have |
| US-076 | Queue Management | Admin | Override and pause any department queue | 🔴 Must Have |
| US-077 | Queue Management | Admin | Close any department queue | 🔴 Must Have |
| US-078 | Queue Management | Admin | Admin queue actions audit logged | 🔴 Must Have |
| US-079 | Queue Management | Admin | Session auto-closes at configured end time | 🟡 Should Have |
| US-080 | Queue Management | Admin | Session data retained after close | 🔴 Must Have |
| US-081 | Queue Management | Admin | Admin can override any queue without receptionist | 🔴 Must Have |
| US-082 | Queue Management | Receptionist / Admin | Token numbers reset each day | 🔴 Must Have |
| US-083 | Dashboard | Receptionist | Single-screen queue management | 🔴 Must Have |
| US-084 | Dashboard | Receptionist | Dashboard loads within 3 seconds | 🔴 Must Have |
| US-085 | Dashboard | Receptionist | Queue list ordered by token number and priority | 🔴 Must Have |
| US-086 | Dashboard | Receptionist | Each queue entry shows key patient details | 🔴 Must Have |
| US-087 | Dashboard | Doctor | Currently serving and up next at a glance | 🔴 Must Have |
| US-088 | Dashboard | Doctor | Doctor dashboard loads within 3 seconds | 🔴 Must Have |
| US-089 | Dashboard | Doctor | Call Next and Mark Complete are primary actions | 🔴 Must Have |
| US-090 | Dashboard | Doctor | Works on standard desktop/laptop browser | 🟡 Should Have |
| US-091 | Dashboard | Admin | View all departments in one live overview | 🔴 Must Have |
| US-092 | Dashboard | Admin | Drill into a department's full queue | 🔴 Must Have |
| US-093 | Dashboard | Admin | Admin dashboard loads within 3 seconds | 🔴 Must Have |
| US-094 | Dashboard | Admin | Admin dashboard auto-updates without manual refresh | 🔴 Must Have |
| US-095 | Dashboard | Admin | Identify congested departments at a glance | 🟡 Should Have |
| US-096 | Dashboard | Receptionist | Accessible on any modern browser | 🟡 Should Have |
| US-097 | Dashboard | Doctor | Accessible on any modern browser | 🟡 Should Have |
| US-098 | Dashboard | All Staff | Critical actions in 3 or fewer clicks | 🔴 Must Have |
| US-099 | AI Prediction | Patient | Wait-time estimate shown after joining | 🔴 Must Have |
| US-100 | AI Prediction | Patient | Estimate shown as a range, not exact time | 🔴 Must Have |
| US-101 | AI Prediction | Patient | Estimate updates automatically as queue moves | 🔴 Must Have |
| US-102 | AI Prediction | Patient | Estimate not available early in session | 🔴 Must Have |
| US-103 | AI Prediction | Patient | Estimate uses current session data | 🔴 Must Have |
| US-104 | AI Prediction | Patient | Estimate clearly labelled as an estimate | 🔴 Must Have |
| US-105 | AI Prediction | Receptionist | Sees estimate for new arrivals on dashboard | 🟡 Should Have |
| US-106 | AI Prediction | Admin | Average wait time in session analytics | 🟡 Should Have |
| US-107 | AI Prediction | Admin | Estimate accuracy tracked over time | 🟢 Could Have |
| US-108 | AI Prediction | Patient | Estimate contains no clinical data | 🔴 Must Have |
| US-109 | Notifications | Patient | Notification when turn is approaching | 🔴 Must Have |
| US-110 | Notifications | Patient | Notification when next in queue | 🔴 Must Have |
| US-111 | Notifications | Patient | Notification when token is called | 🔴 Must Have |
| US-112 | Notifications | Patient | Notification when queue is paused | 🟡 Should Have |
| US-113 | Notifications | Patient | Notification when token is skipped | 🟡 Should Have |
| US-114 | Notifications | Patient | Notifications include token number and dept name | 🔴 Must Have |
| US-115 | Notifications | Patient | Notifications delivered within 10 seconds | 🔴 Must Have |
| US-116 | Notifications | Patient | Queue status visible without notifications | 🔴 Must Have |
| US-117 | Notifications | Patient | Patient controls notification preferences | 🟡 Should Have |
| US-118 | Notifications | Patient | Notifications contain no clinical data | 🔴 Must Have |
| US-119 | Notifications | Patient | Notifications sent for all relevant queue events | 🔴 Must Have |
| US-120 | Notifications | Receptionist / Doctor | Notification failure does not block queue operations | 🔴 Must Have |
| US-121 | Reports | Admin | View live session summary on dashboard | 🟡 Should Have |
| US-122 | Reports | Admin | View 30-day historical analytics | 🟡 Should Have |
| US-123 | Reports | Admin | Identify peak volume patterns by day of week | 🟡 Should Have |
| US-124 | Reports | Admin | Export session data as CSV | 🟢 Could Have |
| US-125 | Reports | Admin | View audit log filtered by date and department | 🟡 Should Have |
| US-126 | Reports | Admin | Audit log is tamper-proof | 🔴 Must Have |
| US-127 | Reports | Admin | Audit log records every significant queue action | 🔴 Must Have |
| US-128 | Reports | Receptionist / Admin | Session summary matches audit log | 🟡 Should Have |
| US-129 | Reports | Admin | Analytics contains no patient PII | 🔴 Must Have |
| US-130 | Reports | Admin | Session data retained for 90 days | 🟡 Should Have |
| US-131 | Reports | Admin | No-show rate visible in session summary | 🟡 Should Have |
| US-132 | Reports | Admin | Peak queue depth recorded per session | 🟢 Could Have |
| US-133 | User Management | Admin | Create a receptionist account | 🔴 Must Have |
| US-134 | User Management | Admin | Create a doctor account | 🔴 Must Have |
| US-135 | User Management | Admin | Assign receptionist to one or more departments | 🔴 Must Have |
| US-136 | User Management | Admin | Assign doctor to a department | 🔴 Must Have |
| US-137 | User Management | Admin | Change a staff member's role | 🟡 Should Have |
| US-138 | User Management | Admin | Deactivate a staff account | 🔴 Must Have |
| US-139 | User Management | Admin | View all staff accounts | 🟡 Should Have |
| US-140 | User Management | Admin | Cannot access staff from another hospital | 🔴 Must Have |
| US-141 | Future | Patient | SMS notifications for patients without smartphones | ⚪ Won't Have |
| US-142 | Future | Patient | ABDM / ABHA QR code integration | ⚪ Won't Have |
| US-143 | Future | Patient | Multi-department patient journey tracking | ⚪ Won't Have |
| US-144 | Future | Admin | Predictive crowd forecasting | ⚪ Won't Have |
| US-145 | Future | Patient | Regional language support | ⚪ Won't Have |
| US-146 | Future | Admin | Multi-location dashboard for clinic chains | ⚪ Won't Have |
| US-147 | Future | Admin | In-waiting-area display board (kiosk mode) | ⚪ Won't Have |
| US-148 | Future | Patient / Receptionist | Appointment and walk-in queue integration | ⚪ Won't Have |
| US-149 | Future | Patient | Advanced ML-based wait-time prediction | ⚪ Won't Have |
| US-150 | Future | Admin | HMS integration | ⚪ Won't Have |
| US-151 | Future | Admin | Self-service hospital onboarding | ⚪ Won't Have |
| US-152 | Future | Admin | Doctor session pace analytics | ⚪ Won't Have |
| US-153 | Future | Admin | SLA-based queue performance benchmarks | ⚪ Won't Have |
| US-154 | Future | Admin | Compliance certification support | ⚪ Won't Have |
| US-155 | Future | Admin | PDF and Excel performance reports | ⚪ Won't Have |

---

## 16. Traceability Matrix

This matrix maps each user story to its corresponding functional requirement(s) in `05_Product_Requirements_Document.md`. This ensures every story is grounded in a documented requirement and supports QA traceability.

| Story ID | Story Title (Short) | Linked FR(s) / NFR(s) |
|----------|--------------------|-----------------------|
| US-001 | Patient registration | FR-001, FR-002 |
| US-002 | Patient OTP login | FR-003, FR-004 |
| US-003 | Patient logout | FR-006 |
| US-004 | Staff credential login | FR-097, FR-098, FR-100 |
| US-005 | Staff session expiry | NFR-022 |
| US-006 | Account lockout | NFR-024 |
| US-007 | Password reset | FR-099 |
| US-008 | Deactivated account blocked | FR-096 |
| US-009 | Unauthenticated access prevention | FR-098, NFR-023 |
| US-010 | Privacy notice at registration | NFR-032 |
| US-011 | Staff cannot self-register | FR-097 |
| US-012 | Cross-hospital isolation | NFR-027 |
| US-013 | Update patient profile | FR-005 |
| US-014 | View active token from profile | FR-027 |
| US-015 | Enable/disable notifications | FR-054 |
| US-016 | Request data deletion | NFR-033 |
| US-017 | View role and department | FR-100 |
| US-018 | View hospital name | FR-100 |
| US-019 | Staff password change | FR-099 |
| US-020 | Data minimisation transparency | NFR-031, NFR-032 |
| US-021 | Create hospital profile | FR-010 |
| US-022 | Create OPD department | FR-011 |
| US-023 | Edit department details | FR-012 |
| US-024 | Deactivate department | FR-013 |
| US-025 | Configure max queue capacity | FR-017, FR-018 |
| US-026 | Configure session times | FR-019, FR-108 |
| US-027 | Configure notification threshold | FR-048 |
| US-028 | Generate department QR code | FR-024 |
| US-029 | View all departments | FR-086 |
| US-030 | Patient selects hospital | FR-014 |
| US-031 | Patient views dept status | FR-015, FR-016 |
| US-032 | Session lifecycle | FR-105, FR-106, FR-107, FR-109, FR-110 |
| US-033 | Hospital data isolation | NFR-027, NFR-028 |
| US-034 | Setup without IT support | FR-010, FR-011, FR-019 |
| US-035 | New dept no disruption | NFR-029 |
| US-036 | Join via QR code | FR-023, FR-026 |
| US-037 | Join via department list | FR-014, FR-015 |
| US-038 | Receive digital token | FR-020, FR-021, FR-022 |
| US-039 | Live queue position | FR-030, FR-031, FR-032, FR-033, FR-034 |
| US-040 | Queue status indicator | FR-035 |
| US-041 | No duplicate tokens | FR-027 |
| US-042 | Cancel own token | FR-028 |
| US-043 | Cannot join full queue | FR-017, FR-018 |
| US-044 | Cannot join closed/paused queue | FR-016 |
| US-045 | Guest token | FR-009 |
| US-046 | Find returning patient | FR-008 |
| US-047 | Register new patient at desk | FR-007 |
| US-048 | Stay in queue after close | FR-109 |
| US-049 | Auto-refresh queue screen | FR-034 |
| US-050 | Graceful error state | NFR-010 |
| US-051 | Token issuance ≤ 60 seconds | FR-025, FR-064 |
| US-052 | Mark token Called | FR-065, FR-066 |
| US-053 | Mark token Served | FR-065 |
| US-054 | Mark token No-Show | FR-065, FR-067 |
| US-055 | Cancel patient token | FR-029 |
| US-056 | Priority flagging | FR-055, FR-056, FR-057, FR-058, FR-059, FR-060 |
| US-057 | Pause queue | FR-069 |
| US-058 | Resume queue | FR-069 |
| US-059 | Close queue | FR-070, FR-109 |
| US-060 | Session summary counts | FR-071 |
| US-061 | Department scope restriction | FR-072 |
| US-062 | Open session | FR-107 |
| US-063 | Audit log for token actions | FR-101, FR-102 |
| US-064 | Wait estimate for new arrivals | FR-068 |
| US-065 | Priority visible to both roles | FR-057, FR-078 |
| US-066 | Doctor views full queue | FR-074, FR-078 |
| US-067 | Call next patient | FR-076 |
| US-068 | Mark consultation complete | FR-077 |
| US-069 | Mark patient no-show (doctor) | FR-079 |
| US-070 | Patients remaining count | FR-080 |
| US-071 | Manual queue reorder | FR-061 |
| US-072 | Doctor dept isolation | FR-081 |
| US-073 | Zero data entry for doctor | FR-073, FR-076, FR-077 |
| US-074 | Priority patients clearly visible | FR-074, FR-078 |
| US-075 | Doctor dashboard auto-updates | FR-037, NFR-001 |
| US-076 | Admin pauses any dept queue | FR-085 |
| US-077 | Admin closes any dept queue | FR-085 |
| US-078 | Admin actions audit logged | FR-101, FR-102 |
| US-079 | Session auto-close | FR-108 |
| US-080 | Session data retained | FR-110 |
| US-081 | Admin overrides without receptionist | FR-085 |
| US-082 | Token numbers reset daily | FR-106 |
| US-083 | Single-screen receptionist dashboard | FR-062, FR-063 |
| US-084 | Receptionist dashboard load time | NFR-003 |
| US-085 | Queue list ordered by priority + token | FR-063 |
| US-086 | Queue entry patient details | FR-063 |
| US-087 | Currently serving and up next | FR-075 |
| US-088 | Doctor dashboard load time | NFR-003 |
| US-089 | Primary action prominence | FR-076, FR-077, NFR-019 |
| US-090 | Works on desktop browser | NFR-015 |
| US-091 | Multi-dept live overview | FR-082, FR-083 |
| US-092 | Drill into dept queue | FR-084 |
| US-093 | Admin dashboard load time | NFR-003 |
| US-094 | Admin dashboard auto-updates | FR-083, NFR-001 |
| US-095 | Congested dept indicator | FR-083 |
| US-096 | Receptionist cross-browser | NFR-015 |
| US-097 | Doctor cross-browser | NFR-015 |
| US-098 | Critical actions ≤ 3 clicks | NFR-019 |
| US-099 | Wait estimate on join | FR-039, FR-040, FR-042 |
| US-100 | Estimate as range | FR-042 |
| US-101 | Estimate auto-recalculates | FR-041, FR-045 |
| US-102 | Estimate unavailable early | FR-043 |
| US-103 | Estimate uses session data | FR-040, FR-044, FR-045 |
| US-104 | Estimate labelled as estimate | FR-042 |
| US-105 | Receptionist sees new arrival estimate | FR-068 |
| US-106 | Average wait in analytics | FR-046 |
| US-107 | Accuracy tracked over time | FR-044 |
| US-108 | No clinical data in estimate | NFR-026 |
| US-109 | Turn-approaching notification | FR-047, FR-048, FR-051 |
| US-110 | Next-in-queue notification | FR-049, FR-051 |
| US-111 | Token called notification | FR-050, FR-051 |
| US-112 | Queue paused notification | FR-053 |
| US-113 | Token skipped notification | FR-052 |
| US-114 | Notifications include token + dept | FR-051 |
| US-115 | Notifications within 10 seconds | NFR-004 |
| US-116 | Queue status visible without notifications | FR-054 |
| US-117 | Patient controls notification prefs | FR-054 |
| US-118 | No clinical data in notifications | NFR-026 |
| US-119 | All queue events trigger notifications | FR-047, FR-049, FR-050, FR-052, FR-053 |
| US-120 | Notification failure doesn't block queue | FR-066 |
| US-121 | Live session summary | FR-088 |
| US-122 | 30-day historical analytics | FR-089 |
| US-123 | Peak volume patterns | FR-089 |
| US-124 | CSV export | FR-090 |
| US-125 | Audit log filtering | FR-103 |
| US-126 | Audit log tamper-proof | FR-104 |
| US-127 | Audit log completeness | FR-101, FR-102 |
| US-128 | Summary matches audit log | FR-071, FR-101 |
| US-129 | Analytics no patient PII | NFR-025 |
| US-130 | 90-day data retention | NFR-034 |
| US-131 | No-show count in summary | FR-088 |
| US-132 | Peak queue depth recorded | FR-088 |
| US-133 | Create receptionist account | FR-092, FR-097 |
| US-134 | Create doctor account | FR-092, FR-097 |
| US-135 | Assign receptionist to departments | FR-094 |
| US-136 | Assign doctor to department | FR-095 |
| US-137 | Change staff role | FR-093 |
| US-138 | Deactivate staff account | FR-096 |
| US-139 | View all staff | FR-087 |
| US-140 | Cannot access other hospitals' staff | NFR-027 |
| US-141–US-155 | Future enhancements | F-01 to F-21 (Release 2–4) |

---

## 17. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 (Draft) | 2026-08-01 | Ram Chauhan | Initial document — all 155 user stories across 9 modules, with MoSCoW priorities, acceptance criteria, summary table, and traceability matrix |

---

### Priority Summary

| Priority | Count | Scope |
|----------|-------|-------|
| 🔴 Must Have | 88 | Core MVP — non-negotiable |
| 🟡 Should Have | 40 | MVP — high value, include if time allows |
| 🟢 Could Have | 5 | MVP — nice to have, deferred if needed |
| ⚪ Won't Have | 15 | Future releases — not in MVP |
| **Total** | **155** | |

---

*Pending approval. Next document in sequence: `08_System_Architecture.md`*
