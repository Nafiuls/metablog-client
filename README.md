# 🌐 MetaBlogs - A Modern Blogging Platform

Welcome to **MetaBlogs**, a feature-rich, fully responsive, and beautifully designed blog website built using **React**, **Firebase**, **MongoDB**, and **Framer Motion**. This platform offers a seamless user experience with intuitive UI, powerful search and filtering, protected routes, and much more.

🔗 **Live Site**: [https://funny-douhua-018593.netlify.app/](https://funny-douhua-018593.netlify.app/)

---

## 🚀 Project Purpose

MetaBlogs was created as a challenge project to showcase the power of a full-stack web application with real-world functionality. This application allows users to read, write, and manage blogs, save their favorites, interact with comments, and experience smooth navigation and responsive design.

---

## 🌟 Features

### 🧑‍💻 Authentication

- 🔐 Email and Password Authentication (Firebase)
- 🔗 Google Authentication
- 🔁 JWT Authentication for all private routes
- ⚠️ Form validation and error handling (password strength checks included)

### 🏡 Home Page

- Elegant **Hero Banner** with motion effects using **Framer Motion**
- 📰 Recent Blogs Section (shows latest 6 blogs)
- 💌 Newsletter Subscription with toast notification
- 💡 Extra Sections: **Tips** and **Author Spotlight**
- 📱 Fully Responsive Design

### 📑 Add / Update Blog

- 📝 Add Blog form with inputs for title, image, category, descriptions, etc.
- ✏️ Pre-filled form for updating existing blogs (Private Route)
- 🔒 Only blog owners can update their blogs

### 📃 All Blogs Page

- 📂 Filter blogs by category
- 🔍 Search blogs by title (MongoDB Text Search)
- ❤️ Wishlist any blog
- 📄 View Blog Details

### 📌 Blog Details Page

- 📚 Full blog content display
- 💬 Comment system with real-time filtering and user data
- ⛔ Restriction on commenting on own blogs
- ✍️ Blog update option visible only to blog owner

### ⭐ Featured Blogs Page

- 📊 Top 10 Blogs by word count in long descriptions
- 📈 Built using **TanStack Table** with sortable columns

### 💖 Wishlist Page

- 🧾 Shows all wishlisted blogs of the logged-in user
- ❌ Remove from wishlist functionality
- 📄 View details of wishlisted blogs

---

## 🔧 Technologies Used

### Frontend

- **React.js**
- **Framer Motion** - for smooth animations
- **React Router DOM**
- **React Hot Toast**
- **TanStack Table** - for interactive data tables

### Backend

- **Express.js**
- **MongoDB** - with collections for blogs, wishlist, comments
- **JWT** - for token-based authentication
- **CORS**, **dotenv**

### Deployment

- **Frontend**: Deployed on **Netlify**
- **Backend**: Deployed on **Vercel**
- 🔐 Environment variables used to secure Firebase and MongoDB credentials

## 📚 NPM Packages Used

- `react-router-dom`
- `firebase`
- `axios`
- `jsonwebtoken`
- `framer-motion`
- `@tanstack/react-table`
- `react-hot-toast`
- `dotenv`
- `cors`
- `mongoose`
- `express`

---

## 👤 Author

📧 Email: [snafiul700@gmail.com](mailto:snafiul700@gmail.com)  
💻 GitHub: [https://github.com/Nafiuls](https://github.com/Nafiuls)
