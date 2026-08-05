# QueueCare AI — UI/UX Design Document

**Product:** QueueCare AI — AI-Based Smart Hospital Queue Management and Wait Time Prediction System
**Document ID:** 09
**Version:** 1.0 (Draft)
**Status:** Pending Approval
**Last Updated:** August 1, 2026
**Author:** Ram Chauhan
**Related Documents:** `05_Product_Requirements_Document.md`, `06_User_Personas.md`, `07_User_Stories.md`, `08_User_Experience.md`

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [UI/UX Design Goals](#2-uiux-design-goals)
3. [Design Principles](#3-design-principles)
4. [Design Language](#4-design-language)
5. [Branding Guidelines](#5-branding-guidelines)
6. [Color Palette](#6-color-palette)
7. [Typography](#7-typography)
8. [Iconography](#8-iconography)
9. [Spacing and Layout System](#9-spacing-and-layout-system)
10. [Component Library](#10-component-library)
11. [Screen Inventory](#11-screen-inventory)
12. [Screen Specifications](#12-screen-specifications)
13. [Responsive Design Guidelines](#13-responsive-design-guidelines)
14. [Accessibility Guidelines](#14-accessibility-guidelines)
15. [Error and Empty States](#15-error-and-empty-states)
16. [UX Best Practices](#16-ux-best-practices)
17. [Design Consistency Guidelines](#17-design-consistency-guidelines)
18. [Conclusion](#18-conclusion)

---

## 1. Introduction

### 1.1 Purpose

This document defines the complete visual design and user interface specification for QueueCare AI. It serves as the authoritative design reference for UI designers building screens, frontend developers implementing components, and QA engineers verifying visual and interaction fidelity.

This document covers:
- Design language, brand identity, and visual system
- Color, typography, iconography, and spacing specifications
- Component library with states and usage rules
- Screen-level layout specifications for all 14 key screens
- Responsive design breakpoints and behavior
- Accessibility standards and implementation guidance
- Error states, empty states, and loading patterns
- Design consistency and handoff guidelines

This document does not include wireframes, production code, backend logic, database design, or API specifications. Those are addressed in separate technical documents.

### 1.2 Product Context

QueueCare AI serves four distinct user roles across two interface surfaces:

| Interface | Users | Primary Device |
|-----------|-------|---------------|
| Patient Mobile App | Patients | Smartphone (Android / iOS) |
| Staff Web Dashboard | Receptionists, Doctors, Hospital Administrators | Desktop / Laptop browser |

Each surface has different design priorities. The patient app demands simplicity, readability in imperfect conditions, and one-handed usability. The staff dashboard demands speed, information density, and zero-friction action execution.

### 1.3 Design Philosophy Summary

QueueCare AI is a healthcare operations tool used by people under stress — patients who are anxious, receptionists managing crowds, doctors moving between consultations. The design must work in those conditions.

The visual design is **calm, clear, and trustworthy** — not playful, not flashy. Every visual decision exists to reduce cognitive load, increase information clarity, and accelerate task completion. Decoration is minimal. Information is primary.

---

## 2. UI/UX Design Goals

| ID | Goal | Design Implication |
|----|------|-------------------|
| DG-01 | Patient joins a queue in under 60 seconds from app open | Minimal onboarding screens, prominent QR scan entry point, no unnecessary steps |
| DG-02 | Patient reads their queue status at a glance without scrolling | Token screen shows all critical data above the fold on any standard smartphone |
| DG-03 | Receptionist issues a token in under 60 seconds | Search field is the primary focus on load; token issuance is inline, not a separate screen |
| DG-04 | Doctor calls next patient in one click from the primary view | Call Next Patient button is the dominant interactive element on the doctor dashboard |
| DG-05 | Administrator sees all departments at a glance | Multi-column card layout on the overview; all departments visible without scrolling on standard laptop |
| DG-06 | All critical actions are reachable in 3 taps or clicks | Shallow navigation depth; no buried menus for operational tasks |
| DG-07 | System state is always visible | Status indicators (Active, Paused, Closed) are present on every relevant screen |
| DG-08 | Wait estimates communicate uncertainty, not false precision | Estimate range always paired with an "approximately" label; never a raw number alone |
| DG-09 | Priority patients are identifiable at a glance | Colour + text badge combination; never colour alone |
| DG-10 | Design meets WCAG 2.1 Level AA | All text contrast ratios, touch targets, and interactive states meet accessibility minimums |

---

## 3. Design Principles

These six principles govern every design decision in QueueCare AI. When two design choices are in tension, these principles provide the resolution hierarchy.

---

### Principle 1: Clarity over Aesthetics

Information legibility comes before visual refinement. If a design choice must be made between a visually appealing layout and a functionally clear one, the functionally clear one wins. Every element earns its place by serving the user's understanding — decoration that does not communicate is removed.

*Applied as:* Minimal decorative elements, generous whitespace, high-contrast text on all primary content, plain language labels.

---

### Principle 2: Speed over Completeness

Staff users — receptionists and doctors — cannot wait. The design optimises for time-to-action: the most common action on any screen is the fastest to reach. Secondary information does not slow down primary task execution.

*Applied as:* Primary actions always visible without scrolling; patient search field focused on dashboard load; queue list actions inline; no confirmation dialogs for standard reversible actions.

---

### Principle 3: State Transparency

The system's current state is always communicated to the user. Queue status, session status, connectivity status, and loading state are never hidden. A user must never be uncertain about whether something happened.

*Applied as:* Status badges on all queue-facing screens; loading indicators on every async operation; error messages that confirm what failed; success confirmations after consequential actions.

---

### Principle 4: Progressive Disclosure

Show the information the user needs for the current task first. Deeper detail is accessible on demand but does not clutter the primary view. The overview is always simpler than the detail.

*Applied as:* Admin overview cards show summary data; drill-in reveals full queue; receptionist row-level actions collapse until needed; analytics summary before drill-down.

---

### Principle 5: Consistent Patterns

The same interaction pattern always produces the same result. The same visual treatment always means the same thing. Users who learn one part of the product should find other parts instantly familiar.

*Applied as:* Standardised button hierarchy; consistent colour semantics (green=active, amber=paused, red=emergency/closed); identical priority badge treatment across all staff views; unified form field behaviour.

---

### Principle 6: Inclusive by Default

The design is built to serve the widest possible range of users — elderly patients, low-digital-literacy users, users on low-end devices, and users in high-ambient-noise or poor-lighting environments. Accessibility is a baseline, not an enhancement.

*Applied as:* Minimum 16px patient body text; WCAG 2.1 AA contrast throughout; colour + label for all status states; touch targets minimum 44×44px; Hindi language parity with English.

---
