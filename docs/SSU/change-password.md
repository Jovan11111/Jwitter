<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Change Password Functionality</h2>
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
- [2. Change Password Scenario](#2-change-password-scenario)
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

This document describes the "Change Password" functionality in the Jwitter application. It allows authenticated users to change their current password through the settings page.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the change password functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Change Password Scenario

## 2.1. Short Description

Users can change their password via the **Settings** page. Upon clicking the **Change Password** button, a modal appears prompting the user to enter their current password, new password, and confirmation of the new password.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the **Main Page**.
2) The user navigates to **My Profile** via the sidebar.
3) The user clicks on **Settings**.
4) On the **Settings** page, the user clicks the **Change Password** button.
5) A **Change Password Modal** opens with the following input fields:
   - Old Password
   - New Password
   - New Password Again
6) The user enters valid values:
   - Old password matches current one
   - New password and confirmation match
7) The user clicks the **Change Password** button.
8) The password is updated in the database.
9) The user is **redirected to the login page**.
10) User must log in again with the new password.

### 2.2.2. Extensions

- **6a. Old password is incorrect**:
  - User clicks **Change Password**.
  - Error message shown: **"Old password is incorrect"**.
  - Modal remains open; no password is changed.

- **6b. New password and confirmation don't match**:
  - User clicks **Change Password**.
  - Error message shown: **"Password and confirmation don't match"**.
  - Modal remains open; no password is changed.

- **7a. User clicks Cancel**:
  - Modal closes.
  - No password is changed.

- **7b. User clicks outside the modal**:
  - Modal closes.
  - No password is changed.

## 2.3. Special Requirements

- Password input fields must be of type `password` to hide input.
- Modal must be closable via cancel button or outside click.
- Proper error feedback must be shown in red text beneath respective input fields or as a general modal alert.

## 2.4. Preconditions

- User must be authenticated.
- User must know their current password.

## 2.5. Postconditions

- **Success**: Password is changed; user is logged out and redirected to login page.
- **Failure**: No changes are made; user is shown appropriate error messages.
