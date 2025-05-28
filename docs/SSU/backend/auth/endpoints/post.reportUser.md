# POST /api/auth/reportUser/:id

## Description  
Increases a user's report score by a specified value. Used when reporting a user for inappropriate behavior.

## Implementation  
- Validates that the provided `id` is valid.
- Validates that the `scoree` value is a positive number.
- If the ID or score is invalid, returns `400 Bad Request`.
- If the user is not found, returns `404 Not Found`.
- If the user is found, increases their `reportScore` by the given value and saves the updated user.
- Returns `200 OK` on success.
- If an internal error occurs, returns `500 Internal Server Error`.

## Authentication  
No authentication required. This endpoint is publicly accessible.

## Request body  
Expected JSON:
```json
{
  "scoree": number
}
```
Example JSON:
```json
{
  "scoree": 4
}
```

## Response body
1. Success
```json
{
  "message": "Reported user"
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
  "error": "Invalid score"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```