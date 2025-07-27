import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { sanitizeInput, validateFileUpload, userRateLimit } from "./middleware/validation";

const app = express();

// Configure trust proxy for Replit environment
app.set('trust proxy', true);

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: false, // Fix for production rate limiting
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);
app.use('/api/', userRateLimit(100, 15 * 60 * 1000));

// Apply input sanitization to all routes
app.use(sanitizeInput);

// Enhanced security with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for Vite compatibility
  crossOriginEmbedderPolicy: false
}));

// Enhanced CORS and security middleware
app.use((req, res, next) => {
  // Enhanced CORS headers
  const origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  // Enhanced security headers
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  res.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Enhanced CSP header for Vite HMR compatibility
  res.header("Content-Security-Policy", 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' ws: wss:; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' ws: wss: http: https:; " +
    "worker-src 'self' blob:;"
  );

  next();
});

// Body parsing with enhanced size limits and error handling
app.use(express.json({ 
  limit: '50mb',
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: false, 
  limit: '50mb',
  parameterLimit: 1000
}));

// Memory optimization and cleanup
setInterval(() => {
  if (global.gc) {
    global.gc();
  }
}, 30000); // Run garbage collection every 30 seconds

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Enhanced error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error with more context
    console.error('Server error:', {
      error: err,
      url: req.url,
      method: req.method,
      status,
      timestamp: new Date().toISOString()
    });

    // Don't throw in production
    if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
    }

    res.status(status).json({ 
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Don't exit in development for better debugging
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);

  // Enhanced server startup with error handling
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    log(`📁 File uploads directory: ./uploads`);
    log(`📁 Processed files directory: ./uploads/processed`);
    log(`🎯 All 108+ AI tools are ready for processing`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Attempting to find an alternative port...`);
      // Try alternative port if main port is busy
      const altPort = port + 1;
      server.listen({
        port: altPort,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`serving on alternative port ${altPort}`);
      });
    } else {
      console.error('Server startup error:', err);
    }
  });
})();