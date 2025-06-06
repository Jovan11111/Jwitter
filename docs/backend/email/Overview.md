# Email Service

## Overview
The Email Service is responsible for sending automated emails to users based on specific events in the system, such as password resets, new messages, friendship requests, deleted content, and appeal decisions.
It is built using Node.js, Express.js, and Nodemailer, and is designed to function as an internal utility service within a broader microservices ecosystem.
The service is containerized using Docker for easy deployment and integration.
---

## Features
- Email Notifications
    - Send password reset instructions
    - Notify users of new messages or friendship requests
    - Alert users when their posts or accounts are deleted
    - Inform users of appeal outcomes (accepted or declined)
    - Send broadcast emails to a list of users
---

## Endpoints

### Base URL
```console
http://email-service:5005/api/email
```
### API Endpoints
| No | Method  | Endpoint | Description |
|----|---------|----------|-------------|
| 1  | POST    | `/api/email/reset`      | Sends a reset password email |
| 2  | POST    | `/api/email/msg`        | Sends a new message email |
| 3  | POST    | `/api/email/frreq`      | Sends a new friendship request email |
| 4  | POST    | `/api/email/delpost`    | Sends a deleted post email |
| 5  | POST    | `/api/email/delacc`     | Sends a deleted account email |
| 6  | POST    | `/api/email/declineapp` | Sends a declined appeal email |
| 7  | POST    | `/api/email/acceptapp`  | Sends a accepted appeal email |
| 8  | POST    | `/api/email/sendEmail`  | Sends an email to a list of users |
---

## Data Models
This service doesn't have any models

## Dependencies
This microservice is not dependant on any other microservice