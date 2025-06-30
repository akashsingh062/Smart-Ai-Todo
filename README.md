# Smart AI Todo Manager

A powerful, intelligent, and modern full-stack task manager with AI-powered assistance to help you plan, prioritize, and execute your daily tasks with ease.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-FF6F00?style=for-the-badge&logo=google&logoColor=white)

---

## Overview

**Smart AI Todo** combines traditional to-do functionality with cutting-edge AI features powered by Google Gemini to help you stay organized, productive, and in control of your day. Built on a modern MERN stack, the app delivers a responsive, seamless experience across devices.

---

## Features

- Secure user authentication with JWT
- CRUD operations for tasks
- Advanced filtering and sorting
- Dynamic instant search
- Mark tasks complete/incomplete
- Clear completed tasks
- AI-powered:
  - Task summarization
  - Prioritization suggestions
  - Subtask generation
- Clean, responsive, mobile-friendly design

---

## Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS + Shadcn UI
- Axios, React Router, React Hot Toast
- Lucide React icons

**Backend**
- Node.js + Express
- Mongoose
- JWT + bcryptjs
- Dotenv, CORS

**Database**
- MongoDB Atlas

**AI**
- Google Gemini API (`@google/generative-ai`)

**Dev Tools**
- Vite
- Nodemon
- Concurrently

---

## Getting Started

**Clone the project**

```bash
git clone https://github.com/akashsingh062/Smart-Ai-Todo.git
cd Smart-Ai-Todo
```

**Install dependencies**

```bash
npm install
```

**Environment setup**

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

**Run the application**

```bash
npm run dev
```

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

---

## Usage

- Register or log in
- Add, edit, delete, or mark tasks complete
- Filter, sort, and search tasks
- Use the built-in AI Assistant for:
  - Summaries
  - Prioritization
  - Subtask generation

---

## Contributing

Pull requests and contributions are welcome!

1. Fork the repo
2. Create a branch
3. Commit and push your changes
4. Open a pull request

---

## License

MIT

---

Built with ❤️ and AI by Akash Singh
