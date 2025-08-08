## Vebzo.in — Organic Grocery E‑commerce (MERN)

A production-ready MERN application that helps local fruit and vegetable vendors digitize their business. It features inventory and price history tracking, profit analytics, role-based admin tools, real-time notifications, and a modern, responsive frontend.

- **Live**: `https://vebzo.in`
- **Stack**: React + Vite, Tailwind CSS, Redux Toolkit, Node.js, Express, MongoDB (Mongoose), Socket.io, Cloudinary
- **Auth**: Email/Password (JWT). Optional Google OAuth endpoints present.

---

### Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Directory structure](#directory-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Install and run](#install-and-run)
- [API (high level)](#api-high-level)
- [Realtime events](#realtime-events)
- [Security and validation](#security-and-validation)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

### Overview
Vebzo.in enables customers to browse fresh produce, place orders, and track statuses, while admins manage catalog, stock, pricing, and profits. The system stores historical prices and computes profit at sale-time to handle fluctuating market rates.

---

### Architecture
- **Frontend (Vite + React 18)**: SPA using React Router, Redux Toolkit, Tailwind, Recharts, and socket.io-client.
- **Backend (Express + MongoDB)**: REST API with role-based access, Joi validation, Cloudinary uploads, and Socket.io server.
- **Database (MongoDB Atlas)**: Models for users, products, categories, orders, carts, wishlists, reviews, notifications, messages.
- **Realtime**: Socket.io for user-targeted order updates and notifications.
- **Hosting**: Render/Vercel/Atlas (Procfile present for PaaS compatibility).

---

### Features
- **User**
  - Email/password signup/login (JWT in cookies) and profile management
  - Browse products, categories, and reviews
  - Cart, wishlist, order placement, and order history
- **Admin/Manager**
  - CRUD for products and categories, product visibility toggle
  - Image uploads to Cloudinary
  - Stock management with automatic decrement on orders
  - Price history and profit tracking per sale
  - Analytics: sales, orders, users, low-stock, revenue by category, and more
- **Notifications & Reviews**
  - User notifications, review CRUD with moderation
- **Security & DX**
  - CORS, rate limiting for auth, Joi validation, centralized error handling

---

### Directory structure
```
workspace/
├─ frontend/                 # React + Vite app
│  ├─ src/
│  │  ├─ pages/ components/ features/ store/ services/ routes/ hooks/ utils/
│  │  ├─ main.jsx, App.jsx
│  └─ vite.config.js, tailwind.config.js, package.json
└─ backend/                  # Express API + Socket.io
   ├─ server.js              # App entry, routes mount, socket init
   ├─ config/                # db connection, passport
   ├─ controller/            # business logic (auth, products, orders, analytics, ...)
   ├─ routes/                # /api/v1/* route definitions
   ├─ models/                # Mongoose schemas
   ├─ middlewares/           # auth, rate limiting, validation, uploads, error handler
   ├─ socketHandlers/        # socket event handlers
   └─ package.json, Procfile
```

---

### Getting started

#### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas connection string
- Cloudinary account (for image uploads)

#### Environment variables
Create a `.env` file in `backend/` with:

```env
# Server
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SECRET_KEY=replace-with-strong-session-secret

# Database (note: uses this exact name in current code)
MONGODB_ALTAS_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Auth/JWT
JWT_SECRET=replace-with-strong-jwt-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes:
- `CLIENT_URL` must match your frontend origin for CORS and cookies.
- The database variable name is `MONGODB_ALTAS_URI` (as used in code).

#### Install and run

Backend:
```bash
cd backend
npm install
npm run dev     # nodemon on http://localhost:8000
```

Frontend:
```bash
cd frontend
npm install
npm run dev     # Vite on http://localhost:5173
```

---

### API (high level)
- **Base URL**: `http://localhost:8000/api/v1`
- **Auth** (`/auth`)
  - `POST /register` — register
  - `POST /login` — login
  - `POST /logout` — logout
  - `GET /me` — current user (auth)
  - `PUT /me/:id` — update profile (auth, multipart image)
  - `PUT /update-password/:id` — change password (auth)
  - Google OAuth endpoints available at `/auth/google` and `/auth/google/callback`
- **Products** (`/products`)
  - `GET /` — list
  - `GET /details/:id` — details
  - `POST /` — create (roles: admin, manager)
  - `PUT /:id` — update (roles: admin, manager)
  - `PUT /:productId/image` — upload image (roles: admin, manager)
  - `DELETE /:id` — delete (roles: admin, manager)
- **Categories** (`/category`): CRUD with admin/manager protections
- **Cart** (`/cart`): add, update, delete, fetch (auth)
- **Wishlist** (`/wishlist`): add, remove, get (auth)
- **Orders** (`/orders`): create, list (admin/manager), status/payment updates, my-orders (auth)
- **Reviews** (`/reviews`): add, list-by-product, update, delete (auth where needed)
- **Analytics** (`/analytics`): totals, trends, low stock, charts, and card data (admin/manager)
- **Notifications** (`/notifications`): create (admin), list for user, mark read (auth)
- **Messages** (`/contact-messages`): add, list, delete

Example: login and fetch products
```bash
curl -i -X POST http://localhost:8000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"yourpassword"}'

curl -s http://localhost:8000/api/v1/products | jq
```

---

### Realtime events
Socket.io is initialized on the backend. From the client, register the user and listen for updates:

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', { withCredentials: true });

socket.on('connect', () => {
  socket.emit('register', currentUserId);
});

socket.on('orderUpdate', (payload) => {
  // Handle order status changes for this user
});
```

Events observed in code:
- **Client → Server**: `register` (payload: `userId`)
- **Server → Client**: `orderUpdate` (payload: order data)

---

### Security and validation
- **CORS**: Allows `CLIENT_URL` and `http://localhost:5173`, credentials enabled
- **Auth**: JWT-based, cookies, session middleware present
- **Rate limiting**: Applied to sensitive routes (e.g., auth)
- **Validation**: Joi schemas on inputs for auth, products, categories, orders, etc.
- **Error handling**: Centralized error middleware

---

### Troubleshooting
- **CORS or cookies not working**: Ensure `CLIENT_URL` matches the frontend origin and requests use `withCredentials: true` where needed.
- **MongoDB connection fails**: Verify `MONGODB_ALTAS_URI` value and IP access list in Atlas.
- **Cloudinary errors**: Confirm cloud name, key, and secret; verify upload preset if used in middleware.
- **Socket events not received**: Ensure the client calls `register` with a valid user ID after `connect`.

---

### Roadmap
- Payment gateway integration (Stripe/Razorpay)
- E2E and API test coverage (Jest/Supertest)
- Exportable reports (PDF/CSV)
- Additional analytics and alerts

---

### Contributing
Contributions are welcome. Please open an issue describing the change and submit a PR with a clear description, screenshots (if UI), and tests where applicable.

---

### License
ISC License. See `package.json` in `backend/`.
