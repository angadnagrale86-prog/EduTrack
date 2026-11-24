# EduTrack - Student Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) + Vite Student Management Portal built with the exact same architecture as InternBridge.

## Features
- Student Registration, Login, Forgot Password & Reset Password (with Nodemailer)
- Course & Subject Catalog with Search and Mode Filter (Offline, Hybrid, Online)
- Course Enrollment & Status Tracking (`MyEnrollments`)
- Shortlisted / Saved Courses (`SavedCourses`)
- Student Dashboard, Profile Management & Academic Documents
- Study Preparation Guides & Resources

## Setup
1. `cd backend && npm install`
2. Add `.env` in `backend/` with `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, `PORT=5000`
3. Run `node seedCourses.js` and `npm run dev`
4. In root folder, add `.env` with `VITE_API_URL=http://localhost:5000`, then run `npm install && npm run dev`
