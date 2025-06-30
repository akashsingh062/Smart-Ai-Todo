# Smart Todo Manager with AI Assistant

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-FF6F00?style=for-the-badge&logo=google&logoColor=white)

---

## 🌟 Project Overview

The **Smart Todo Manager with AI Assistant** is a comprehensive full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to revolutionize personal task management. It combines traditional todo list functionalities with cutting-edge artificial intelligence powered by the Google Gemini API, offering intelligent features to help users prioritize, organize, and break down their tasks more effectively. Built with a responsive design, this application delivers a seamless and intuitive experience across all devices.

---

## ✨ Features

- **🔐 User Authentication**: Secure registration, login, and logout processes to protect your personal task data.
- **📝 Task Management (CRUD)**: Full control over your tasks – create new ones, view existing ones, modify details, and delete completed or irrelevant items.
- **📊 Advanced Filtering & Sorting**:
    - Filter tasks by their status: `All`, `Active`, or `Completed`.
    - Sort your task list by `Date Created`, `Priority`, `Due Date`, or `Alphabetical` order for quick access and overview.
- **🔍 Instant Search**: A dynamic search bar allows you to quickly find any task by keyword.
- **✅ Task Status Tracking**: Easily mark tasks as complete or incomplete with a single click.
- **🗑️ Clear Completed Tasks**: A convenient option to remove all completed tasks and de-clutter your list.
- **🧠 AI-Powered Assistance**: Elevate your productivity with smart AI capabilities:
    - **Task Summarization**: Get a concise, encouraging summary of your pending tasks, highlighting high-priority items and overall progress.
    - **Prioritization Suggestions**: Receive intelligent recommendations on how to prioritize your tasks based on their urgency, importance, and deadlines.
    - **Subtask Generation**: Break down complex tasks into manageable steps. The AI can automatically generate a list of actionable subtasks for any given task.
- **📱 Responsive Design**: A beautifully crafted UI that adapts flawlessly to mobile phones, tablets, and desktop computers, ensuring optimal usability everywhere.

---

## 🛠️ Technologies Used

This project leverages a modern stack to deliver a robust and scalable application.

### Frontend
- **React**: Building dynamic and interactive user interfaces.
- **TypeScript**: Enhancing code quality and developer experience with static typing.
- **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
- **Shadcn UI**: Pre-built, accessible, and customizable UI components.
- **Axios**: For making efficient HTTP requests to the backend API.
- **React Hot Toast**: Elegant and non-intrusive toast notifications.
- **Lucide React**: A vast collection of open-source vector icons.
- **React Router DOM**: Handling client-side routing within the application.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: A flexible and minimalist web application framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure, stateless authentication.
- **bcryptjs**: A library for hashing passwords.
- **CORS**: Express middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv**: Loading environment variables from a `.env` file for secure configuration.

### Database
- **MongoDB**: A NoSQL document database used for storing user and task data. (Cloud hosting via MongoDB Atlas is highly recommended for production environments).

### AI Integration
- **Google Gemini API**: Integrated via the official `@google/generative-ai` Node.js SDK for intelligent task analysis and generation.

### Development Tools
- **Vite**: A lightning-fast build tool and development server for modern web projects.
- **Nodemon**: Automatically restarting the Node.js server during development.
- **Concurrently**: Running both frontend and backend development servers simultaneously.

---

## 🚀 Getting Started

Follow these steps to set up and run the Smart Todo Manager locally on your machine.

### Prerequisites

Ensure you have the following software installed:

