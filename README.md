# Jwitter Functional requirements

## 1. Introduction

**Jwitter** is a social networking platform designed to allow users to create posts, interact with others through likes, dislikes, and comments, manage friendships, exchange private messages, and customize privacy settings. The application includes an administrative interface for moderation, mass communication, and user management. Jwitter aims to foster user engagement while ensuring a safe and moderated environment.

---

## 2. User Roles

### Visitor (Unauthenticated User)
- Can register an account
- Can log in with valid credentials
- Can use the forgot password feature to reset their password

### Regular User (Authenticated)
- Create and interact with posts (like, dislike, comment)
- Search for posts and users
- Manage friendships (send, accept, decline requests)
- Send and receive private messages
- Customize profile visibility and notification settings
- Edit password or delete their account

### Admin
- All privileges of a regular user
- Access to Admin Panel
- View and delete any post
- Manage user roles
- Send email to any user or to all users
- Handle post appeal requests

---

## 3. Functional Requirements

### Authentication & Authorization

1. **User Login**  
   - Enter username and password  
   - Show error if credentials are incorrect  
   - Redirect to Main page on successful login

2. **User Registration**  
   - Enter email, username, password, and password confirmation  
   - Validate matching passwords and unique username  
   - Redirect to Login page on successful registration

3. **Forgot Password**  
   - Open modal to enter email  
   - Send reset link with token via email if user exists  
   - Validate token and allow entering a new password twice  
   - Redirect to Login page on successful password reset

---

### Main Page

4. **Display Post Feed**  
   - List posts with title, author, and like/dislike status  
   - Highlight liked and disliked posts visually

5. **Add New Post**  
   - Click “+” button to open modal  
   - Enter title and content  
   - Enable “Add” only when fields are filled  
   - Allow closing modal via “Cancel” or clicking outside  
   - Save and display post on success

6. **Search Posts and Users**  
   - Enter query in search bar  
   - Show two tabs: **Posts** and **Users**  
     - **Posts tab**: post titles containing query  
     - **Users tab**: usernames containing query  

7. **Navigate via Sidebar**  
   - Links to: Home, Profile, Messages, Friendship Requests, Logout  
   - Admins see additional link: **Admin Panel**

---

### Friendships

8. **View and Manage Friend Requests**  
   - Expand sidebar to list incoming friend requests  
   - Each request shows username with **Accept** and **Decline** buttons  
   - Collapse sidebar to hide requests

9. **Send Friend Request**  
   - On a user’s profile, click **Send Request** (if not friends)

10. **Display Friendship Status**  
    - On profiles, button states are: **Send Request**, **Pending…**, or **Send Message** depending on relationship

---

### Post Interactions

11. **Like or Dislike Posts**  
    - Toggle like/dislike on post  
    - Changing a reaction removes the opposite reaction

12. **View Post Details**  
    - Click post title to open details page showing content and comments

13. **Add Comment**  
    - Click **Add Comment** to open input field  
    - Enter comment, **Add** to submit or **Cancel** to dismiss

14. **Navigate to User Profiles via Comments**  
    - Click any commenter’s username to view their profile

15. **Post Options Menu (“…”)**  
    - **Admins**: see **Delete Post**  
    - **Post Authors**: see **Delete Post**  
    - **Other Users**: see **Report Post**

16. **Report Post Workflow**  
    - Sends content and title to GROQ API  
    - Stores returned offense score in `reportScore` on post and author  
    - If post score >50: auto-delete post and notify author by email  
    - If user’s total score >100: auto-delete user profile and notify

17. **Appeal a Deleted Post**  
    - Author receives email with link to **Appeal** page  
    - Page shows the deleted post and an **Appeal** button

---

### User Profiles

18. **View Another User’s Profile**  
    - Displays username, email, and action button based on relationship  
    - Tabs: **Posts**, **Likes**, **Friends**  
      - **Posts** and **Likes** show titles and content snippets  
      - **Friends** lists usernames linking to their profiles

19. **View Own Profile**  
    - Same view as others’ profile, but action button is **Settings**

---

### Messaging

20. **Message Inbox**  
    - List of conversations on the right, active chat in the center

21. **Send Message**  
    - Type and send messages in chat box normally

22. **Start New Conversation**  
    - Use the small search bar for friends  
    - Selecting a friend opens a new empty chat

---

### Settings

23. **Change Password**  
    - Open modal to enter current and new password twice  
    - Validate and update password, then redirect to Login

24. **Delete Account**  
    - Confirm deletion via password in modal  
    - Remove user’s profile, posts, comments, friendships, messages; redirect to Login

25. **Privacy Visibility Settings**  
    - Configure who can view email, friends list, likes, and posts  
    - Options: **Friends**, **Everybody**, or **No One**  
    - Save settings button

26. **Notification Settings**  
    - Toggle email notifications for messages and friend requests  
    - Save settings button

---

### Admin Panel

27. **Posts Tab**  
    - View all site posts

28. **Users Tab**  
    - View all users with username, email, and role  
    - Change user roles via dropdown + Save button  
    - Click email to open email modal for sending a message to that user

29. **Appeals Tab**  
    - View all posts deleted via reports and appealed by authors  
    - For each appeal: **Accept** or **Decline** button  
      - **Accept**: reset post’s `reportScore`, reduce author’s score by 50, restore post, email notification  
      - **Decline**: permanently delete post and notify author

30. **Settings Tab**  
    - Global **Send Email** button opens modal for Title and Content  
    - Clicking **Send** emails all users site-wide  
    - Used for system-wide announcements or updates

---

# Jwitter Technical Requirements

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
