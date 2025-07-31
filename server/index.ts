import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import routes from './routes';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '5000', 10);
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);

  // CORS
  app.use((req, res, next) => {
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : ['http://localhost:3000', 'http://localhost:5173'];
    
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Body parsing middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  if (isProduction) {
    // In production, serve static files
    app.use(express.static(path.join(__dirname, '../dist/public')));
  } else {
    // In development, serve built frontend files if available
    const frontendPath = path.join(__dirname, '../dist/public');
    if (fs.existsSync(frontendPath)) {
      app.use(express.static(frontendPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
      });
    } else {
      // Fallback message if frontend not built
      app.get('/', (req, res) => {
        res.json({ 
          message: 'Suntyn AI Backend Running Successfully', 
          status: 'ok',
          environment: 'development',
          api: 'Available at /api/*',
          note: 'Run "npm run build" to build the frontend'
        });
      });
    }
  }

  // API routes
  app.use('/api', routes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development'
    });
  });

  if (isProduction) {
    // Serve frontend for all other routes in production
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/public/index.html'));
    });
  }

  return app;
}

async function startServer() {
  try {
    const app = await createServer();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Suntyn AI server running on http://0.0.0.0:${PORT}`);
      console.log(`🖥️  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📱 Frontend: ${isProduction ? 'Static files' : 'Vite dev server'}`);
      console.log(`🔗 Backend: Express.js API on /api routes`);
      console.log(`✅ Full-stack application ready!`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();