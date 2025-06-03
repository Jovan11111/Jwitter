# MessageService

## Overview
The `MessageService` is an Angular service responsible for managing messaging functionality in the application. It handles sending and retrieving messages, editing and deleting messages, managing chats between users, and listening for real-time messages through WebSocket integration using `socket.io`.

---

## Methods

### 1. `sendMessage(senderId: string, receiverId: string, content: string): void`
- **Description**: Sends a message from one user to another using a WebSocket connection.
- **Parameters**:
  - `senderId`: The ID of the user sending the message (string).
  - `receiverId`: The ID of the user receiving the message (string).
  - `content`: The content of the message (string).
- **Returns**: `void`.

---

### 2. `getMessages(id1: string, id2: string): Observable<Message[]>`
- **Description**: Retrieves all messages exchanged between two users.
- **Parameters**:
  - `id1`: The ID of the first user (string).
  - `id2`: The ID of the second user (string).
- **Returns**: An `Observable` containing an array of `Message` objects.

---

### 3. `editMessage(messageId: string): Observable<boolean>`
- **Description**: Edits a specific message by its ID.
- **Parameters**:
  - `messageId`: The ID of the message to edit (string).
- **Returns**: An `Observable` indicating whether the message was successfully edited (`true` or `false`).

---

### 4. `deleteMessage(messageId: string): Observable<boolean>`
- **Description**: Deletes a specific message by its ID.
- **Parameters**:
  - `messageId`: The ID of the message to delete (string).
- **Returns**: An `Observable` indicating whether the message was successfully deleted (`true` or `false`).

---

### 5. `deleteChat(userId1: string, userId2: string): Observable<boolean>`
- **Description**: Deletes the entire chat history between two users.
- **Parameters**:
  - `userId1`: The ID of the first user (string).
  - `userId2`: The ID of the second user (string).
- **Returns**: An `Observable` indicating whether the chat was successfully deleted (`true` or `false`).

---

### 6. `getChatters(userId: string): Observable<User[]>`
- **Description**: Retrieves a list of users that the specified user has chatted with.
- **Parameters**:
  - `userId`: The ID of the user whose chat partners are being retrieved (string).
- **Returns**: An `Observable` containing an array of `User` objects.

---

### 7. `listenForMessages(): Observable<Message>`
- **Description**: Listens for new incoming messages in real time via WebSocket.
- **Returns**: An `Observable` that emits a `Message` object every time a new message is received.

