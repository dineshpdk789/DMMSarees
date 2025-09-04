# 🛍️ ShopEasy - MERN Website

An **end-to-end full-stack E-Commerce application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It offers a seamless shopping experience with product browsing, cart management, secure payments, and a powerful **Admin Dashboard** for managing products, orders, and users.

🌐 **Live Demo:** [ShopEasy Live](https://shoppingwebsite-17.onrender.com/)

---

## ✨ Features

### 👤 User Side
- **Authentication:** Secure SignUp & Login using **JWT**.
-  **Profile Management:** Edit user profile information.
- **Password Management:** Update or reset password securely.
- **Product Browsing:** View and search for products with detailed information.
- **Shopping Cart:** Add, remove, and update cart items.
- **Secure Checkout:** Integrated payment processing.
- **Order History:** Track personal orders and status.


### 🛠️ Admin Panel
- **Dashboard:** Manage store operations from one place.
- **Product Management:** Add, update, delete products.
- **Order Management:** View and update customer orders.
- **User Management:** See all registered users.

---

## 🔑 Admin Access
You can log in as an **Admin** using these credentials:

Email: a.yadav7088@gmail.com
Password: 1234567890


---

## 🛠️ Tech Stack & Libraries

### 🚧 Frontend
- **React.js** – UI library.
- **Vite** – Fast development environment.
- **React Router DOM** – Client-side routing.
- **Axios** – API requests.
- **TailwindCSS** – Styling.

### 🧩 Backend
- **Node.js** – Server runtime.
- **Express.js** – Web framework.
- **Mongoose** – MongoDB ODM.
- **jsonwebtoken (JWT)** – Token authentication.
- **bcrypt.js** – Password hashing.
- **dotenv** – Environment variables.
- **express-fileupload** – Middleware for handling multipart/form-data file uploads.
- **Cloudinary** – Cloud service for image and video management.

### ☁️ Deployment & Database
- **Render** – Hosting (frontend & backend).
- **MongoDB Atlas** – Cloud database.

---

## 🚀 Getting Started Locally

### 📦 Backend Setup
```
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file and add variables
#    Example:
#    MONGO_URI=your_mongo_connection
#    JWT_SECRET=your_secret_key
touch .env

# 4. Start development server
npm run dev
```
### 📦 Frontend Setup
```
# 1. Navigate to frontend folder
cd Frontend1

# 2. Install dependencies
npm install

# 3. Create .env file and add backend URL
#    Example:
#    VITE_BACKEND_URL=http://localhost:4000
touch .env

# 4. Start development server
npm run dev
```
---
## 📦 Folder Structure
```
/
├── backend/
│   ├── config/
│   ├── controller/
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   ├── modals/
│   ├── route/
│   ├── utils/
│   ├── .env
│   └── index.js
│
└── Frontend1/
    ├── public/
    └── src/
        ├── Admin/
        ├── assets/
        ├── cart/
        ├── components/
        ├── features/
        ├── Orders/
        ├── pages/
        ├── User/
        ├── App.jsx
        └── main.jsx
```
