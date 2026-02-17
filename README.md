# Student Social Media App (MERN Stack)

A full-stack social media platform for students to connect, share projects, find internships, and ask doubts.

## Features

- **Authentication:** JWT-based signup/login.
- **Feed System:** Create posts with images, like, comment, and share.
- **Networking:** Follow other students, join communities.
- **Career Growth:** Find internships, showcase projects.
- **Learning:** Ask doubts in subject-specific forums.
- **Gamification:** Leaderboard based on user contributions.
- **Admin Panel:** Manage users and content.
- **Real-time:** Notifications and potential future chat integration.

##Tech Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

- Node.js installed
- MongoDB installed and running locally (or use MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/student_social_media
    JWT_SECRET=your_jwt_secret_key_here
    ```
    *(Note: Replace `your_jwt_secret_key_here` with a strong secret key)*
4.  Start the server:
    ```bash
    npm run server
    ```
    The server should run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will open in your browser at `http://localhost:5173`.

## Usage

1.  **Register:** Create a new account on the `/register` page.
2.  **Login:** Sign in with your credentials.
3.  **Explore:** Use the navigation bar to visit different sections like Projects, Internships, Communities, etc.
4.  **Admin:** Access the admin dashboard at `/admin` (requires admin privileges in database).

## Project Structure

- `client/`: React frontend application
- `server/`: Node.js/Express backend API
