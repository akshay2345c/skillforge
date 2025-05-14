const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // to accept JSON data

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Auth routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Course routes
app.use('/api/courses', require('./routes/courseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
