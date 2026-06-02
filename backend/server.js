const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'https://rayudu-collegeportal.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(express.json());

// Load Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Database Connection (MongoDB)
const PORT = process.env.PORT || 5001;
const envDbUri = process.env.MONGODB_URI;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const connectToMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    startServer();
  } catch (err) {
    return Promise.reject(err);
  }
};

const startMongo = async () => {
  if (envDbUri) {
    try {
      await connectToMongo(envDbUri);
      return;
    } catch (err) {
      console.warn('Failed to connect to configured MongoDB URI. Falling back to in-memory MongoDB.');
    }
  }

  const mongoServer = await MongoMemoryServer.create();
  const memoryUri = mongoServer.getUri();
  console.log('Starting in-memory MongoDB server');
  await connectToMongo(memoryUri);
};

startMongo().catch((err) => {
  console.error('Database connection error:', err);
  process.exit(1);
});
