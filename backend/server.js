const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Debug mode
const DEBUG = process.env.DEBUG === 'true';

// Enhanced error logging
const logError = (error, context = '') => {
  console.error(`\n=== Error Details ${context ? `(${context})` : ''} ===`);
  console.error('Message:', error.message);
  console.error('Name:', error.name);
  console.error('Stack:', error.stack);
  if (error.code) console.error('Code:', error.code);
  if (error.syscall) console.error('Syscall:', error.syscall);
  console.error('==================\n');
};

// Create Express app
const app = express();

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('\n🚨 Uncaught Exception:');
  logError(error, 'UncaughtException');
  setTimeout(() => process.exit(1), 1000);
});

process.on('unhandledRejection', (error) => {
  console.error('\n🚨 Unhandled Rejection:');
  logError(error, 'UnhandledRejection');
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Request logging
app.use((req, res, next) => {
  if (DEBUG) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Database connection with retry
let server;
const connectWithRetry = (retries = 5) => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findmycareer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start server only after successful DB connection
    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    logError(err, 'MongoDB');
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts left)`);
      setTimeout(() => connectWithRetry(retries - 1), 5000);
    } else {
      console.error('Failed to connect to MongoDB after multiple attempts');
      process.exit(1);
    }
  });
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🛑 Received shutdown signal');
  
  try {
    if (server) {
      await new Promise(resolve => server.close(resolve));
      console.log('Server closed');
    }
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Routes
const routes = {
  auth: require('./routes/auth.routes'),
  assessment: require('./routes/assessment.routes'),
  careers: require('./routes/career.routes'),
  counseling: require('./routes/counseling.routes'),
  admin: require('./routes/admin.routes')
};

Object.entries(routes).forEach(([name, router]) => {
  app.use(`/api/${name}`, router);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\n🚨 Error in request:');
  logError(err, 'Request');
  
  if (err instanceof mongoose.Error) {
    return res.status(400).json({
      success: false,
      message: 'Database operation failed',
      error: err.message
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? {
      message: err.message,
      type: err.name,
      code: err.code
    } : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Start the connection process
connectWithRetry();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} 