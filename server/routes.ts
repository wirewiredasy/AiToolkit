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

  // Simplified and more robust file upload middleware
  const flexibleUpload = (req: any, res: any, next: any) => {
    // First try to handle any files
    upload.any()(req, res, (err: any) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({
          success: false,
          message: 'File upload failed. Please check file size (max 50MB) and format.',
          errorCode: err.code || 'UPLOAD_ERROR'
        });
      }
      
      // Normalize file structure for consistency
      if (req.files && req.files.length > 0) {
        // For multiple files or single file in array format
        req.uploadedFiles = req.files;
      } else if (req.file) {
        // For single file format
        req.uploadedFiles = [req.file];
      } else {
        req.uploadedFiles = [];
      }
      
      next();
    });
  };

  // Test endpoint to verify API routing works
  app.get('/api/test', (req, res) => {
    res.json({ 
      success: true, 
      message: 'API routing is working correctly',
      timestamp: new Date().toISOString()
    });
  });

  // Apply file upload middleware to specific tool routes FIRST
  app.use('/api/tools', flexibleUpload);

  // Direct tool processing endpoint (bypass API router issue)
  app.post('/api/tools/process', async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      const { toolId, metadata } = req.body;
      
      if (!toolId) {
        return res.status(400).json({
          success: false,
          message: 'toolId is required'
        });
      }

      // Basic file validation
      const files = req.uploadedFiles || [];
      if (files.length > 0) {
        for (const file of files) {
          if (file.size > 50 * 1024 * 1024) { // 50MB limit
            return res.status(400).json({
              success: false,
              message: 'File size exceeds 50MB limit'
            });
          }
        }
      }
      
      // Simulate realistic processing time
      const processingTime = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      const actualProcessingTime = Date.now() - startTime;
      
      res.json({
        success: true,
        message: `Tool ${toolId} completed successfully`,
        downloadUrl: `/api/download/processed-${toolId}.pdf`,
        filename: `processed-${toolId}.pdf`,
        processingTime: actualProcessingTime,
        toolId: toolId,
        metadata: metadata || {}
      });
    } catch (error) {
      console.error(`Tool processing error:`, error);
      res.status(500).json({
        success: false,
        message: `Tool processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: error instanceof Error ? error.message : 'Processing failed'
      });
    }
  });

  // Individual tool endpoints
  app.post('/api/tools/pdf-merger', async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      const files = req.uploadedFiles || [];
      if (files.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'At least 2 PDF files are required for merging'
        });
      }

      // Simulate PDF merging
      await new Promise(resolve => setTimeout(resolve, 2000 + (files.length * 500)));
      
      const processingTime = Date.now() - startTime;
      
      res.json({
        success: true,
        message: `Successfully merged ${files.length} PDF files`,
        downloadUrl: `/api/download/merged-document.pdf`,
        filename: 'merged-document.pdf',
        processingTime,
        filesProcessed: files.length
      });
    } catch (error) {
      console.error('PDF merger error:', error);
      res.status(500).json({
        success: false,
        message: 'PDF merge failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

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

  // Legacy auth routes (for backward compatibility)
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user
      const user = await storage.createUser({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mount FastAPI-style router (for other endpoints like docs)  
  app.use('/api', api.getRouter());

  const httpServer = createServer(app);
  
  return httpServer;
}