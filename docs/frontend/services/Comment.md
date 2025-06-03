# CommentService

## Overview
The `CommentService` is an Angular service responsible for managing comments in the application. It interacts with the backend to handle operations such as adding comments, deleting comments, replying to comments, and retrieving comments by post, user, or ID.

---

## Methods

### 1. `addComment(user: string, post: string, content: string): Observable<any>`
- **Description**: Adds a new comment to a specific post.
- **Parameters**:
  - `user`: The ID of the user adding the comment (string).
  - `post`: The ID of the post to which the comment is being added (string).
  - `content`: The content of the comment (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 2. `deleteComment(comment_id: string): Observable<any>`
- **Description**: Deletes a comment by its ID.
- **Parameters**:
  - `comment_id`: The ID of the comment to delete (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 3. `replyToComment(parent_id: string): Observable<any>`
- **Description**: Adds a reply to an existing comment.
- **Parameters**:
  - `parent_id`: The ID of the comment being replied to (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 4. `getPostComments(post_id: string): Observable<Comment[]>`
- **Description**: Retrieves all comments for a specific post.
- **Parameters**:
  - `post_id`: The ID of the post for which comments are being retrieved (string).
- **Returns**: An `Observable` containing an array of `Comment` objects.

---

### 5. `getUserComments(user_id: string): Observable<Comment[]>`
- **Description**: Retrieves all comments made by a specific user.
- **Parameters**:
  - `user_id`: The ID of the user whose comments are being retrieved (string).
- **Returns**: An `Observable` containing an array of `Comment` objects.

---

### 6. `getCommentById(comment_id: string): Observable<Comment>`
- **Description**: Retrieves a specific comment by its ID.
- **Parameters**:
  - `comment_id`: The ID of the comment being retrieved (string).
- **Returns**: An `Observable` containing the `Comment` object.

