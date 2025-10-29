# 🩺 Health Mate - Full Stack Web Application

**Health Mate** ek complete MERN Stack (MongoDB, Express JS, React JS, Node JS) based project hai jisme full authentication, email OTP verification, forget password system, user dashboard aur aur bhi multiple advanced features include kiye gaye hain.

---

## 🧩 Tech Stack (Technology Used)

### 🌐 Frontend

**React JS + Tailwind CSS + Ant Design + React Icons**

**Libraries:**

- `react` → Frontend framework for building UI.
- `react-router-dom` → Routing system for pages navigation.
- `axios` → API calls between frontend and backend.
- `antd` → Advanced UI components (buttons, forms, tables, modals).
- `react-icons` → Stylish icons for better UI look.
- `recharts` → Graphs & charts for data visualization.
- `sweetalert2` → Alert messages for better user interaction.
- `lucide-react` → Modern icons for dashboards.
- `@emotion/react & @emotion/styled` → Styling utilities.
- `@tailwindcss/vite` → Tailwind CSS setup for faster build.

---

### ⚙️ Backend

**Node JS + Express JS + MongoDB (via Mongoose)**

**Libraries:**

- `express` → Backend server framework.
- `dotenv` → Environment variables manage karne ke liye.
- `mongoose` → MongoDB connection & schema model creation.
- `mongodb` → Direct MongoDB driver support.
- `cors` → Cross-origin requests handle karne ke liye.
- `multer` & `multer-storage-cloudinary` → Image upload system with Cloudinary.
- `cloudinary` → Image hosting & media storage.
- `jsonwebtoken (JWT)` → Secure authentication system.
- `bcrypt` → Password hashing for strong security.
- `joi` → Input validation system.
- `nodemailer` → Email sending for OTP & verification.
- `@google/generative-ai` → AI-based future integrations (optional).
- `nodemon` → Development server auto-restart.

---

## 🔐 Authentication & Security Features

- **User Registration with Email OTP Verification**  
  Jab user register karega, uske Gmail par ek OTP send hoga using `nodemailer`. Jab tak OTP verify nahi karega, account activate nahi hoga.

- **Login Notification**  
  Login ke time user ke Gmail par ek alert mail send hota hai for login confirmation (security purpose).

- **Forgot Password (Advanced System)**  
  Agar user apna password bhool jata hai, tu OTP Gmail par send hota hai. OTP verify hone ke baad hi password change hota hai.  
  Is system se unauthorized access prevent hoti hai.

- **Password Hashing using `bcrypt`**  
  Har password encrypted form me database me store hota hai, plain text me nahi.

- **JWT Tokens for Session Management**  
  Har authenticated user ko ek token milta hai jo login session ko secure rakhta hai.

---

## 🗃️ Database (MongoDB + Mongoose)

MongoDB NoSQL database use kiya gaya hai with `mongoose` models for structured data storage.

**Example Structure:**

```js
User {
  name: String,
  email: String,
  password: String (hashed),
  otp: Number,
  verified: Boolean,
  createdAt: Date
}
```

[Register](./public/health.png)
