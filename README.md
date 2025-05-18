# 📣 Notification System API

A simple notification system with support for Email, SMS, and In-App notifications. Built with **Node.js**, **Express**, and designed to simulate message delivery with retry logic.

## 🚀 Live Demo

👉 [Live on Render](https://notification-system-api.onrender.com)

---

## 🛠️ Features

- Send notifications (Email, SMS, In-App)
- View user-specific notifications
- Simulated delivery status (sent/failed)
- Retry failed notifications up to 3 times
- In-memory data simulation (no database)
- Extendable for message queue (e.g., RabbitMQ)

---

## 📦 Tech Stack

- Node.js
- Express.js
- Body-parser
- dotenv

---

## 📌 API Endpoints

### 1. **Send Notification**

**POST** `/notifications`

**Request Body:**
```json
{
  "target_userId": 101,
  "notification_type": "email",
  "message": "Hello, Isha!"
}
