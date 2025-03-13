const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import CORS
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// ✅ Enable CORS Middleware (Import first)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/reservations', verifyToken, reservationRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
