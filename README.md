🍽️ Sarlahi Food – Admin Dashboard (Next.js)

A modern Foodmandu-style food ordering admin panel built with Next.js App Router, Tailwind CSS, Formik/Yup, and Axios.
This project focuses on admin management, analytics, hotels, orders, users, and offers.

🚀 Tech Stack

Next.js 13+ (App Router)

React

Tailwind CSS

Formik + Yup (Forms & Validation)

Axios (API requests)

Context API (Admin Authentication)

Custom Hooks


🔐 Authentication Flow

Admin logs in via /login

Credentials are validated using Formik + Yup

API authentication handled via Axios

On success, admin is redirected to /admin/dashboard

Authentication state is managed using AdminAuthProvider

🧩 Key Features
✅ Admin Dashboard

Overview statistics

Orders summary

Revenue & performance analytics

🏨 Hotel Management

View and manage hotels

Assign offers & promotions

📦 Orders

View all customer orders

Order status tracking

👥 Users

Manage users

Invite new admins using InviteButton

📊 Analytics

Real-time admin stats

Custom hook: useAdminStats

⚙️ Settings

Admin profile & configuration

🧠 Custom Context & Hooks
AdminAuthProvider

Handles admin authentication

Protects admin routes

Shares auth state across app

useAdminStats

Fetches admin analytics data

Keeps dashboard clean & reusable

🎨 UI & Design

Fully responsive

Tailwind CSS utility-first styling

Clean Foodmandu-inspired UI

Optimized for desktop & tablet

🛠️ Getting Started
npm install
npm run dev


Visit:

http://localhost:3000/login

📌 Future Improvements

JWT token storage (cookies)

Role-based access control

Skeleton loaders

Dark mode

Real backend integration

👨‍💻 Author

Alish Khadka
Food Ordering System – Admin Dashboard