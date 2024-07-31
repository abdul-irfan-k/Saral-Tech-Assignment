# Saral Tech Assignment

## Video Demo

[Screencast from 2024-07-30 22-37-04.webm](https://github.com/user-attachments/assets/22cb8e5a-d9dd-48ee-a533-4bad65cb05d0)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- User Authentication (Google login and signup)
- Real-time updates using Socket.IO
- State management with Redux
- Clean Architecture Project Structure for backend

## Technologies Used

### Frontend

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [Socket.IO](https://socket.io/)

### Backend

- Clean Architecture principles
- Business Logic and Application Logic separated according to clean architecture

## Installation

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/abdul-irfan-k/Saral-Tech-Assignment.git
    ```

2.  Install dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install
    # or
    pnpm install

    # Install backend dependencies
    cd ../backend
    npm install
    # or
    pnpm install
    ```

3.  Set up environment variables:

    - Create a `.env.local` file in the `frontend` directory and add the following:

      ```env
      NEXT_PUBLIC_SERVER_URL="http://localhost:8000"
      NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
      ```

    - Create a `.env` file in the `backend` directory and add the following:

          ```env
           NODE_ENV=TEST
           REDIS_PASSWORD=
           MOGNOGO_DB_URL=
           FRONTEND_URL=
           PORT=8000
           USER_JWT_ACCESS_TOKEN_SECRET=strong-secret
           USER_JWT_REFRESH_TOKEN_SECRET=strong-secret

    ```

    ```

4.  Run the development servers:

    ```bash
    # Run backend server
    cd backend
    npm run dev
    # or
    yarn dev

    # Run frontend server
    cd ../frontend
    npm run dev
    # or
    yarn dev
    ```

## Usage

### Running the application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   # or
   pnpm dev
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   # or
   pnpm dev
   ```

### Accessing the application

Open your browser and navigate to `http://localhost:3000`.

### Google Login

Click on the "Login with Google" button on the homepage to authenticate using your Google account.

### Thank you
