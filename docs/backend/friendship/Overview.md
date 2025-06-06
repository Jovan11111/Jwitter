# Friendship Service

## Overview
The Friendship Service handles all logic related to user friendships and friendship requests in the Jwitter platform. It allows users to send, accept, and decline friend requests, as well as manage and verify friendships.
This service is built using Node.js, Express.js, and MongoDB, and is part of a distributed microservice architecture. It is containerized using Docker for seamless deployment and scalability.

---

## Features
- [List key functionalities of the microservice, e.g.:]
  - Create, read, update, and delete [resource name, e.g., "users"]
  - [Other distinctive features provided by this microservice]
- Friendship Requests
  - Send new friendship requests
  - Accept or decline pending friendship requests
  - Retrieve all pending requests for a user
- Friendship Management
  - Retrieve all active friendships of a user
  - Check if two users are friends
  - Remove an existing friendship
- Delete all friendship-related data when a user account is deleted
---

## Endpoints

### Base URL
```console
http://friendship-service:5002/api/friend
```

### API Endpoints
| No | Method  | Endpoint                                    | Description |
|----|---------|---------------------------------------------|-------------|
| 1  | POST    | `/api/friend/sendFrReq/:sender/:receiver`   | Creates a new friendship request |
| 2  | POST    | `/api/friend/declineFrReq/:id`              | Updates status of friendship request to declined |
| 3  | POST    | `/api/friend/acceptFrReq/:id`               | Updates status of friendship request to accepted and creates a new friendship |
| 4  | GET     | `/api/friend/getPendingFrReq/:userId`       | Returns all pending friendship requests that some user has |
| 5  | GET     | `/api/friend/getUserFriends/:userId`        | Returns all friendships from a user |
| 6  | GET     | `/api/friend/areTheyFriends/:id1/:id2`      | Returns true if users are friends, false otherwise |
| 7  | DELETE  | `/api/friend/removeFriend/:id1/:id2`        | Deletes a friendship between 2 users |
| 8  | DELETE  | `/api/friend/deleteUserFrReqsAndFrShips/:id`| Deletes all user info about friendships |

---

## Data Models

### Friendship
```json
{
  "user1": "ObjectId",
  "user2": "ObjectId",
  "createdAt": "Date"
}
```

### Friendship Request
```json
{
  "sender": "ObjectId",
  "receiver": "ObjectId",
  "status": "enum: [pending, accepted, declined]",
  "createdAt": "Date"
}
```
## Dependencies
This microservice interacts with the following other microservices:
- User
    - Calls the following endpoint when creating a friendship request, returning pending requests and returns user friends
        - http://auth-service:5000/api/auth/user/:id
- Email
    - Calls the following endpoint when creating a friendship request
        - http://email-service:5005/api/email/frreq
