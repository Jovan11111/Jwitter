<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Admin - Send Email to All Users</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>

<h2>Change History</h2>

| Version | Date        | Author         | Change Description  |
|---------|-------------|----------------|---------------------|
| 1.0     | 10.06.2025  | Jovan Jankovic | Initial version     |

---

<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)
  - [1.1. Summary](#11-summary)
  - [1.2. Purpose and Audience](#12-purpose-and-audience)
  - [1.3. Open Issues](#13-open-issues)
- [2. Send Email to All Scenario](#2-send-email-to-all-scenario)
  - [2.1. Short Description](#21-short-description)
  - [2.2. Flow of Events](#22-flow-of-events)
    - [2.2.1. Basic Successful Scenario](#221-basic-successful-scenario)
    - [2.2.2. Extensions](#222-extensions)
  - [2.3. Special Requirements](#23-special-requirements)
  - [2.4. Preconditions](#24-preconditions)
  - [2.5. Postconditions](#25-postconditions)

---

# 1. Introduction

## 1.1. Summary

This document describes the **Send Email to All Users** functionality, which allows an admin to broadcast a message via email to all registered users of the Jwitter platform.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the send group email functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| # | Description | Resolution |
|---|-------------|------------|
|   |             |            |

---

# 2. Send Email to All Scenario

## 2.1. Short Description

From the Admin Panel, the administrator can send an email to all users of the platform through a dedicated modal.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) Admin logs into the platform and accesses the **Admin Panel** via the sidebar.
2) Admin clicks on the **Settings tab** within the Admin Panel.
3) Admin clicks the **Send Email** button.
4) A **modal** opens containing:
   - `Title` input (text field)
   - `Content` input (multiline textbox)
   - `Send` button (initially disabled)
   - `Cancel` button
5) Admin enters valid input into both the title and content fields.
6) The **Send** button becomes enabled.
7) Admin clicks **Send**.
8) An email is sent to **all registered users**.
9) Modal closes upon successful submission.

### 2.2.2. Extensions

- **4a. One or both fields (title or content) left empty**:
  - The **Send** button remains disabled.
  - User cannot submit the form.

- **6a. Admin clicks Cancel**:
  - Modal closes.
  - No email is sent.

- **6b. Admin clicks outside the modal**:
  - Modal closes.
  - No email is sent.

## 2.3. Special Requirements

- The `Send` button must be **disabled** unless both fields are filled.
- Modal should close automatically on successful submission.
- Backend should ensure emails are sent efficiently (e.g. via queueing if necessary).

## 2.4. Preconditions

- Admin must be logged in.
- Admin must be on the Admin Panel → Settings tab.

## 2.5. Postconditions

- **Success**: Email is sent to all users and modal is closed.
- **Failure**: If fields are not filled, button remains disabled and no action occurs.

