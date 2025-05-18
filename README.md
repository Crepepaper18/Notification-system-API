# 📣 Notification System API

A simple notification system that supports Email, SMS, and In-App notifications. Built using **Node.js** and **Express**, it simulates notification delivery with random success/failure, includes retry logic, and allows users to fetch their notifications.

---

## 🚀 Live Demo

🔗 [Live on Render](https://notification-system-api.onrender.com)

---

## 🛠️ Features

* Send notifications (Email, SMS, In-App)
* View notifications for a specific user
* Retry up to 3 times if a notification fails
* Uses in-memory storage for users and notifications
* Clean Express API setup with structured responses

---

## 📌 API Endpoints

### 1. **Send Notification**

**Endpoint:** `POST /notifications`

**Request Body:**

```json
{
  "target_userId": 101,
  "notification_type": "email",
  "message": "Hello, Isha!"
}
```

**Success Response:**

```json
{
  "message": "Notification sent successfully!",
  "data": {
    "id": 5,
    "target_userId": 101,
    "notification_type": "email",
    "message": "Hello, Isha!",
    "status": "sent"
  }
}
```

**Failure After Retries:**

```json
{
  "message": "Notification failed.",
  "data": { ... }
}
```

### 2. **Get User Notifications**

**Endpoint:** `GET /users/:id/notifications`

**Example:** `GET /users/101/notifications`

**Response:**

```json
[
  {
    "id": 1,
    "target_userId": 101,
    "notification_type": "email",
    "message": "Welcome",
    "status": "sent"
  },
  {
    "id": 2,
    "target_userId": 101,
    "notification_type": "in-app",
    "message": "New Notification",
    "status": "sent"
  }
]
```

---

## 🪪 Sample Users (Hardcoded)

| userId | Email                                         | Phone      |
| ------ | --------------------------------------------- | ---------- |
| 101    | [idemail@gmail.com](mailto:idemail@gmail.com) | 9876543210 |
| 102    | [emidail@gmail.com](mailto:emidail@gmail.com) | 8765432109 |
| 103    | [emailid@gmail.com](mailto:emailid@gmail.com) | 7654321098 |

---

## 🧰 Tech Stack

* Node.js
* Express.js
* body-parser
* dotenv

---

## 📝 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/Crepepaper18/Notification-system-API.git
cd 'Notification-system-API'
```

2. **Install Dependencies**

```bash
npm install
```

3. **Create .env File**

```env
PORT=4000
```

> ⚠️ Do not upload .env to GitHub. Keep secrets safe!

4. **Start the Server**

```bash
npm start
```

---

## 🧠 Assumptions Made

* Notification status is randomly simulated.
* No actual integration with Email/SMS services.
* Notifications and users are stored in memory.
* Retry logic retries 3 times if status is 'failed'.
---

## 👩‍💼 Author

**Isha Siddhanta**
