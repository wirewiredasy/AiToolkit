import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

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
  // Auth routes
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

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    const { password, ...user } = req.user;
    res.json({ user });
  });

  // Dashboard routes
  app.get("/api/dashboard/stats", authenticateToken, async (req: any, res) => {
    try {
      const stats = await storage.getToolUsageStats(req.user.id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/dashboard/recent-activity", authenticateToken, async (req: any, res) => {
    try {
      const activity = await storage.getUserToolUsage(req.user.id, 10);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Tool processing routes (sample implementations)
  app.post("/api/tools/pdf/merge", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      // Simulate PDF merging process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const processingTime = Date.now() - startTime;
      
      // Log tool usage
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF Merger",
        toolCategory: "PDF",
        fileName: "merged.pdf",
        fileSize: 1024000, // 1MB
        processingTime,
        success: true,
        metadata: { filesCount: req.body.filesCount || 1 },
      });

      res.json({
        success: true,
        message: "PDFs merged successfully",
        downloadUrl: "/api/download/merged.pdf",
        processingTime,
      });
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF Merger",
        toolCategory: "PDF",
        processingTime,
        success: false,
      });

      res.status(500).json({ message: "PDF merge failed" });
    }
  });

  app.post("/api/tools/image/resize", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      // Simulate image resizing process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Image Resizer",
        toolCategory: "Image",
        fileName: "resized-image.jpg",
        fileSize: 512000,
        processingTime,
        success: true,
        metadata: { width: req.body.width, height: req.body.height },
      });

      res.json({
        success: true,
        message: "Image resized successfully",
        downloadUrl: "/api/download/resized-image.jpg",
        processingTime,
      });
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Image Resizer",
        toolCategory: "Image",
        processingTime,
        success: false,
      });

      res.status(500).json({ message: "Image resize failed" });
    }
  });

  app.post("/api/tools/audio/convert", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      // Simulate audio conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Audio Converter",
        toolCategory: "Audio/Video",
        fileName: "converted-audio.mp3",
        fileSize: 2048000,
        processingTime,
        success: true,
        metadata: { format: req.body.format || "mp3" },
      });

      res.json({
        success: true,
        message: "Audio converted successfully",
        downloadUrl: "/api/download/converted-audio.mp3",
        processingTime,
      });
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Audio Converter",
        toolCategory: "Audio/Video",
        processingTime,
        success: false,
      });

      res.status(500).json({ message: "Audio conversion failed" });
    }
  });

  app.post("/api/tools/government/pan-validate", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    
    try {
      const panNumber = req.body.panNumber;
      
      // Simple PAN validation regex
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const isValid = panRegex.test(panNumber);
      
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PAN Validator",
        toolCategory: "Government",
        processingTime,
        success: true,
        metadata: { panNumber: panNumber.slice(0, 5) + "****" + panNumber.slice(-1), isValid },
      });

      res.json({
        success: true,
        valid: isValid,
        message: isValid ? "Valid PAN format" : "Invalid PAN format",
        processingTime,
      });
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PAN Validator",
        toolCategory: "Government",
        processingTime,
        success: false,
      });

      res.status(500).json({ message: "PAN validation failed" });
    }
  });

  // Cleanup expired files periodically
  setInterval(async () => {
    try {
      await storage.deleteExpiredFiles();
    } catch (error) {
      console.error("Error cleaning up expired files:", error);
    }
  }, 60000); // Run every minute

  const httpServer = createServer(app);
  return httpServer;
}
