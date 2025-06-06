# User Service

## Overview
The User Service is responsible for user authentication, registration, and profile management within the Jwitter platform. It is built using Node.js, Express.js, and MongoDB, and is containerized using Docker for easy deployment and scalability.

---

## Features
- User Registration & Authentication
  - Secure user registration and login using hashed passwords and JWT tokens.
- Password Management
  - Password change, forgot password flow, and secure password reset using email tokens.
- User Profile Management
  - Retrieve user data by ID.
  - Full account deletion, with or without password confirmation.
- Preferences & Settings
  - Manage notification and visibility settings per user.
- User Reporting System
  - Add report points to users based on inappropriate behavior.
- Search & Moderation
  - Search users by username (partial match).
  - Admin endpoints to view all users, switch user roles, and handle user appeals.


---

## Endpoints
### Base URL
```console
http://auth-service:5000/api/auth
```

### API Endpoints
| No | Method  | Endpoint                                  | Description                                             |
|----|---------|-------------------------------------------|---------------------------------------------------------|
| 1  | POST    | `/api/auth/register`                      | Registers a new user                                    |
| 2  | POST    | `/api/auth/login`                         | Authenticates a user                                    |
| 3  | GET     | `/api/auth/user/:id`                      | Returns user based on ID                                |
| 4  | POST    | `/api/auth/deleteProfile`                 | Deletes user profile if password is correct             |
| 5  | POST    | `/api/auth/deleteProfileNoPass`           | Deletes user profile without a password                 |
| 6  | POST    | `/api/auth/changePassword`                | Updates the user password field                         |
| 7  | POST    | `/api/auth/forgotPassword`                | Sends user an email with a forgot password token        |
| 8  | POST    | `/api/auth/resetPassword/:token`          | Resets user password if token is correct                |
| 9  | POST    | `/api/auth/saveNotificationSettings/:id`  | Updates user notification settings                      |
| 10 | POST    | `/api/auth/saveVisibilitySettings/:id`    | Updates user visibility settings                        |
| 11 | POST    | `/api/auth/reportUser/:id`                | Adds report points to user profile                      |
| 12 | GET     | `/api/auth/searchUsers/:query`            | Returns a list of users which usernames contain a query |
| 13 | GET     | `/api/auth/acceptAppeal/:id`              | Accepts appeal user made                                |
| 14 | GET     | `/api/auth/getAllUsers`                   | Returns all users                                       |
| 15 | POST    | `/api/auth/switchUserRole`                | Updates user tole                                       |



---

## Data Models

### User
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "role": "user",
  "frReqNotifs": "boolean",
  "messageNotifs": "boolean",
  "resetToken": "string",
  "postVisibility": "enum [everyone, nobody, friends]",
  "likeVisibility": "enum [everyone, nobody, friends]",
  "friendVisibility": "enum [everyone, nobody, friends]",
  "emailVisibility": "enum [everyone, nobody, friends]",
  "reportScore": "number"
}
```

## Dependencies
This microservice interacts with the following other microservices:
- Comment service
  - Calls the following endpoint when deleting user profile
    - http://comment-service:5004/api/comment/deleteUserComments/:id
- Friendship service
  - Calls the following endpoint when deleting user profile
    - http://friendship-service:5002/api/friend/deleteUserFrReqsAndFrShips/:id
- Message service
  - Calls the following endpoint when deleting user profile
    - http://message-service:5003/api/message/deleteUserMessages/:id
- Post service
  - Calls the following endpoint when deleting user profile
    - http://post-service:5001/api/post/deleteUserPosts/:id
- Email service
  - Calls the following endpoint in process of forgot password
    - http://email-service:5005/api/email/reset

        