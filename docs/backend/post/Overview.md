# Post service

## Overview
The Post Service is responsible for managing all content posted by users, including creation, retrieval, interaction (likes/dislikes), reporting, and appeals.
It is built using Node.js, Express.js, and MongoDB.
The service is containerized using Docker for seamless deployment and scalability.
---

## Features
- Post Management
  - Create, read, update, and delete posts
  - Retrieve posts based on user ID or search query
- Reactions
  - Like and dislike functionality per user per post
- Reporting System
  - Report posts
  - Automatically delete or flag posts based on report score (uses AI service)
- Appeals Workflow
  - Submit, accept, or decline post-related appeals
- Visibility Handling
  - Show posts based on visibility rules and friendship relations
---

## Endpoints
### Base URL
http://post-service:5001/api/post

### API Endpoints
| No  | Method  | Endpoint       | Description |
|-----|---------|----------------|-------------|
| 1   | GET     | `/api/post/visiblePosts/:id`   | Returns all posts visible to a user based on other users visibility settings |
| 2   | GET     | `/api/post/getPost/:id/:uid`   | Returns a post with a specific ID |
| 3   | DELETE  | `/api/post/deletePost/:id`   | Deletes a post with a specific ID |
| 4   | POST    | `/api/post/createPost`   | Creates a post |
| 5   | GET     | `/api/post/userPosts/:id`   | Returns all posts from a user with a specific ID |
| 6   | POST    | `/api/post/like`   | Adds a like reaction to a post |
| 7   | POST    | `/api/post/dislike`   | Adds a dislike reacion to a post |
| 8   | DELETE  | `/api/post/deleteUserPosts/:id`   | Deletes all post from  specific user |
| 9   | GET     | `/api/post/getUserLikes/:id/:lid`   | Returns all posts a user has liked |
| 10  | POST    | `/api/post/reportPost/:id`   | Sends a report for a post |
| 11  | GET     | `/api/post/searchPosts/:query/:id`   | Returns all post that contain a query in their title |
| 12  | POST    | `/api/post/appeal/:id`   | Appeals a post |
| 13  | POST    | `/api/post/acceptAppeal/:id`   | Accepts appeal for a post |
| 14  | POST    | `/api/post/declineAppeal/:id`   | Declines appeal for a post |
| 15  | GET    | `/api/post/getAppealedPosts`   | Returns all posts that have been appealed |
| 16  | GET     | `/api/post/allPosts`   | Returns all posts on the platform |
| 17  | POST     | `/api/post/editPost`   | Updates the content of the post |
---

## Data Models

### Post
```json
{
  "title": "string",
  "content": "string",
  "user": "ObjectId",
  "numLikes": "number",
  "numDislikes": "number",
  "createdAt": "Date",
  "reportScore": "number",
  "reportStatus": "enum: [clear, deleted, appealed]"
}
```
### Reaction
```json
{
  "user": "ObjectId",
  "post": "ObjectId",
  "reaction": "enum: [liked, disliked]"
}
```
### Report
```json
{
  "user": "ObjectId",
  "post": "ObjectId"
}
```

## Dependencies
This microservice interacts with the following other microservices:
- User
    - Calls the following endpoint when getting visible posts, creating a post, getting a post, gettng user likes, searching through posts, getting appealed posts, accepting an appeal, declinig an appeal and getting all posts
        - http://auth-service:5000/api/auth/user/:id
    - Calls the following endpoint when reporting a post
        - http://auth-service:5000/api/auth/deleteProfileNoPass
    - Calls the following endpoint when reporting a post
        - http://auth-service:5000/api/auth/reportUser/:id
    - Calls the following endpoint when accepting an appeal
        - http://auth-service:5000/api/auth/acceptAppeal/:id
- Friendship
    - Calls the following endpoints when getting visible posts, getting user likes and searching through posts
        - http://friendship-service:5002/api/friend/areTheyFriends/:id2/:id1
- AI reporting
    - Calls the following endpoints when reporting a post
        - http://aireporting-service:8000/rate
- Email
    - Calls the following endpoints when reporting a post
        - http://email-service:5005/api/email/delpost
    - Calls the following endpoint when reporting a post
        - http://email-service:5005/api/email/delacc
    - Calls the following endpoint when accepting an appeal
        - http://email-service:5005/api/email/acceptapp
    - Calls the following endpoint when declining an appeal
        - http://email-service:5005/api/email/declineapp