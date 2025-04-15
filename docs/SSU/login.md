<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Login Functionality</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>
<h2>Change History</h2>

| Version | Date        | Author                   | Change Description    |
|---------|-------------|--------------------------|-----------------------|
| 1.0     | 10.10.2023  | Jovan Jankovic           | Initial version       |

---
<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)
  - [1.1. Summary](#11-summary)
  - [1.2. Purpose and Audience](#12-purpose-and-audience)
  - [1.3. Open Issues](#13-open-issues)
- [2. Login User Scenario](#2-login-user-scenario)
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

This document outlines the login functionality scenario for the Jwitter platform. The login feature allows users to authenticate themselves using a username and password, granting access to other parts of the platform.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the login functionality. It serves as a guideline for implementation, testing, and future improvements of this feature.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Login User Scenario

## 2.1. Short Description

The login functionality allows users to authenticate themselves by entering their username and password on the login page. If the credentials are valid, users are redirected to the main page of the application. Otherwise, an appropriate error message is displayed.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the application, and the login page is displayed by default.
2) The user enters their username and password into the respective input fields.
3) The user clicks the "Login" button.
4) The system checks if the username exists in the database.
5) The system verifies that the password matches the one stored in the database.
6) If the credentials are valid:
   - The user receives a **JWT token** for authentication.
   - The application redirects to the main page.

### 2.2.2. Extensions

- **4a. Username does not exist in the database**:
  1) The system displays an error: "User not found".
  2) The user remains on the login page and can try again.

- **5a. Password is incorrect**:
  1) The system displays an error: "Wrong password".
  2) The user remains on the login page and can try again.

- **6a. Server error during validation**:
  1) The system displays an error: "Server error. Please try again later."
  2) The user remains on the login page.

## 2.3. Special Requirements

- The user must fill in both fields (username and password) before attempting to log in.
- The system must be protected against **SQL injection** and other types of attacks.
- The functionality must include a **forgot password** modal.
- The login functionality must be implemented in the first phase of development.

## 2.4. Preconditions

- The application must have registered users in the database.
- The user must have valid credentials (username and password).

## 2.5. Postconditions

- **Successful Login**: The user receives a **JWT token** and gains access to the main page of the application.
- **Unsuccessful Login**: The user remains on the login page with an appropriate error message.
- **Unauthenticated Access**: The user is prevented from accessing any page other than the login or registration page.

---
