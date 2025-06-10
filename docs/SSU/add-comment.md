<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Add Comment Functionality</h2>
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
- [2. Add Comment Scenario](#2-add-comment-scenario)
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

This document describes the "Add Comment" functionality within the Jwitter platform. Users can add a comment to a specific post by navigating to the post's details page and using the add comment interface.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the add comment functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Add Comment Scenario

## 2.1. Short Description

Users can add a comment to a post by accessing the post-details page. The interface includes a button labeled "Add Comment", which reveals a text input field and two buttons: "Submit" and "Cancel". Once a comment is submitted, it appears in the list of comments.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user navigates to the feed and clicks on a post title.
2) The system routes to the post-details page (`/post-details/:id`) showing the full post and its comments.
3) The user clicks the "Add Comment" button.
4) A textbox and two buttons ("Submit" and "Cancel") appear.
5) The user types a comment into the textbox.
6) The user clicks the "Submit" button.
7) The system validates the comment and saves it in the database.
8) The new comment is displayed in the list of comments.
9) The textbox and buttons disappear, and the "Add Comment" button reappears.

### 2.2.2. Extensions

- **5a. User submits an empty comment**:
  1) The system displays an error in red text: "Failed to add comment".
  2) The comment is not added.
  3) The textbox and buttons remain visible.

- **6a. User clicks the "Cancel" button**:
  1) The textbox and buttons disappear.
  2) No comment is added.
  3) The "Add Comment" button becomes visible again.

- **7a. Server error during comment saving**:
  1) The system displays an error: "Failed to add comment".
  2) The comment is not added.
  3) The user may retry or cancel.

## 2.3. Special Requirements

- The comment text field must not be empty before submission.
- The system must provide real-time feedback in case of error.
- Only authenticated users may see and interact with the comment section.

## 2.4. Preconditions

- The user must be authenticated.
- The post must exist in the database and have a valid ID.
- The post-details page must be accessible (`/post-details/:id`).

## 2.5. Postconditions

- **Successful Comment**: The comment is saved, displayed in the comment list, and the UI resets to its original state.
- **Unsuccessful Comment**: An error is shown, and the user remains in the comment input state.
- **Cancelled Action**: No comment is added, and the UI resets.

---
