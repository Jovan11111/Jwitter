<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Delete Profile Functionality</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>
<h2>Change History</h2>

| Version | Date        | Author         | Change Description    |
|---------|-------------|----------------|-----------------------|
| 1.0     | 10.06.2025  | Jovan Jankovic | Initial version       |

---
<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)
  - [1.1. Summary](#11-summary)
  - [1.2. Purpose and Audience](#12-purpose-and-audience)
  - [1.3. Open Issues](#13-open-issues)
- [2. Delete Profile Scenario](#2-delete-profile-scenario)
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

This document describes the **Delete Profile** functionality in the Jwitter application. It allows a user to permanently delete their account and all associated data.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the delete account functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description | Resolution |
|-----|-------------|------------|
|     |             |            |

---

# 2. Delete Profile Scenario

## 2.1. Short Description

From the Settings page, a user can choose to delete their entire profile. This action is irreversible and requires password confirmation.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the **Main Page**.
2) The user navigates to **My Profile** from the sidebar.
3) The user clicks on **Settings**.
4) On the **Settings** page, the user clicks the **Delete Profile** button.
5) A **Delete Profile Modal** opens containing:
   - One password input field.
   - Two buttons: **Delete Profile** and **Cancel**.
6) The user enters their correct password.
7) The user clicks **Delete Profile** in the modal.
8) The following data is permanently deleted:
   - User profile
   - Posts
   - Likes
   - Comments
   - Messages
   - Friendships
   - Friend requests
   - Reports
9) The user is **redirected to the login page**.

### 2.2.2. Extensions

- **6a. Incorrect password entered**:
  - User clicks **Delete Profile**.
  - Error message is shown: **"Incorrect password"**.
  - Modal remains open.
  - No data is deleted.

- **6b. User clicks Cancel button**:
  - Modal closes.
  - No data is deleted.

- **6c. User clicks outside the modal**:
  - Modal closes.
  - No data is deleted.

## 2.3. Special Requirements

- The modal should provide a clear warning that this action is **irreversible**.
- Password field should be of type `password`.
- A confirmation alert or red warning text is recommended before final deletion.
- Backend must ensure atomic deletion of all related user data.

## 2.4. Preconditions

- User must be authenticated.
- User must know their password.

## 2.5. Postconditions

- **Success**: All user-related data is deleted; user is logged out and redirected to the login page.
- **Failure**: No data is deleted; user remains on the settings page with the modal open.

