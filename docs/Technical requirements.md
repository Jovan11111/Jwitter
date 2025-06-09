# Technical Requirements

## 1. Overview

The *Jwitter* application is a full-stack social platform built using the **MEAN stack** (MongoDB, Express, Angular, Node.js), following a microservices architecture. Each backend service is independently containerized using Docker. Additionally, the application includes one microservice developed with **Python FastAPI** (for post reporting), making the system polyglot and modular.

The application consists of:

- A **frontend** developed in Angular with TailwindCSS for styling.
- A **backend** divided into several microservices written in Node.js with Express.
- An **API gateway** configured using NGINX to route frontend and backend traffic.
- A **Docker-based infrastructure** using Docker Compose for orchestration and a Makefile for easier local development commands.

---

## 2. Frontend

- **Framework:** Angular 19.2.0
- **Package Manager:** npm 9.2.0
- **Styling:** TailwindCSS
- **Communication with Backend:** Angular `HttpClient` via generated services (e.g., `CommentService`).
- **Dockerized:** Yes
- **API Gateway:** Configured using NGINX (`nginx.conf`)
- **Build Command:** `npm run build --configuration=production`

---

## 3. Backend

- **Platform:** Node.js (v18.19.1), Express.js
- **Database:** Each microservice uses a separate MongoDB instance
- **Authentication:** JWT (token generated on the backend)
- **Socket Communication:** Used via `socket.io` for real-time messaging

### Microservices

| Service         | Description                              |
|------------------|------------------------------------------|
| `user-service`   | Handles user authentication and profiles |
| `post-service`   | Manages posts                            |
| `comment-service`| Manages comments on posts                |
| `message-service`| Enables user-to-user messaging via sockets |
| `email-service`  | Sends confirmation and notification emails |
| `friendship-service` | Manages friendships (follows, requests, etc.) |
| `reporting-service` | Python FastAPI service for post reporting |

Each service has its own:
- `Dockerfile`
- `Dockerfile.test` (for running Jest unit tests)

---

## 4. Docker & Deployment

- **Dockerized Architecture:** All services, frontend, and gateway are containerized.
- **Docker Compose:** Orchestrates the entire application with a single command.
- **Makefile:** Provides helpful shortcuts for building, running, and testing services.
- **Deployment Mode:** Local development (no cloud/VPS deployment currently).

---

## 5. Testing

- **Backend Testing Framework:** [Jest](https://jestjs.io/)
- **Test Type:** Unit tests only
- **Testing Strategy:** Each service contains a `Dockerfile.test` to execute its test suite in isolation.
- **Frontend Testing (Planned):** Selenium IDE will be used to automate UI tests (to be implemented).

---

## 6. Security

- **Authentication:** JWT-based tokens issued by the backend and passed in Authorization headers.
- **Password Hashing:** [bcrypt](https://www.npmjs.com/package/bcrypt)
- **CORS Policy:** Enabled for all origins and methods
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv) used for managing sensitive configs via `.env` files.

---

## 7. Environment & Configuration

- `.env` files are used per microservice to configure:
  - MongoDB URIs
  - Port bindings
  - Secret keys (JWT, email credentials)
- These variables are loaded with `dotenv`.

---

## 8. Scalability and Maintainability

- **Microservice Architecture:** Each backend component is independently deployable, allowing better scaling and isolation.
- **Stateless Frontend:** Easily deployable through CDN or container hosting.
- **Socket.io:** Enables real-time communication (scalable to clustered socket servers if needed).
- **Gateway:** NGINX can be extended for rate limiting, caching, and load balancing in production environments.

---
