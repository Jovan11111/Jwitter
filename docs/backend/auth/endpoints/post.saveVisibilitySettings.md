# POST /api/auth/saveVisibilitySettings/:id

## Description  
Updates the visibility settings for a specific user.  
Each visibility field can be set to `"everyone"`, `"friends"`, or `"nobody"`.

## Implementation  
- Extracts the user ID from the URL parameter and visibility values from the request body.
- Validates that the ID is a valid MongoDB ObjectId.
- Validates that each visibility value is one of the allowed options.
- Finds the user and updates their visibility settings.
- Returns `200 OK` on success.
- If the user is not found, returns `404 Not Found`.
- If validation fails, returns `400 Bad Request`.
- On server error, returns `500 Internal Server Error`.

## Authentication  
Requires user authentication.  
(Should be handled by middleware.)

## URL Parameters  
- `id` – the ID of the user whose visibility settings are being changed.

## Request body  
Expected JSON:
```json
{
  "post": "everyone | friends | nobody",
  "like": "everyone | friends | nobody",
  "friend": "everyone | friends | nobody",
  "email": "everyone | friends | nobody"
}
```
Example JSON:
```json
{
  "post": "friends",
  "like": "everyone",
  "friend": "friends",
  "email": "nobody"
}
```

## Response body
1. Success
```json
{
  "message": "Updated visibility settings"
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
  "error": "Invalid visibility settings"
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