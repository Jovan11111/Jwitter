# GET /api/auth/user/:id

## Description  
Fetches a user's information by their unique ID.

## Implementation  
- Validates that the provided `id` is a valid.
- If the ID is invalid, returns `400 Bad Request` with an error message.
- If the ID is valid, attempts to find the user by ID using.
- If the user is not found, returns `404 Not Found`.
- If the user is found, returns the user object with `200 OK`.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication  
No authentication required. This endpoint is publicly accessible.

## URL
Example URL:
```
GET /api/auth/user/60f8c2e4d4a3c92f48f31e29
```

## Response body  
1. Success
```json
{
  "_id": "60f8c2e4d4a3c92f48f31e29",
  "username": "johndoe",
  "email": "john@example.com",
  ...
}
```
2. Bad Request
```json
{
  "error": "Invalid user ID"
}
```
```json
{
  "message": "User not found"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```
