# QueueCare AI — User Experience Document

**Product:** QueueCare AI — AI-Based Smart Hospital Queue Management and Wait Time Prediction System
**Document ID:** 08
**Version:** 1.0 (Draft)
**Status:** Pending Approval
**Last Updated:** August 1, 2026
**Author:** Ram Chauhan
**Related Documents:** `05_Product_Requirements_Document.md`, `06_User_Personas.md`, `07_User_Stories.md`

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [User Experience Goals](#2-user-experience-goals)
3. [User Roles](#3-user-roles)
4. [User Stories](#4-user-stories)
5. [Use Cases](#5-use-cases)
6. [User Journey](#6-user-journey)
7. [User Flow](#7-user-flow)
8. [Navigation Structure](#8-navigation-structure)
9. [Error and Exception Flows](#9-error-and-exception-flows)
10. [Accessibility Considerations](#10-accessibility-considerations)
11. [UX Best Practices](#11-ux-best-practices)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction

### 1.1 Purpose of This Document

This document defines the complete user experience for QueueCare AI — an AI-powered hospital queue management and wait-time prediction platform designed for healthcare facilities in India. It describes how each type of user interacts with the system from first contact to task completion, across every significant scenario.

This document is intended as a reference for:

- **UI/UX designers** building screen layouts, interaction patterns, and visual hierarchies
- **Software developers** who need to understand intended user behaviour and screen states before implementation
- **QA engineers** who need to verify that user-facing flows behave as designed
- **Product managers and stakeholders** who need a clear narrative of the end-to-end product experience
- **Technical writers and documentation contributors** building GitHub-hosted project documentation

This document does not include wireframes, visual design specifications, colour systems, component libraries, database schemas, API contracts, or code. Those artefacts are produced separately based on the experience definitions contained here.

### 1.2 Product Summary

QueueCare AI serves four distinct user roles — patients, receptionists, doctors, and hospital administrators — through two separate interface surfaces:

- A **mobile-first web or native app** for patients, accessible on any smartphone
- A **browser-based staff dashboard** for receptionists, doctors, and administrators, designed for use on hospital desktops and laptops

The product's fundamental purpose is to replace opaque, manual paper-token queue management with a transparent, real-time digital system. Every UX decision in this document flows from a single principle: every user should always know exactly what is happening, what they need to do next, and what to expect.

### 1.3 Scope of This Document

This document covers the v1 MVP experience. Future features — including SMS notifications, ABDM integration, multi-location dashboards, and ML-based prediction — are acknowledged where relevant but not described in detail. The UX for those features will be addressed in future versions of this document.

### 1.4 Relationship to Other Documents

| Document | Relationship |
|----------|-------------|
| `05_Product_Requirements_Document.md` | Defines what the system must do — this document defines how users experience it |
| `06_User_Personas.md` | Defines who the users are — this document describes their end-to-end interactions |
| `07_User_Stories.md` | Defines individual user goals — this document assembles them into complete journeys and flows |

---

## 2. User Experience Goals

The UX goals below are the measurable, user-centred standards against which every design and interaction decision in QueueCare AI is evaluated. They are derived directly from the pain points documented in the user personas and from the product goals established in the PRD.

---

### 2.1 Goals by User Role

#### Patient UX Goals

| ID | Goal | Measurable Standard |
|----|------|---------------------|
| UXG-P01 | Patient can join a queue without visiting the reception desk | Patient completes join flow in under 60 seconds of opening the app |
| UXG-P02 | Patient always knows their current queue position | Queue position visible on screen within 5 seconds of any state change |
| UXG-P03 | Patient understands how long they will likely wait | Wait-time estimate displayed as a range on every active token screen |
| UXG-P04 | Patient is notified before their turn so they can move freely | Turn-approaching notification delivered before the patient's token is called |
| UXG-P05 | Patient never misses their turn due to not watching the screen | Token-called notification sent the moment their number is called |
| UXG-P06 | Patient can register without prior account if needed | Guest registration completable at the reception desk in under 60 seconds |
| UXG-P07 | Patient can use the app with basic smartphone skills | Core patient flow completable in 3 taps or fewer from the home screen |
| UXG-P08 | Patient trusts the estimate is honest and approximate | All estimates labelled clearly as estimates — never presented as guaranteed times |

#### Receptionist UX Goals

| ID | Goal | Measurable Standard |
|----|------|---------------------|
| UXG-R01 | Receptionist can issue a token as fast as, or faster than, paper | Token issuance completable in under 60 seconds per patient |
| UXG-R02 | Receptionist has full queue visibility on one screen | All queue management functions on a single dashboard without navigation |
| UXG-R03 | Receptionist spends less time answering status questions | Patient-facing notifications reduce "how long?" inquiries at the desk |
| UXG-R04 | Receptionist can flag priority patients without social conflict | Priority system is transparent and systematic — not personal |
| UXG-R05 | Receptionist can onboard without training | First token issuable within 5 minutes of first login |

#### Doctor UX Goals

| ID | Goal | Measurable Standard |
|----|------|---------------------|
| UXG-D01 | Doctor can call the next patient with one action from the consultation room | Call Next Patient is a single click from the primary dashboard view |
| UXG-D02 | Doctor can see the full queue without leaving the room | Complete patient queue visible on-screen from inside the consultation room |
| UXG-D03 | Doctor never needs to enter data to manage the queue | All queue actions are single-click — no forms or text entry required |
| UXG-D04 | Doctor can identify urgent cases before they arrive | Priority-flagged patients visually distinct at the top of the queue |
| UXG-D05 | Doctor's session is not disrupted by corridor interruptions | Patient notifications eliminate the need for door-knocking |

#### Hospital Administrator UX Goals

| ID | Goal | Measurable Standard |
|----|------|---------------------|
| UXG-A01 | Administrator sees all departments in one view without walking the floor | Multi-department overview loads in under 3 seconds |
| UXG-A02 | Administrator can detect and respond to bottlenecks proactively | Congested departments visually indicated on the live overview |
| UXG-A03 | Administrator can configure the hospital without IT support | Full hospital setup completable through the dashboard without technical assistance |
| UXG-A04 | Administrator can produce reliable performance reports | Session analytics and CSV export available from the dashboard |
| UXG-A05 | Administrator controls all staff access from one place | Staff creation, assignment, and deactivation all in one management screen |

---

### 2.2 Universal UX Principles

The following principles apply to every screen and interaction across all user roles.

| Principle | Description |
|-----------|-------------|
| **Clarity over cleverness** | Every label, message, and action is written in plain, direct language. No jargon, no ambiguity. |
| **One task per screen** | Each screen serves a single primary purpose. Secondary actions exist but do not compete visually with the primary action. |
| **Always show current state** | Users always know where they are. The system's current state (active, paused, closed, calling) is visible at all times. |
| **Forgiving interactions** | Destructive actions (cancel token, close queue) require confirmation. Recoverable states are clearly communicated. |
| **Honest about uncertainty** | Wait-time estimates are labelled as estimates. When data is insufficient, the system says so — it never fabricates confidence. |
| **Fast over feature-rich** | Speed is a feature. Especially for Ramesh and Dr. Desai, every second counts. Nothing loads slowly; nothing requires unnecessary steps. |
| **Minimal required input** | The system asks for the minimum data needed to complete each task. It does not ask doctors to enter data. It does not ask patients to fill long forms. |
| **Consistent feedback** | Every action produces visible feedback. Button clicks, token issuances, status changes — all produce an immediate response on screen. |

---

## 3. User Roles

QueueCare AI serves four distinct user roles. Each role has a different context of use, a different level of digital familiarity, and a different set of primary tasks. Understanding these distinctions is essential for every UX decision.

---

### 3.1 Patient

**Who they are:**
The patient is a walk-in outpatient visiting the hospital for a consultation. They range from digitally comfortable young adults to elderly patients with limited smartphone experience. They arrive stressed, often unwell, and with limited time. Their visit is not planned around the technology — the technology must fit around the visit.

**Context of use:**
- Mobile smartphone, used standing or seated in a crowded waiting area
- Poor indoor connectivity in some hospitals
- Distracted — managing family members, feeling unwell, anxious about wait time
- Single-handed use is common

**Primary tasks:**
1. Register and log in to the app
2. Find the right hospital and department
3. Join the queue by scanning a QR code or selecting from a list
4. Monitor queue position and wait-time estimate
5. Receive turn notifications and proceed when called
6. Cancel token if leaving early

**UX characteristics required:**
- Extremely simple onboarding — first-time use must be intuitive without instructions
- Information-first design — the most important data (position, wait time, queue status) must be visible at a glance
- Minimal text input — patients should not need to type during a hospital visit
- Forgiving — errors must be recoverable and explained in plain language
- Language-appropriate — English and Hindi supported at MVP

**Interface surface:** Mobile web or native app

---

### 3.2 Receptionist

**Who they are:**
The receptionist is a hospital front-desk staff member responsible for managing the OPD registration counter. They are under sustained operational pressure during peak hours (9–11 AM), handling 80–130 patients per session. They are digitally literate but have zero tolerance for tools that slow them down.

**Context of use:**
- Desktop or laptop computer at a fixed workstation
- Active during a 4–5 hour OPD window with no breaks
- Managing a physical crowd at the desk simultaneously
- Multitasking — talking to patients while operating the system

**Primary tasks:**
1. Log in and open the session for the day
2. Register patients (new and returning) and issue tokens
3. Monitor the live queue on a single dashboard screen
4. Mark tokens as Called, Served, No-Show, or Cancelled
5. Flag priority patients
6. Pause, resume, or close the queue
7. Review session summary at end of day

**UX characteristics required:**
- Speed is the primary design criterion — every action must be reachable in 3 clicks or fewer
- No-scroll dashboard — the most critical information (queue list, summary counts, controls) fits on one screen
- Keyboard-accessible — common actions should be reachable without lifting hands from the keyboard
- Unambiguous controls — in a high-pressure environment, there is no room for misreading a button label
- Immediate feedback — every action must produce visible confirmation within 1 second

**Interface surface:** Browser-based staff dashboard (desktop/laptop)

---

### 3.3 Doctor

**Who they are:**
The doctor is an OPD consulting physician running a 4-hour session of 30–45 patient consultations. They are deeply skilled in their clinical domain and view any administrative overhead as an intrusion on clinical time. They will adopt the tool only if it makes their session measurably better — not if it adds a single step.

**Context of use:**
- Desktop or laptop at a workstation inside the consultation room
- In use between consultations — often just a few seconds of interaction per patient
- High cognitive load — thinking about the clinical case, not about the queue software
- Cannot leave the room to call patients or check the waiting area

**Primary tasks:**
1. Log in and view the full patient queue for their department
2. Identify any priority-flagged patients
3. Call the next patient with one click
4. Mark the consultation complete
5. Mark a patient as no-show if they do not arrive
6. Manually reorder a patient when clinically necessary

**UX characteristics required:**
- The two primary actions — Call Next Patient and Mark Complete — must dominate the screen
- Zero data entry — the doctor should never need to type anything in the queue tool
- Glanceable queue — patient names, token numbers, and priority flags visible at a glance
- Auto-refreshing — the queue must update without the doctor doing anything
- Interruptible — the doctor may look away for 5 minutes; the screen must show the current state when they return

**Interface surface:** Browser-based staff dashboard (desktop/laptop)

---

### 3.4 Hospital Administrator

**Who they are:**
The hospital administrator is an operations manager responsible for patient flow, staffing efficiency, and service quality across all OPD departments. They are experienced with digital tools and data, but they have been burned by IT implementations that looked good in demonstrations and failed in practice. They need real, immediately useful data — not impressive-looking dashboards that take minutes to interpret.

**Context of use:**
- Desktop or laptop, typically in an office — not at the OPD counter
- Monitoring operational performance from a distance
- Moving between their desk and the floor throughout the morning
- Preparing performance reports for hospital leadership

**Primary tasks:**
1. Log in and view the live multi-department queue overview
2. Identify congested or problematic departments
3. Drill into a department's full queue if needed
4. Override queue controls (pause, resume, close) for any department
5. Configure hospital, departments, and staff accounts
6. Review current and historical session analytics
7. Export session data for reporting

**UX characteristics required:**
- Information density — the overview dashboard must show all departments simultaneously with meaningful data
- Progressive detail — overview first, drill-down on demand
- Action from the overview — override controls should not require navigation to a separate page
- Consistent data — numbers on screen must match reality; no stale data
- Self-service — all configuration and reporting must be achievable without technical assistance

**Interface surface:** Browser-based staff dashboard (desktop/laptop)

---
## 4. User Stories

This section presents key user stories grouped by feature area. Each story captures the user's goal and the experience the system must deliver. Stories follow the format: "As a [role], I want [goal] so that [benefit]." Full acceptance criteria are maintained in `07_User_Stories.md`.

---

### 4.1 Authentication

**Experience context:** Authentication is the gateway to the product. For patients it must feel automatic — a few taps and they are in. For staff it must be role-aware — the right dashboard appears the moment login completes, with no extra navigation. Authentication should never feel like a barrier.

| Role | Story |
|------|-------|
| Patient | As a patient, I want to register using only my phone number and an OTP so that I can create an account quickly without remembering a password. |
| Patient | As a registered patient, I want to log in by entering my phone number and receiving a fresh OTP so that I can access my queue without a password. |
| Patient | As a patient, I want to log out from any screen so that my information is protected when I hand my phone to someone else. |
| Patient | As a first-time patient, I want to see a plain-language privacy notice before registering so that I understand what data is collected. |
| Receptionist | As a receptionist, I want to log in with my credentials and land directly on my queue dashboard so that I can start processing patients immediately. |
| Doctor | As a doctor, I want to log in and see only my department's queue — not other departments or administrative functions — so that the interface is immediately relevant. |
| Administrator | As an administrator, I want to log in and see my hospital's full live multi-department overview immediately so that I can assess the morning's status at once. |
| All Staff | As a staff member, I want my session to expire after 8 hours of inactivity so that an unattended workstation does not expose hospital data. |
| All Staff | As a staff member, I want my account to lock after 5 consecutive failed login attempts so that unauthorised access attempts are automatically blocked. |

**UX design implications:**
- Patient login must complete in 3 steps or fewer: enter number → receive OTP → enter OTP → logged in
- Staff login must not present a role selector — the system routes each user to the correct dashboard automatically based on their assigned role
- Privacy notice must be presented in readable plain language (minimum 16px body text), not buried in a scrollable legal modal that users dismiss without reading
- After session expiry, the system shows a clear, friendly "Your session has ended — please log in again" message rather than a blank or broken screen

---

### 4.2 Hospital Selection

**Experience context:** Hospital and department selection is the patient's first step toward joining a queue. It must be fast and forgiving. A patient who selects the wrong department or encounters a closed queue must receive an immediately helpful response — not a silent failure or a technical error.

| Role | Story |
|------|-------|
| Patient | As a patient, I want to see a list of available hospitals so that I can find my hospital and proceed to join the queue. |
| Patient | As a patient, I want to see each department's current status — Active, Paused, or Closed — before I attempt to join so that I am not surprised by an unavailable queue. |
| Patient | As a patient, I want to scan the department's QR code displayed in the waiting area to join the queue directly so that I do not need to navigate through the app menus. |
| Patient | As a patient who cannot scan a QR code, I want to select my department from a list so that I always have a backup path available. |

**UX design implications:**
- The hospital list must be searchable — a patient must not have to scroll through a long list to find their hospital
- Department status must use both a colour indicator and a text label (Active / Paused / Closed), never colour alone — this is an accessibility requirement
- Paused and Closed departments must remain tappable and display a clear, helpful status screen rather than silently doing nothing
- A successful QR scan must bypass the hospital and department selection screens entirely and take the patient directly to the token confirmation screen

---

### 4.3 Queue Management

**Experience context:** Queue management is the heart of the patient experience and the core of the receptionist's workday. The patient's token screen is their primary interface for the entire hospital visit — it must be a live, trustworthy source of truth that requires no action from the patient to stay current.

| Role | Story |
|------|-------|
| Patient | As a patient, I want to receive a digital token immediately after joining so that I have a clear reference for my place in the queue. |
| Patient | As a patient, I want my queue position to update automatically whenever a patient ahead of me is served so that I always see my current position without manually refreshing. |
| Patient | As a patient, I want to see my token number, current position, patients ahead, currently serving token, and estimated wait time on one screen so that I get everything I need at a single glance. |
| Patient | As a patient, I want to cancel my token if I decide to leave the hospital so that I do not hold a place I will not use. |
| Patient | As a patient, I want a clear, helpful message when the queue is full so that I know why I cannot join and what my options are. |
| Receptionist | As a receptionist, I want to register a patient and issue a token in under 60 seconds so that I can process patients quickly during peak hour. |
| Receptionist | As a receptionist, I want to see the full live queue on my dashboard so that I always know the current state without asking the doctor or walking to the waiting area. |
| Receptionist | As a receptionist, I want to mark patients as Called, Served, No-Show, or Cancelled from the queue list so that the queue progresses accurately. |
| Receptionist | As a receptionist, I want to flag a patient as Emergency, Senior Citizen, Pregnant, or Child so that the system repositions them transparently and systematically. |
| Receptionist | As a receptionist, I want to pause the queue with an optional reason so that all currently waiting patients are informed when the doctor is temporarily unavailable. |

**UX design implications:**
- The patient token screen is the most frequently viewed screen in the entire product — it must load in under 3 seconds and auto-refresh without any patient action
- The wait-time estimate must always be accompanied by the label "Estimated" or "Approximately" — the number alone is insufficient and potentially misleading
- When fewer than 5 consultations have been completed in the session, the estimate area shows "Estimate not yet available" in friendly, non-technical language
- Priority badges must use both colour and a text label — never colour alone — to remain accessible to users with colour-vision deficiencies
- Queue pause, resume, and close actions must require a single confirmation step — they must not be accidentally triggerable with one tap

---

### 4.4 Doctor Dashboard

**Experience context:** The doctor's dashboard is used in short bursts of 5–15 seconds between consultations. It must be immediately readable and offer the two most important actions — Call Next and Mark Complete — without any navigation. Everything else is secondary.

| Role | Story |
|------|-------|
| Doctor | As a doctor, I want to see my full patient queue when I log in so that I can review the session ahead before calling the first patient. |
| Doctor | As a doctor, I want priority-flagged patients to appear at the top of the queue with a clear visual indicator so that I can identify urgent cases at a glance. |
| Doctor | As a doctor, I want to call the next patient with a single click so that the patient is notified on their phone and I do not need to leave the room or rely on an attendant. |
| Doctor | As a doctor, I want to mark the current consultation as complete with one click so that the queue advances automatically to the next patient. |
| Doctor | As a doctor, I want to mark a patient as no-show if they do not arrive after being called so that the queue moves on without delay. |
| Doctor | As a doctor, I want to manually move a patient's position in the queue when clinical circumstances require it so that I retain full control over session order. |
| Doctor | As a doctor, I want the queue to update automatically on my screen so that I always see the current state between consultations without refreshing. |

**UX design implications:**
- "Call Next Patient" and "Mark Complete" must be large, visually dominant, and placed at the top of the screen — they are the two most frequent actions and must require no searching
- The currently serving patient must be visually separated from the waiting queue — distinct visual treatment, not just sequential ordering
- The "Up Next" patient must be permanently visible alongside "Currently Serving" so the doctor can mentally prepare
- Manual reorder must require a deliberate confirmatory action (drag-to-reorder or up/down controls with confirmation) — it must not be triggerable by an accidental tap
- The remaining patient count must be permanently visible — the doctor uses this to pace their session and know when they are approaching the end

---

### 4.5 Reception Dashboard

**Experience context:** The reception dashboard is the operational command centre for the OPD session. It must give the receptionist everything they need on one screen — fast enough to keep up with one patient every 60 seconds during peak hour, without navigating away at any point.

| Role | Story |
|------|-------|
| Receptionist | As a receptionist, I want all my tools — patient search, token issuance, queue list, status controls, and session summary — on a single screen so that I never need to navigate away during an active session. |
| Receptionist | As a receptionist, I want each queue entry to show the token number, patient name, priority badge, and current status so that I can act on any entry without opening a detail screen. |
| Receptionist | As a receptionist, I want a live count of queued, called, served, no-show, and cancelled tokens so that I always know the session's progress at a glance. |
| Receptionist | As a receptionist, I want to search for a returning patient by phone number and find their record in under 3 seconds so that I can issue a token without creating a duplicate. |
| Receptionist | As a receptionist, I want to see the current estimated wait time for a new arrival so that I can give an honest verbal answer when a patient asks at the desk. |
| Receptionist | As a receptionist, I want the dashboard to prevent me from accessing departments I am not assigned to so that I cannot accidentally modify another department's queue. |

**UX design implications:**
- Patient search must be the most prominent interactive element on the dashboard — it is the starting point for almost every registration action
- Search results must appear with no visible loading delay — the patient is standing at the desk and the interaction is synchronous
- The queue list must be scrollable, but session summary counts and session control buttons (pause, resume, close) must always remain visible without scrolling
- Token status controls (Called, Served, No-Show, Cancel) must be reachable in one tap or click from the queue list row — inline action buttons or a compact row-level action menu

---

### 4.6 Admin Dashboard

**Experience context:** The administrator views the dashboard periodically — checking in during the morning and responding to escalations. It must communicate the health of the entire hospital at a glance. Problems must be obvious without requiring comparison or calculation.

| Role | Story |
|------|-------|
| Administrator | As an administrator, I want to see all active departments and their live queue status on one screen so that I can monitor the whole hospital without walking the floor. |
| Administrator | As an administrator, I want to drill into any department's queue with one click so that I can investigate a specific bottleneck in detail when needed. |
| Administrator | As an administrator, I want to pause, resume, or close any department's queue directly from the overview so that I can respond to incidents without waiting for the receptionist. |
| Administrator | As an administrator, I want to view 30-day historical analytics by department so that I can identify patterns and make evidence-based staffing decisions. |
| Administrator | As an administrator, I want to export session data as a CSV so that I can present queue performance data in management meetings. |
| Administrator | As an administrator, I want to create and manage staff accounts and department assignments from one management screen so that I never need IT support to make operational changes. |

**UX design implications:**
- Each department card on the overview must show department name, status badge, current queue length, and currently serving token — all visible without any expansion or interaction
- Departments with elevated queue depths must carry a clear visual indicator (such as a highlighted border or warning badge) that draws the administrator's eye without requiring them to interpret numbers
- Queue override controls (pause, resume, close) must be accessible from the department card on the overview — drilling into the full queue view should not be required for basic interventions
- Historical analytics must present data in a table by default — charts are a secondary optional view, not the primary representation

---

### 4.7 Notifications

**Experience context:** Notifications are the bridge between passive waiting and the moment of action. They must arrive at exactly the right time, contain exactly the right information, and never create anxiety. A notification should feel like a helpful tap on the shoulder — not an alarm or an ambiguous alert.

| Role | Story |
|------|-------|
| Patient | As a patient, I want a push notification when a configured number of patients remain ahead of me so that I have time to return to the waiting area before my turn. |
| Patient | As a patient, I want a separate notification when I am next in queue so that I know to be ready to proceed immediately. |
| Patient | As a patient, I want a final notification the moment my token is called so that I know to walk to the consultation room now. |
| Patient | As a patient, I want a notification if the queue is paused so that I understand why it has stopped moving and am not left uncertain. |
| Patient | As a patient, I want a notification if my token is skipped due to a no-show so that I know what happened and can approach reception if needed. |
| Patient | As a patient, I want to control whether I receive push notifications from my profile settings so that the app respects my preferences. |
| Patient | As a patient with notifications disabled, I want my queue status to still update live on screen so that I can always track my position without relying on notifications. |

**Notification content standards:**
Each notification type must include the patient's token number and the department name. The prescribed wording for each type is:

| Type | Notification Text |
|------|------------------|
| Approaching turn | "Token [X] — [Department]: Your turn is approaching. Please return to the waiting area." |
| Next in queue | "Token [X] — [Department]: You are next. Please be ready to proceed." |
| Token called | "Token [X] — [Department]: Please proceed to the consultation room now." |
| Queue paused | "Token [X] — [Department]: The queue has been temporarily paused. You will be notified when it resumes." |
| Token skipped | "Token [X] — [Department]: Your token was skipped. Please speak to reception if you are still at the hospital." |

**UX design implications:**
- Notifications must never contain personal health, clinical, or medical information of any kind
- The notification preference toggle in the patient profile must take effect immediately — not on next session or next app launch
- Live queue updates on screen are entirely independent of the notification channel — a patient who has disabled notifications must still see their position update in real time on screen
- Notification delivery failures must never block or delay queue operations — a failed notification is logged silently; the queue state continues to advance normally

---
