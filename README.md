# 🍔 OrderIt — MERN Food Ordering App

A full-stack food ordering web application built with the MERN stack. Users can browse restaurants, explore menus, add items to cart, and place orders with Stripe payment integration. Admins can manage restaurants, menus, and food items — with AI-powered dish description generation.

---

## 🚀 Features

### User
- Register / Login with JWT authentication
- Browse restaurants and their menus
- Search for food items
- Add to cart and place orders
- Pay securely via **Stripe** (INR)
- View order history and profile

### Admin
- Add and manage restaurants and food items
- Upload dish images via **Cloudinary**
- **AI Menu Generation** — enter a dish name and auto-generate its description using AI
- Role-based access control (admin vs user)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Redux Toolkit, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Payments | Stripe |
| Image Storage | Cloudinary |
| Email | Nodemailer (Pug templates) |
| AI | AI menu description generation service |

---

## 📁 Project Structure

```
OrderIt/
├── Backend/
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── middlewares/      # Auth, error handling
│   ├── services/         # AI service
│   ├── utils/            # Helpers (token, email, etc.)
│   └── config/           # Cloudinary config
│
└── frontend/
    ├── src/
    │   ├── Components/   # UI components
    │   ├── redux/        # Store, slices, actions
    │   └── utils/        # API config
    └── public/           # Static assets
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js
- MongoDB
- Stripe account
- Cloudinary account

### Backend

```bash
cd Backend
npm install
```

Create `Backend/config/config.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

STRIPE_SECRET_KEY=your_stripe_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_password
```

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Never commit your `config.env` file. It is excluded via `.gitignore`.

---

## 📌 Note

This project is currently running locally. Deployment coming soon.
