# UserServiceService

## Overview
The `UserServiceService` is an Angular service responsible for handling all user-related operations such as authentication, registration, profile management, password changes, notification settings, visibility settings, and role management. It interacts with the backend API to perform these operations.

---

## Methods

### 1. `login(username: string, password: string): Observable<{ message: string; token: string }>`
- **Description**: Authenticates a user with the provided credentials and returns a token if successful.
- **Parameters**:
  - `username`: The username of the user (string).
  - `password`: The password of the user (string).
- **Returns**: An `Observable` containing a response with a `message` and a `token`.

---

### 2. `register(username: string, password: string, email: string): Observable<any>`
- **Description**: Registers a new user in the system.
- **Parameters**:
  - `username`: The username of the new user (string).
  - `password`: The password for the new user (string).
  - `email`: The email address of the new user (string).
- **Returns**: An `Observable` with the registration response from the backend.

---

### 3. `getUserById(userId: string): Observable<User>`
- **Description**: Fetches the details of a user by their ID.
- **Parameters**:
  - `userId`: The ID of the user to retrieve (string).
- **Returns**: An `Observable` containing the `User` object.

---

### 4. `deleteProfile(userId: string, pass: string): Observable<any>`
- **Description**: Deletes the profile of a user.
- **Parameters**:
  - `userId`: The ID of the user whose profile is being deleted (string).
  - `pass`: The password of the user for verification (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 5. `changePassword(user: string, pass: string): Observable<any>`
- **Description**: Changes the password of a user.
- **Parameters**:
  - `user`: The ID of the user whose password is being changed (string).
  - `pass`: The new password for the user (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 6. `forgotPassword(mail: string): Observable<any>`
- **Description**: Sends a password reset email to the user.
- **Parameters**:
  - `mail`: The email address of the user (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 7. `resetPassword(token: string, newpass: string): Observable<any>`
- **Description**: Resets the user's password using a reset token.
- **Parameters**:
  - `token`: The reset token provided to the user (string).
  - `newpass`: The new password for the user (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 8. `saveNotificationSettings(user: string, frReqNotifs: boolean, messageNotifs: boolean): Observable<any>`
- **Description**: Saves the user's notification preferences.
- **Parameters**:
  - `user`: The ID of the user (string).
  - `frReqNotifs`: Whether to enable friend request notifications (boolean).
  - `messageNotifs`: Whether to enable message notifications (boolean).
- **Returns**: An `Observable` with the response from the backend.

---

### 9. `saveVisibilitySettings(user: string, postV: string, likeV: string, friendV: string, emailV: string): Observable<any>`
- **Description**: Updates the user's visibility settings for posts, likes, friends, and email.
- **Parameters**:
  - `user`: The ID of the user (string).
  - `postV`: Visibility for posts (string).
  - `likeV`: Visibility for likes (string).
  - `friendV`: Visibility for friends (string).
  - `emailV`: Visibility for email (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 10. `searchUsers(query: string): Observable<User[]>`
- **Description**: Searches for users based on a query string.
- **Parameters**:
  - `query`: The search query (string).
- **Returns**: An `Observable` containing a list of matching users.

---

### 11. `getAllUsers(): Observable<User[]>`
- **Description**: Retrieves all users in the system.
- **Returns**: An `Observable` containing a list of all users.

---

### 12. `switchUserRole(uid: string, role: string): Observable<any>`
- **Description**: Switches the role of a user (e.g., from `user` to `admin`).
- **Parameters**:
  - `uid`: The ID of the user (string).
  - `role`: The new role for the user (string, e.g., "admin").
- **Returns**: An `Observable` with the response from the backend.