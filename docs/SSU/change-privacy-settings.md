<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Change Visibility Settings Functionality</h2>
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
- [2. Change Visibility Settings Scenario](#2-change-visibility-settings-scenario)
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

This document describes the "Change Visibility Settings" functionality in the Jwitter application. It allows users to control who can view their email, posts, likes, and friends.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the change visibility settings functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Change Visibility Settings Scenario

## 2.1. Short Description

Users can change the visibility of their personal data via the Settings page. Each category (email, posts, likes, and friends) has a dropdown that allows users to set visibility to one of the following:
- **Everyone**
- **Friends**
- **Nobody**

Changes are only saved when the **Update Visibility Settings** button is clicked.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the main page.
2) The user clicks on **My Profile** in the sidebar.
3) The user clicks on the **Settings** button on their profile page.
4) The **Settings** page is displayed, including the **Visibility Settings** section.
5) Four visibility fields are shown, each with a dropdown:
   - Email
   - Posts
   - Likes
   - Friends
6) Each dropdown shows the current setting for the user, retrieved from the database.
   - Default value for new users: `Everyone`
7) The user may change any or all of the dropdown values to one of:
   - `Everyone`
   - `Friends`
   - `Nobody`
8) The user clicks the **Update Visibility Settings** button.
9) The new settings are sent to the backend and persisted in the database.

### 2.2.2. Extensions

- **6a. User has modified visibility previously**:
  - Dropdowns reflect user's previously saved values (e.g., `Nobody`).

- **9a. Backend update fails**:
  1) An error message is shown (e.g., "Failed to update visibility settings").
  2) No changes are saved.

- **8a. User changes dropdowns but doesn't click the update button**:
  - No changes are saved; the database remains unchanged.

## 2.3. Special Requirements

- Dropdown values must persist across page reloads based on backend data.
- Changes must only be applied when the user explicitly clicks the update button.
- Dropdown UI must be intuitive and accessible.

## 2.4. Preconditions

- The user must be authenticated.
- Initial visibility settings must exist or default values should be applied.

## 2.5. Postconditions

- **Successful Update**: Visibility preferences are stored in the database and affect how other users can view the respective data.
- **Failed Update**: Changes are not saved; the user is notified of the failure.
