# Reaction Model

## Overview
The `Reaction` model is part of the `post` microservice and is used to store user reactions (likes and dislikes) to posts. By tracking individual user reactions, this model ensures that each user's interaction with a post is remembered, enabling features such as toggling reactions and analytics on user engagement.

## Schema Structure

### Fields
#### user
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who performed the reaction. This is a foreign key linking the reaction to the `User` model.
- **Attributes**: 
  - Required

#### post
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the post that the reaction is associated with. This is a foreign key linking the reaction to the `Post` model.
- **Attributes**: 
  - Required

#### reaction
- **Type**: `String`
- **Description**: The type of reaction given by the user. It specifies whether the user liked or disliked the post.
- **Attributes**: 
  - Allowed values: `"liked"`, `"disliked"`
  - Required

---

## Example

```json
{
  "user": "64458f2c3a2b4f1d842c7e8e",
  "post": "64458f2c3a2b4f1d842c7e8f",
  "reaction": "liked"
}
```