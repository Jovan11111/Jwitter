# Message Service

## Overview
The Message Service is responsible for managing private messages between users on the Jwitter platform. It enables real-time and persistent chat functionality, including creating, retrieving, editing, and deleting messages.
This service is built using Node.js, Express.js, and MongoDB, and is part of a modular microservices architecture. It uses socket.io for real time messaging. It is fully containerized using Docker for easy deployment and scalability.
---

## Features
- Messaging
  - Send messages between two users
  - Retrieve conversation history between two users
  - Edit and delete individual messages
  - Delete an entire chat between two users
  - Delete all user messages
---

## Endpoints

### Base URL
```console
http://message-service:5003/api/message
```
### API Endpoints
| No | Method  | Endpoint                              | Description |
|----|---------|---------------------------------------|-------------|
| 1  | POST    | `/api/message/sendMessage/:id1/:id2`  | Creates a new message between 2 users |
| 2  | GET     | `/api/message/getMessages/:id1/:id2`  | Returns all messages between 2 users |
| 3  | POST    | `/api/message/editMessage/:id`        | Updates the message content |
| 4  | DELETE  | `/api/message/deleteMessage/:id`      | Deletes the message |
| 5  | DELETE  | `/api/message/deleteChat/:id1/:id2`   | Deletes all messages between 2 users |
| 6  | GET     | `/api/message/getChatters/:id`        | Returns all users a specific user has messages with |
| 7  | DELETE  | `/api/message/deleteUserMessages/:id` | Deletes all messages and from a specific user |
---

## Data Models

### [Model Name]
```json
{
  "sender": "ObjectId",
  "receiver": "ObjectId",
  "content": "String",
  "createdAt": "Date"
}
```

## Dependencies
This microservice interacts with the following other microservices:
- User
    - Calls the following endpoint when creating a message and getting user chats
        - http://auth-service:5000/api/auth/user/:id
- Email
    - Calls the following endpoint when creating a new message
        - http://email-service:5005/api/email/msg