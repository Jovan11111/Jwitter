# POST /api/auth/saveNotificationSettings/:id

## Description  
Updates the notification settings for a specific user.  
Allows the user to enable or disable friend request and message notifications.

## Implementation  
- Extracts the user ID from the URL parameter and notification flags from the request body.
- Validates that the ID is a valid MongoDB ObjectId.
- Validates that both `frreq` and `msg` are boolean values.
- Finds the user and updates their notification settings.
- Returns `200 OK` on success.
- If the user is not found, returns `404 Not Found`.
- If validation fails, returns `400 Bad Request`.
- On server error, returns `500 Internal Server Error`.

## Authentication  
Requires user authentication.  
(Should be handled by middleware.)

## URL Parameters  
- `id` – the ID of the user whose notification settings are being changed.

## Request body  
Expected JSON:
```json
{
  "frreq": true | false,
  "msg": true | false
}
```
Example JSON:
```json
{
  "frreq": true,
  "msg": false
}
```

## Response body
1. Success
```json
{
  "message": "Updated notification settings"
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
  "error": "Invalid notification settings"
}
```
3. Server error
```json
{
  "message": "Server error: <error message>"
}
```