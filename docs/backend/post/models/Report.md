# Report Model

## Overview
The `Report` model is part of the `post` microservice and is used to store information about user reports on posts. This model ensures that each report is tied to a specific user and post, preventing duplicate reports from the same user on the same post. It is designed to handle moderation and reporting functionality within the application.

## Schema Structure

### Fields
#### user
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the user who submitted the report. This is a foreign key linking the report to the `User` model.
- **Attributes**: 
  - Required

#### post
- **Type**: `mongoose.Schema.Types.ObjectId`
- **Description**: References the post that was reported. This is a foreign key linking the report to the `Post` model.
- **Attributes**: 
  - Required

---

## Example
```json
{
  "user": "64458f2c3a2b4f1d842c7e8e",
  "post": "64458f2c3a2b4f1d842c7e8f"
}
```