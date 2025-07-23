import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { api } from "./api-router";
import { fastApiMiddleware } from "./fastapi-middleware";
import { randomBytes } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(64).toString('hex');

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload handling with multer
  const multer = (await import('multer')).default;
  const upload = multer({
    dest: './uploads/',
    limits: {
      fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: (req: any, file: any, cb: any) => {
      // Allow all file types but validate based on tool requirements
      cb(null, true);
    }
  });

  // Add multer middleware to API routes
  app.use('/api/tools', upload.array('files', 10)); // Allow up to 10 files
  
  // Simple download endpoint for processed files
  app.get('/api/download/:filename', (req, res) => {
    const filename = req.params.filename;
    // In a real implementation, this would serve actual processed files
    // For now, we'll simulate a download response
    res.json({
      message: 'Download ready',
      filename: filename,
      url: `/api/download/${filename}`,
      note: 'This is a simulated download. In production, this would serve actual processed files.'
    });
  });

  // Mount FastAPI-style router
  app.use('/api', api.getRouter());
  
  // Legacy auth routes (for backward compatibility)
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

      // Create user
      const user = await storage.createUser({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Protected route example
  app.get("/api/profile", authenticateToken, async (req: any, res) => {
    res.json({ user: req.user });
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "Suntyn AI API"
    });
  });

  // Cleanup expired files periodically
  setInterval(async () => {
    try {
      await storage.deleteExpiredFiles();
    } catch (error) {
      console.error("Error cleaning up expired files:", error);
    }
  }, 60000); // Run every minute

  // Enhanced error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Make error messages more user-friendly
    if (status === 413) {
      message = "File size too large. Please use a file smaller than 50MB.";
    } else if (status === 415) {
      message = "Unsupported file format. Please check the supported formats for this tool.";
    } else if (status === 429) {
      message = "Too many requests. Please wait a moment before trying again.";
    }

    // Log error with more context
    console.error('Server error:', {
      error: err.name || 'UnknownError',
      message: err.message,
      url: req.url,
      method: req.method,
      status,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    // Don't expose internal errors in production
    const shouldExposeStack = process.env.NODE_ENV === 'development' && status < 500;

    res.status(status).json({ 
      success: false,
      message,
      errorCode: err.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
      ...(shouldExposeStack && { stack: err.stack })
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}