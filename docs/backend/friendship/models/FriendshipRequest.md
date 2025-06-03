# FriendshipRequest Model

## Overview
The `FriendshipRequest` model is part of the `friendship` microservice and is used to manage friendship requests between users. It tracks the sender and receiver of the request, the status of the request, and when the request was created. This model is essential for handling the workflow of sending, accepting, and declining friendship requests within the application.

---

## Schema Structure

### Fields
#### sender
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who sent the friendship request. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### receiver
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who received the friendship request. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### status
- **Type**: `String`
- **Description**: The current status of the friendship request.
- **Attributes**: 
  - Allowed values: `"pending"`, `"accepted"`, `"declined"`
  - Default value: `"pending"`

#### createdAt
- **Type**: `Date`
- **Description**: The timestamp when the friendship request was created.
- **Attributes**: 
  - Default value: The current date and time.

---

## Example

```json
{
  "sender": "64458f2c3a2b4f1d842c7e8e",
  "receiver": "64458f2c3a2b4f1d842c7e8f",
  "status": "pending",
  "createdAt": "2025-04-09T10:00:00.000Z"
}
```