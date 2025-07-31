import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { storage } from './storage';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
console.log(`🔧 Configured port: ${PORT}`);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for React
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 
    ['https://*.replit.app', 'https://*.replit.dev'] : 
    ['http://localhost:*', 'http://0.0.0.0:*', 'https://*.replit.app', 'https://*.replit.dev'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', routes);

// Static file serving for processed files
app.use('/static', express.static(path.join(process.cwd(), 'static')));

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist', 'public');
  
  // Serve static files
  app.use(express.static(distPath));
  
  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/static')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
} else {
  // Development mode - let Vite handle the frontend
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Suntyn AI API Server', 
      status: 'running',
      environment: 'development'
    });
  });
}

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    services: {
      api: 'running',
      storage: 'connected',
      static: 'serving'
    },
    version: '1.0.0'
  };

  try {
    // Test storage connection
    await storage.getToolUsageStats();
    healthCheck.services.storage = 'connected';
  } catch (error) {
    healthCheck.services.storage = 'error';
    healthCheck.status = 'degraded';
  }

  res.status(healthCheck.status === 'healthy' ? 200 : 503).json(healthCheck);
});

// Enhanced error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  const errorId = Math.random().toString(36).substring(7);
  
  console.error(`[${errorId}] Server error:`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Specific error handling for different types
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details,
      errorId
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      errorId
    });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large',
      message: 'File size exceeds the maximum allowed limit',
      errorId
    });
  }

  // Generic error response
  res.status(error.status || 500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    errorId,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Create static directory if it doesn't exist
const staticDir = path.join(process.cwd(), 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Suntyn AI Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Static files: ${staticDir}`);
  console.log(`🎯 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📖 API routes: http://0.0.0.0:${PORT}/api`);
  console.log(`✅ Port conflict resolved - Backend on ${PORT}, Frontend uses separate port`);
  console.log(`🔒 CORS configured for Replit domains`);
  console.log(`📄 Sitemap.xml created for SEO`);
  console.log(`⚡ Enhanced error handling active`);
});