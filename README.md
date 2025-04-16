# 📝 Posting System Backend

This is a **demo/test project** created for **educational purposes only**. It demonstrates basic backend functionalities such as user authentication, JWT token management, post creation, and route protection using middleware.
- This project is not completed properly .

---

## 🚀 Project Overview

This project is a backend server built using **Node.js** and **Express.js** that handles:

- ✅ User registration
- ✅ User login with password hashing
- ✅ JWT-based authentication
- ✅ Middleware to protect private routes
- ✅ Post creation with title, description, image, and like count
- ✅ EJS views to render post data
- ✅ Cookie-based session token management

---

### Porject Url:  https://postbackend-production.up.railway.app

## 📁 Features

### 🔐 Authentication

- **User login system** with encrypted passwords (`bcrypt`)
- **JWT tokens** are issued on login and stored in cookies
- Middleware verifies token for protected routes

### 👤 User Features

- **Create a new user**
- Prevent duplicate user creation if a user is already logged in

### 📝 Post Management

- Create a post with:
  - Title
  - Description
  - Optional Image URL
  - Like count (defaults to 0)
  - Date (automatically generated)
- Each post is tied to the authenticated user

### 🔒 Middleware Protection

- A middleware checks if the JWT token exists and is valid
- Blocks access to protected routes if the user is not authenticated
- Clears expired or invalid tokens and redirects to login

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **cookie-parser**
- **EJS (Embedded JavaScript Templates)**

---

## 📷 Sample Post Data Format

```json
{
  "title": "My First Post",
  "description": "This is a test post.",
  "image": "https://example.com/image.jpg",
  "likes": 0,
  "date": "2025-04-14T12:47:47.267Z"
}
