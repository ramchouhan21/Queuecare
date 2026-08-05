# QueueCare AI — Product Requirements Document (PRD)

**Product:** QueueCare AI — AI-Based Smart Hospital Queue Management and Wait Time Prediction System
**Document ID:** 05
**Version:** 1.0 (Draft)
**Status:** Pending Approval
**Last Updated:** August 1, 2026
**Author:** Ram Chauhan
**Related Documents:** `00_Project_Charter.md`, `01_Product_Vision.md`, `02_Problem_Statement.md`, `03_Market_Research.md`, `04_Competitor_Analysis.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Product Vision](#3-product-vision)
4. [Business Objectives](#4-business-objectives)
5. [Product Goals](#5-product-goals)
6. [Problem Statement](#6-problem-statement)
7. [Target Users](#7-target-users)
8. [User Personas Summary](#8-user-personas-summary)
9. [Product Scope](#9-product-scope)
10. [Functional Requirements](#10-functional-requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Product Modules](#12-product-modules)
13. [MVP Features](#13-mvp-features)
14. [Future Features](#14-future-features)
15. [User Roles and Permissions](#15-user-roles-and-permissions)
16. [User Workflows](#16-user-workflows)
17. [Acceptance Criteria](#17-acceptance-criteria)
18. [Success Metrics](#18-success-metrics)
19. [Assumptions](#19-assumptions)
20. [Constraints](#20-constraints)
21. [Risks](#21-risks)
22. [Out of Scope](#22-out-of-scope)
23. [Future Roadmap](#23-future-roadmap)
24. [Conclusion](#24-conclusion)

---

## 1. Executive Summary

QueueCare AI is an AI-powered hospital queue management and wait-time prediction platform designed for healthcare facilities in India. The product addresses one of the most persistent and universal challenges in Indian healthcare: patients endure long, unpredictable waits in hospital outpatient departments (OPDs) with no visibility into their queue position or how long they will wait.

QueueCare AI delivers a cloud-native SaaS platform serving four user roles — patients, receptionists, doctors, and hospital administrators — each through a purpose-built experience. Patients receive a mobile-friendly interface to join queues, track their live position, and receive notifications when their turn approaches. Receptionists gain digital tools to issue tokens, manage queue status, and reduce the burden of repetitive patient inquiries. Doctors see a structured, real-time view of their patient queue with priority support. Administrators access dashboards for monitoring and improving departmental patient flow.

The defining capability that differentiates QueueCare AI from existing tools is **AI-driven wait-time prediction**: the system estimates each patient's expected wait duration dynamically based on queue depth, historical consultation patterns, and real-time service rates — replacing the guesswork that currently characterizes hospital waiting.

This Product Requirements Document defines every capability the product must deliver, the standards it must meet, and the boundaries of its scope. It is the authoritative reference for designers, developers, QA engineers, and stakeholders throughout product development.

The v1 MVP will be delivered as a functional prototype over six months, serving as the foundation for future commercial deployment.

---

## 2. Product Overview

| Attribute | Description |
|-----------|-------------|
| **Product Name** | QueueCare AI |
| **Product Type** | AI-powered hospital queue management and wait-time prediction platform |
| **Delivery Model** | Cloud-based SaaS — monthly or annual hospital subscription |
| **Primary Market** | India — private hospitals, multi-specialty hospitals, and clinic chains |
| **Secondary Market** | Government hospitals (phased adoption) |
| **Release Scope** | Version 1 (v1) prototype |
| **Project Duration** | 6 months |

QueueCare AI is not a hospital management system (HMS), electronic medical record (EMR), telemedicine platform, or appointment booking service. It is a dedicated operational platform focused on a single domain: managing the patient queue from hospital arrival through consultation completion, as efficiently and transparently as possible.

---

## 3. Product Vision

QueueCare AI will become the most trusted intelligent queue management platform for hospitals in India — transforming unpredictable, opaque waiting experiences into transparent, efficient, and patient-centered care journeys through real-time visibility and AI-driven insight.

The product's long-term purpose is to ensure that every patient who walks into a hospital knows where they stand, every staff member has the tools to manage flow efficiently, and every administrator can make data-informed decisions about capacity and bottlenecks.

### Vision Summary

> Every patient should know exactly how long they will wait — and every hospital should have the tools to make that wait as short as possible.

### Guiding Principles

The following principles govern all product decisions in this document and beyond.

| Principle | Meaning |
|-----------|---------|
| **Patient-First Transparency** | Patients always see their queue status. Information is honest, including when an estimate is uncertain. |
| **Staff Simplicity** | Tools for receptionists and doctors must work quickly under real hospital pressure. |
| **AI as Advisor** | Wait-time predictions support human decisions — they never replace clinical judgment. |
| **Operational Clarity** | Administrators see what is happening now and what patterns emerge over time. |
| **Focused Scope** | The product does queue management exceptionally well rather than sprawling into unrelated workflows. |
| **Privacy by Default** | Patient data is collected only as needed and protected as a core product responsibility. |

---

## 4. Business Objectives

The following business objectives define what QueueCare AI must achieve for the organization and its hospital customers.

| ID | Objective | Measure of Success |
|----|-----------|-------------------|
| BO-01 | Reduce outpatient waiting time in subscribing hospitals | Demonstrated reduction in average patient wait time versus a simulated or measured baseline |
| BO-02 | Improve operational efficiency for hospital reception staff | Reduction in manual queue management steps and patient inquiry handling time |
| BO-03 | Increase patient satisfaction with the hospital visit experience | Higher patient experience ratings attributable to queue transparency |
| BO-04 | Provide hospital administrators with actionable queue intelligence | Administrators can identify and respond to bottlenecks using platform data |
| BO-05 | Validate product-market fit through a demonstrable prototype | A functional v1 prototype suitable for academic evaluation and pilot hospital conversations |
| BO-06 | Establish a SaaS delivery model suitable for hospital adoption | Product can be subscribed to and deployed without hardware investment by a hospital |
| BO-07 | Differentiate from existing queue tools through AI-powered prediction | At least one measurably more accurate wait-time estimate than static queue-count approaches |

---

## 5. Product Goals

Product goals translate business objectives into specific, measurable outcomes the product must achieve.

| ID | Goal | Target |
|----|------|--------|
| PG-01 | Enable patients to self-join a queue and receive a token without visiting the reception desk | 100% of token issuances supported digitally via mobile QR or desk registration |
| PG-02 | Deliver real-time queue position updates to patients | Queue status visible to patients within 5 seconds of any queue change |
| PG-03 | Provide AI-generated wait-time estimates to every queued patient | Every queued patient receives a displayed wait-time estimate at all times |
| PG-04 | Reduce front-desk patient inquiries about queue status | Patients can self-serve their queue status without approaching reception |
| PG-05 | Give receptionists a single screen to manage all queue activity | Receptionist dashboard covers token issuance, queue management, and status updates in one view |
| PG-06 | Give doctors a real-time view of their patient queue | Doctors see live queue with patient details and can call the next patient in one action |
| PG-07 | Give administrators real-time department-level queue performance data | Live queue metrics visible per department at all times |
| PG-08 | Support patient priority flagging for urgent cases | Reception can mark patients as priority; system places them appropriately in queue order |
| PG-09 | Deliver push notifications to patients before their turn | Patients receive a notification when a configurable number of patients remain ahead of them |

---

## 6. Problem Statement

In Indian hospitals and healthcare facilities, outpatient queue management remains largely manual, fragmented, and opaque — resulting in long, unpredictable patient waiting times, inefficient staff workflows, and limited operational visibility for administrators.

Patients lack real-time information about their queue position and expected wait duration. Reception staff manage high-volume, overlapping queues using paper tokens and informal coordination. Doctors operate without structured queue visibility or prioritization support. Hospital administrators lack the data required to identify bottlenecks, forecast demand, or measure queue performance.

Existing approaches — including paper-based systems, standalone hardware displays, hospital management systems, appointment platforms, and government digital health portals — fail to provide integrated, intelligent, real-time queue management across the full outpatient patient journey.

This systemic dysfunction negatively affects patient satisfaction, care access, staff efficiency, health system throughput, and institutional trust — across government hospitals, private hospitals, multi-specialty facilities, and clinic chains throughout India.

### Core Problems This Product Solves

| ID | Problem | Who Is Affected |
|----|---------|----------------|
| P-01 | Patients do not know how long they will wait | Patients |
| P-02 | Patients do not know their queue position in real time | Patients |
| P-03 | Patients must physically stay near the waiting area to avoid missing their turn | Patients |
| P-04 | Reception staff manage queues manually with paper tokens | Receptionists |
| P-05 | Reception staff spend excessive time answering queue status questions | Receptionists |
| P-06 | Urgent patients are not systematically prioritized within the queue | Receptionists, Doctors |
| P-07 | Doctors have no real-time visibility into their waiting patient queue | Doctors |
| P-08 | Administrators have no live data on queue lengths, wait times, or bottlenecks | Administrators |
| P-09 | Queue performance cannot be measured or improved without data | Administrators |
| P-10 | Patients who step away miss their turn and must re-queue | Patients |

---

## 7. Target Users

QueueCare AI serves four user groups, listed in order of interaction frequency and experience impact.

### 7.1 End Users

| Priority | User | How They Use the Product |
|----------|------|--------------------------|
| 1 | **Patient** | Joins queue via mobile or reception desk, tracks live position, receives wait-time estimates and turn notifications |
| 2 | **Receptionist** | Issues and manages digital queue tokens, controls queue flow, handles patient prioritization |
| 3 | **Doctor** | Views their real-time patient queue, calls next patient, marks consultations complete |
| 4 | **Hospital Administrator** | Configures the hospital and departments, monitors live queue performance, reviews operational reports |

### 7.2 Customer Organizations

QueueCare AI is sold as a SaaS subscription to healthcare organizations, not to individual users.

| Customer Type | Description |
|---------------|-------------|
| Private hospitals | Single-location hospitals with daily OPD operations |
| Multi-specialty hospitals | Large facilities with multiple departments and high patient volumes |
| Clinic chains | Groups of 3–20 locations operating standardized outpatient workflows |
| Government hospitals | Public healthcare facilities (targeted for later phases) |

### 7.3 User Distinction

- **Patients** are end users who are not affiliated with the hospital organization. They interact with a public-facing experience.
- **Receptionists, Doctors, and Administrators** are hospital staff. They use role-specific staff-facing experiences within the platform.
- Hospital administrators are the platform's primary organizational decision-makers for configuration and operational oversight.

---

## 8. User Personas Summary

The following personas summarize the core characteristics, goals, and pain points of each user group. These personas inform feature design and prioritization decisions throughout the product.

---

### Persona 1 — The Patient

**Name:** Priya Sharma
**Age:** 38 | **Location:** Pune, Maharashtra
**Situation:** Mother of two, visiting a multi-specialty hospital OPD for a follow-up consultation with an orthopedic doctor. She has taken a half-day off work and is anxious about how long the visit will take.

**Goals:**
- Know how many patients are ahead of her and how long she will wait
- Receive a notification before her turn so she can step away for tea or a phone call
- Avoid waiting in a crowded room for hours without information

**Pain Points:**
- She has previously waited over two hours only to be told she missed her token number
- She cannot leave the waiting area because she does not know when her turn will come
- Hospital staff could not give her a reliable estimate when she asked

**How QueueCare AI Helps:**
She scans a QR code on arrival, receives a digital token, and sees her live queue position on her phone. The system sends her a notification when 3 patients remain ahead of her. She waits in the cafeteria and returns calmly in time for her consultation.

---

### Persona 2 — The Receptionist

**Name:** Ramesh Kumar
**Age:** 29 | **Location:** Hyderabad, Telangana
**Situation:** Senior receptionist at a busy private hospital managing the General Medicine OPD. On a typical morning he handles 80–120 patient registrations and fields 40–50 status questions from anxious patients.

**Goals:**
- Register patients and issue tokens quickly, especially during the 9–11 AM peak
- Direct patients to departments without confusion
- Spend less time answering "how long is the wait?" and more time processing registrations

**Pain Points:**
- Paper tokens get lost, duplicated, and disputed — creating chaos during peak hours
- He has no way to tell patients how long they will wait because he does not know himself
- Patients crowd his desk constantly asking for updates

**How QueueCare AI Helps:**
He registers patients in seconds and the system issues a digital token automatically. Patients self-track their position on their phones, eliminating most status inquiries. He can see the entire department queue on a single screen and mark patients as called with one click.

---

### Persona 3 — The Doctor

**Name:** Dr. Anita Desai
**Age:** 44 | **Location:** Mumbai, Maharashtra
**Situation:** Senior physician managing a General Medicine OPD session from 9 AM to 1 PM. She typically sees 30–40 patients per session. Patients crowd outside her consultation room door because they have no way to know when they will be called.

**Goals:**
- See a clean list of waiting patients in order, without interruptions at the door
- Identify if any patients flagged as urgent need to be moved earlier in the queue
- Mark a consultation complete and call the next patient from her workstation without leaving the room

**Pain Points:**
- Patients knock on the consultation room door constantly — disrupting ongoing consultations
- She has no visibility into how many patients are still waiting and whether any are urgent
- Manually sequencing patients is time-consuming and inconsistent

**How QueueCare AI Helps:**
She sees a live list of queued patients on her dashboard, ordered by token number and priority flag. She calls the next patient with a single action; the system notifies the patient automatically. Priority-flagged patients are visually highlighted so she can adjust order when clinically appropriate.

---

### Persona 4 — The Hospital Administrator

**Name:** Suresh Malhotra
**Age:** 52 | **Location:** Delhi, NCR
**Situation:** Operations Manager at a 120-bed multi-specialty hospital responsible for patient flow, staffing allocation, and service quality across five OPD departments.

**Goals:**
- Monitor live queue status across all departments from a single dashboard
- Identify which departments have the longest waits and respond before complaints escalate
- Produce data on average wait times to present to the hospital's medical director

**Pain Points:**
- He walks floor-to-floor to assess queue status because he has no central visibility
- Staffing decisions are based on instinct and past experience, not real-time data
- He cannot measure whether operational changes have actually reduced wait times

**How QueueCare AI Helps:**
He monitors all departments from a single admin dashboard with live queue metrics. He can see which departments are congested and reassign resources proactively. Historical analytics show wait-time trends by department, time of day, and day of week.

---

## 9. Product Scope

### 9.1 In Scope — Version 1 (MVP)

The following capabilities are included in the v1 product scope and must be delivered in the initial release.

| # | Capability |
|---|------------|
| 1 | Patient registration and authentication |
| 2 | Hospital and department selection by patients |
| 3 | Digital queue token generation (mobile QR scan and receptionist-assisted) |
| 4 | Live queue position tracking for patients |
| 5 | AI-driven wait-time prediction for queued patients |
| 6 | Patient notification when turn is approaching |
| 7 | Patient priority flagging by reception staff |
| 8 | Receptionist dashboard for token issuance and queue management |
| 9 | Doctor dashboard for patient queue view and call management |
| 10 | Hospital administrator dashboard for live queue monitoring |
| 11 | Hospital and department configuration by administrators |
| 12 | User role management (admin creates and manages staff accounts) |
| 13 | Basic operational reports (wait time, queue throughput, session summary) |

### 9.2 Out of Scope — Version 1

The following capabilities are explicitly excluded from the v1 scope. They are addressed in detail in Section 22 and the Future Roadmap in Section 23.

| # | Capability | Reason |
|---|------------|--------|
| 1 | Online appointment booking | Adjacent product domain; not a queue management function |
| 2 | Electronic Medical Records (EMR) | Clinical data management is outside the platform's purpose |
| 3 | Online payments or billing | Financial workflow separate from queue management |
| 4 | Telemedicine / video consultations | Different service delivery model |
| 5 | Lab result delivery | Clinical data sharing outside scope |
| 6 | Pharmacy management | Post-consultation workflow beyond v1 scope |
| 7 | Hospital discovery or search | Consumer discovery function, not queue management |
| 8 | Ambulance tracking | Emergency service management |
| 9 | Insurance claims | Financial and clinical documentation workflow |
| 10 | Predictive crowd forecasting for future days | Requires extended historical data; planned for a future release |
| 11 | Multi-department automated patient routing | Complex cross-department handoffs deferred to a future release |
| 12 | SMS notifications (non-app) | Requires telephony integration; deferred post-MVP |
| 13 | ABDM / ABHA integration | Valuable but deferred; planned for Release 2 |
| 14 | In-waiting-area display board (kiosk mode) | Deferred to Release 3 |

### 9.3 Scope Boundary Statement

QueueCare AI v1 manages the patient's journey from **arrival at the hospital and queue join** through **consultation completion and queue exit**. Everything that happens before a patient arrives at the facility (appointment booking, pre-registration, hospital discovery) and everything that happens after consultation (billing, pharmacy, diagnostics, lab) is outside the v1 scope.

---

## 10. Functional Requirements

Functional requirements define what the product must do. Each requirement is written as a clear, testable statement. Requirements are organized by feature area and tagged with a unique ID.

**Notation:**
- **[MVP]** — Required in version 1
- **[FUTURE]** — Planned for a future release
- **Priority:** High / Medium / Low

---

### 10.1 Patient Registration and Authentication

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | The system must allow a new patient to create an account using a mobile phone number. | High [MVP] |
| FR-002 | The system must verify the patient's phone number using a one-time password (OTP) sent to that number during registration. | High [MVP] |
| FR-003 | The system must allow a registered patient to log in using their phone number and OTP. | High [MVP] |
| FR-004 | The OTP must expire after 5 minutes. Attempting to use an expired OTP must display an expiry message and offer a resend option. | High [MVP] |
| FR-005 | The system must allow a patient to update their profile details, including name, age, and gender. | Medium [MVP] |
| FR-006 | The system must allow a patient to log out of their account from any screen. | High [MVP] |
| FR-007 | The system must allow a receptionist to register a new patient on their behalf at the desk when the patient does not have a smartphone. | High [MVP] |
| FR-008 | The system must allow a receptionist to find an existing patient record by phone number during desk-assisted registration. | High [MVP] |
| FR-009 | The system must allow a patient to be registered as a guest (without a personal account) when assisted by a receptionist at the desk. | Medium [MVP] |

---

### 10.2 Hospital and Department Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-010 | The system must allow a hospital administrator to create and configure a hospital profile, including hospital name, address, and contact information. | High [MVP] |
| FR-011 | The system must allow a hospital administrator to create one or more departments within a hospital (e.g., General Medicine, Orthopedics, Pediatrics). | High [MVP] |
| FR-012 | The system must allow a hospital administrator to edit department details, including department name and assigned doctor. | High [MVP] |
| FR-013 | The system must allow a hospital administrator to activate or deactivate a department. An inactive department must not accept new patients or appear in patient-facing department lists. | High [MVP] |
| FR-014 | The system must allow a patient to select a hospital from a list of hospitals available on the platform. | High [MVP] |
| FR-015 | The system must allow a patient to select a department within the chosen hospital to join its queue. | High [MVP] |
| FR-016 | The system must display each department's current queue status — active, paused, or closed — to patients before they attempt to join. | High [MVP] |
| FR-017 | The system must allow a hospital administrator to configure a maximum queue capacity per department per session. | Medium [MVP] |
| FR-018 | The system must prevent a patient from joining a queue that has reached its maximum capacity and must display a clear, user-friendly message explaining why joining is not possible. | High [MVP] |
| FR-019 | The system must allow an administrator to configure the hospital's operating hours and OPD session times per department. | Medium [MVP] |

---

### 10.3 Queue Token Generation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | The system must generate a unique digital queue token for each patient who successfully joins a queue. | High [MVP] |
| FR-021 | Each token must display: the patient's name, token number, department name, queue position at time of joining, and estimated wait time. | High [MVP] |
| FR-022 | Token numbers must be sequential, starting from 1 at the beginning of each department session and incrementing by 1 for each new patient who joins. | High [MVP] |
| FR-023 | The system must allow a patient to join a queue by scanning a department-specific QR code using their smartphone camera. | High [MVP] |
| FR-024 | The system must generate a unique QR code for each active department that, when scanned, initiates the queue join action for that department. | High [MVP] |
| FR-025 | The system must allow a receptionist to issue a token to a patient directly from the receptionist dashboard without the patient using a smartphone. | High [MVP] |
| FR-026 | The system must display the issued token and full queue details on the patient's mobile screen within 3 seconds of a successful join action. | High [MVP] |
| FR-027 | A patient may only hold one active token per department at a time. If a patient attempts to join the same department queue again, the system must display their existing token and current position instead of issuing a duplicate. | High [MVP] |
| FR-028 | The system must allow a patient to cancel their own active token and remove themselves from the queue at any time before being called. | High [MVP] |
| FR-029 | The system must allow a receptionist to cancel a patient's token on their behalf from the receptionist dashboard. | High [MVP] |

---

### 10.4 Live Queue Tracking

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-030 | The system must display a patient's current queue position in real time on their mobile screen. | High [MVP] |
| FR-031 | The system must automatically update a patient's queue position whenever any patient ahead of them is called, served, skipped, or removed from the queue. | High [MVP] |
| FR-032 | The system must display the number of patients currently ahead of the patient in the queue. | High [MVP] |
| FR-033 | The patient's queue screen must display the following on a single view: token number, department name, current position, number of patients ahead, currently serving token number, and estimated wait time. | High [MVP] |
| FR-034 | The system must refresh the patient's queue status automatically without the patient needing to manually reload the screen. | High [MVP] |
| FR-035 | The system must display a clear status indicator on the patient's screen showing whether the queue is active, paused, or closed. | High [MVP] |
| FR-036 | A receptionist must be able to view the full queue list for their assigned department, showing all patients in current order with token number, patient name, priority flag, and token status. | High [MVP] |
| FR-037 | The doctor dashboard must display the complete patient queue for their assigned department in real time, ordered by token sequence and priority. | High [MVP] |
| FR-038 | The administrator dashboard must display the live queue length and the currently serving token for each active department without manual refresh. | High [MVP] |

---

### 10.5 Wait-Time Prediction

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-039 | The system must calculate and display an estimated wait time for every patient who is currently queued. | High [MVP] |
| FR-040 | The estimated wait time must be calculated based on the patient's current queue position and the department's recent average consultation duration for the active session. | High [MVP] |
| FR-041 | The system must recalculate and update the wait-time estimate for a patient whenever their queue position changes. | High [MVP] |
| FR-042 | The system must display the wait-time estimate as a range or approximate duration (e.g., "approximately 20–30 minutes") to communicate the inherent uncertainty of the estimate. | High [MVP] |
| FR-043 | When fewer than 5 consultations have been completed in a session and no historical data is available, the system must display a message stating that a reliable estimate is not yet available, rather than displaying a potentially misleading value. | High [MVP] |
| FR-044 | The system must log the actual wait time for each patient — measured from token issuance to when the patient is called — to build the historical data used by the prediction model. | High [MVP] |
| FR-045 | The system must update the average consultation duration used for estimates as new consultations are completed during an active session. | Medium [MVP] |
| FR-046 | The administrator analytics dashboard must display the average wait time per department per session. | Medium [MVP] |

---

### 10.6 Patient Notifications

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-047 | The system must send a push notification to a patient when a configurable number of patients remain ahead of them in the queue. | High [MVP] |
| FR-048 | The default notification trigger must be set to 3 patients remaining ahead. A hospital administrator must be able to configure this threshold per department to any value between 1 and 10. | Medium [MVP] |
| FR-049 | The system must send a push notification to a patient when they are next in the queue — exactly 1 patient remains ahead of them. | High [MVP] |
| FR-050 | The system must send a push notification to a patient when the doctor or receptionist calls their specific token number. | High [MVP] |
| FR-051 | All notifications must include at minimum: the patient's token number, the department name, and a prompt to proceed. | High [MVP] |
| FR-052 | If a patient's token is marked as no-show because they did not respond after being called, the system must notify the patient that their token was skipped and display their updated queue status. | Medium [MVP] |
| FR-053 | If a queue is paused by a receptionist or administrator, the system must notify all currently queued patients of the pause within 60 seconds of the pause action being taken. | Medium [MVP] |
| FR-054 | The system must allow a patient to enable or disable push notifications from their profile settings. Patients who have disabled notifications must still be able to see their queue status on screen. | Medium [MVP] |

---

### 10.7 Patient Priority Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-055 | The system must allow a receptionist to mark any patient's token as a priority case at the time of token issuance or at any point while the patient is actively queued. | High [MVP] |
| FR-056 | The system must support the following priority categories as a minimum: Standard, Senior Citizen (60+), Pregnant / Prenatal, Child (under 12), and Emergency. | High [MVP] |
| FR-057 | Priority patients must be visually distinguished from Standard patients in both the receptionist and doctor queue views, using a clearly visible color indicator or badge. | High [MVP] |
| FR-058 | When a patient is marked as a non-Emergency priority category (Senior Citizen, Pregnant, Child), the system must move their token ahead of all Standard tokens currently in the queue. | High [MVP] |
| FR-059 | When a patient is marked as Emergency priority, the system must move their token to the front of the queue, ahead of all other tokens including all other priority categories. | High [MVP] |
| FR-060 | Priority placement must update the queue positions of all affected patients and trigger wait-time estimate recalculation for those patients within 5 seconds. | High [MVP] |
| FR-061 | The system must allow a doctor to manually reorder patients in their queue by moving a patient's token up or down in position. Each manual reorder must be recorded in the audit log with the acting user's name and a timestamp. | Medium [MVP] |

---

### 10.8 Receptionist Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-062 | The system must provide a receptionist with a dedicated dashboard accessible after login. | High [MVP] |
| FR-063 | The receptionist dashboard must display the full active queue for the receptionist's assigned department, showing all patients in current order with token number, patient name, priority flag, and current token status. | High [MVP] |
| FR-064 | The receptionist dashboard must allow the receptionist to issue a new token to a patient from the desk by searching for or creating a patient record. | High [MVP] |
| FR-065 | The receptionist dashboard must allow the receptionist to update a token's status to: Called, Served, No-Show, or Cancelled. | High [MVP] |
| FR-066 | Setting a token status to Called must automatically trigger a push notification to the patient associated with that token. | High [MVP] |
| FR-067 | Setting a token status to No-Show must remove the patient from the active queue and advance the position of all patients behind them within 5 seconds. | High [MVP] |
| FR-068 | The receptionist dashboard must display the current estimated wait time for a new patient joining the queue at that moment. | Medium [MVP] |
| FR-069 | The receptionist dashboard must allow the receptionist to pause or resume the queue for their assigned department, with an optional free-text reason field. | High [MVP] |
| FR-070 | The receptionist dashboard must allow the receptionist to close the queue for new arrivals at the end of a session. Patients already in the queue when it is closed must retain their positions. | High [MVP] |
| FR-071 | The receptionist dashboard must display a live session summary showing the current count of: queued, called, served, no-show, and cancelled tokens. | Medium [MVP] |
| FR-072 | A receptionist must only be able to view and manage the queue for their assigned department(s). The system must deny access to queues for departments the receptionist is not assigned to. | High [MVP] |

---

### 10.9 Doctor Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-073 | The system must provide a doctor with a dedicated dashboard accessible after login. | High [MVP] |
| FR-074 | The doctor dashboard must display the full patient queue for the doctor's assigned department in real time, ordered by token sequence and priority flag. | High [MVP] |
| FR-075 | The doctor dashboard must prominently display the patient currently being seen and the next patient in the queue on the primary view. | High [MVP] |
| FR-076 | The doctor dashboard must allow the doctor to call the next patient in the queue with a single action, which automatically sends a push notification to that patient. | High [MVP] |
| FR-077 | The doctor dashboard must allow the doctor to mark the current consultation as complete, which sets the token status to Served and advances the queue. | High [MVP] |
| FR-078 | The doctor dashboard must display each patient's name, token number, and priority flag for every patient in the queue. | High [MVP] |
| FR-079 | The doctor dashboard must allow the doctor to mark a called patient as a no-show if they do not arrive at the consultation room within a configurable time window after being called. | Medium [MVP] |
| FR-080 | The doctor dashboard must display the count of patients remaining in the queue for the current session. | Medium [MVP] |
| FR-081 | A doctor must only be able to view and manage the queue for their assigned department. The system must deny access to any other department's queue. | High [MVP] |

---

### 10.10 Administrator Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-082 | The system must provide a hospital administrator with a dedicated dashboard accessible after login. | High [MVP] |
| FR-083 | The administrator dashboard must display a live overview of all active departments in the hospital, showing each department's name, current queue length, currently serving token number, and queue status (active, paused, or closed). | High [MVP] |
| FR-084 | The administrator dashboard must allow the administrator to drill into any individual department to view its full patient queue. | High [MVP] |
| FR-085 | The administrator dashboard must allow the administrator to pause, resume, or close the queue for any department in the hospital. | High [MVP] |
| FR-086 | The administrator dashboard must allow the administrator to create, edit, and deactivate hospital departments. | High [MVP] |
| FR-087 | The administrator dashboard must allow the administrator to create, edit, deactivate, and manage staff accounts (receptionists and doctors), including assigning roles and department assignments. | High [MVP] |
| FR-088 | The administrator dashboard must display a current session analytics summary including: total patients served, total no-shows, and average wait time per department for the active session. | Medium [MVP] |
| FR-089 | The administrator dashboard must allow the administrator to view historical analytics for up to the past 30 days, including daily patient volume and average wait time per department, presented in a tabular or graphical format. | Medium [MVP] |
| FR-090 | The administrator must be able to export the current session's queue data as a downloadable CSV file containing: token number, patient name, department, join time, called time, served time, wait duration, and token status for all tokens in the session. | Low [MVP] |

---

### 10.11 User Account and Role Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-091 | The system must support four distinct user roles: Patient, Receptionist, Doctor, and Hospital Administrator. | High [MVP] |
| FR-092 | A hospital administrator must be able to create staff accounts for receptionists and doctors within their own hospital only. | High [MVP] |
| FR-093 | A hospital administrator must be able to change a staff member's role between Receptionist and Doctor. | High [MVP] |
| FR-094 | A hospital administrator must be able to assign a receptionist to one or more specific departments. | High [MVP] |
| FR-095 | A hospital administrator must be able to assign a doctor to a specific department. | High [MVP] |
| FR-096 | A hospital administrator must be able to deactivate a staff account. A deactivated account must not be able to log in and must not appear in active staff lists. | High [MVP] |
| FR-097 | Staff accounts must be created by a hospital administrator. Staff members must not be able to self-register. | High [MVP] |
| FR-098 | The system must enforce that each user can only access the features and data permitted by their assigned role. | High [MVP] |
| FR-099 | The system must allow all users to reset their password or authentication credential via their registered phone number. | High [MVP] |
| FR-100 | The system must display the currently logged-in user's name and role on all dashboard screens. | Medium [MVP] |

---

### 10.12 Audit and Activity Logging

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-101 | The system must maintain an audit log recording all significant queue actions, including: token issued, token called, token served, token marked no-show, token cancelled, patient priority changed, queue paused, queue resumed, queue closed, and manual queue reorder. | High [MVP] |
| FR-102 | Each audit log entry must record: the action type, the name and role of the user who performed the action, the affected token or department, and the date and time of the action. | High [MVP] |
| FR-103 | Hospital administrators must be able to view the audit log for their own hospital filtered by date range, department, or action type. | Medium [MVP] |
| FR-104 | Audit log entries must not be editable or deletable by any user role. | High [MVP] |

---

### 10.13 Session and Queue Lifecycle Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-105 | The system must support a session model: each department runs one active session per day. A session begins when the queue is opened and ends when it is closed. | High [MVP] |
| FR-106 | Token numbers must reset to 1 at the start of each new session for a department. | High [MVP] |
| FR-107 | A hospital administrator or assigned receptionist must be able to manually open and close a session for a department. | High [MVP] |
| FR-108 | The system must automatically close a session at the configured end time for a department session if it has not been manually closed. | Medium [MVP] |
| FR-109 | After a session is closed, the queue must not accept new tokens. Patients already in the queue at the time of closure must retain their active status until served or removed. | High [MVP] |
| FR-110 | The system must retain completed session data for use in historical analytics. Session data must not be permanently deleted upon session close. | High [MVP] |

---

## 11. Non-Functional Requirements

Non-functional requirements define the quality standards the product must meet — how the system behaves, performs, and protects data — independent of specific features.

---

### 11.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Queue position updates must be delivered to a patient's mobile screen within 5 seconds of any queue state change. | ≤ 5 seconds |
| NFR-002 | Token issuance — from the patient submitting a join request to the token appearing on screen — must complete within 3 seconds under normal load. | ≤ 3 seconds |
| NFR-003 | The receptionist, doctor, and administrator dashboards must load fully within 3 seconds under normal load. | ≤ 3 seconds |
| NFR-004 | Push notifications must be delivered to a patient's device within 10 seconds of the triggering event. | ≤ 10 seconds |
| NFR-005 | The AI wait-time estimate must be calculated and displayed on the patient's screen within 5 seconds of any queue state change that affects their position. | ≤ 5 seconds |
| NFR-006 | The platform must support a minimum of 200 concurrent active users per hospital without performance degradation. | ≥ 200 concurrent users per hospital |
| NFR-007 | The platform must support a minimum of 500 concurrent active patients across all hospitals on the platform simultaneously without performance degradation. | ≥ 500 concurrent patients platform-wide |

---

### 11.2 Availability and Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-008 | The platform must maintain an uptime of at least 99% during hospital operating hours, defined as 6:00 AM to 10:00 PM local time, seven days a week. | ≥ 99% uptime during operating hours |
| NFR-009 | Planned maintenance windows must be scheduled outside hospital operating hours (i.e., between 10:00 PM and 6:00 AM). | Outside 10 PM – 6 AM only |
| NFR-010 | The system must display a clear, user-friendly error message to all user roles when a service is temporarily unavailable, rather than a blank screen or an unhandled technical error. | Graceful error handling on all screens |
| NFR-011 | Following a transient service interruption, the system must restore the correct queue state for all active sessions within 60 seconds of full service recovery, without any data loss. | ≤ 60 seconds recovery; zero data loss |

---

### 11.3 Usability

| ID | Requirement | Standard |
|----|-------------|---------|
| NFR-012 | A patient with a verified account must be able to join a queue by scanning a QR code and receive a token within 60 seconds of opening the app for the first time in a session. | ≤ 60 seconds to first token |
| NFR-013 | A new receptionist must be able to issue their first token from the receptionist dashboard within 5 minutes of first login, without any prior product training. | ≤ 5 minutes to first token issued |
| NFR-014 | All patient-facing screens must be fully operable with one hand on a standard smartphone in portrait orientation. | Single-hand mobile usability |
| NFR-015 | The patient mobile experience must function correctly on Android and iOS devices running the current and one previous major OS version at the time of release. | Android and iOS cross-platform support |
| NFR-016 | The patient-facing experience must be available in English and Hindi at launch. Additional regional languages are a future requirement. | English and Hindi at MVP |
| NFR-017 | All body text on patient-facing screens must use a minimum font size of 16px to ensure readability on standard smartphone displays. | ≥ 16px body text |
| NFR-018 | All text and background color combinations on every screen must meet WCAG 2.1 Level AA contrast requirements. | WCAG 2.1 AA contrast compliance |
| NFR-019 | All critical user actions — including join queue, cancel token, call next patient, and mark consultation complete — must be reachable in no more than 3 taps or clicks from the main screen for each respective user role. | ≤ 3 taps/clicks for critical actions |

---

### 11.4 Security

| ID | Requirement | Standard |
|----|-------------|---------|
| NFR-020 | All communication between client applications (mobile and web browser) and the server must be encrypted using HTTPS with TLS 1.2 or higher. | HTTPS / TLS 1.2+ |
| NFR-021 | User passwords and authentication credentials must be stored using an industry-standard one-way hashing algorithm with salting. Credentials must never be stored in plain text. | Secure hashed credential storage |
| NFR-022 | Patient sessions must expire after 24 hours of inactivity. Staff (receptionist, doctor, administrator) sessions must expire after 8 hours of inactivity. Users must be redirected to the login screen on their next action after session expiry. | Inactivity-based session expiry |
| NFR-023 | The system must enforce role-based access control so that each authenticated user can only access the data and functions permitted by their assigned role. | Strict role-based access control |
| NFR-024 | The system must lock a user account after 5 consecutive failed login attempts. The locked account must require a verified password reset to unlock. | Account lockout after 5 failed attempts |
| NFR-025 | Patient personally identifiable information (PII) — including name, phone number, age, and gender — must not be included in any analytics reports or exported data that is visible to administrators. Analytics and exports must contain aggregate or anonymized data only. | PII-free analytics and exports |
| NFR-026 | The system must not collect, store, or process any clinical or medical information about patients. Queue management data (token number, department, timestamps, priority flag) is operational data only. | No clinical data collection |
| NFR-027 | Each hospital's data must be logically isolated within the platform. An administrator, staff member, or patient from one hospital must have no ability to access, view, or modify data belonging to any other hospital under any circumstance. | Strict multi-tenant data isolation |

---

### 11.5 Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-028 | Onboarding a new hospital onto the platform must not require changes to the configuration, data, or availability of any existing hospital on the platform. | Zero-impact hospital onboarding |
| NFR-029 | Adding a new department within an existing hospital must not cause any service disruption to other departments in that hospital. | Zero-disruption department additions |
| NFR-030 | The platform architecture must be capable of supporting at least 50 hospitals simultaneously in a future release without requiring a fundamental architectural redesign. | Designed for ≥ 50 hospitals at scale |

---

### 11.6 Data and Privacy

| ID | Requirement | Standard |
|----|-------------|---------|
| NFR-031 | The system must collect only the minimum patient data required for queue management: name, phone number, age, and gender. No additional personal data may be collected without explicit justification and patient awareness. | Data minimization principle |
| NFR-032 | A privacy notice explaining what data is collected and how it is used must be displayed to every patient at the point of account registration. The patient must acknowledge the notice before completing registration. | Privacy notice at registration |
| NFR-033 | A patient must be able to request deletion of their account and all associated personal data. The system must process and confirm the deletion within 7 calendar days of the request. | Right to data deletion within 7 days |
| NFR-034 | Queue session data — including patient names associated with tokens, wait times, and timestamps — must be retained for no longer than 90 days after the session is completed, after which it must be anonymized or deleted. | 90-day session data retention limit |

---

## 12. Product Modules

QueueCare AI is organized into eight logical modules. Each module represents a self-contained area of product functionality with a defined purpose, set of capabilities, and primary user. This structure guides design, development, and QA planning.

---

### Module 1 — Patient Mobile Experience

**Purpose:** Enables patients to join hospital queues, track their live position, view wait-time estimates, and receive turn notifications — entirely from their smartphone.

**Primary User:** Patient

**Key Capabilities:**
- Patient account registration and OTP authentication
- Hospital and department selection
- Queue join via QR code scan or manual department selection
- Live queue position and wait-time estimate display
- Turn-approaching, next-in-queue, and called notifications
- Token cancellation by patient
- Profile management (name, age, gender)
- Notification preference settings

**Linked Requirements:** FR-001–009, FR-014–015, FR-020–028, FR-030–035, FR-039–043, FR-047–054

---

### Module 2 — Receptionist Queue Management

**Purpose:** Provides reception staff with a fast, efficient interface to manage the patient queue for their assigned department — from session open through token issuance, queue control, and session close.

**Primary User:** Receptionist

**Key Capabilities:**
- Receptionist login and role-specific dashboard
- Patient registration and receptionist-assisted token issuance at the desk
- Full department queue view with patient details, priority flags, and token status
- Token status updates: Called, Served, No-Show, Cancelled
- Patient priority flagging with category selection
- Queue pause, resume, and close with optional reason entry
- Session summary: queued, called, served, no-show, and cancelled counts
- Estimated wait time display for new arrivals

**Linked Requirements:** FR-007–009, FR-025, FR-029, FR-036, FR-055–059, FR-062–072, FR-105–109

---

### Module 3 — Doctor Queue Management

**Purpose:** Gives doctors a real-time, clean view of their patient queue — enabling them to call patients, manage sequence, and mark consultations complete without leaving the consultation room.

**Primary User:** Doctor

**Key Capabilities:**
- Doctor login and role-specific dashboard
- Live patient queue view with token order and priority indicators
- Call next patient with a single action (triggers patient push notification)
- Mark current consultation complete (advances queue)
- Mark a called patient as no-show
- Manual patient reorder with full audit trail

**Linked Requirements:** FR-037, FR-060–061, FR-073–081

---

### Module 4 — Hospital Administration

**Purpose:** Enables hospital administrators to configure the platform for their facility, manage staff accounts, and maintain operational oversight across all departments.

**Primary User:** Hospital Administrator

**Key Capabilities:**
- Administrator login and role-specific dashboard
- Hospital profile creation and configuration
- Department creation, editing, activation, and deactivation
- Department QR code generation (printable per department)
- Staff account creation, role assignment, department assignment, and deactivation
- Operating hours and session time configuration per department
- Maximum queue capacity configuration per department
- Notification threshold configuration per department
- Queue override controls for any department (pause, resume, close)

**Linked Requirements:** FR-010–013, FR-017–019, FR-024, FR-082–090, FR-091–100, FR-107

---

### Module 5 — Analytics and Reporting

**Purpose:** Provides administrators with operational visibility into queue performance — live and historical — to support data-informed staffing, scheduling, and process improvement decisions.

**Primary User:** Hospital Administrator

**Key Capabilities:**
- Live queue metrics per department: current queue length, currently serving token, queue status
- Current session summary: patients served, no-shows, average wait time, peak queue depth
- Historical analytics for up to 30 days: daily patient volume and average wait time per department
- Audit log viewer: filterable by date range, department, and action type
- CSV export of session queue data

**Linked Requirements:** FR-046, FR-088–090, FR-101–104

---

### Module 6 — Wait-Time Prediction Engine

**Purpose:** Calculates and continuously updates wait-time estimates for every queued patient based on real-time queue state and historical consultation patterns within the active session.

**Primary User:** Internal module — outputs are consumed by the Patient Mobile Experience and all staff dashboards.

**Key Capabilities:**
- Baseline estimate: patient's queue position × department's current average consultation duration
- Real-time recalculation triggered by any queue state change affecting a patient's position
- Session-level consultation duration tracking: records actual time per patient and updates the rolling average
- Uncertainty communication: displays "estimate not yet available" when fewer than 5 consultations have been completed and no prior session data exists
- Historical consultation duration storage per department for use in future session estimates

**Linked Requirements:** FR-039–046

---

### Module 7 — Notification Service

**Purpose:** Delivers accurate, timely push notifications to patients at the key moments in their queue journey — without the patient needing to watch their screen continuously.

**Primary User:** Internal module — serves patients through the Patient Mobile Experience module.

**Key Capabilities:**
- Turn-approaching notification: fires when the configured number of patients remain ahead (default: 3)
- Next-in-queue notification: fires when exactly 1 patient remains ahead
- Token called notification: fires when a receptionist or doctor calls the patient's specific token
- Queue paused notification: fires for all active patients when a queue is paused
- Token skipped notification: fires when a patient's token is marked no-show after being called
- Notification delivery tracking (sent / delivered / failed status per notification event)

**Linked Requirements:** FR-047–054, FR-066

---

### Module 8 — Authentication and Access Control

**Purpose:** Manages user identity, login security, session integrity, and role-based access enforcement to ensure every user interacts only with the features and data their role permits.

**Primary User:** All roles (Patient, Receptionist, Doctor, Hospital Administrator)

**Key Capabilities:**
- OTP-based phone number authentication for patients
- Credential-based login (phone/email + password) for staff roles
- Session management with inactivity-based expiry (24 hours for patients; 8 hours for staff)
- Role-based access control enforced on every protected resource and action
- Password reset via verified phone number
- Account lockout after 5 consecutive failed login attempts
- Multi-tenant hospital data isolation enforced at every data access point
- Logged-in user identity display on all dashboard screens

**Linked Requirements:** FR-001–006, FR-091, FR-096–100, NFR-020–027

---

## 13. MVP Features

The MVP is the smallest complete set of features that delivers real, end-to-end operational value to all four user roles. Every High-priority feature must be implemented and pass acceptance criteria before the prototype is considered complete.

### 13.1 MVP Feature List

| # | Feature | Module | Priority |
|---|---------|--------|----------|
| 1 | Patient account registration via phone number and OTP verification | Patient Mobile Experience | High |
| 2 | Patient login and profile management (name, age, gender) | Patient Mobile Experience | High |
| 3 | Hospital and department selection by patient | Patient Mobile Experience | High |
| 4 | Queue join via QR code scan | Patient Mobile Experience | High |
| 5 | Digital token issuance with sequential token number | Queue Token Generation | High |
| 6 | Live queue position display for patient (auto-updating) | Patient Mobile Experience | High |
| 7 | AI wait-time estimate displayed to patient as a range | Wait-Time Prediction Engine | High |
| 8 | Push notifications: approaching turn, next-in-queue, token called | Notification Service | High |
| 9 | Patient self-cancellation of active token | Patient Mobile Experience | High |
| 10 | Notification preference settings for patient | Patient Mobile Experience | Medium |
| 11 | Queue join via receptionist desk (for patients without smartphone) | Receptionist Queue Management | High |
| 12 | Receptionist login and department queue dashboard | Receptionist Queue Management | High |
| 13 | Token status management: Called, Served, No-Show, Cancelled | Receptionist Queue Management | High |
| 14 | Patient priority flagging with category selection (Standard, Senior, Pregnant, Child, Emergency) | Receptionist Queue Management | High |
| 15 | Queue pause, resume, and close by receptionist with optional reason | Receptionist Queue Management | High |
| 16 | Session summary view for receptionist (queued, served, no-show, cancelled counts) | Receptionist Queue Management | Medium |
| 17 | Doctor login and department queue dashboard | Doctor Queue Management | High |
| 18 | Live patient queue view for doctor with priority indicators | Doctor Queue Management | High |
| 19 | Call next patient from doctor dashboard (triggers patient notification) | Doctor Queue Management | High |
| 20 | Mark consultation complete (advances queue) | Doctor Queue Management | High |
| 21 | Mark patient as no-show from doctor dashboard | Doctor Queue Management | Medium |
| 22 | Manual patient queue reorder by doctor with audit trail | Doctor Queue Management | Medium |
| 23 | Hospital administrator login and multi-department live overview dashboard | Hospital Administration | High |
| 24 | Hospital profile configuration (name, address, contact) | Hospital Administration | High |
| 25 | Department creation, editing, and deactivation | Hospital Administration | High |
| 26 | Department QR code generation (printable) | Hospital Administration | High |
| 27 | Staff account management: create, assign role, assign department, deactivate | Hospital Administration | High |
| 28 | Department configuration: max capacity, session time, notification threshold | Hospital Administration | Medium |
| 29 | Administrator queue override: pause, resume, close any department | Hospital Administration | High |
| 30 | Live session analytics: patients served, no-shows, average wait time per department | Analytics and Reporting | Medium |
| 31 | 30-day historical analytics: daily patient volume and average wait time per department | Analytics and Reporting | Medium |
| 32 | CSV export of session queue data | Analytics and Reporting | Low |
| 33 | Audit log viewer with filtering by date, department, and action type | Analytics and Reporting | Medium |

### 13.2 MVP Completion Criteria

The v1 MVP prototype is considered complete when:

| # | Criterion |
|---|-----------|
| 1 | All High-priority features in the table above are implemented and pass their acceptance criteria. |
| 2 | The end-to-end patient workflow — register, join queue, track position, receive notification, be called, consultation marked complete — functions without errors in a test environment. |
| 3 | All four user roles can independently complete their primary workflows in an integrated system. |
| 4 | The platform sustains 50 concurrent simulated patients across at least 3 active departments without performance degradation. |
| 5 | Wait-time estimates are generated and displayed for all queued patients within 5 seconds of a queue state change. |
| 6 | Push notifications are delivered within 10 seconds of a triggering event in the test environment. |
| 7 | The administrator analytics dashboard displays correct session data for at least 7 simulated sessions. |
| 8 | The prototype is demonstrable end-to-end in a live walkthrough with simulated operational data. |

---

## 14. Future Features

The following features are out of scope for the MVP but are planned for future releases. They are listed here to establish product intent and to ensure that architectural decisions in v1 do not inadvertently block their later inclusion.

### Release 2 — Intelligence Expansion

| # | Feature | User Benefit |
|---|---------|-------------|
| F-01 | SMS notifications for patients without smartphones | Extends real-time turn alerts to patients who cannot use push notifications |
| F-02 | ABDM Scan-and-Share / ABHA QR code integration | Patients with Ayushman Bharat Health Accounts can check in instantly using national health ID |
| F-03 | Multi-department patient routing (e.g., consultation → lab → billing) | Tracks the patient's full OPD journey across post-consultation stages in a single session |
| F-04 | Predictive crowd forecasting based on historical demand patterns | Helps administrators anticipate peak-volume days and plan staffing proactively |
| F-05 | Doctor session pace and workload analytics | Allows administrators to identify consultation speed trends per doctor per department |
| F-06 | Configurable multi-channel notification preferences (push, SMS) | Patients choose their preferred notification channel for better reach |
| F-07 | Regional language support (Tamil, Telugu, Bengali, Marathi) | Improves adoption and usability in non-Hindi-speaking states |

### Release 3 — Platform Growth and Multi-Hospital

| # | Feature | User Benefit |
|---|---------|-------------|
| F-08 | Multi-location administrator dashboard for clinic chains | Centralized live visibility and analytics across all branches from one login |
| F-09 | Appointment and walk-in queue integration (unified queue engine) | Scheduled appointment slots and walk-in tokens managed in one coherent queue |
| F-10 | In-waiting-area display board — kiosk mode for large screens | Allows hospitals to display the currently serving token on a wall-mounted screen in the waiting area |
| F-11 | Dynamic staff reallocation recommendations from AI queue analytics | AI-assisted suggestions for shifting counter staff between departments during congestion |
| F-12 | PDF and Excel exportable performance reports with visualizations | Professional reports with charts suitable for management presentations |
| F-13 | Self-service hospital onboarding portal | New hospital administrators can register and configure their facility without manual QueueCare AI intervention |
| F-14 | Department head sub-administrator role | Department-level visibility and reporting without full hospital admin access |

### Release 4 — Enterprise and Compliance

| # | Feature | User Benefit |
|---|---------|-------------|
| F-15 | HMS / HMIS integration via standard APIs | Enables secure data exchange with existing hospital management systems |
| F-16 | Emergency triage priority queue module | Specialized queue sequencing for time-critical emergency cases with clinical triage input |
| F-17 | Advanced ML-based wait-time prediction model (trained on real operational data) | Progressively more accurate wait estimates as the platform accumulates real patient flow data |
| F-18 | SLA-based queue performance benchmarks and alerting | Hospitals can set internal wait-time targets and receive alerts when departments exceed thresholds |
| F-19 | DISHA / HIPAA-aligned data privacy compliance certification | Required for enterprise procurement and government hospital deployments |
| F-20 | Formal audit controls for government and enterprise procurement | Comprehensive compliance documentation, audit trails, and certifications for institutional buyers |
| F-21 | Expansion to diagnostic centers and public health program settings | Extends the QueueCare AI platform to non-hospital outpatient settings (diagnostics, vaccination, screening camps) |

---

## 15. User Roles and Permissions

QueueCare AI enforces four user roles. Every permission is bounded by role and, for staff roles, by the hospital the account belongs to. No user can perform actions or access data outside their permitted scope under any circumstance.

---

### 15.1 Role Summary

| Role | Created By | Operational Scope | Access Surface |
|------|-----------|-------------------|----------------|
| **Patient** | Self-registration | Own queue tokens only | Patient mobile app |
| **Receptionist** | Hospital Administrator | Assigned department(s) within own hospital | Staff web dashboard |
| **Doctor** | Hospital Administrator | Assigned department within own hospital | Staff web dashboard |
| **Hospital Administrator** | Platform Super-Admin | All departments within own hospital | Staff web dashboard |

---

### 15.2 Patient Permissions

| Action | Permitted |
|--------|-----------|
| Create own patient account | Yes |
| Log in and log out | Yes |
| Edit own profile (name, age, gender) | Yes |
| Select a hospital from the platform list | Yes |
| Select a department and view queue status before joining | Yes |
| Join a queue and receive a digital token | Yes |
| View own live queue position and wait-time estimate | Yes |
| Cancel own active token | Yes |
| Receive and manage push notification preferences | Yes |
| View queue details or token information of any other patient | No |
| Issue a token on behalf of another patient | No |
| Access any staff or administrator dashboard | No |
| Modify queue state or token status for any patient | No |
| View any hospital configuration or staff account | No |

---

### 15.3 Receptionist Permissions

| Action | Permitted |
|--------|-----------|
| Log in to the staff dashboard | Yes |
| View the full live queue for assigned department(s) | Yes |
| Register a patient at the desk and issue a token | Yes |
| Search for an existing patient by phone number | Yes |
| Update a token status: Called, Served, No-Show, Cancelled | Yes |
| Flag a patient as a priority category | Yes |
| Pause, resume, or close the queue for assigned department(s) | Yes |
| Open a new session for assigned department(s) | Yes |
| View session summary statistics for assigned department(s) | Yes |
| View or modify the queue for departments not assigned to them | No |
| Create, edit, or deactivate staff accounts | No |
| Access hospital profile or department configuration settings | No |
| View historical analytics or audit logs | No |
| Override the queue for a department not assigned to them | No |

---

### 15.4 Doctor Permissions

| Action | Permitted |
|--------|-----------|
| Log in to the staff dashboard | Yes |
| View the full live patient queue for their assigned department | Yes |
| Call the next patient in their queue | Yes |
| Mark the current consultation as complete | Yes |
| Mark a called patient as no-show | Yes |
| Manually reorder patients in their queue (logged in audit trail) | Yes |
| View queue status for departments other than their own | No |
| Issue, cancel, or modify tokens | No |
| Pause, resume, or close any queue | No |
| View patient phone numbers or personal contact information | No |
| Create, edit, or deactivate any staff account | No |
| Access hospital configuration, department settings, or analytics | No |
| View audit logs | No |

---

### 15.5 Hospital Administrator Permissions

| Action | Permitted |
|--------|-----------|
| Log in to the staff dashboard | Yes |
| View the live queue overview for all departments in own hospital | Yes |
| Drill into any department's full patient queue | Yes |
| Pause, resume, or close the queue for any department in own hospital | Yes |
| Create and configure the hospital profile | Yes |
| Create, edit, activate, and deactivate departments | Yes |
| Generate department QR codes | Yes |
| Configure department settings: max capacity, session times, notification thresholds | Yes |
| Create, edit, assign roles, assign departments, and deactivate staff accounts | Yes |
| View current session analytics for all departments | Yes |
| View 30-day historical analytics for all departments | Yes |
| Export session data as a CSV file | Yes |
| View the audit log for own hospital, with filtering | Yes |
| Access or view data belonging to any other hospital | No |
| Edit or delete any audit log entry | No |
| Access the platform super-admin panel or create hospital accounts | No |

---

### 15.6 Platform Super-Admin (Internal System Role)

The Platform Super-Admin is an internal QueueCare AI operations role used exclusively to onboard new hospital customers onto the platform. This role is not exposed in the hospital-facing interface and is not visible or accessible to any hospital user.

**Permitted actions (internal only):**
- Create new hospital accounts and issue the initial Hospital Administrator credentials
- Deactivate a hospital account

All other platform data and configuration is outside this role's permitted scope.

---

## 16. User Workflows

This section defines the primary end-to-end workflows for each user role. Each workflow describes the ordered sequence of steps a user takes to complete a core task, including the preconditions that must be true before the workflow begins and alternate paths where relevant.

---

### 16.1 Patient Workflow — Join Queue and Receive Consultation

**Goal:** Patient arrives at the hospital, joins the correct OPD queue, waits with full visibility, and is called for their consultation.

**Preconditions:**
- The hospital and department are configured and active on the platform.
- The department queue is open and accepting new patients.
- The patient has a smartphone with internet access.

**Steps:**
1. Patient arrives at the hospital.
2. Patient opens the QueueCare AI mobile app.
3. If not registered: Patient enters their phone number, receives an OTP, enters the OTP, and creates their account.
4. Patient selects the hospital from the available list.
5. Patient selects the relevant OPD department.
6. Patient scans the department QR code displayed in the waiting area (or selects the department from the list manually).
7. System generates a digital token with a unique sequential token number, current queue position, and estimated wait time.
8. Patient sees their token details — token number, queue position, patients ahead, and wait estimate — on their home screen.
9. As patients ahead are served, the patient's queue position and wait-time estimate update automatically on screen.
10. When the configured number of patients remain ahead (default: 3), the patient receives a push notification to return to the waiting area.
11. When the patient is next in queue, they receive a second push notification.
12. The doctor or receptionist calls the patient's token. The patient receives a final push notification with their token number and instructions to proceed to the consultation room.
13. Patient enters the consultation room and is seen by the doctor.
14. Doctor marks the consultation as complete. The patient's token status is set to Served. The patient's queue screen clears.

**Alternate Path — Receptionist-Assisted Registration:**
- Patient does not have a smartphone or cannot use the app.
- Receptionist searches for or creates the patient's record and issues a token from the receptionist dashboard.
- Patient is informed of their token number verbally or via a printed slip.
- The patient does not receive push notifications; the receptionist or a display board informs them when to proceed.

**Alternate Path — Queue at Capacity:**
- Patient attempts to join a queue that has reached its maximum capacity.
- System displays a clear message indicating the queue is full and does not issue a token.
- Patient must check again later or visit the reception desk for assistance.

---

### 16.2 Receptionist Workflow — Manage Department Queue Through a Session

**Goal:** Receptionist opens the session, manages patient tokens throughout the OPD session, and closes the queue at end of day.

**Preconditions:**
- Receptionist is logged in to the staff dashboard.
- Receptionist is assigned to the department they are managing.
- The department session is ready to begin.

**Steps:**
1. Receptionist logs in and opens the department queue for the session.
2. A patient arrives at the registration desk. Receptionist searches for the patient by phone number.
3. If the patient is found, receptionist selects their record. If not found, receptionist creates a new patient profile.
4. Receptionist selects the department and issues a token. System assigns the next sequential token number and displays the patient's queue position and estimated wait time.
5. If the patient requires priority (e.g., Senior Citizen, Emergency), receptionist selects the appropriate priority category. System repositions the token accordingly in the queue.
6. Receptionist continues processing arriving patients throughout the session, repeating steps 2–5.
7. When the doctor marks a consultation complete, the queue advances automatically. Receptionist monitors the live queue dashboard for status.
8. If a called patient does not arrive at the consultation room, receptionist marks their token as No-Show. The queue advances and remaining patients' positions update automatically.
9. If the doctor is delayed or an operational issue arises, receptionist pauses the queue and optionally enters a reason. All queued patients receive a notification of the pause.
10. When the issue is resolved, receptionist resumes the queue. Queued patients receive a notification that the queue has resumed.
11. At the end of the session, receptionist closes the queue to prevent new tokens from being issued. Patients already in the queue retain their positions.
12. Receptionist reviews the session summary showing total queued, served, no-shows, and cancelled tokens for the day.

---

### 16.3 Doctor Workflow — Conduct an OPD Session

**Goal:** Doctor manages their patient queue, calls patients in order, handles priority cases, and marks consultations complete throughout the session.

**Preconditions:**
- Doctor is logged in to the staff dashboard.
- Doctor is assigned to the department whose queue they are managing.
- The department queue is active with at least one patient queued.

**Steps:**
1. Doctor logs in and views the patient queue for their department, showing all waiting patients in token order with any priority flags visible.
2. Doctor reviews the queue: number of patients waiting, any Emergency or priority-flagged cases.
3. When ready to see the next patient, doctor clicks "Call Next Patient."
4. System sends a push notification to that patient and marks their token status as Called.
5. Patient arrives at the consultation room. Doctor conducts the consultation.
6. After the consultation is complete, doctor clicks "Mark Complete." The patient's token is set to Served and the queue advances to the next patient.
7. Doctor repeats steps 3–6 for each subsequent patient.
8. If a called patient does not arrive within the configured time window, doctor marks them as No-Show. The queue advances to the next patient.
9. If a patient in the queue requires earlier attention for clinical reasons, doctor manually moves that patient's token to the top of the queue. The action is recorded in the audit log with the doctor's name and timestamp.
10. At the end of the session, the doctor sees the queue as empty or the session is closed by the receptionist or administrator.

---

### 16.4 Administrator Workflow — Daily Operations Oversight

**Goal:** Administrator monitors live queue performance across all departments, identifies and responds to congestion or issues, and reviews session results at end of day.

**Preconditions:**
- Administrator is logged in.
- One or more departments have active sessions with open queues.

**Steps:**
1. Administrator logs in and views the live overview dashboard showing all departments: queue length, currently serving token, and queue status for each.
2. Administrator monitors the dashboard throughout the operating day.
3. If a department shows a queue length significantly above normal, administrator drills into that department to review the full queue.
4. Administrator identifies the cause (e.g., doctor delayed, single counter overwhelmed) and coordinates a response — pausing the queue, adjusting configuration, or communicating with the receptionist — using the platform as needed.
5. If urgent, administrator pauses the affected department's queue directly from the dashboard, buying time to resolve the issue.
6. At end of session, administrator reviews the session analytics summary: patients served, average wait time per department, peak queue depth, and no-show count.
7. Administrator runs a 7-day or 30-day trend view to identify recurring bottleneck patterns by department and time of day.
8. Administrator exports the session data as a CSV report for a management or quality review meeting.

---

### 16.5 Administrator Workflow — One-Time Hospital Setup and Onboarding

**Goal:** Administrator configures the hospital on the platform for the first time before going live with staff and patients.

**Preconditions:**
- Administrator has received their login credentials from QueueCare AI.
- No prior configuration exists for this hospital.

**Steps:**
1. Administrator logs in for the first time using provided credentials and is prompted to set a new password.
2. Administrator completes the hospital profile: hospital name, address, and contact information.
3. Administrator creates each OPD department (e.g., General Medicine, Orthopedics, Pediatrics) with a name and status set to Active.
4. Administrator configures each department: maximum queue capacity per session, daily session start and end time, and notification threshold (how many patients ahead triggers the turn-approaching alert).
5. Administrator creates staff accounts for all receptionists, entering name and phone number for each.
6. Administrator assigns each receptionist to their designated department(s).
7. Administrator creates staff accounts for all doctors, entering name and phone number for each.
8. Administrator assigns each doctor to their designated department.
9. Administrator generates and prints or displays the QR code for each department in the hospital's physical waiting areas.
10. Administrator runs a test session with simulated data to verify the end-to-end workflow — token issuance, queue tracking, notifications, and session close — before going live with real patients.

---

## 17. Acceptance Criteria

Acceptance criteria define the specific, testable conditions that must be satisfied for a feature to be considered complete and ready for release. Each criterion is independently verifiable by a QA engineer or stakeholder.

---

### 17.1 Patient Registration and Login

| ID | Criterion |
|----|-----------|
| AC-001 | A new patient enters a valid phone number, receives an OTP within 30 seconds, enters the correct OTP, and is registered and logged in. The entire flow completes within 60 seconds. |
| AC-002 | An incorrect OTP is rejected with a clear error message. The patient is not logged in. The patient is offered a resend option. |
| AC-003 | An OTP that has been unused for more than 5 minutes is rejected with an expiry message. The patient is offered a new OTP without re-entering their phone number. |
| AC-004 | A registered patient logs out and successfully logs back in using OTP verification on a subsequent visit. |
| AC-005 | A patient updates their name, age, and gender from the profile screen. The changes are saved and reflected immediately on the profile screen without requiring a logout. |
| AC-006 | A receptionist searches for an existing patient by phone number and finds their record. The receptionist issues a token using that patient's record without creating a duplicate account. |

---

### 17.2 Queue Join and Token Issuance

| ID | Criterion |
|----|-----------|
| AC-007 | A patient scans a valid department QR code and receives a token displaying their token number, department name, queue position, and wait-time estimate — all within 3 seconds of the scan. |
| AC-008 | A patient who already holds an active token for a department scans that department's QR code again. The system displays their existing token and position and does not issue a second token. |
| AC-009 | A patient attempts to join a queue that is paused or closed. The system displays a clear, specific status message and does not issue a token. |
| AC-010 | A patient attempts to join a department queue that has reached its maximum capacity. The system displays a "Queue Full" message and does not issue a token. |
| AC-011 | A patient cancels their active token. Their token is removed from the queue. All patients who were behind them see their queue positions decrement by 1 within 5 seconds, without manual refresh. |
| AC-012 | A receptionist issues a token to a patient at the desk. The token appears immediately in the department's live queue list with the correct next sequential token number. |

---

### 17.3 Live Queue Tracking

| ID | Criterion |
|----|-----------|
| AC-013 | When a doctor calls a patient (marks their token as Called), the patient directly behind them sees their queue position decrement by 1 on their mobile screen within 5 seconds — without refreshing the page. |
| AC-014 | When a token is marked as No-Show, all patients behind the removed token see their positions update within 5 seconds. |
| AC-015 | The patient's queue screen simultaneously displays: their token number, department name, current queue position (e.g., "Position 4 of 12"), number of patients ahead, currently serving token number, queue status, and wait-time estimate — all on a single view. |
| AC-016 | When the queue is paused by a receptionist, the queue status on all currently queued patients' screens changes to "Paused" within 5 seconds. |
| AC-017 | The receptionist dashboard displays all active tokens for the department in correct sequential order, each showing: token number, patient name, priority flag (if any), and current status. |
| AC-018 | The doctor dashboard displays all queued patients in correct token and priority order, and updates automatically when the queue state changes. |

---

### 17.4 Wait-Time Prediction

| ID | Criterion |
|----|-----------|
| AC-019 | Every patient who is actively queued sees a wait-time estimate displayed as a range (e.g., "approximately 15–25 minutes") on their queue screen. |
| AC-020 | When a token ahead of a patient is served, the patient's displayed wait-time estimate updates automatically within 5 seconds. |
| AC-021 | At the start of a new session when fewer than 5 consultations have been completed and no prior session data is available for the department, the system displays "Estimate not yet available" instead of a numerical range. |
| AC-022 | After exactly 5 consultations are marked complete in a session, the system begins displaying a numerical wait-time estimate for all currently queued patients within 5 seconds. |
| AC-023 | A patient's displayed wait-time estimate decreases as patients ahead of them are served. The estimate does not increase unless a priority patient is inserted ahead of them. |
| AC-024 | When a priority patient is inserted ahead of a standard patient, that standard patient's wait-time estimate increases to reflect the updated queue position within 5 seconds. |

---

### 17.5 Patient Notifications

| ID | Criterion |
|----|-----------|
| AC-025 | A patient receives a push notification when exactly the configured number of patients remain ahead of them (default: 3). The notification text includes the department name and the patient's token number. |
| AC-026 | A patient receives a push notification when they become next in queue (1 patient ahead). The notification text includes the department name and token number. |
| AC-027 | When the doctor clicks "Call Next Patient," the patient whose token is called receives a push notification within 10 seconds. The notification includes their token number and an instruction to proceed to the consultation room. |
| AC-028 | A patient who has disabled push notifications does not receive any notifications. Their queue status screen continues to update correctly in real time. |
| AC-029 | When the queue is paused, all patients currently in that queue receive a push notification of the pause within 60 seconds of the pause action. |
| AC-030 | When a patient's token is marked as No-Show after being called, that patient receives a notification informing them their token was skipped, within 30 seconds of the No-Show action. |

---

### 17.6 Patient Priority Management

| ID | Criterion |
|----|-----------|
| AC-031 | A receptionist marks a patient as "Senior Citizen" priority. The patient's token moves ahead of all Standard tokens in the queue. The token is visually highlighted in both the receptionist and doctor queue views. |
| AC-032 | A receptionist marks a patient as "Emergency" priority. The patient's token moves to position 1 in the queue — ahead of all other tokens including all other non-Emergency priority categories. |
| AC-033 | All patients whose queue positions changed due to a priority insertion see their updated positions within 5 seconds. |
| AC-034 | The doctor dashboard shows Emergency-flagged patients with a visually distinct indicator that is clearly differentiated from other priority categories and from Standard patients. |
| AC-035 | A doctor manually moves a patient's token from position 5 to position 2. The audit log records an entry containing: the doctor's name, the patient's token number, the original position (5), the new position (2), and the timestamp of the action. |

---

### 17.7 Receptionist Dashboard

| ID | Criterion |
|----|-----------|
| AC-036 | A receptionist with no prior product training issues their first token to a patient within 5 minutes of first logging in to the dashboard. |
| AC-037 | A receptionist marks a token as No-Show. The token is removed from the active queue. It appears as "No-Show" in the session summary count. All patients behind it advance one position. |
| AC-038 | A receptionist pauses the queue and enters a reason. The queue status on all patient screens changes to "Paused" within 5 seconds. The reason entered is stored and visible in the audit log entry for that action. |
| AC-039 | A receptionist closes the queue. Attempting to join the queue (by scanning the QR code) after closure displays a "Queue Closed" message and does not issue a token. Patients already in the queue at closure retain their active status. |
| AC-040 | The session summary counters at the bottom of the receptionist dashboard show the correct live counts for queued, called, served, no-show, and cancelled tokens at all times during the session. |

---

### 17.8 Doctor Dashboard

| ID | Criterion |
|----|-----------|
| AC-041 | A doctor logs in and immediately sees their department's queue in the correct order — priority patients displayed at the top with a visible indicator — without any manual refresh. |
| AC-042 | A doctor clicks "Call Next Patient." The patient at the top of the queue is called, their token status changes to Called, and they receive a push notification within 10 seconds. The dashboard shows this patient as "Currently Serving." |
| AC-043 | A doctor marks a consultation as complete. The current patient's token status changes to Served. The next patient in the queue becomes the new "Currently Serving" entry on the dashboard. |
| AC-044 | A doctor attempts to navigate to a different department's queue. The system denies access and displays an "Access Denied" or equivalent message. The doctor's dashboard does not load the other department's data. |

---

### 17.9 Administrator Dashboard and Configuration

| ID | Criterion |
|----|-----------|
| AC-045 | An administrator creates a new department with a name, maximum capacity of 80, session time of 9:00 AM – 1:00 PM, and a notification threshold of 5. The department appears in the hospital's department list and a QR code can be generated for it immediately. |
| AC-046 | An administrator creates a receptionist account with a name, phone number, and an assignment to the General Medicine department. The receptionist logs in and can see only the General Medicine queue — no other department is visible to them. |
| AC-047 | An administrator deactivates a staff account. That staff member's subsequent login attempt is rejected with an account-inactive message. Their name no longer appears in active staff lists. |
| AC-048 | The administrator live overview dashboard shows the correct queue length, currently serving token number, and queue status for every active department simultaneously. The data updates without manual refresh when any department's queue state changes. |
| AC-049 | An administrator views the 30-day historical analytics page. The data shows the correct average wait time and total patients served for each day in the selected period, grouped by department. |
| AC-050 | An administrator exports the current session's data as a CSV file. The file contains one row per token and includes the following columns with correct data: token number, patient name, department, join time, called time, served time, wait duration in minutes, and token status. |

---

### 17.10 Security and Access Control

| ID | Criterion |
|----|-----------|
| AC-051 | A patient who is not logged in attempts to access the queue join screen directly via a URL. The system redirects them to the registration and login screen without displaying any queue data. |
| AC-052 | A logged-in receptionist attempts to access a URL or function belonging to the administrator dashboard. The system returns an access-denied response. No administrator data or functionality is displayed. |
| AC-053 | A user enters an incorrect password 5 consecutive times. On the 6th attempt, the account is locked. The user sees an "Account Locked" message and is directed to reset their password. The account cannot be accessed until the reset is complete. |
| AC-054 | A staff account that has been inactive for exactly 8 hours and 1 minute. The user performs any action. The system terminates the session and redirects the user to the login screen. |
| AC-055 | An administrator from Hospital A is authenticated and attempts to access queue data for Hospital B by manipulating a URL or request parameter. The system returns an error and serves no data from Hospital B. |
| AC-056 | The administrator analytics and CSV export contain no patient phone numbers, no patient ages, and no patient gender data. All patient-identifying fields in reports show only the patient name associated with their token for operational traceability. |

---

## 18. Success Metrics

Success metrics define the measurable outcomes by which QueueCare AI's performance will be evaluated. They are tied directly to the business objectives and product goals defined in Sections 4 and 5.

---

### 18.1 Patient Experience Metrics

| Metric | Description | Target (MVP Prototype) |
|--------|-------------|------------------------|
| Average patient wait time | Mean time from token issuance to the patient being called for consultation | Demonstrated reduction versus a simulated or measured baseline |
| Wait-time estimate accuracy | Percentage of patients whose actual wait falls within the displayed estimated range | ≥ 70% of predictions within stated range |
| Notification delivery rate | Percentage of queued patients who receive their turn-approaching notification before their token is called | ≥ 95% successful delivery |
| Token self-cancellation rate | Percentage of patients who cancel their own token without requiring staff assistance | Tracked as baseline data |
| Queue abandonment rate | Percentage of issued tokens that result in no-shows | Tracked as baseline data |

---

### 18.2 Staff Efficiency Metrics

| Metric | Description | Target (MVP Prototype) |
|--------|-------------|------------------------|
| Token issuance time | Time taken by a receptionist to register a patient and issue a token at the desk | ≤ 60 seconds per patient |
| Receptionist onboarding time | Time from first login to successfully issuing the first token for a new receptionist | ≤ 5 minutes |
| Queue management uptime | Percentage of scheduled session time where the digital queue is active and functional | ≥ 99% of operating session hours |
| Manual override rate | Number of manual token actions (no-show, cancel, reorder) per 100 tokens issued | Tracked as baseline data |

---

### 18.3 System Performance Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Queue update latency | Time between a queue state change and all affected patients seeing the update on their screens | ≤ 5 seconds |
| Token issuance response time | Time from join request submission to token displayed on patient screen | ≤ 3 seconds |
| Dashboard load time | Time for any staff dashboard screen to load fully | ≤ 3 seconds |
| Notification delivery latency | Time from trigger event to patient device receiving the push notification | ≤ 10 seconds |
| Platform uptime during operating hours | System availability between 6:00 AM and 10:00 PM | ≥ 99% |

---

### 18.4 Operational and Administrative Metrics

| Metric | Description | Target (MVP Prototype) |
|--------|-------------|------------------------|
| Departments actively using the platform | Count of departments operating daily queue sessions through the platform | All configured departments during prototype demonstration |
| Daily session completion rate | Percentage of configured sessions that are formally opened, operated, and closed through the platform | ≥ 90% of test sessions |
| Daily patients processed | Number of tokens issued and resolved (Served or No-Show) per department per session | Tracked as baseline data |
| CSV export usage | Number of session data exports performed by administrators | Tracked as feature adoption data |

---

### 18.5 MVP Prototype Success Criteria

The v1 prototype is considered successfully delivered when all of the following conditions are met:

| # | Success Criterion |
|---|-------------------|
| 1 | All 33 High-priority MVP features are implemented and pass their corresponding acceptance criteria. |
| 2 | The full patient workflow — register, join queue, receive live updates, receive notifications, be called, consultation marked complete — functions without errors in a test environment. |
| 3 | All four user roles independently complete their primary workflows in an integrated test system. |
| 4 | The platform sustains 50 concurrent simulated patients across at least 3 active departments without performance degradation. |
| 5 | Wait-time estimates are generated and displayed for all queued patients within 5 seconds of a queue state change. |
| 6 | Push notifications are delivered within 10 seconds of a triggering event in the test environment. |
| 7 | The administrator analytics dashboard shows correct session data for at least 7 completed simulated sessions. |
| 8 | The prototype is demonstrable end-to-end in a live walkthrough using simulated operational data, suitable for academic evaluation. |

---

## 19. Assumptions

The following assumptions underlie the requirements in this document. If any assumption is invalidated during development or deployment, the affected requirements must be reviewed and updated accordingly.

| ID | Assumption |
|----|-----------|
| A-01 | Patients in the target hospital contexts (urban and semi-urban India) have smartphones capable of running modern mobile web or native apps and have access to mobile internet connectivity at the hospital. |
| A-02 | Hospitals deploying QueueCare AI have at minimum basic Wi-Fi connectivity in their OPD areas, or that a QR code can be printed and displayed physically to enable patient queue joins. |
| A-03 | Hospital administrators will create and manage all staff accounts. Staff self-registration is not required and would create a security risk if permitted. |
| A-04 | AI wait-time estimates are understood by all users — patients, staff, and administrators — to be advisory estimates, not guaranteed times. The product will communicate this clearly in the UI. |
| A-05 | Each doctor manages one primary OPD department per session. Simultaneous multi-department doctor management is not a v1 requirement. |
| A-06 | Each department runs one active queue session per calendar day. Multiple sessions within a single day for the same department (e.g., morning and afternoon OPD) are a future requirement. |
| A-07 | Token numbers are scoped to a department and reset to 1 at the start of each new session. Hospital-wide unique token numbers across all departments are not required. |
| A-08 | Walk-in patients arriving without a prior appointment are the primary use case. Appointment booking integration is out of scope for v1. |
| A-09 | The prototype will use simulated operational data for development and demonstration. Real hospital patient data will not be available during the v1 development phase. |
| A-10 | General healthcare data privacy principles — data minimization, informed consent at registration, and secure storage — are sufficient compliance standards for the prototype phase. Formal regulatory certifications are not required for v1. |
| A-11 | English and Hindi are sufficient language options for the MVP. Regional language localization will be addressed in a future release. |
| A-12 | The QueueCare AI platform is hosted on cloud infrastructure managed by the QueueCare AI team. Hospitals do not manage their own infrastructure. |
| A-13 | Push notification delivery depends on the patient's device settings and the reliability of the push notification service. The product cannot guarantee delivery on devices where notifications are blocked or connectivity is unavailable. |
| A-14 | New hospital accounts are created by the QueueCare AI platform super-admin. Self-service hospital onboarding is a future release feature. |

---

## 20. Constraints

Constraints are fixed, known limitations within which the product must be designed and delivered. Unlike risks, constraints cannot be avoided — they must be accommodated in every product and design decision.

| ID | Constraint | Impact on Product |
|----|-----------|-------------------|
| C-01 | **Single developer** — the v1 product is built and delivered by one person | Feature scope must be strictly limited to what is achievable by one developer within the six-month timeline. Lower-priority features are deferred without negotiation. |
| C-02 | **Six-month delivery timeline** — the v1 prototype must be demonstrable within this period | All High-priority MVP features must be scheduled first. Medium and Low-priority features are included only if time permits. |
| C-03 | **No commercial funding** — this is a student project with no budget for premium services | Third-party integrations (SMS, advanced analytics, paid push notification tiers) must use free-tier or low-cost options. Expensive external services are deferred. |
| C-04 | **No real hospital operational data** — development uses simulated data only | The AI wait-time prediction model in v1 is rule-based (queue position × average duration). Machine learning models trained on real data are a future release requirement. |
| C-05 | **Academic prototype classification** — not for production deployment | The system must not be deployed in a live clinical environment. It is built for demonstration and academic evaluation only. |
| C-06 | **No clinical governance** — no medical advisory board or clinical validation is in scope | All AI and prediction outputs must be labeled as estimates. No clinical decision support, diagnosis, or treatment guidance claims may be made. |
| C-07 | **English and Hindi only** — no regional language support at MVP | Users who require Tamil, Telugu, Bengali, Marathi, or other regional languages will not be served by the v1 interface. |
| C-08 | **Software-only product** — no physical hardware components | Queue calling and display rely entirely on mobile devices and web dashboards. Physical token dispensers, LED calling displays, and kiosk terminals are out of scope. |
| C-09 | **No SMS integration in MVP** — push notifications only | Patients without smartphones or push notification capability will not receive turn alerts in v1. The receptionist-assisted registration path is the fallback for these patients. |
| C-10 | **Regulatory compliance deferred** — no formal certification (DISHA, HIPAA, etc.) for prototype | Healthcare regulatory compliance requirements are tracked and planned for a future release. They are not a v1 deliverable. |

---

## 21. Risks

Risks are potential events or conditions that could negatively affect product delivery, quality, or adoption. Each risk is assessed by likelihood and impact, and a mitigation approach is defined.

**Likelihood:** High / Medium / Low
**Impact:** High / Medium / Low

---

### 21.1 Delivery Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R-01 | Single developer becomes unavailable due to illness or personal circumstances during the development period | Low | High | Maintain a rigorously prioritized backlog so the most critical MVP features are always built first. If time is lost, lower-priority features are cut rather than compromising core functionality. |
| R-02 | The MVP feature scope is too large to deliver within the six-month timeline | Medium | High | Scope has been deliberately limited to 33 features. High-priority features are always sequenced before Medium and Low. Lower-priority items are explicitly deferred and documented. |
| R-03 | The AI wait-time prediction complexity delays delivery of other features | Medium | Medium | The v1 prediction engine is designed as a simple rule-based model (queue position × rolling average consultation duration). Complex ML models are deferred to a future release. This keeps v1 prediction buildable and low-risk. |
| R-04 | Underestimation of real-time queue synchronization complexity | Medium | Medium | Real-time updates are a core architectural decision that must be made early. Delay in choosing the right approach could cascade. Early prototype of the queue update mechanism is recommended before other modules are built. |

---

### 21.2 Product Quality Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R-05 | Wait-time estimates are inaccurate or misleading, eroding patient trust | Medium | High | Estimates are always displayed as ranges, never precise times. "Estimate not yet available" is shown when data is insufficient. The UI explicitly labels these as estimates. No guarantee of accuracy is communicated. |
| R-06 | Push notifications fail to deliver reliably to some patient devices | Medium | Medium | Patients can always view their live queue status on screen regardless of notification state. Notifications are a secondary convenience channel, not the sole mechanism for turn awareness. |
| R-07 | Real-time queue updates are delayed beyond the 5-second target under load | Low | High | Queue update latency is tested early against the performance targets. If the architecture cannot meet the target, it must be redesigned before the module is considered complete. |
| R-08 | QR code scanning fails on older or lower-specification smartphone models | Medium | Medium | Patients who cannot scan a QR code can join the queue by selecting their hospital and department manually from a list. The QR scan is a fast path, not the only path. |
| R-09 | Session data export produces incorrect or incomplete CSV files | Low | Medium | CSV export output is explicitly validated in acceptance criteria (AC-050), including required columns and correct data per row. This must be tested against known session data before release. |

---

### 21.3 Adoption Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R-10 | Reception staff resist switching from paper token management to the digital system | Medium | High | The receptionist interface is designed to closely mirror the paper token workflow in steps and speed. Time savings must be immediately visible. The first-token-in-5-minutes usability target (NFR-013) is non-negotiable. |
| R-11 | A significant portion of patients in target hospitals do not have smartphones or are not comfortable using a mobile app | High | Medium | Receptionist-assisted token issuance (FR-025) is a first-class capability, not a workaround. It is listed as a High-priority MVP feature and covers 100% of patients regardless of smartphone access. SMS notifications are planned for Release 2. |
| R-12 | Hospital administrators find the initial setup process complex and abandon onboarding before going live | Low | High | The onboarding workflow is defined step-by-step in Section 16.5. Default configurations minimize required setup. The administrator should be able to complete the core setup in under 30 minutes for a typical hospital. |
| R-13 | Doctors perceive the dashboard as an added administrative burden that slows their workflow | Medium | Medium | The doctor workflow is designed to require only 2 clicks per patient: Call Next and Mark Complete. No data entry is required from the doctor. The benefit (patients no longer knocking on the door) must be immediately apparent. |

---

### 21.4 External and Technical Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R-14 | Cloud infrastructure outage affects platform availability during hospital operating hours | Low | High | Platform uptime target is ≥ 99% during operating hours (NFR-008). Graceful error messages guide all user roles during outages (NFR-010). Queue state is preserved and restored on recovery within 60 seconds (NFR-011). |
| R-15 | Hospital internet connectivity is unreliable or intermittent during operating hours | Medium | Medium | Graceful error handling on all screens (NFR-010). The receptionist-assisted token issuance path remains partially operable if the connection is brief and intermittent. Full offline mode is not in scope for v1. |
| R-16 | Data privacy regulation in India changes and imposes new compliance requirements on healthcare data | Medium | Medium | Data minimization is designed into the product (NFR-031). Collecting only name, phone number, age, and gender limits exposure. Compliance certification for future regulatory requirements is explicitly tracked as a Release 4 item (F-19). |
| R-17 | A competitor launches a similar India-focused AI queue management SaaS product during the development period | Medium | Low | The v1 scope is a prototype for academic validation, not commercial competition. Differentiation through focused scope, AI prediction, and India-specific workflows is the long-term strategy regardless of competitor timing. |
| R-18 | The push notification service provider introduces pricing changes or service limitations that affect the free-tier delivery capacity | Low | Medium | Notification delivery is monitored as a success metric (≥ 95% delivery rate). If free-tier limits are hit, the in-screen queue status display ensures patients are not left uninformed. A paid tier or alternative provider is a straightforward mitigation. |

---

## 22. Out of Scope

This section formally lists all capabilities that are excluded from QueueCare AI at this stage. Including any of these without a formal scope change review is prohibited, as it would risk delivery failure and dilute the focused product strategy.

---

### 22.1 Clinical and Medical Features

| Feature | Reason for Exclusion |
|---------|----------------------|
| Electronic Medical Records (EMR) | Clinical data management is a separate, regulated domain. QueueCare AI is an operational queue tool, not a clinical record system. |
| Patient diagnosis, prescriptions, or treatment history | Clinical information is entirely outside the product's purpose and data collection scope. |
| Medical triage or clinical decision support | AI predictions support queue ordering only. Clinical triage decisions are the sole responsibility of qualified clinical staff. |
| Laboratory test ordering or results delivery | Post-consultation clinical workflow. Not part of queue management. |
| Vital signs monitoring or health tracking | Remote health monitoring. Unrelated to queue management. |

---

### 22.2 Financial and Administrative Features

| Feature | Reason for Exclusion |
|---------|----------------------|
| Patient billing, invoicing, and payment collection | Financial workflow is managed by existing HMS or billing systems. |
| Insurance claims processing | Administrative and financial domain entirely outside product scope. |
| Pharmacy management and dispensing | Post-consultation operational workflow. Not queue management. |
| Revenue analytics and financial reporting | Financial reporting belongs in accounting and HMS tools. |

---

### 22.3 Consumer Discovery and Booking Features

| Feature | Reason for Exclusion |
|---------|----------------------|
| Doctor discovery, profiles, and ratings | Consumer health directory function unrelated to operational queue management. |
| Hospital search and recommendation | Consumer-facing discovery product. Not queue management. |
| Online appointment booking and scheduling | Pre-arrival scheduling is adjacent but outside v1 scope. Planned as a future integration (F-09), not a native feature. |
| Telemedicine and video consultations | A fundamentally different service delivery model with distinct regulatory, privacy, and technical requirements. |

---

### 22.4 Communication and Collaboration Features

| Feature | Reason for Exclusion |
|---------|----------------------|
| In-app messaging between patient and doctor | Clinical communication tool. Outside queue management scope. |
| In-app messaging between staff members | Internal staff communication. Outside queue management scope. |
| Patient satisfaction surveys (embedded in platform) | Valuable but deferred. A future analytics add-on, not an MVP queue management function. |
| SMS notifications | Requires telephony API integration and associated costs. Planned for Release 2 (F-01). |

---

### 22.5 Infrastructure and Integration Features

| Feature | Reason for Exclusion |
|---------|----------------------|
| HMS / HMIS integration via APIs | Requires API agreements, partner engagement, and testing scope that exceeds MVP constraints. Planned for Release 4 (F-15). |
| ABDM / ABHA health ID integration | Valuable alignment with national digital health infrastructure but deferred to Release 2 (F-02). |
| Physical hardware token dispensers or kiosks | QueueCare AI is a software-only product. No hardware components are in scope at any release. |
| LED queue display boards | Digital waiting-area display boards (kiosk mode) are deferred to Release 3 (F-10). |
| Ambulance tracking or emergency dispatch | Emergency services management is a distinct operational domain outside scope. |
| Multi-session per day per department | One session per department per day is sufficient for v1. Multi-session support is a future requirement. |

---

### 22.6 Scope Boundary Statement

QueueCare AI v1 manages the patient journey from **arrival at the hospital and queue join** through **consultation completion and queue exit**.

Everything before a patient arrives at the facility — discovery, appointment booking, pre-registration — is out of scope.

Everything after the consultation is complete — billing, pharmacy, laboratory, follow-up scheduling — is out of scope.

This boundary is intentional and must be maintained throughout v1 development.

---

## 23. Future Roadmap

The roadmap outlines the intended evolution of QueueCare AI beyond the v1 MVP, organized into four phases. Items are sequenced based on strategic value, user need, technical dependency, and adoption readiness. Specific release timelines will be determined after v1 validation is complete.

---

### Phase 1 — MVP (Current Release)

**Theme:** Core Queue Management
**Timeline:** 6 months (v1 prototype)
**Objective:** Deliver a complete, demonstrable queue management platform covering all four user roles end-to-end.

| Capability | Status |
|------------|--------|
| Patient mobile queue experience (join, track, notify) | In scope |
| Receptionist queue management dashboard | In scope |
| Doctor queue management dashboard | In scope |
| Hospital administrator dashboard and configuration | In scope |
| AI wait-time prediction (rule-based v1 model) | In scope |
| Role-based access control and multi-tenant isolation | In scope |
| Basic session analytics and CSV export | In scope |
| Audit logging | In scope |

---

### Phase 2 — Intelligence Expansion

**Theme:** Smarter Predictions, Broader Patient Reach, ABDM Alignment
**Estimated Timing:** Post-MVP validation (months 7–18)
**Objective:** Extend the platform's reach to patients without smartphones, deepen AI prediction capability, and align with India's national digital health infrastructure.

| # | Feature | Primary Benefit |
|---|---------|----------------|
| F-01 | SMS notifications for patients without smartphones | Extends turn alerts to all patients regardless of app access |
| F-02 | ABDM Scan-and-Share / ABHA QR code integration | Patients with national health IDs check in instantly |
| F-03 | Multi-department patient routing (consultation → lab → billing) | Unified journey tracking across post-consultation stages |
| F-04 | Predictive crowd forecasting based on historical patterns | Administrators anticipate peak volumes and plan proactively |
| F-05 | Doctor session pace and workload analytics | Identifies consultation speed trends per doctor and department |
| F-06 | Configurable multi-channel notification preferences | Patients choose their preferred alert channel |
| F-07 | Regional language support (Tamil, Telugu, Bengali, Marathi) | Improves adoption in non-Hindi-speaking states |

---

### Phase 3 — Platform Growth and Multi-Hospital

**Theme:** Scale, Network Effects, and Operational Depth
**Estimated Timing:** Year 2
**Objective:** Enable clinic chains and multi-location operators to manage all their locations from a single platform, and introduce display infrastructure for waiting area visibility.

| # | Feature | Primary Benefit |
|---|---------|----------------|
| F-08 | Multi-location dashboard for clinic chains | Centralized live visibility and analytics across all branches |
| F-09 | Appointment and walk-in queue integration (unified engine) | Scheduled and walk-in patients managed in one coherent queue |
| F-10 | In-waiting-area display board — kiosk mode | Currently serving token displayed on a wall screen in the waiting area |
| F-11 | Dynamic staff reallocation recommendations from AI analytics | AI-assisted suggestions for shifting resources between departments during congestion |
| F-12 | PDF and Excel exportable performance reports with visualizations | Professional reports suitable for management and quality review meetings |
| F-13 | Self-service hospital onboarding portal | New hospitals configure themselves without manual QueueCare AI involvement |
| F-14 | Department head sub-administrator role | Department-level visibility and reporting without full hospital admin access |

---

### Phase 4 — Enterprise and Compliance

**Theme:** Enterprise Readiness, Government Deployment, and Regulatory Alignment
**Estimated Timing:** Years 3–4
**Objective:** Achieve the technical and compliance readiness required for enterprise procurement, government hospital deployment, and formal regulatory certification.

| # | Feature | Primary Benefit |
|---|---------|----------------|
| F-15 | HMS / HMIS integration via standard APIs | Secure data exchange with existing hospital management systems |
| F-16 | Emergency triage priority queue module | Specialized queue sequencing for time-critical emergency cases |
| F-17 | Advanced ML-based wait-time prediction (trained on real data) | Progressively more accurate estimates as real patient flow data accumulates |
| F-18 | SLA-based queue performance benchmarks and alerting | Hospitals set internal wait-time targets; platform alerts when departments exceed them |
| F-19 | DISHA / HIPAA-aligned data privacy compliance certification | Required for enterprise procurement and government hospital deployment |
| F-20 | Formal audit controls for government and enterprise procurement | Comprehensive compliance documentation, audit trails, and certifications for institutional buyers |
| F-21 | Expansion to diagnostic centers and public health program settings | Extends QueueCare AI to non-hospital outpatient settings (diagnostics, vaccination, screening camps) |

---

### Roadmap Summary

| Release | Theme | Key Milestone |
|---------|-------|---------------|
| v1 MVP | Core Queue Management | Prototype demonstrating full 4-role queue workflow with AI estimates |
| Phase 2 | Intelligence and Reach | SMS support + ABDM integration + crowd forecasting live |
| Phase 3 | Scale and Network | Multi-hospital chains + kiosk mode + self-service onboarding |
| Phase 4 | Enterprise and Compliance | Government-grade compliance + HMS integration + ML prediction |

---

## 24. Conclusion

This Product Requirements Document defines the complete requirements for QueueCare AI — an AI-powered hospital queue management and wait-time prediction platform designed for healthcare facilities in India.

The document establishes what the product must do, the standards it must meet, the boundaries of its scope, and the criteria by which its success will be evaluated. It is the single authoritative reference for designers, developers, QA engineers, and stakeholders working on the product.

### What This Document Establishes

| Category | Count |
|----------|-------|
| Functional requirements (FR-001 to FR-110) | 110 |
| Non-functional requirements (NFR-001 to NFR-034) | 34 |
| Product modules | 8 |
| MVP features | 33 |
| Future features across 3 planned releases | 21 |
| User workflows with alternate paths | 5 |
| Testable acceptance criteria (AC-001 to AC-056) | 56 |
| Success metrics across 5 areas | 20+ |
| Documented assumptions | 14 |
| Documented constraints | 10 |
| Documented risks with mitigations | 18 |

### What This Document Does Not Cover

This PRD is intentionally limited to product requirements. The following are addressed in separate documents:

- Technology stack, system architecture, and implementation approach — to be documented in `06_Software_Requirements_Specification.md`
- Database design, API specifications, and AI model design — Technical Design documents
- UI/UX wireframes and design system — Design documents
- Development plan, sprint breakdown, and task management — Project Plan

### Final Statement

QueueCare AI addresses a problem that is simultaneously universal, evidence-backed, and underserved: the failure of Indian hospital outpatient departments to give patients, staff, and administrators the visibility and intelligence they need to manage queues efficiently.

Every requirement in this document traces back to a real stakeholder pain point. Every constraint reflects a real boundary. Every acceptance criterion can be independently verified. The product's scope is deliberately narrow — because doing one thing exceptionally well creates more lasting value than doing many things adequately.

The requirements are defined. The product is ready to be built.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 (Draft) | 2026-08-01 | Ram Chauhan | Initial PRD — all 24 sections complete |

---

*Pending approval. Next document in sequence: `06_Software_Requirements_Specification.md`*
