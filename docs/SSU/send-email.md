<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Admin - Send Email to Single User</h2>
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
- [2. Send Email to Single User Scenario](#2-send-email-to-single-user-scenario)
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

This document describes the **Send Email to Single User** functionality within the Admin Panel, allowing administrators to send a custom message via email to a specific user.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the send individual email functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| # | Description | Resolution |
|---|-------------|------------|
|   |             |            |

---

# 2. Send Email to Single User Scenario

## 2.1. Short Description

Admin can send a personalized email to any individual user through the Users tab in the Admin Panel.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) Admin logs into the platform and navigates to the **Admin Panel** via the sidebar.
2) Admin switches to the **Users tab**.
3) The list of users is displayed, including each user's:
   - Username
   - Email address
   - (Other metadata)
4) Admin clicks on the **email address** of the desired user.
5) A **modal** opens, containing:
   - `Title` input (text field)
   - `Content` input (multiline textbox)
   - `Send` button (initially disabled)
   - `Cancel` button
6) Admin enters valid text in both fields.
7) The **Send** button becomes enabled.
8) Admin clicks **Send**.
9) The email is sent **only to the selected user**.
10) Modal closes upon successful submission.

### 2.2.2. Extensions

- **5a. One or both fields are empty**:
  - **Send** button remains disabled.

- **7a. Admin clicks Cancel**:
  - Modal closes.
  - No email is sent.

- **7b. Admin clicks outside the modal**:
  - Modal closes.
  - No email is sent.

## 2.3. Special Requirements

- The modal UI is identical to the "Send Email to All" modal.
- The only backend difference is the **recipient** of the email (one user vs. all users).
- Send button must be disabled until all required fields are populated.

## 2.4. Preconditions

- Admin is logged in.
- Admin has access to the Admin Panel → Users tab.
- The target user has a valid email address.

## 2.5. Postconditions

- **Success**: The selected user receives the email.
- **Failure**: If fields are not filled, or modal is closed, no email is sent.

