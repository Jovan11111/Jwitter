# Message

## Overview
The `Message` model is part of the `message` microservice and is used to store and manage direct messages between users. It tracks the sender, receiver, message content, and the timestamp when the message was sent. This model is the foundation for implementing private messaging functionalities in the application.

---

## Schema Structure

### Fields
#### sender
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who sent the message. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### receiver
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who received the message. This is a foreign key linking to the `User` model.
- **Attributes**: 
  - Required

#### content
- **Type**: `String`
- **Description**: The actual text content of the message.
- **Attributes**: 
  - Required

#### createdAt
- **Type**: `Date`
- **Description**: The timestamp when the message was sent.
- **Attributes**: 
  - Default value: The current date and time.

---

## Example

```json
{
  "sender": "64458f2c3a2b4f1d842c7e8e",
  "receiver": "64458f2c3a2b4f1d842c7e8f",
  "content": "SR flip flop is good but JK is better",
  "createdAt": "2025-04-09T10:00:00.000Z"
}
```