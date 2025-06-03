# PostService

## Overview
The `PostService` is an Angular service responsible for managing posts in the application. It interacts with the backend to perform operations such as creating, retrieving, deleting, liking, disliking, reporting, and appealing posts. It also provides functionality to search posts and manage user-specific posts.

## Methods

### 1. `getVisiblePosts(id: string): Observable<Post[]>`
- **Description**: Retrieves all visible posts for a specific user.
- **Parameters**:
  - `id`: The ID of the user (string).
- **Returns**: An `Observable` containing an array of `Post` objects.

---

### 2. `getPostById(postId: string, loggedInUserId: string): Observable<Post>`
- **Description**: Retrieves a specific post by its ID for a logged-in user.
- **Parameters**:
  - `postId`: The ID of the post (string).
  - `loggedInUserId`: The ID of the logged-in user (string).
- **Returns**: An `Observable` containing the `Post` object.

---

### 3. `createPost(title: string, content: string, userId: string): Observable<boolean>`
- **Description**: Creates a new post.
- **Parameters**:
  - `title`: The title of the post (string).
  - `content`: The content of the post (string).
  - `userId`: The ID of the user creating the post (string).
- **Returns**: An `Observable` indicating whether the post creation was successful.

---

### 4. `deletePost(postId: string): Observable<any>`
- **Description**: Deletes a post by its ID.
- **Parameters**:
  - `postId`: The ID of the post to delete (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 5. `getUserPosts(userId: string): Observable<Post[]>`
- **Description**: Retrieves all posts created by a specific user.
- **Parameters**:
  - `userId`: The ID of the user (string).
- **Returns**: An `Observable` containing an array of `Post` objects.

---

### 6. `likePost(user: string, post: string): Observable<any>`
- **Description**: Likes or unlikes a specific post.
- **Parameters**:
  - `user`: The ID of the user liking the post (string).
  - `post`: The ID of the post being liked (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 7. `dislikePost(user: string, post: string): Observable<any>`
- **Description**: Dislikes or removes a dislike from a specific post.
- **Parameters**:
  - `user`: The ID of the user disliking the post (string).
  - `post`: The ID of the post being disliked (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 8. `getUserLikes(user: string, loggedInUserId: string): Observable<Post[]>`
- **Description**: Retrieves all posts liked by a specific user, visible to the logged-in user.
- **Parameters**:
  - `user`: The ID of the user whose liked posts are being retrieved (string).
  - `loggedInUserId`: The ID of the logged-in user (string).
- **Returns**: An `Observable` containing an array of `Post` objects.

---

### 9. `reportPost(post: string, user: string): Observable<any>`
- **Description**: Reports a specific post.
- **Parameters**:
  - `post`: The ID of the post being reported (string).
  - `user`: The ID of the user reporting the post (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 10. `searchPosts(query: string, loggedInUserId: string): Observable<Post[]>`
- **Description**: Searches for posts based on a query string, visible to the logged-in user.
- **Parameters**:
  - `query`: The search query (string).
  - `loggedInUserId`: The ID of the logged-in user (string).
- **Returns**: An `Observable` containing an array of `Post` objects.

---

### 11. `appealPost(postId: string): Observable<any>`
- **Description**: Submits an appeal for a specific post.
- **Parameters**:
  - `postId`: The ID of the post being appealed (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 12. `acceptAppeal(postId: string): Observable<any>`
- **Description**: Accepts an appeal for a specific post.
- **Parameters**:
  - `postId`: The ID of the post whose appeal is being accepted (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 13. `declineAppeal(postId: string): Observable<any>`
- **Description**: Declines an appeal for a specific post.
- **Parameters**:
  - `postId`: The ID of the post whose appeal is being declined (string).
- **Returns**: An `Observable` with the response from the backend.

---

### 14. `getAppealedPosts(): Observable<Post[]>`
- **Description**: Retrieves all posts that have been appealed.
- **Returns**: An `Observable` containing an array of appealed `Post` objects.

---

### 15. `allPosts(): Observable<Post[]>`
- **Description**: Retrieves all posts in the system.
- **Returns**: An `Observable` containing an array of `Post` objects.

---

### 16. `editPost(pid: string, content: string): Observable<any>`
- **Description**: Edits the content of a specific post.
- **Parameters**:
  - `pid`: The ID of the post to edit (string).
  - `content`: The updated content of the post (string).
- **Returns**: An `Observable` with the response from the backend.

