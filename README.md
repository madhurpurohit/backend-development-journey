# 🚀 Learning Journey - Backend Development Repository

![Node.js](https://img.shields.io/badge/Node.js-v16.x-green) ![Express.js](https://img.shields.io/badge/Express.js-v4.x-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-v5.x-yellowgreen) ![WebSocket](https://img.shields.io/badge/WebSocket-Enabled-blueviolet) ![License](https://img.shields.io/badge/License-MIT-red)

## Overview

Welcome to my **Node.js Learning Repository**! This repository is a collection of daily code snippets, exercises, and mini-projects I’ve built while taking a live course on backend development. It showcases my hands-on journey with **Node.js**, **Express.js**, **MongoDB**, **WebSockets**, and security practices like **password hashing**, **authentication**, and **authorization**. 

Designed as a living portfolio of my learning process, this repo demonstrates my ability to absorb concepts, apply them in practical scenarios, and create functional mini-projects. It’s a resource for myself and a window into my growth as a developer for potential employers or collaborators.

---

## Purpose

- **Daily Learning**: Code written during live classes to reinforce concepts like REST APIs, database operations, and real-time communication.
- **Mini-Projects**: Small, self-contained projects to apply what I’ve learned (e.g., user authentication system, real-time chat demo).
- **Skill Demonstration**: Highlights my understanding of backend development fundamentals and best practices.

---

## Tech Stack

- **Core**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Real-Time**: WebSocket (using `ws` library)
- **Utilities**: dotenv for environment variables, npm for package management, postman for API testing

---

## Repository Structure

```
├──  Lec-$        # Daily Lecture update
└── README.md            # You’re here!
```

---

## Installation & Setup

### Prerequisites
- **Node.js**: v16.x or higher
- **MongoDB**: Local instance or MongoDB Atlas
- **npm**: v8.x or higher

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/node-learning-repo.git
   cd node-learning-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (if applicable):
   - Some mini-projects may require a `.env` file. Check individual project folders for specific instructions (e.g., `mini-projects/auth-system`).
   - Example `.env`:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/learning_db
     JWT_SECRET=your-secret-key
     ```

4. **Run Code**:
   - Navigate to a specific day or mini-project folder (e.g., `cd mini-projects/auth-system`).
   - Run with:
     ```bash
     node index.js
     ```
     *(Check each folder for specific run instructions.)*

---

## Highlights of Learning

### Daily Code
- **Day-wise Progression**: From basic Node.js setup to advanced topics like WebSockets and security.
- **Concepts Covered**: RESTful APIs, MongoDB CRUD, middleware, error handling, and more.

### Mini-Projects
1. **Authentication System**:
   - Features: User registration/login with JWT and password hashing (`bcrypt`).
   - Path: `/mini-projects/auth-system`
2. **Real-Time Chat App**:
   - Features: WebSocket-powered chat with basic messaging.
   - Path: `/mini-projects/chat-app`
3. **REST API Demo**:
   - Features: CRUD operations with Express.js and MongoDB.
   - Path: `/mini-projects/api-demo`

---

## Key Skills Demonstrated

- **Backend Fundamentals**: Building APIs with Node.js and Express.js.
- **Database Management**: MongoDB schema design and querying.
- **Security**: Implementing password hashing and JWT authentication.
- **Real-Time Features**: Using WebSockets for live interactions.
- **Code Organization**: Structuring daily code and projects for clarity and reusability.

---

## Why This Repository?

This isn’t just a collection of code—it’s a reflection of my dedication to learning and improving as a developer. Each folder represents a step forward in my journey, from understanding core concepts to applying them in mini-projects. I’ve documented my progress here to:
- Solidify my knowledge through practice.
- Showcase my ability to learn quickly and adapt to new challenges.
- Provide tangible proof of my skills to interviewers.

I’m eager to discuss how these experiences have prepared me to contribute to real-world projects!

---

## Future Plans

- Add more mini-projects (e.g., a task manager or e-commerce API).
- Include comments and explanations in code for better readability.
- Experiment with testing frameworks like Jest for mini-projects.
- Organize daily code into thematic modules (e.g., "Authentication Week").

## Contact

I’d love to connect and discuss my learning journey & if you want to give any feedback feel free:
- **GitHub**: [Madhur Purohit](https://github.com/madhurpurohit)
- **Email**: [Click Here To Send Feedback & Contact](mailto:madhurpurohit123+feedback@gmail.com)

Thank you for exploring my work! I hope it showcases my passion for backend development and my commitment to growth.

---
