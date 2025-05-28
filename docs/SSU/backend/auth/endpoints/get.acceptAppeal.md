# GET /api/auth/acceptAppeal/:id

## Description  
Accepts a user's appeal and reduces their report score by 50 points.

## Implementation  
- Validates that the provided `id` is valid.
- If the ID is invalid, returns `400 Bad Request` with an error message.
- If the user is not found, returns `404 Not Found`.
- If the user is found, decreases their report score by 50 and saves the change.
- Returns `200 OK` on success.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication  
No authentication required. This endpoint is publicly accessible.

## Request body  
No request body is needed. The user ID is provided as a URL parameter.

## URL
Example URL:
```
GET /api/auth/acceptAppeal/60f8c2e4d4a3c92f48f31e29
```

## Response body
1. Success
```json
{
  "message": "User cleared of the blocked post"
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