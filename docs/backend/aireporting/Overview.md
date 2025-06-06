# User Service

## Overview
AI Reporting Service is a microservice built with Python using the FastAPI framework. It is responsible for evaluating how offensive a social media post is by using a Large Language Model (LLM) through the GROQ API. The service returns a score from 0 (not offensive) to 10 (extremely offensive), and is typically used when a post is reported by a Jwitter user.
Service is containerized using Docker for easy deployment and scalability.
---

## Features
- AI reporting
  - Tells the rest of the app how offansive the post is based on title and content
---

## Endpoints
### Base URL
```console
http://aireporting-service:8000
```

### API Endpoints
| No | Method  | Endpoint  | Description                                             |
|----|---------|-----------|---------------------------------------------------------|
| 1  | POST    | `/rate`   | Evaluates how offensive a post is and returns a score from 0 to 10   |
---

## Data Models
This service doesn't user any models

## Dependencies
This microservice interacts with the external API:
    - https://api.groq.com/openai/v1/chat/completions