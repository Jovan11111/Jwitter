# POST /api/auth/changePassword

## Description  
Changes the password of a user identified by their ID.

## Implementation  
- Validates that the provided `userId` is valid.
- If the ID is invalid, returns `400 Bad Request`.
- If the user is not found, returns `404 Not Found`.
- If the user is found, hashes the new password and updates it in the database.
- Returns `200 OK` on successful password change.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication  
No authentication required. This endpoint is publicly accessible.

## Request body  
Expected JSON:
```json
{
  "userId": "string",
  "newPass": "string"
}
```
Example JSON:
```json
{
  "userId": "60f8c2e4d4a3c92f48f31e29",
  "newPass": "newSecurePassword123"
}
```

## Response body  

1. Success
```json
{
  "message": "Changed password succesfully"
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