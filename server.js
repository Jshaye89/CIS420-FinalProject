const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const assetRoutes = require('./routes/assetRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Handle CORS
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['http://bfwassets.us-east-1.elasticbeanstalk.com']
    : ['http://localhost:3000'];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // For testing purposes; restrict this in production
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Test Routes
app.get('/test-server', (req, res) => {
  res.send('Server is up and running');
});

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/users', userRoutes);

// Serve React Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
