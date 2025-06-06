# Comment Service

## Overview
The Comment Service is responsible for handling all operations related to comments within the Jwitter platform. It allows users to add comments to posts, reply to other comments (nested commenting), and retrieve or delete comments as needed. The service is built using Node.js, Express.js, and MongoDB, and is fully containerized using Docker for scalable and isolated deployment.

---

## Features
- [List key functionalities of the microservice, e.g.:]
  - Create, read, update, and delete [resource name, e.g., "users"]
  - [Other distinctive features provided by this microservice]
- Add Comments
  - Create new comments tied to specific posts.
  - Reply to existing comments using the parent attribute to support threaded conversations.
- Read Comments
  - Retrieve all comments for a given post.
  - Retrieve all comments made by a specific user.
  - Fetch individual comments by ID.
- Delete Comments
  - Delete a single comment by ID.
  - Delete all comments associated with a specific user (used during profile deletion).
---

## Endpoints

### Base URL
```console
http://comment-service:5004/api/comment
```

### API Endpoints
| No | Method  | Endpoint                              | Description                                   |
|----|---------|---------------------------------------|-----------------------------------------------|
| 1  | POST    | `/api/comment/addComment`             | Adds a new comment to the database            |
| 2  | DELETE  | `/api/comment/deleteComment/:id`      | Deletes a comment from the database           |
| 3  | POST    | `/api/comment/replyToComment/:id`     | Adds a new comment that has a parent atribute |
| 4  | GET     | `/api/comment/getPostComments/:id`    | Returns all comments on some post             |
| 5  | GET     | `/api/comment/getUserComments/:id`    | Returns all comments from someuser            | 
| 6  | GET     | `/api/comment/getCommentById/:id`     | Returns a comment with given ID               |
| 7  | DELETE  | `/api/comment/deleteUserComments/:id` | Deletes all comments from some user           |

---

## Data Models

### Comment
```json
{
  "user": "ObjectID",
  "post": "ObjectID",
  "content": "string",
  "parent": "ObjectID",
  "createdAt": "Date"
}
```

## Dependencies
This microservice interacts with the following other microservices:
- User service
    - Calls the following endpoint when return comments on some post
        - http://auth-service:5000/api/auth/user/:id