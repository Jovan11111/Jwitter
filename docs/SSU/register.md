<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Registration Functionality</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>
<h2>Change History</h2>

| Version | Date        | Author                   | Change Description       |
|---------|-------------|--------------------------|--------------------------|
| 1.0     | 10.10.2023  | Jovan Jankovic           | Initial version          |

---
<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)
  - [1.1. Summary](#11-summary)
  - [1.2. Purpose and Audience](#12-purpose-and-audience)
  - [1.3. Open Issues](#13-open-issues)
- [2. Registration User Scenario](#2-registration-user-scenario)
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

This document outlines the registration functionality scenario for the Jwitter platform. The registration feature allows users to create a new account by providing a username, password (with confirmation), and email address.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the register functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                                                       | Resolution                 |
|-----|-------------------------------------------------------------------|----------------------------|
| 1   | Implement password constraints: minimum 8 characters, 1 uppercase, 1 number, etc. | Pending decision           |

---

# 2. Registration User Scenario

## 2.1. Short Description

The registration functionality allows users to create a new account by providing their username, password (with confirmation), and email address. The system ensures that the username is unique, validates the provided information, and securely stores user credentials.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the registration page.
2) The user enters a unique username into the username field.
3) The user enters their password into the password field and confirms it by re-entering it in the confirmation field.
4) The user provides a valid email address in the email field.
5) The user clicks the "Register" button.
6) The system checks if the username is already in use:
   - If the username is unique:
     - The system hashes the password.
     - The system stores the user's information in the database.
     - A success message is displayed, and the user is redirected to the login page.

### 2.2.2. Extensions

- **6a. Username already exists**:
  1) The system displays an error: "User already exists".
  2) The user remains on the registration page and can try again.

- **6b. Password and confirmation do not match**:
  1) The system displays an error: "Password confirmation does not match the password".
  2) The user remains on the registration page and can correct the inputs.

- **6c. Server error during registration**:
  1) The system displays an error: "Server error. Please try again later."
  2) The user remains on the registration page.

## 2.3. Special Requirements

- The user must fill in all fields (username, password, confirmation, email) before attempting to register.
- The system must validate the email format.
- The username must be unique and properly checked against the database.
- Passwords must be hashed and stored securely.
- The system must prevent duplicate entries in the database.

## 2.4. Preconditions

- The application must be connected to a database that supports user storage.
- The user must provide valid inputs, including:
  - A unique username.
  - A strong and confirmed password.
  - A well-formed email address.

## 2.5. Postconditions

- **Successful Registration**: The user account is created, and the user is redirected to the login page.
- **Unsuccessful Registration**: The user remains on the registration page with an appropriate error message.
- **Invalid Input**: The system does not create an account and provides feedback on the issue (e.g., invalid email or mismatched passwords).

---
