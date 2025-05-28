# POST /api/auth/login

## Description
Authenticates a user by verifying their username and password. If successful, returns a JWT token for session authentication.

## Implementation
- Finds a user in the database by the provided `username`.
- If the user is not found, returns `404 Not Found` with an appropriate message.
- If the user is found, the provided `password` is compared with the hashed password stored in the database using `bcrypt`.
- If the password is incorrect, returns `400 Bad Request`.
- If the password matches, a JWT token is generated using the user's `_id` and a secret key (`process.env.JWT_KEY`).
- Returns `200 OK` with a success message and the JWT token.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication
No authentication required. This endpoint is publicly accessible.

## Request body
Expected JSON:
```json
{
  "username": "string",
  "password": "string"
}
```
Example JSON:
```json
{
  "username": "johndoe",
  "password": "secure123"
}
```

## Response body
1. Success
```json
{
  "message": "Login successful",
  "token": "jwt_token_string"
}
```
2. Bad Request
```json
{
  "message": "User not found"
}
```
```json
{
  "message": "Wrong password"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```
