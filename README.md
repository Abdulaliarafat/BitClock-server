# 🛠️ BiteClock Server - Backend API

**BiteClock Server** is the RESTful backend for the BiteClock food expiry tracker app. It supports user-authenticated CRUD operations on food items, expiry tracking, and secure access using Firebase Admin.

---
## 🧑‍💻 Getting Started
# git clone https://github.com/Abdulaliarafat/BitClock-server.git
# cd BitClock-server
# npm install
# npm i express
# http://localhost:3000
# npm start
---

## 🌐 Live URLs

🔴 BiteClock Client: [https://assignment-11-client-side.netlify.app](https://assignment-11-client-side.netlify.app)  
🟣 BiteClock Server: [https://your-server.vercel.app](https://your-server.vercel.app) <!-- Replace with actual URL -->
🔴 GitHub repo link: https://github.com/Abdulaliarafat/BitClock-client/tree/main

---

## 🚀 Features

- ✅ Firebase Admin-based token authentication
- 🔐 Email verification before data access
- 📝 Add, edit, delete food items
- 🔍 Search food by title or category
- 📅 Filter by expiry: expired or nearly expired (within 5 days)
- 🧾 Attach notes to food items
- ⚙️ RESTful API with clear route structure

---

## 📁 API Endpoints

| Method | Endpoint               | Description                                  |
|--------|------------------------|----------------------------------------------|
| GET    | `/food`                | Get all foods with optional search query     |
| GET    | `/food/nearly`         | Get expired or nearly expired items          |
| GET    | `/food/email?email=`   | Get items by user email (auth required)      |
| GET    | `/food/:id`            | Get single item by ID                        |
| POST   | `/food`                | Add a new food item                          |
| PUT    | `/food/:id`            | Update an existing food item                 |
| PATCH  | `/food/:id`            | Add/update note for a food item              |
| DELETE | `/food/:id`            | Delete a food item                           |

---

## 🧰 Tech Stack

| Technology           | Description                                  |
|----------------------|----------------------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | JavaScript runtime              |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Web server framework            |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | NoSQL database                  |
| ![Firebase](https://img.shields.io/badge/Firebase_Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) | Authentication (admin access)  |
| ![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge&logo=dotenv&logoColor=black) | Environment variable management |
| ![CORS](https://img.shields.io/badge/CORS-enabled-blue?style=for-the-badge) | Cross-origin request support    |

---

## 💻 Getting Started Locally





