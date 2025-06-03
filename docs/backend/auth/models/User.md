# User Model

## Overview
The `User` model is part of the `user` microservice and is implemented using the `Mongoose` library for MongoDB. It represents the application's users and stores information about their accounts, preferences, roles, and data visibility options.

## Schema Structure

### Fields
#### username
- **Type**: `String`
- **Description**: The username that identifies the user within the application.
- **Attributes**: 
  - Required
  - Unique
  - Trimmed

#### password
- **Type**: `String`
- **Description**: The user's hashed password used for authentication.
- **Attributes**: 
  - Required

#### email
- **Type**: `String`
- **Description**: The user's email address.
- **Attributes**: 
  - Required
  - Unique
  - Trimmed

#### role
- **Type**: `String`
- **Description**: The role of the user in the application (e.g., admin or regular user).
- **Attributes**: 
  - Allowed values: `"admin"`, `"user"`
  - Default value: `"user"`

#### frReqNotifs
- **Type**: `Boolean`
- **Description**: Indicates whether the user wants to receive friend request notifications.
- **Attributes**: 
  - Default value: `true`

#### messageNotifs
- **Type**: `Boolean`
- **Description**: Indicates whether the user wants to receive message notifications.
- **Attributes**: 
  - Default value: `true`

#### resetToken
- **Type**: `String`
- **Description**: A token used for resetting the user's password.

#### postVisibility
- **Type**: `String`
- **Description**: Determines who can see the user's posts.
- **Attributes**: 
  - Allowed values: `"everyone"`, `"friends"`, `"nobody"`
  - Default value: `"everyone"`

#### likeVisibility
- **Type**: `String`
- **Description**: Determines who can see the user's likes.
- **Attributes**: 
  - Allowed values: `"everyone"`, `"friends"`, `"nobody"`
  - Default value: `"everyone"`

#### friendVisibility
- **Type**: `String`
- **Description**: Determines who can see the user's friends list.
- **Attributes**: 
  - Allowed values: `"everyone"`, `"friends"`, `"nobody"`
  - Default value: `"everyone"`

#### emailVisibility
- **Type**: `String`
- **Description**: Determines who can see the user's email address.
- **Attributes**: 
  - Allowed values: `"everyone"`, `"friends"`, `"nobody"`
  - Default value: `"everyone"`

#### reportScore
- **Type**: `Number`
- **Description**: A user score based on reports.
- **Attributes**: 
  - Default value: `0`

---

## Example

```json
{
  "username": "johndoe",
  "password": "hashed_password_here",
  "email": "johndoe@example.com",
  "role": "user",
  "frReqNotifs": true,
  "messageNotifs": true,
  "resetToken": null,
  "postVisibility": "friends",
  "likeVisibility": "everyone",
  "friendVisibility": "nobody",
  "emailVisibility": "friends",
  "reportScore": 5
}
```
