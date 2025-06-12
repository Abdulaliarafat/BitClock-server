# 🛠️ BiteClock Server - Backend API

This is the **server-side** of the BiteClock web app — a food expiry tracker system. It handles API requests, user-authenticated food management, and database operations using **Node.js**, **Express**, **MongoDB**, **CORS**, and **Firebase Admin SDK**.

---

## 🔧 Features

- User authentication via Firebase Admin SDK
- Add food items tied to user email
- Get all food items with search by title/category/email
- Retrieve:
  - Nearly expired food (expiring in 5 days)
  - Expired food
- Update food items
- Update food status (expired/nearly)
- Delete expired food
- Fully RESTful API

---

## 🌐 URLs

👉 [Visit BiteClock client on Netlify](https://assignment-11-client-side.netlify.app/)
👉 [Visit BiteClock Server on Vercel](https://your-netlify-url.netlify.app)

*(Replace above URLs with your actual deployed links)*

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Server framework
- **MongoDB** – NoSQL database
- **Firebase Admin SDK** – Email/user authentication
- **CORS** – Cross-origin request handling
- **dotenv** – Environment variable management

---

## 📁 Project Structure

