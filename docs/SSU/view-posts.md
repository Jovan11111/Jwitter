<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">View Posts Functionality</h2>
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
- [2. View Posts Scenario](#2-view-posts-scenario)
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

This document outlines the functionality for viewing posts on the Jwitter platform. Posts are displayed on the main page and are dynamically loaded from the backend. Users can view posts, usernames, reaction statuses, and other details.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the view posts functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                                                     | Resolution                 |
|-----|-----------------------------------------------------------------|----------------------------|
| 1   | Implement pagination for better performance when loading posts. | Pending decision           |

---

# 2. View Posts Scenario

## 2.1. Short Description

The functionality allows users to view a list of posts on the main page. Each post includes details such as title, content (truncated if too long), the author's username, and the number of likes/dislikes. Logged-in users can see their reaction to individual posts (`like`, `dislike`, or `no reaction`).

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the main page of the application.
2) The system retrieves the logged-in user's ID from the JWT token.
3) The system sends a request to the backend to fetch all posts.
4) The backend retrieves all posts from the database.
5) For each post, the backend retrieves the author's username and the logged-in user's reaction (if any).
6) The system displays the posts as a list of cards, where each card includes:
   - The post's title, content (truncated if too long), and author's username.
   - The number of likes and dislikes.
   - The logged-in user's reaction (like, dislike, or none).

### 2.2.2. Extensions

- **3a. No posts available**:
  1) The system displays a message: "No posts available."
  2) The user remains on the main page.

- **4a. Error fetching posts from backend**:
  1) The system displays an error message: "Failed to load posts. Please try again later."
  2) The user remains on the main page.

- **5a. Failed to retrieve username for a post**:
  1) The system sets the username to "Unknown user" and continues displaying the post.

- **6a. Post content exceeds 280 characters**:
  1) The system truncates the content to 280 characters and appends a "Read more" link.
  2) Clicking the "Read more" link redirects the user to the post's details page.

## 2.3. Special Requirements

- Posts must be fetched dynamically from the backend.
- The system should display real-time reactions (like/dislike) and update them when the user interacts with a post.
- System performance should be optimized for large datasets (e.g., future implementation of pagination or infinite scrolling).
- Posts must display accurate metadata (e.g., username, creation time, and reaction status).
- The design must be responsive and suitable for mobile and desktop platforms.

## 2.4. Preconditions

- The user must be logged in to access the main page and view posts.
- The backend service must be connected to the database and able to retrieve posts and usernames.
- The "auth-service" must be available to fetch usernames for posts.

## 2.5. Postconditions

- **Successful Post Retrieval**: All available posts are displayed on the main page in a user-friendly format.
- **Unsuccessful Post Retrieval**: An appropriate error message is displayed, and the user remains on the main page.
- **Partial Data**: If any usernames or reactions cannot be retrieved, the posts are still displayed with placeholders (e.g., "Unknown user").

---
