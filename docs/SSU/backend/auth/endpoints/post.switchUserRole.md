# POST /api/auth/switchUserRole

## Description  
Changes the role of a specified user to either `"admin"` or `"user"`.

## Implementation  
- Extracts `userId` and `userRole` from the request body.
- Validates that `userId` is a valid MongoDB ObjectId.
- Validates that `userRole` is either `"admin"` or `"user"`.
- Searches for the user by ID.
- If the user is found, updates their role and saves the changes.
- Returns `200 OK` with a success message.
- If the user is not found, returns `404 Not Found`.
- If input validation fails, returns `400 Bad Request`.
- On server error, returns `500 Internal Server Error`.

## Authentication  
Requires admin authentication.  

## Request body  
Expected JSON:
```json
{
  "userId": "string",
  "userRole": "string"
}
```
Example JSON:
```json
{
  "userId": "662f924e2f8e4a5d304d9dd7",
  "userRole": "admin"
}
```

## Response body
1. Success
```json
{
  "message": "Switched user role"
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
```json
{
  "message": "Invalid user role"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```