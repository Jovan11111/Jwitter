# POST /api/auth/resetPassword/:token

## Description  
Resets a user's password using a valid password reset token.

## Implementation  
- Extracts the reset token from the URL parameters.
- Looks for a user in the database with a matching `resetToken`.
- If no user is found, returns `400 Bad Request` with an appropriate message.
- If a user is found, hashes the new password and updates the user's password in the database.
- Clears the `resetToken` after a successful reset.
- Returns `200 OK` with a success message.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication  
No authentication required. This endpoint is publicly accessible via the reset token.

## Request body  
Expected JSON:
```json
{
  "newPassword": "string"
}
```
Example JSON:
```json
{
  "newPassword": "newsecurepassword123"
}
```

## Response body
1. Success
```json
{
  "message": "Password successfully reset"
}
```
2. Bad Request
```json
{
  "message": "Invalid or expired token"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```