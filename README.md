# FraudShield — Real-Time Fraud Detection System

FraudShield is a full-stack real-time fraud detection and monitoring system that analyzes financial transactions, detects anomalies, and generates live risk alerts using a hybrid rule-based + ML-inspired risk engine.

---

## 🚀 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- React Router

### Backend
- Node.js + Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- bcrypt.js
- Role-Based Access Control (RBAC)

### Database
- MongoDB (Atlas Cloud)
---

## ⚙️ Features

- Secure authentication using JWT
- Real-time transaction monitoring dashboard
- Live fraud alert system using WebSockets
- Hybrid risk scoring engine (rules + ML fallback)
- Case management system for flagged transactions
- Analytics dashboard for insights
- Role-based access (Admin / Analyst / User)

---

## 📡 Real-Time Architecture

FraudShield uses Socket.IO to stream:

- New transactions
- Fraud alerts
- KPI updates

No refresh required — everything updates live.

---

## 🧠 Risk Engine

Risk is calculated using:

- Transaction amount thresholds
- Transaction type (e.g., international transfers)
- ML service prediction (fallback supported)

---

## 🌐 Deployment

- Frontend: https://fraud-shield-murex.vercel.app  
- Backend: https://fraud-monitoring-backend.onrender.com  

---

## 🔗 Project Goal

This project demonstrates:
- Real-time system design
- Secure authentication flow
- Scalable backend architecture
- WebSocket-based live data streaming
- Full-stack production deployment

---

## 🧪 Status

Project is fully functional and deployed.
