<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Managing Appeals Functionality</h2>
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
- [2. Managing Appeals Scenario](#2-managing-appeals-scenario)  
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

This document describes the managing appeals functionality available to administrators on the Jwitter platform. It enables admins to review and process appeals made by users on posts that were previously removed due to offensive content.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the accept/decline appeal functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Managing Appeals Scenario

## 2.1. Short Description

Administrators can access the appeals management interface via the admin panel. They can view posts that were deleted for being offensive but have received appeals from their authors. The admin reviews each appeal and either accepts or declines it.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The admin logs into the application and clicks the **Admin** button in the sidebar.
2) The admin is redirected to the admin panel.
3) The admin navigates to the **Appeals** tab.
4) The admin views a list of posts that were deleted for offensive content but have pending appeals.
5) For each post, the admin sees two buttons: **Accept Appeal** and **Decline Appeal**.
6) The admin reviews a post and clicks either **Accept Appeal** or **Decline Appeal**.
7) If the admin clicks **Accept Appeal**:
   - The post is restored and no longer marked as deleted.
   - The author receives an email notifying that their appeal was accepted.
   - The post's report score is reset to 0.
   - The author's report score is decreased by 50.
8) If the admin clicks **Decline Appeal**:
   - The post is permanently deleted.
   - The author receives an email notifying that their appeal was declined.

### 2.2.2. Extensions

- **At any point, if the server encounters an error:**
  1) The system displays an error message: "Server error. Please try again later."
  2) The admin remains on the Appeals tab.

## 2.3. Special Requirements

- Only users with admin privileges can access the Appeals tab and perform appeal management actions.
- The system must securely send emails to authors about the appeal decision.
- Actions on appeals must be logged for auditing purposes.
- The interface must handle large numbers of appeals efficiently.

## 2.4. Preconditions

- The admin must be logged in with valid administrator credentials.
- There must be posts that have been deleted for offensive content and have pending appeals.

## 2.5. Postconditions

- **Accept Appeal**: The post is restored, the author is notified, and report scores are updated accordingly.
- **Decline Appeal**: The post is permanently deleted and the author is notified.
- The admin remains on the Appeals tab to continue managing other appeals.

---
