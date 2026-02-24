
🧠 Smart AI-Powered Health Monitoring System
📌 Project Overview

Smart Health Tracker is an AI-integrated full stack web application that allows users to upload wearable health data, securely store it, and generate AI-based risk analysis and personalized health insights.

The system combines modern web technologies with artificial intelligence to provide intelligent health monitoring and predictive risk assessment.

🚀 Features

🔐 User Authentication (Login / Signup)

📁 CSV Upload for wearable data

💾 Secure data storage in database

📊 Health data visualization

🧠 AI-generated health insights

⚠️ Risk score & risk level prediction

🔄 Real-time dashboard updates

🌙 Modern responsive UI

🏗️ Tech Stack
Frontend

React.js

CSS (Glassmorphism UI)

Fetch API

Backend

Node.js

Express.js

Database

MongoDB

AI Module

Risk scoring algorithm

Insight generation logic

🧩 System Architecture
User
  ↓
React Frontend
  ↓
Node/Express Backend
  ↓
MongoDB Database
  ↓
AI Analysis Module
  ↓
Health Insights Dashboard
📊 How It Works

User signs up or logs in.

User uploads wearable CSV data (Heart Rate, Steps, Sleep Hours).

Backend stores data in MongoDB.

AI module analyzes the data.

System generates:

Risk Score

Risk Level

Personalized Insights

Results are displayed in the dashboard.

📂 Project Structure
frontend/
 ├── components/
 │    ├── Auth.jsx
 │    ├── UploadForm.jsx
 │    ├── DataList.jsx
 │    ├── AIInsights.jsx
 │
 ├── services/
 │    └── api.js
 │
 └── App.jsx

backend/
 ├── routes/
 ├── models/
 ├── controllers/
 ├── server.js
 └── .env
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repo-link>
cd smart-health-tracker
2️⃣ Backend Setup
cd backend
npm install
npm start

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🔐 Authentication

JWT-based authentication

Token stored in localStorage

Protected dashboard routes

🧠 AI Insights Output Example
Risk Score: 72
Risk Level: Moderate

Insights:
- Your average heart rate is slightly elevated.
- Sleep hours are below recommended levels.
- Increasing daily steps may reduce health risk.

⚠️ This system is for educational purposes only and does not provide medical advice.

🎯 Project Category

AI-Integrated Full Stack Web Application

Health Data Analytics Platform

Predictive Health Monitoring System

👨‍💻 Author

Developed as an academic full stack + AI integration project.

📌 Future Enhancements

📈 Data visualization charts

📅 Date filtering system

🧠 Machine learning model integration

📱 Mobile responsive dashboard

🔔 Health alerts system

⭐ Final Presentation Line

“This project is an AI-integrated full stack health monitoring web application that analyzes wearable data to generate intelligent risk predictions and health insights.”