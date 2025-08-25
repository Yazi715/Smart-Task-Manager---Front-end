# Smart Task Manager

## Overview
Smart Task Manager is a simple, functional web application designed to help users organize and keep track of their daily tasks efficiently. It provides capabilities to create, read, update, and delete tasks with features such as status filtering, search, sorting, and pagination. The app ensures persistence of data using MongoDB and offers a responsive user interface built with React.

## Tech Stack

- Frontend: React  
- Backend: Node.js with Express  
- Database: MongoDB  

## Features Implemented

### Core Features
- Create tasks with Title (required), Description (optional), Status (Pending, In Progress, Completed), and automatic creation date.
- View all tasks in a list with pagination (3 tasks per page).
- Edit task details.
- Delete tasks.
- Persistent storage with MongoDB.

### Extra Features
- Filter tasks by status.
- Search tasks by title or description.
- Sort tasks by created date or status.
- Responsive and clean UI design.
- User authentication with JWT tokens.
- Protected API routes requiring authentication.

## Setup Instructions

### Clone the Repositories
Clone both frontend and backend repositories separately:
git clone https://github.com/Yazi715/Smart-Task-Manager---Front-end.git
git clone https://github.com/Yazi715/Smart-Task-Manager---Backend.git


### Backend Setup
1. Navigate to the backend directory:
    cd Smart-Task-Manager---Backend

2. Install dependencies:
    npm install

3. Create a `.env` file with the following content (update with your own values):
    MONGODB_URI=mongodb://localhost:27017/smart-task-manager
    JWT_SECRET=<your_secure_jwt_secret>
    PORT=3000

4. Start the backend server:
        npm start
    ```
    _or_  
    ```
    npm run dev
    ```
    _(Depending on your package.json script)_

### Frontend Setup
1. Navigate to the frontend directory:
    cd Smart-Task-Manager---Front-end

2. Install dependencies:
    npm install

3. Start the frontend app:
    npm start
    ```
    _or_  
    ```
    npm run dev
    ```
    _(Depending on your package.json script)_

4. Open your browser at `http://localhost:3000`.

## Known Issues
- No current support for user registration or password recovery.
- Minor UI flickers may happen on slow network connections.


