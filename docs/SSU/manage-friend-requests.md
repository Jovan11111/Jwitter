<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Managing Pending Friend Requests</h2>
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
- [2. Managing Pending Friend Requests Scenario](#2-managing-pending-friend-requests-scenario)  
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

This document describes how a logged-in user manages their pending friend requests on the Jwitter platform, including viewing, accepting, and declining requests.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the accept/decline friend request functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Managing Pending Friend Requests Scenario

## 2.1. Short Description

A logged-in user sees a **Friendship Requests** button in the sidebar. If there are new friend requests, a green dot appears next to it. Clicking the button expands the sidebar to show the list of pending friend requests. Each request displays the requester's username and two buttons: **Accept** and **Decline**.  
- Clicking **Accept** adds the requester as a friend, changes the request status to "Accepted," and removes it from the list.  
- Clicking **Decline** changes the request status to "Declined" and removes it from the list.  
If no pending requests remain, the green dot disappears.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The logged-in user sees the sidebar with a **Friendship Requests** button.  
2) If there are new friend requests, a green dot is visible next to the button.  
3) The user clicks the **Friendship Requests** button.  
4) The sidebar expands to reveal a list of pending friend requests.  
5) Each request shows:  
   - Requester's username.  
   - Two buttons: **Accept** and **Decline**.  
6) The user clicks **Accept** on a request.  
7) The system adds the requester as a friend to the user, changes the request status to "Accepted," and removes it from the list.  
8) The user clicks **Decline** on a request.  
9) The system changes the request status to "Declined" and removes it from the list.  
10) If no pending requests remain, the green dot next to **Friendship Requests** disappears.

### 2.2.2. Extensions

- **7a. If there is a server or network error when accepting or declining:**  
  - Display an error message.  
  - The request remains visible for retry.

- **4a. If there are no pending friend requests:**  
  - The green dot is not shown.  
  - The sidebar expands, but the requests list is empty.

## 2.3. Special Requirements

- The green dot accurately reflects the presence of pending requests in real-time or on page load.  
- The sidebar smoothly expands and collapses when toggling the **Friendship Requests** button.  
- Button clicks trigger backend API calls to update friend request status and user relationships securely.  
- The UI updates immediately after accepting or declining a request.

## 2.4. Preconditions

- The user must be logged in.  
- The user must have at least zero or more pending friend requests.

## 2.5. Postconditions

- Accepted requests result in new friendships.  
- Declined requests do not create friendships.  
- The UI reflects the current state of friend requests correctly.

---
