<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Change Notification Settings Functionality</h2>
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
- [2. Change Notification Settings Scenario](#2-change-notification-settings-scenario)
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

This document describes the "Change Notification Settings" functionality in the Jwitter application. It allows users to control whether they receive notifications for new messages and friendship requests.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the change notification settings functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Change Notification Settings Scenario

## 2.1. Short Description

Users can modify their notification preferences from the Settings page, accessible via their profile. Two settings are available: message notifications and friendship request notifications. These are represented as toggle switches (sliders) and can be turned on or off.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the main page.
2) The user clicks on **My Profile** in the sidebar.
3) On the profile page, the user clicks the **Settings** button.
4) The system navigates to the **Settings** page.
5) The notification settings section is displayed, showing:
   - **New message notification** with a slider (default ON)
   - **New friendship request notification** with a slider (default ON)
6) The sliders reflect the current settings stored in the database.
7) The user interacts with either or both sliders to toggle their state.
8) The user clicks the **Update Notification Settings** button.
9) The updated settings are sent to the backend and saved in the database.

### 2.2.2. Extensions

- **6a. User has previously changed settings**:
  - The sliders will reflect their previous values (ON or OFF) based on the database.

- **9a. Backend fails to save changes**:
  1) An error message is displayed (e.g., "Failed to update notification settings").
  2) The sliders retain their current (UI) state, but no change is saved.

- **7a. User toggles the same value back and forth**:
  - Final state is what is submitted when clicking "Update Notification Settings".

## 2.3. Special Requirements

- Settings must be persisted per user and loaded correctly every time the settings page is opened.
- Sliders must provide immediate visual feedback.
- Submission button must trigger backend validation and confirmation message.

## 2.4. Preconditions

- The user must be authenticated.
- The user's notification settings must exist in the database.

## 2.5. Postconditions

- **Successful Update**: Notification preferences are stored in the database and will affect notification behavior.
- **Failed Update**: The UI remains on the settings page, showing an error, and no changes are persisted.
