# Saral Tech Assignment

## Video Demo

[Screencast from 2024-07-30 22-37-04.webm](https://github.com/user-attachments/assets/22cb8e5a-d9dd-48ee-a533-4bad65cb05d0)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)

## Features

- User Authentication (Google login and signup)
- Real-time updates using Socket.IO
- State management with Redux
- Clean Architecture Project Structure for backend
- Used Mongodb Database
- Used Redis Database for caching
  \_ Used express-validator for the request validation

## Technologies Used

### Frontend

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [Socket.IO](https://socket.io/)

### Backend

- Redis ,Mongodb, JWT, Express-Validator, Socket Io
- Clean Architecture principles
- Business Logic and Application Logic separated according to clean architecture

## Installation

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/abdul-irfan-k/Saral-Tech-Assignment.git
    ```

2.  Install dependencies for both frontend and server:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install
    # or
    pnpm install

    # Install backend dependencies
    cd ../server
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

           NODE_ENV=TEST
           REDIS_PASSWORD=
           MOGNOGO_DB_URL=
           FRONTEND_URL=
           PORT=8000
           USER_JWT_ACCESS_TOKEN_SECRET=strong-secret
           USER_JWT_REFRESH_TOKEN_SECRET=strong-secret

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
   cd server
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

### Sign-Up (http://localhost:3000/sign-up)

Create account with email and password

### Login (http://localhost:3000/login)

Click on the "Login with Google" button on the homepage to authenticate using your Google account.

### Thank you
