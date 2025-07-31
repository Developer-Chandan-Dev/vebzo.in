# 🥦 Vebzo.in – Online Organic Grocery E-commerce Platform

Vebzo.in is a modern MERN stack-based e-commerce platform that helps local fruit and vegetable vendors digitize their offerings and empowers users to buy daily groceries with ease. The project features a complete inventory, profit tracking system, and a user-friendly admin interface without Google authentication – only secure email/password login.

---

## 🔗 Live Demo

🚀 Live: [https://vebzo.in](https://vebzo.in)

---

## 📸 Screenshots

> Add screenshots here like:
- Product listing page
- Admin dashboard
- Profit report page
- Add/Edit Product forms

---

## 📦 Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Authentication:** Email/Password (Custom)  
**File Upload:** Cloudinary  
**Alerts:** SweetAlert  
**Date Handling:** JavaScript Date API  
**Hosting:** Render / Vercel / MongoDB Atlas  

---

## 🧩 Key Features

### 🛍️ User Features
- Sign up and log in securely (email/password only)
- Browse dynamic product listings
- Auto-update product quantity after each sale
- View your order history and cart

### 🧑‍💼 Admin Features
- Add, edit, and delete products
- Show/hide product visibility
- Manage stock with real-time quantity updates
- Set and update cost and selling prices
- Automatic profit tracking per product
- Filter products by categories (e.g., Fruits, Vegetables)

### 📊 Profit Tracking
- Records cost price, selling price, and sold quantity
- Calculates and stores profit per sale
- Displays real-time profit summaries per product
- Helps identify best-performing items

---

## 📉 Problems Solved

🧠 **Challenge:** Prices of fruits and vegetables kept changing, making it hard to track profit/loss.

✅ **Solution:**  
- Added historical price tracking.
- On every sale, saved the price at that time.
- Compared cost vs selling price to calculate real-time profit.

---

## 🚀 Project Goals

- Support local vendors in going digital
- Reduce product wastage by accurate quantity tracking
- Provide transparency in pricing and earnings
- Deliver a better customer experience in local areas

---

## 🛠️ Setup Instructions

### 🔐 Environment Variables
Create a `.env` file in the root of your backend with:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
