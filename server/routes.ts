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

  // PDF Tools APIs
  app.post("/api/tools/pdf-to-word", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF to Word",
        toolCategory: "PDF",
        fileName: "converted.docx",
        fileSize: 1024000,
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "PDF converted to Word successfully",
        downloadUrl: "/api/download/converted.docx",
        filename: "converted.docx"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  app.post("/api/tools/pdf-splitter", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF Splitter",
        toolCategory: "PDF",
        fileName: "split-pdfs.zip",
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "PDF split successfully",
        downloadUrl: "/api/download/split-pdfs.zip",
        filename: "split-pdfs.zip",
        fileCount: 5
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Split failed" });
    }
  });

  app.post("/api/tools/pdf-compressor", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF Compressor",
        toolCategory: "PDF",
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "PDF compressed successfully",
        downloadUrl: "/api/download/compressed.pdf",
        compressionRatio: "45%"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Compression failed" });
    }
  });

  // Image Tools APIs
  app.post("/api/tools/image-resizer", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { width, height } = req.body;
      await new Promise(resolve => setTimeout(resolve, 1000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Image Resizer",
        toolCategory: "Image",
        processingTime,
        success: true,
        metadata: { width, height }
      });

      res.json({
        success: true,
        message: "Image resized successfully",
        downloadUrl: "/api/download/resized-image.png",
        filename: "resized-image.png",
        newWidth: parseInt(width),
        newHeight: parseInt(height)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Resize failed" });
    }
  });

  app.post("/api/tools/bg-remover", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "AI Background Remover",
        toolCategory: "Image",
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "Background removed successfully",
        downloadUrl: "/api/download/no-bg-image.png"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Background removal failed" });
    }
  });

  // Media Tools APIs
  app.post("/api/tools/audio-converter", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Audio Converter",
        toolCategory: "Audio/Video",
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "Audio converted successfully",
        downloadUrl: "/api/download/converted-audio.mp3"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Audio conversion failed" });
    }
  });

  app.post("/api/tools/video-converter", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Video Converter",
        toolCategory: "Audio/Video",
        processingTime,
        success: true,
      });

      res.json({
        success: true,
        message: "Video converted successfully",
        downloadUrl: "/api/download/converted-video.mp4"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Video conversion failed" });
    }
  });

  // Government Validation APIs
  app.post("/api/tools/pan-validator", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const panNumber = req.body.panNumber;
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const isValid = panRegex.test(panNumber);
      
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PAN Validator",
        toolCategory: "Government",
        processingTime,
        success: true,
        metadata: { isValid },
      });

      res.json({
        isValid,
        message: isValid ? "Valid PAN format" : "Invalid PAN format",
        details: isValid ? {
          type: "Individual",
          area: panNumber.slice(3, 4) === 'P' ? "Person" : "Other"
        } : null
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "PAN validation failed" });
    }
  });

  app.post("/api/tools/gst-validator", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const gstNumber = req.body.gstNumber;
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      const isValid = gstRegex.test(gstNumber);
      
      const processingTime = Date.now() - startTime;
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "GST Validator",
        toolCategory: "Government",
        processingTime,
        success: true,
        metadata: { isValid },
      });

      let details = null;
      let reason = null;

      if (isValid) {
        details = {
          stateCode: gstNumber.slice(0, 2),
          entityCode: gstNumber.slice(2, 12),
          checkDigit: gstNumber.slice(12, 13)
        };
      } else {
        if (gstNumber.length !== 15) {
          reason = "GST number must be exactly 15 characters";
        } else if (!/^[0-9]{2}/.test(gstNumber)) {
          reason = "First 2 characters must be digits (state code)";
        } else if (!/[A-Z]{5}/.test(gstNumber.slice(2, 7))) {
          reason = "Characters 3-7 must be letters";
        } else {
          reason = "Invalid GST number format";
        }
      }

      res.json({
        isValid,
        details,
        reason
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "GST validation failed" });
    }
  });

  app.post("/api/tools/aadhaar-validator", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const aadhaarNumber = req.body.aadhaarNumber?.replace(/\s/g, '');
      const aadhaarRegex = /^[0-9]{12}$/;
      const isValid = aadhaarRegex.test(aadhaarNumber);
      
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Aadhaar Validator",
        toolCategory: "Government",
        processingTime: Date.now() - startTime,
        success: true,
        metadata: { isValid },
      });

      res.json({
        isValid,
        message: isValid ? "Valid Aadhaar format" : "Invalid Aadhaar format",
        reason: !isValid ? "Aadhaar must be exactly 12 digits" : null
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Aadhaar validation failed" });
    }
  });

  // Additional PDF Tools
  app.post("/api/tools/word-to-pdf", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Word to PDF",
        toolCategory: "PDF",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ success: true, downloadUrl: "/api/download/converted.pdf", filename: "converted.pdf" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  app.post("/api/tools/excel-to-pdf", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Excel to PDF",
        toolCategory: "PDF",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ success: true, downloadUrl: "/api/download/converted.pdf", filename: "converted.pdf" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  app.post("/api/tools/ppt-to-pdf", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PowerPoint to PDF",
        toolCategory: "PDF",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ success: true, downloadUrl: "/api/download/converted.pdf", filename: "converted.pdf" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  // Additional Image Tools
  app.post("/api/tools/image-compressor", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const quality = req.body.quality || 80;
      await new Promise(resolve => setTimeout(resolve, 1000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Image Compressor",
        toolCategory: "Image",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/compressed-image.jpg", 
        filename: "compressed-image.jpg",
        compressionRatio: Math.floor(100 - quality)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Compression failed" });
    }
  });

  app.post("/api/tools/image-format-converter", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const format = req.body.outputFormat || 'png';
      await new Promise(resolve => setTimeout(resolve, 800));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Image Format Converter",
        toolCategory: "Image",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: `/api/download/converted.${format}`, 
        filename: `converted.${format}` 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  app.post("/api/tools/watermark-remover", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Watermark Remover",
        toolCategory: "Image",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/no-watermark-image.png", 
        filename: "no-watermark-image.png" 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Watermark removal failed" });
    }
  });

  app.post("/api/tools/photo-enhancer", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "AI Photo Enhancer",
        toolCategory: "Image",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/enhanced-photo.png", 
        filename: "enhanced-photo.png" 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Enhancement failed" });
    }
  });

  // Audio/Video Tools
  app.post("/api/tools/audio-trimmer", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Audio Trimmer",
        toolCategory: "Audio/Video",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/trimmed-audio.mp3", 
        filename: "trimmed-audio.mp3" 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Trimming failed" });
    }
  });

  app.post("/api/tools/video-to-audio", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Video to Audio Extractor",
        toolCategory: "Audio/Video",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/extracted-audio.mp3", 
        filename: "extracted-audio.mp3" 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Extraction failed" });
    }
  });

  app.post("/api/tools/video-compressor", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Video Compressor",
        toolCategory: "Audio/Video",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ 
        success: true, 
        downloadUrl: "/api/download/compressed-video.mp4", 
        filename: "compressed-video.mp4",
        compressionRatio: "45%" 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Compression failed" });
    }
  });

  // Additional Tools
  app.post("/api/tools/pdf-to-excel", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PDF to Excel",
        toolCategory: "PDF",
        processingTime: Date.now() - startTime,
        success: true,
      });
      res.json({ success: true, downloadUrl: "/api/download/converted.xlsx", filename: "converted.xlsx" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Conversion failed" });
    }
  });

  app.post("/api/tools/qr-generator", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { text, size, color, bgColor } = req.body;
      await new Promise(resolve => setTimeout(resolve, 500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "QR Code Generator",
        toolCategory: "Utilities",
        processingTime: Date.now() - startTime,
        success: true,
      });
      const qrCodeUrl = `data:image/svg+xml;base64,${Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="${bgColor}"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="monospace" font-size="12" fill="${color}">QR: ${text.slice(0, 10)}...</text></svg>`).toString('base64')}`;
      res.json({ success: true, qrCodeUrl });
    } catch (error) {
      res.status(500).json({ success: false, message: "Generation failed" });
    }
  });

  app.post("/api/tools/barcode-generator", authenticateToken, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { text, type, width, height } = req.body;
      await new Promise(resolve => setTimeout(resolve, 500));
      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "Barcode Generator",
        toolCategory: "Utilities",
        processingTime: Date.now() - startTime,
        success: true,
      });
      const barcodeUrl = `data:image/svg+xml;base64,${Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="white"/><g transform="translate(10,10)"><rect width="2" height="${height-20}" fill="black"/><rect x="4" width="1" height="${height-20}" fill="black"/><rect x="7" width="3" height="${height-20}" fill="black"/><rect x="12" width="2" height="${height-20}" fill="black"/><text x="${width/2}" y="${height-5}" text-anchor="middle" font-family="monospace" font-size="10">${text}</text></g></svg>`).toString('base64')}`;
      res.json({ success: true, barcodeUrl });
    } catch (error) {
      res.status(500).json({ success: false, message: "Generation failed" });
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
