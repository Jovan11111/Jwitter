<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Admin Delete Post Functionality</h2>
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
- [2. Admin Delete Post Scenario](#2-admin-delete-post-scenario)  
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

This document describes the functionality that allows administrators to delete any post on the Jwitter platform. Admins can perform the delete action from multiple parts of the application including the main page, post details page, and the admin panel.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the admin-delete post functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Admin Delete Post Scenario

## 2.1. Short Description

Administrators can delete any post by selecting the "Delete post" option available in the post card menu (accessible via "..." button) from the main page, post details page, or the admin panel under the Posts tab. Deleting a post removes it permanently.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The admin logs into the application.
2) The admin navigates to any of the following locations where posts are listed or displayed:
   - Main page post cards
   - Post details page
   - Admin panel under the **Posts** tab
3) The admin clicks on the "..." menu button in the top-right corner of a post card or post detail.
4) The admin selects **Delete post** from the menu options.
5) The post is removed from the UI immediately.
6) The admin can continue managing other posts.

### 2.2.2. Extensions

- **5a. Server error during deletion:**
  1) The system displays an error message: "Server error. Please try again later."
  2) The post remains undeleted.

## 2.3. Special Requirements

- Only users with admin privileges can see and use the **Delete post** option.
- The deletion is permanent and cannot be undone through the UI.
- The system must handle concurrent deletion attempts gracefully.
- Proper authorization checks must be enforced on the backend to prevent unauthorized deletions.

## 2.4. Preconditions

- The admin must be logged in with valid administrator credentials.
- The post targeted for deletion must exist in the system.

## 2.5. Postconditions

- The targeted post is permanently removed from the system.
- The post no longer appears in any post listing or detail view.
- The admin remains able to manage other posts or navigate elsewhere.

---
