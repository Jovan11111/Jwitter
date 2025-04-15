<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Add Post Functionality</h2>
<br>
<h2 align="center">Version 1.0</h2>
<br><br><br>
<h2>Change History</h2>

| Version | Date        | Author                   | Change Description       |
|---------|-------------|--------------------------|--------------------------|
| 1.0     | 11.10.2023  | Jovan Jankovic           | Initial version          |

---
<h1 align="center">Contents</h1>

- [1. Introduction](#1-introduction)
  - [1.1. Summary](#11-summary)
  - [1.2. Purpose and Audience](#12-purpose-and-audience)
  - [1.3. Open Issues](#13-open-issues)
- [2. Add Post Scenario](#2-add-post-scenario)
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

This document outlines the functionality for adding a new post on the Jwitter platform. Logged-in users can create and publish posts through a modal interface. Posts include a title and content, which are saved in the database and displayed on the main page.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the add post functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                                                     | Resolution                 |
|-----|-----------------------------------------------------------------|----------------------------|
| 1   | Add validation for title and content length (e.g., maximum 256 characters for title). | Pending decision           |

---

# 2. Add Post Scenario

## 2.1. Short Description

The functionality allows logged-in users to create a new post through a modal interface. Users provide a title and content, which are validated on both the client and server side before the post is stored in the database.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user clicks the "Add Post" button on the main page.
2) A modal appears, allowing the user to enter the post's title and content.
3) The user fills in the title and content fields.
4) The user clicks the "Post" button.
5) The system performs client-side validation to ensure both fields are filled.
6) The system sends a request to the backend with the user's ID, title, and content.
7) The backend validates the request:
   - Ensures all required fields are present (title, content, and user).
   - Confirms the user exists in the authentication service.
   - Creates and saves the new post in the database.
8) The new post is returned in the backend response and added to the list of posts displayed on the main page.

### 2.2.2. Extensions

- **5a. User submits empty title or content**:
  1) The system displays a client-side error: "Please fill in all fields."
  2) The user remains on the modal and can correct the input.

- **7a. User does not exist**:
  1) The backend returns a "User not found" error.
  2) The system displays an error message: "Failed to create post. User not found."

- **7b. Server error while creating the post**:
  1) The backend returns a server error (500 Internal Server Error).
  2) The system displays a generic error message: "Failed to create post. Please try again later."

- **7c. Validation fails on the server side**:
  1) The backend returns a "Bad Request" error: "Provide needed info for post."
  2) The system displays an appropriate error message: "Please provide title and content."

## 2.3. Special Requirements

- User must be logged in to access the "Add Post" button and create a post.
- Both title and content must be validated on the client side (e.g., required fields).
- The backend must validate the presence of required fields and verify the user's existence.
- The modal must prevent submission if fields are empty.
- The main page should dynamically display the new post immediately after it is created.

## 2.4. Preconditions

- The user must be logged in with a valid JWT token.
- The "auth-service" must be operational to verify the user's existence.
- The backend "create post" endpoint must be functional and connected to the database.

## 2.5. Postconditions

- **Successful Post Creation**: A new post is created, saved in the database, and displayed on the main page.
- **Unsuccessful Post Creation**: An error message is displayed, and the modal remains open for the user to correct their input.
- **No Action**: If the user cancels the modal, no changes are made to the database, and the modal is closed.

---
