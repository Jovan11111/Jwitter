<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Friend Request Sending Functionality</h2>
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
- [2. Friend Request Sending Scenario](#2-friend-request-sending-scenario)  
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

This document outlines the functionality that allows a user to send a friendship request to another user on the Jwitter platform via the user details page.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the send friend request functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Friend Request Sending Scenario

## 2.1. Short Description

A logged-in user can send a friend request to another user by visiting that user's details page, if they are not already friends. The request is sent by clicking the "Add Friend" button, which then disappears and is replaced by the message "Friendship request sent".

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user navigates to the user details page of another user who is not yet their friend. This can happen by:  
   - Clicking the username on a post authored by that user.  
   - Finding the user in the friend list of another user.  
   - Searching for the user via the search functionality.  
2) On the user details page, the user sees an **Add Friend** button in the upper right corner.  
3) The user clicks the **Add Friend** button.  
4) The system sends a friend request to the selected user.  
5) The **Add Friend** button disappears and is replaced with the text **Friendship request sent**.

### 2.2.2. Extensions

- **4a. If the user is already friends with the viewed user**:  
  - The **Add Friend** button is not shown.

- **4b. If there is a pending friend request already sent or received**:  
  - The **Add Friend** button is not shown or replaced by a relevant status message (not detailed in this scenario).

- **4c. Server or network error when sending the request**:  
  - The system displays an error message (not detailed here).  
  - The **Add Friend** button remains visible for retry.

## 2.3. Special Requirements

- The button must only appear if the two users are not already friends and no pending request exists.
- The UI must immediately update after clicking **Add Friend** to reflect the request status.
- The friend request action must be secured and verified by backend logic.

## 2.4. Preconditions

- The user must be logged in.
- The target user must exist and not be already a friend or have a pending friend request.

## 2.5. Postconditions

- On success, a friend request is recorded and the UI updates to show **Friendship request sent**.
- On failure, the user remains able to retry sending the request.

---
