# Friendship Model

## Overview
The `Friendship` model is part of the `friendship` microservice and is used to track friendships between users in the application. It stores information about the two users involved in the friendship and when the friendship was created. This model is essential for implementing social features like friend lists and mutual friends.

---

## Schema Structure

### Fields
#### user1
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References one of the users in the friendship. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### user2
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the other user in the friendship. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### createdAt
- **Type**: `Date`
- **Description**: The timestamp when the friendship was created.
- **Attributes**: 
  - Default value: The current date and time.

---

## Example

```json
{
  "user1": "64458f2c3a2b4f1d842c7e8e",
  "user2": "64458f2c3a2b4f1d842c7e8f",
  "createdAt": "2025-04-09T10:00:00.000Z"
}
```