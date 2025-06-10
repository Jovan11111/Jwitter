<p align="center">
<h4 align="center">Jwitter Documentation</h4>
</p>
<br>
<h3 align="center">Jwitter</h3>
<br>
<br><br><br>
<h2 align="center">Main Page Search Functionality</h2>
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
- [2. Main Page Search Scenario](#2-main-page-search-scenario)  
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

This document outlines the search functionality on the main page of the Jwitter platform. It allows users to search for posts by title and users by username using a search bar with an accompanying search button.

## 1.2. Purpose and Audience

This document is intended for self-reference during the development of the search posts/users functionality. It serves as a guideline for implementation, testing, and future improvements.

## 1.3. Open Issues

| #   | Description                   | Resolution                 |
|-----|-------------------------------|----------------------------|
|     |                               |                            |

---

# 2. Main Page Search Scenario

## 2.1. Short Description

Users can enter a search query in the search bar on the main page and either press Enter or click the "Search" button. Upon a valid query, two tabs are shown: **Posts** (active by default) displaying posts whose titles contain the query, and **Users**, showing users whose usernames contain the query. If the query is empty, no action occurs.

## 2.2. Flow of Events

### 2.2.1. Basic Successful Scenario

1) The user opens the main page of the application.
2) The user enters a search query into the search bar.
3) The user presses Enter or clicks the **Search** button.
4) The system processes the query.
5) Two tabs are displayed:
   - The **Posts** tab is active by default and shows all posts with titles containing the query.
   - The **Users** tab lists all users with usernames containing the query.
6) The user can switch between the two tabs to view either posts or users matching the query.

### 2.2.2. Extensions

- **3a. The user submits an empty query (no text in the search bar):**
  1) The system performs no action.
  2) The user remains on the main page with no changes or error messages.

## 2.3. Special Requirements

- Search should be case-insensitive.
- The interface must update dynamically to show the results in the tabs.
- Pressing Enter in the search input or clicking the Search button triggers the same search behavior.
- No search results found in either tab should display an appropriate empty state message (e.g., "No posts found" or "No users found").

## 2.4. Preconditions

- The user must be on the main page.
- The search bar and search button must be visible and functional.

## 2.5. Postconditions

- On valid search, the user sees the search results separated into two tabs: posts and users.
- On empty search, the page remains unchanged with no errors.

---
