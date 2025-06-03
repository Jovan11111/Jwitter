# FriendshipService

## Overview
The `FriendshipService` is an Angular service responsible for managing friendships and friendship requests in the application. It interacts with the backend to handle operations such as sending, accepting, and declining friendship requests, retrieving friends, and managing friendships.

---

## Methods

### 1. `sendFriendRequest(sender: string, receiver: string): Observable<any>`
- **Description**: Sends a friendship request from the `sender` to the `receiver`.
- **Parameters**:
  - `sender`: The ID of the user sending the friendship request (string).
  - `receiver`: The ID of the user receiving the friendship request (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 2. `declineFriendRequest(requestId: string): Observable<any>`
- **Description**: Declines a friendship request by its ID.
- **Parameters**:
  - `requestId`: The ID of the friendship request to decline (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 3. `acceptFriendRequest(requestId: string): Observable<any>`
- **Description**: Accepts a friendship request by its ID.
- **Parameters**:
  - `requestId`: The ID of the friendship request to accept (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 4. `getPendingRequests(userId: string): Observable<FriendshipRequest[]>`
- **Description**: Retrieves all pending friendship requests for a specific user.
- **Parameters**:
  - `userId`: The ID of the user for whom pending requests are retrieved (string).
- **Returns**: An `Observable` containing an array of `FriendshipRequest` objects.

---

### 5. `getUserFriends(userId: string): Observable<User[]>`
- **Description**: Retrieves all friends of a specific user.
- **Parameters**:
  - `userId`: The ID of the user whose friends are being retrieved (string).
- **Returns**: An `Observable` containing an array of `User` objects.

---

### 6. `areTheyFriends(user1: string, user2: string): Observable<boolean>`
- **Description**: Checks if two users are friends.
- **Parameters**:
  - `user1`: The ID of the first user (string).
  - `user2`: The ID of the second user (string).
- **Returns**: An `Observable` containing a boolean value (`true` if they are friends, `false` otherwise).

---

### 7. `removeFriend(user1: string, user2: string): Observable<any>`
- **Description**: Removes a friendship between two users.
- **Parameters**:
  - `user1`: The ID of the first user (string).
  - `user2`: The ID of the second user (string).
- **Returns**: An `Observable` with the response from the backend.
