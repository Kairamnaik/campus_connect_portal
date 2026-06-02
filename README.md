Deployed Project Link: https://campus-connect-portall.vercel.app/signup

Sample Credentials:

Admin: gmail:admin@gmail.com password:admin123

Teacher: gmail:teacher1@gmail.com password:teacher123

Student: bhukyakairam47@gmail.com password:kairam and sign_up(register) to access the portel




# Campus Connect Portal

A College Student Portal built using the MERN stack with a React frontend and Node.js/Express backend.

## Overview

This project supports three user roles:
- **Admin**: manage students and teachers, view attendance and marks.
- **Teacher**: record attendance, add marks, and view assigned students.
- **Student**: view personal profile, attendance, and marks history.

## Languages and Technologies Used
Languages:
JavaScript,
JSX,
HTML,
CSS,
JSON.

Frontend:
React,
Vite,
React Router DOM.

Backend:
Node.js,
Express.js.

MongoDB:
Mongoose.

Authentication / Security:
JSON Web Tokens (JWT),
bcryptjs.

Other tools:
dotenv,
cors.

### Frameworks and Libraries

- **Frontend**: React, Vite, react-router-dom
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Styling**: plain CSS

## Features

- Role-based login and protected routes
- Admin dashboard with management controls
- Teacher dashboard for attendance and marks
- Student dashboard for attendance and grade tracking
- JWT authentication with client-side storage

## Folder Structure

- `backend/`
  - `server.js` - main Express server
  - `controllers/` - request handlers for admin, auth, student, teacher
  - `models/` - MongoDB models for users, attendance, marks, notices, complaints
  - `routes/` - API route definitions
  - `middleware/` - authentication middleware
  - `seed.js` - initial data seeding script

- `frontend/`
  - `src/` - React application source
  - `components/` - reusable UI and route protection components
  - `pages/` - login pages and dashboard pages for each role
  - `styles/` - CSS files for page styling

## Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Start MongoDB

Run your MongoDB server locally on `mongodb://localhost:27017`.

### 3. Seed the database

```bash
cd backend
node seed.js
```

### 4. Run the backend

```bash
cd backend
node server.js
```

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

## Sample Credentials

- **Admin**
  - Email: `admin@gmail.com`
  - Password: `admin123`

- **Teacher**
  - Email: `teacher1@gmail.com`
  - Password: `teacher123`

- **Student**
  - Email: `bhukyakairam47@mail.com` and sign_up(register) to access the portel
  - Password: `kairam`

## Notes

- Make sure MongoDB is running before starting the backend.
- The application uses local storage for JWT tokens.
- The frontend is built with React and plain CSS for simplicity.

## Deployment

A deployed version is available at:

`https://campus-connect-portall.vercel.app/signup`
# Campus_Connect_Portal