- **Node.js**: [Download & Install Node.js LTS](https://nodejs.org/en/download/)
- **npm** (comes with Node.js) or **Yarn**: [Install Yarn](https://yarnpkg.com/getting-started/install)
- **MongoDB**:
    - For local development: [Install MongoDB Community Server](https://www.mongodb.com/try/download/community)
    - For cloud hosting (recommended): [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)<your-username>/smart-todo-manager.git
    cd smart-todo-manager/project
    ```
    *(Replace `<your-username>` with your actual GitHub username or the repository owner's username if forking)*

2.  **Install dependencies:**
    Navigate into the `project` directory (if not already there) and install both server and client dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Environment Variables

Create a `.env` file in the `project` directory (at the same level as `package.json`). This file will store your sensitive configuration.

```env
# MongoDB Connection URI
MONGODB_URI=mongodb+srv://<your_db_user>:<your_db_password>@<your_cluster_url>/<your_database_name>?retryWrites=true&w=majority

# JWT Secret Key for Authentication
JWT_SECRET=your_super_secret_jwt_key_here_at_least_32_chars_long

# Google Gemini API Key
GEMINI_API_KEY=AIzaSyA...your_gemini_api_key...JRad

# Port for the Express.js server
PORT=3001
```

**Replace the placeholder values:**
-   **`MONGODB_URI`**: Get this from your MongoDB Atlas dashboard (for cloud) or ensure it points to your local MongoDB instance.
-   **`JWT_SECRET`**: Generate a strong, random string.
-   **`GEMINI_API_KEY`**: Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

To start both the backend server and the frontend development server concurrently:

```bash
cd project # Ensure you are in the 'project' directory
npm run dev
# or
# yarn dev
```

The server will typically start on `http://localhost:3001` and the React client on `http://localhost:5173/`. Your browser should automatically open to the client URL.

---

## 💡 Usage

1.  **Access the Application**: Open your web browser and navigate to `http://localhost:5173/`.
2.  **Authentication**: Register a new account or log in with existing credentials.
3.  **Add New Tasks**: Click the **"Add Task"** button. Fill in the task description, set its priority (low, medium, high), assign a category, and optionally set a due date.
4.  **Manage Your Tasks**:
    -   **Toggle Completion**: Click the checkbox next to any task to mark it as complete or incomplete.
    -   **Edit Task**: Click the three-dot menu (`...`) on a task item and select "Edit" to modify its details.
    -   **Delete Task**: From the same three-dot menu, select "Delete" to remove a task.
    -   **Search & Filter**: Use the search bar at the top to find specific tasks. Apply filters (All, Active, Completed) and sorting options (Date Created, Priority, Due Date, Alphabetical) to organize your view.
    -   **Clear Completed**: Click the "Clear Completed" button at the bottom of the task list to remove all finished tasks.
5.  **Engage the AI Assistant**:
    -   The **"AI Assistant"** sidebar provides intelligent insights.
    -   Select a tab:
        -   **Summary**: Click "Generate Task Summary" for an overview of your todos.
        -   **Prioritize**: Click "Get Prioritization Suggestions" for AI-driven advice on task order.
        -   **Subtasks**: To use this feature, select a specific task from your list, click its three-dot menu, and choose "Generate Subtasks".

---

## 📂 Project Structure

```
project/
├── public/
├── server/
│   ├── middleware/
│   │   └── auth.js       # JWT authentication middleware
│   ├── models/
│   │   ├── Todo.js       # Mongoose schema for Todo items
│   │   └── User.js       # Mongoose schema for User accounts
│   ├── routes/
│   │   ├── ai.js         # API endpoints for AI assistant features (Gemini)
│   │   ├── auth.js       # API endpoints for user authentication
│   │   └── todos.js      # API endpoints for CRUD operations on todos
│   └── index.js          # Main Express.js server entry point
├── src/
│   ├── assets/           # Static assets like images (if any)
│   ├── components/
│   │   ├── AI/
│   │   │   └── AIAssistant.tsx  # React component for the AI assistant sidebar
│   │   ├── Auth/
│   │   │   ├── AuthPage.tsx     # Handles login/registration forms
│   │   │   ├── LoginForm.tsx    # User login component
│   │   │   └── RegisterForm.tsx # User registration component
│   │   ├── TodoApp/
│   │   │   ├── TodoApp.tsx      # Main todo application component
│   │   │   ├── TodoForm.tsx     # Form for adding/editing tasks
│   │   │   ├── TodoHeader.tsx   # Header with search, filter, sort, add button
│   │   │   ├── TodoItem.tsx     # Individual todo list item component
│   │   │   └── TodoList.tsx     # Displays the list of todo items
│   │   └── ui/             # Shadcn UI components (button, dropdown-menu, etc.)
│   │       ├── button.tsx
│   │       └── dropdown-menu.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx # React Context API for managing authentication state globally
│   ├── hooks/
│   │   └── useTodos.ts     # Custom React hook for managing todo data and interactions
│   ├── lib/
│   │   └── utils.ts        # General utility functions (e.g., `cn` for Tailwind class merging)
│   ├── types/
│   │   └── todo.ts         # TypeScript interfaces and types for todo-related data
│   ├── App.tsx             # Root React component, handles routing and authentication check
│   └── index.tsx           # Entry point for React application rendering
├── .env.example            # Template for required environment variables
├── .gitignore              # Specifies intentionally untracked files to ignore
├── index.html              # Main HTML file for the React application
├── package.json            # Project metadata and dependency list
├── package-lock.json       # Records the exact versions of dependencies
├── README.md               # Project documentation (this file)
├── tailwind.css            # Main Tailwind CSS file for custom styles/imports
├── tailwind.config.js      # Tailwind CSS configuration file
├── tsconfig.json           # Base TypeScript configuration
├── tsconfig.app.json       # TypeScript configuration specific to the client app
├── tsconfig.node.json      # TypeScript configuration for Node.js environment
└── vite.config.ts          # Vite build configuration, including path aliases
```

---

## 🤝 Contributing

We welcome contributions to enhance this Smart Todo Manager! If you have suggestions for new features, bug reports, or improvements to the code, please feel free to:

1.  **Open an Issue**: Describe the bug or feature request in detail.
2.  **Submit a Pull Request**:
    -   Fork the repository.
    -   Create a new branch (`git checkout -b feature/your-feature-name` or `bugfix/your-bug-name`).
    -   Make your changes and commit them (`git commit -m 'feat: Add new awesome feature'`).
    -   Push to your fork (`git push origin feature/your-feature-name`).
    -   Open a pull request to the `main` branch of this repository.

Please ensure your code adheres to the existing style and conventions.

---

## 📄 License

This project is open-source and distributed under the [MIT License](LICENSE).

---
*Developed with the assistance of an AI, further refined by a human developer.*
