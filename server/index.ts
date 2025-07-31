import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { MemStorage } from './storage.js';
import { createRoutes } from './routes.js';
import * as fs from 'fs';
import path from 'path';

const app = express();
const port = Number(process.env.PORT) || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize storage
const storage = new MemStorage();

// API routes
app.use('/api', createRoutes(storage));

// Serve static files
const publicPath = path.join(process.cwd(), 'client/public');
const clientDistPath = path.join(process.cwd(), 'dist/public');

// In development, serve from client/public and fallback to dist if available
if (process.env.NODE_ENV === 'development') {
  // Serve client public files
  app.use(express.static(publicPath));
  
  // Also serve built files if they exist
  app.use(express.static(clientDistPath));
  
  // For SPA routing, serve index.html for non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      const indexPath = path.join(clientDistPath, 'index.html');
      const fallbackPath = path.join(process.cwd(), 'client/index.html');
      
      // Try dist first, then fallback to client directory
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.sendFile(fallbackPath);
      }
    }
  });
} else {
  // In production, serve static files from dist
  app.use(express.static(clientDistPath));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Cleanup expired files every hour
setInterval(async () => {
  try {
    await storage.cleanupExpiredFiles();
    console.log('Cleaned up expired files');
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
}, 60 * 60 * 1000);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});