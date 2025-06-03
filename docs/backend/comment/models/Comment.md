# Comment Model

## Overview
The `Comment` model is part of the `comment` microservice and is used to store and manage user comments on posts. It supports nested comments by allowing comments to reference a parent comment, enabling threaded discussions. This model is crucial for implementing user interaction and feedback features within the application.

---

## Schema Structure

### Fields
#### user
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who created the comment. This is a foreign key linking the comment to the `User` model.
- **Attributes**: 
  - Required

#### post
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the post to which the comment belongs. This is a foreign key linking the comment to the `Post` model.
- **Attributes**: 
  - Required

#### content
- **Type**: `String`
- **Description**: The main text content of the comment.
- **Attributes**: 
  - Required

#### parent
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the parent comment, enabling nested comments or threaded discussions. If the comment is a top-level comment, this field is `null`.
- **Attributes**: 
  - Default value: `null`
  - Refers to the `Comment` model

#### createdAt
- **Type**: `Date`
- **Description**: The timestamp when the comment was created.
- **Attributes**: 
  - Default value: The current date and time.

---

## Example
### Top-level Comment
```json
{
  "user": "64458f2c3a2b4f1d842c7e8e",
  "post": "64458f2c3a2b4f1d842c7e8f",
  "content": "This is a top-level comment.",
  "parent": null,
  "createdAt": "2025-04-09T10:00:00.000Z"
}
```
### Reply
```json
{
  "user": "64458f2c3a2b4f1d842c7e8e",
  "post": "64458f2c3a2b4f1d842c7e8f",
  "content": "This is a reply to the top-level comment.",
  "parent": "64458f2c3a2b4f1d842c7e90",
  "createdAt": "2025-04-09T10:00:00.000Z"
}
```