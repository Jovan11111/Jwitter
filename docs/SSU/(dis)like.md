<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Like/Dislike Post Functionality</h2>
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
- [2. Like/Dislike Post Scenario](#2-like-dislike-post-scenario)
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

This document outlines the functionality for liking or disliking posts on the Jwitter platform. Logged-in users can react to posts using either a "like" or "dislike" button. The user can toggle between these reactions or remove their reaction entirely.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the like/dislike functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                                                     | Resolution                 |
|-----|-----------------------------------------------------------------|----------------------------|
| 1   | Add real-time updates to reactions for all users via WebSocket. | Pending decision           |

---

# 2. Like/Dislike Post Scenario

## 2.1. Short Description

Users can interact with posts by liking or disliking them. If a user has already reacted to a post, clicking the same button removes their reaction. Changing the reaction (e.g., from "like" to "dislike") updates the post's reaction counters accordingly.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user views the list of posts on the main page.
2) The user clicks the "like" or "dislike" button on a specific post.
3) The system sends a request to the backend with the user's ID and the post's ID.
4) The backend checks if the user has already reacted to the post:
   - If the user has not reacted:
     - A new reaction is created in the database (e.g., "liked").
     - The post's reaction counters are updated (e.g., `numLikes` is incremented by 1).
   - If the user has already reacted:
     - If the reaction is the same ("liked" -> "liked"), the reaction is removed, and the counter is decremented.
     - If the reaction is different ("liked" -> "disliked"), the existing reaction is updated, and the counters are adjusted.
5) The system updates the post's UI to reflect the new reaction state (e.g., changes the like/dislike button icon).

### 2.2.2. Extensions

- **4a. Backend fails to update reaction**:
  1) The system displays an error message: "Failed to update reaction. Please try again later."
  2) The UI resets the user's input to the previous state.

- **4b. The post no longer exists**:
  1) The backend returns a "Post not found" error.
  2) The system displays an error message: "This post is no longer available."

- **4c. Server error while processing the request**:
  1) The backend returns a server error (500 Internal Server Error).
  2) The system displays a generic error message: "An error occurred. Please try again later."

## 2.3. Special Requirements

- Users must be logged in to react to posts.
- The UI must update dynamically to reflect the user's reaction immediately after interaction.
- Reaction counters (likes and dislikes) must be in sync with the backend data.
- The system must prevent users from performing invalid actions (e.g., liking the same post twice without removing the reaction).
- Backend errors must be handled gracefully, and the user should be informed of any issues.

## 2.4. Preconditions

- The user must be logged in with a valid JWT token.
- The post must exist in the database.
- The backend's reaction service must be operational and connected to the database.

## 2.5. Postconditions

- **Successful Like/Dislike**: The post's reaction is updated in the database, and the UI reflects the new state.
- **Unsuccessful Like/Dislike**: The user's input is reset, and an error message is displayed.
- **No Change**: If the user cancels their reaction, the reaction is removed from the database, and the counters are adjusted.

---
