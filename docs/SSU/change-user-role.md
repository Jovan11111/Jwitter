<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Admin Change User Role Functionality</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>
<h2>Change History</h2>

| Version | Date        | Author                   | Change Description      |
|---------|-------------|--------------------------|-------------------------|
| 1.0     | 10.10.2023  | Jovan Jankovic           | Initial version         |

---
<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)  
  - [1.1. Summary](#11-summary)  
  - [1.2. Purpose and Audience](#12-purpose-and-audience)  
  - [1.3. Open Issues](#13-open-issues)  
- [2. Admin Change User Role Scenario](#2-admin-change-user-role-scenario)  
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

This document describes the functionality that allows administrators to change the role of any user on the Jwitter platform via the admin panel.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the change user role functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Admin Change User Role Scenario

## 2.1. Short Description

Administrators can change the role of any user by selecting a new role from a dropdown menu in the **Users** tab of the admin panel and confirming the change with a button click.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The admin logs into the application.
2) The admin navigates to the **Admin Panel**.
3) The admin clicks on the **Users** tab.
4) The system displays a list of users with relevant user information and their current role.
5) For each user, the current role is preselected in a dropdown menu (possible roles: **user**, **admin**).
6) The admin selects a different role from the dropdown menu for a user.
7) The admin clicks the **Change user role** button next to that user.
8) The system updates the user role in the backend.
9) The system confirms the role change and updates the UI accordingly.

### 2.2.2. Extensions

- **8a. Backend error occurs during role update:**
  1) The system displays an error message: "Failed to update user role. Please try again later."
  2) The user role remains unchanged.
  3) The admin can attempt to change the role again.

## 2.3. Special Requirements

- Only administrators can access the **Admin Panel** and modify user roles.
- The system must validate that only valid roles ("user", "admin") can be assigned.
- Proper authorization checks must be enforced on the backend to prevent unauthorized role changes.
- The UI should reflect the current role immediately after a successful change.

## 2.4. Preconditions

- The admin must be logged in with valid administrator credentials.
- Users to be managed must already exist in the system with assigned roles.

## 2.5. Postconditions

- The selected user’s role is updated in the system.
- The user has the new role assigned on their next login or session refresh.
- The admin sees the updated role reflected in the **Users** tab UI.

---
