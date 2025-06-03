# Post Model

## Overview
The `Post` model is part of the `post` microservice and is implemented using the `Mongoose` library for MongoDB. It is responsible for handling posts. It defines the structure for storing post-related data such as title, content, author, likes, dislikes, and reporting status. This model provides the foundation for managing user posts within the application.

## Schema Structure

### Fields
#### title
- **Type**: `String`
- **Description**: The title of the post.
- **Attributes**: 
  - Required

#### content
- **Type**: `String`
- **Description**: The main content/text of the post.
- **Attributes**: 
  - Required

#### user
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who created the post. This is a foreign key linking the post to the `User` model.
- **Attributes**: 
  - Required

#### numLikes
- **Type**: `Number`
- **Description**: The number of likes the post has received.
- **Attributes**: 
  - Default value: `0`

#### numDislikes
- **Type**: `Number`
- **Description**: The number of dislikes the post has received.
- **Attributes**: 
  - Default value: `0`

#### createdAt
- **Type**: `Date`
- **Description**: The timestamp when the post was created.
- **Attributes**: 
  - Default value: The current date and time

#### reportScore
- **Type**: `Number`
- **Description**: A score indicating the number of reports or severity of reports made against the post.
- **Attributes**: 
  - Default value: `0`

#### reportStatus
- **Type**: `String`
- **Description**: The status of the post based on reports it has received. It indicates whether the post is clear, deleted, or under appeal.
- **Attributes**: 
  - Allowed values: `"clear"`, `"deleted"`, `"appealed"`
  - Default value: `"clear"`

---

## Example

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "user": "64458f2c3a2b4f1d842c7e8e",
  "numLikes": 10,
  "numDislikes": 2,
  "createdAt": "2025-04-09T10:00:00.000Z",
  "reportScore": 0,
  "reportStatus": "clear"
}
```
