# POST /api/auth/register

## Description
Registers a new user in the system by saving their credentials to the database.

## Implementation
- Checks if a user with the provided username already exists in the database.
- If the user exists, returns `400 Bad Request` with a message.
- If the user does not exist:
  - The password is hashed using `bcrypt` with a salt factor of 10.
  - A new user is created and saved to MongoDB.
  - Returns `201 Created` with a success message.
- If an internal error occurs during the process, returns `500 Internal Server Error`.

## Authentication
No authentication required. This endpoint is publicly accessible.

## Request body
Expected JSON:
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
Example JSON:
```json
{
  "username": "johndoe",
  "password": "secure123",
  "email": "john@example.com"
}
```

## Response body
1. Successful
```json
{
  "message": "Registered successfully"
}
```
2. Bad request
```json
{
  "message": "string"
}
```
5. Server error
```json
{
  "message": "Server error: <error message>"
}
```
