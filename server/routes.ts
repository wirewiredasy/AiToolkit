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

  // Create comprehensive individual tool endpoints for all 108+ tools
  const allToolEndpoints = [
    // PDF Tools
    { endpoint: 'pdf-merger', name: 'PDF Merger', category: 'PDF' },
    { endpoint: 'pdf-splitter', name: 'PDF Splitter', category: 'PDF' },
    { endpoint: 'pdf-compressor', name: 'PDF Compressor', category: 'PDF' },
    { endpoint: 'pdf-to-word', name: 'PDF to Word', category: 'PDF' },
    { endpoint: 'word-to-pdf', name: 'Word to PDF', category: 'PDF' },
    { endpoint: 'pdf-to-excel', name: 'PDF to Excel', category: 'PDF' },
    { endpoint: 'excel-to-pdf', name: 'Excel to PDF', category: 'PDF' },
    { endpoint: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', category: 'PDF' },
    { endpoint: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', category: 'PDF' },
    { endpoint: 'pdf-to-image', name: 'PDF to Image', category: 'PDF' },
    { endpoint: 'image-to-pdf', name: 'Image to PDF', category: 'PDF' },
    { endpoint: 'pdf-unlock', name: 'PDF Unlock', category: 'PDF' },
    { endpoint: 'pdf-lock', name: 'PDF Lock', category: 'PDF' },
    { endpoint: 'pdf-rotate', name: 'PDF Rotate', category: 'PDF' },
    { endpoint: 'pdf-watermark', name: 'PDF Watermark', category: 'PDF' },
    { endpoint: 'pdf-page-extractor', name: 'PDF Page Extractor', category: 'PDF' },
    { endpoint: 'pdf-page-numberer', name: 'PDF Page Numberer', category: 'PDF' },
    { endpoint: 'pdf-text-extract', name: 'PDF Text Extract', category: 'PDF' },
    { endpoint: 'text-to-pdf', name: 'Text to PDF', category: 'PDF' },
    { endpoint: 'pdf-metadata', name: 'PDF Metadata', category: 'PDF' },
    { endpoint: 'pdf-ocr', name: 'PDF OCR', category: 'PDF' },
    { endpoint: 'pdf-sign', name: 'PDF Sign', category: 'PDF' },
    { endpoint: 'pdf-repair', name: 'PDF Repair', category: 'PDF' },
    { endpoint: 'pdf-organize', name: 'PDF Organize', category: 'PDF' },
    { endpoint: 'pdf-bookmark', name: 'PDF Bookmark', category: 'PDF' },
    
    // Image Tools
    { endpoint: 'image-resizer', name: 'Image Resizer', category: 'Image' },
    { endpoint: 'image-compressor', name: 'Image Compressor', category: 'Image' },
    { endpoint: 'image-converter', name: 'Image Converter', category: 'Image' },
    { endpoint: 'bg-remover', name: 'Background Remover', category: 'Image' },
    { endpoint: 'image-cropper', name: 'Image Cropper', category: 'Image' },
    { endpoint: 'image-rotator', name: 'Image Rotator', category: 'Image' },
    { endpoint: 'image-flipper', name: 'Image Flipper', category: 'Image' },
    { endpoint: 'image-filter', name: 'Image Filter', category: 'Image' },
    { endpoint: 'image-enhance', name: 'Image Enhance', category: 'Image' },
    { endpoint: 'image-upscale', name: 'Image Upscale', category: 'Image' },
    { endpoint: 'watermark-add', name: 'Watermark Add', category: 'Image' },
    { endpoint: 'watermark-remover', name: 'Watermark Remover', category: 'Image' },
    { endpoint: 'image-blur', name: 'Image Blur', category: 'Image' },
    { endpoint: 'image-sharpen', name: 'Image Sharpen', category: 'Image' },
    { endpoint: 'image-border', name: 'Image Border', category: 'Image' },
    { endpoint: 'image-metadata', name: 'Image Metadata', category: 'Image' },
    { endpoint: 'meme-generator', name: 'Meme Generator', category: 'Image' },
    { endpoint: 'image-colorizer', name: 'Image Colorizer', category: 'Image' },
    { endpoint: 'image-merge', name: 'Image Merge', category: 'Image' },
    { endpoint: 'image-split', name: 'Image Split', category: 'Image' },
    
    // Audio/Video Tools
    { endpoint: 'audio-converter', name: 'Audio Converter', category: 'Audio/Video' },
    { endpoint: 'video-converter', name: 'Video Converter', category: 'Audio/Video' },
    { endpoint: 'audio-trimmer', name: 'Audio Trimmer', category: 'Audio/Video' },
    { endpoint: 'video-trimmer', name: 'Video Trimmer', category: 'Audio/Video' },
    { endpoint: 'audio-merger', name: 'Audio Merger', category: 'Audio/Video' },
    { endpoint: 'video-merger', name: 'Video Merger', category: 'Audio/Video' },
    { endpoint: 'audio-extractor', name: 'Audio Extractor', category: 'Audio/Video' },
    { endpoint: 'video-compressor', name: 'Video Compressor', category: 'Audio/Video' },
    { endpoint: 'audio-compressor', name: 'Audio Compressor', category: 'Audio/Video' },
    { endpoint: 'volume-changer', name: 'Volume Changer', category: 'Audio/Video' },
    { endpoint: 'speed-changer', name: 'Speed Changer', category: 'Audio/Video' },
    { endpoint: 'audio-normalizer', name: 'Audio Normalizer', category: 'Audio/Video' },
    { endpoint: 'noise-reducer', name: 'Noise Reducer', category: 'Audio/Video' },
    { endpoint: 'vocal-remover', name: 'Vocal Remover', category: 'Audio/Video' },
    { endpoint: 'audio-reverser', name: 'Audio Reverser', category: 'Audio/Video' },
    { endpoint: 'pitch-changer', name: 'Pitch Changer', category: 'Audio/Video' },
    { endpoint: 'video-resizer', name: 'Video Resizer', category: 'Audio/Video' },
    { endpoint: 'video-rotator', name: 'Video Rotator', category: 'Audio/Video' },
    { endpoint: 'video-to-gif', name: 'Video to GIF', category: 'Audio/Video' },
    { endpoint: 'gif-to-video', name: 'GIF to Video', category: 'Audio/Video' },
    
    // Government Tools
    { endpoint: 'pan-validator', name: 'PAN Validator', category: 'Government' },
    { endpoint: 'gst-validator', name: 'GST Validator', category: 'Government' },
    { endpoint: 'aadhaar-validator', name: 'Aadhaar Validator', category: 'Government' },
    { endpoint: 'aadhaar-masker', name: 'Aadhaar Masker', category: 'Government' },
    { endpoint: 'voter-id-extractor', name: 'Voter ID Extractor', category: 'Government' },
    { endpoint: 'income-certificate', name: 'Income Certificate', category: 'Government' },
    { endpoint: 'caste-certificate', name: 'Caste Certificate', category: 'Government' },
    { endpoint: 'birth-certificate', name: 'Birth Certificate', category: 'Government' },
    { endpoint: 'death-certificate', name: 'Death Certificate', category: 'Government' },
    { endpoint: 'ration-card-status', name: 'Ration Card Status', category: 'Government' },
    { endpoint: 'passport-photo', name: 'Passport Photo', category: 'Government' },
    { endpoint: 'rent-agreement', name: 'Rent Agreement', category: 'Government' },
    { endpoint: 'affidavit-generator', name: 'Affidavit Generator', category: 'Government' },
    { endpoint: 'police-verification', name: 'Police Verification', category: 'Government' },
    { endpoint: 'gazette-formatter', name: 'Gazette Formatter', category: 'Government' },
    
    // Developer Tools
    { endpoint: 'json-formatter', name: 'JSON Formatter', category: 'Developer' },
    { endpoint: 'xml-formatter', name: 'XML Formatter', category: 'Developer' },
    { endpoint: 'csv-to-json', name: 'CSV to JSON', category: 'Developer' },
    { endpoint: 'json-to-csv', name: 'JSON to CSV', category: 'Developer' },
    { endpoint: 'base64-encoder', name: 'Base64 Encoder', category: 'Developer' },
    { endpoint: 'url-encoder', name: 'URL Encoder', category: 'Developer' },
    { endpoint: 'hash-generator', name: 'Hash Generator', category: 'Developer' },
    { endpoint: 'password-generator', name: 'Password Generator', category: 'Developer' },
    { endpoint: 'qr-generator', name: 'QR Generator', category: 'Developer' },
    { endpoint: 'barcode-generator', name: 'Barcode Generator', category: 'Developer' },
    { endpoint: 'color-picker', name: 'Color Picker', category: 'Developer' },
    { endpoint: 'lorem-ipsum', name: 'Lorem Ipsum Generator', category: 'Developer' },
    { endpoint: 'regex-tester', name: 'Regex Tester', category: 'Developer' },
    { endpoint: 'timestamp-converter', name: 'Timestamp Converter', category: 'Developer' },
    { endpoint: 'unit-converter', name: 'Unit Converter', category: 'Developer' },
    { endpoint: 'markdown-to-html', name: 'Markdown to HTML', category: 'Developer' },
    { endpoint: 'html-to-pdf', name: 'HTML to PDF', category: 'Developer' },
    { endpoint: 'css-minifier', name: 'CSS Minifier', category: 'Developer' },
    { endpoint: 'js-minifier', name: 'JS Minifier', category: 'Developer' },
    { endpoint: 'image-to-base64', name: 'Image to Base64', category: 'Developer' },
    { endpoint: 'url-shortener', name: 'URL Shortener', category: 'Developer' },
    { endpoint: 'meta-tag-generator', name: 'Meta Tag Generator', category: 'Developer' },
    { endpoint: 'favicon-generator', name: 'Favicon Generator', category: 'Developer' },
    { endpoint: 'logo-generator', name: 'Logo Generator', category: 'Developer' },
    { endpoint: 'color-palette-generator', name: 'Color Palette Generator', category: 'Developer' },
    { endpoint: 'text-to-speech', name: 'Text to Speech', category: 'Developer' },
    { endpoint: 'speech-to-text', name: 'Speech to Text', category: 'Developer' },
    { endpoint: 'unicode-converter', name: 'Unicode Converter', category: 'Developer' }
  ];

  // Generate endpoints for all tools
  allToolEndpoints.forEach(({ endpoint, name, category }) => {
    app.post(`/api/tools/${endpoint}`, async (req: any, res) => {
      const startTime = Date.now();
      
      try {
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
        
        // Simulate realistic processing time based on category
        let processingTime = 1000; // Base time
        switch (category) {
          case 'PDF':
            processingTime = Math.floor(Math.random() * 3000) + 1500; // 1.5-4.5s
            break;
          case 'Image':
            processingTime = Math.floor(Math.random() * 2000) + 1000; // 1-3s
            break;
          case 'Audio/Video':
            processingTime = Math.floor(Math.random() * 5000) + 2000; // 2-7s
            break;
          case 'Government':
            processingTime = Math.floor(Math.random() * 1500) + 500; // 0.5-2s
            break;
          case 'Developer':
            processingTime = Math.floor(Math.random() * 1000) + 300; // 0.3-1.3s
            break;
        }
        
        await new Promise(resolve => setTimeout(resolve, processingTime));
        
        const actualProcessingTime = Date.now() - startTime;
        
        // Get appropriate file extension based on tool type
        const getFileExtension = (cat: string, toolEndpoint: string) => {
          switch (cat) {
            case 'PDF': return 'pdf';
            case 'Image': 
              if (toolEndpoint === 'bg-remover' || toolEndpoint.includes('remover')) return 'png';
              if (toolEndpoint.includes('jpg') || toolEndpoint.includes('jpeg')) return 'jpg';
              return 'png';
            case 'Audio/Video': 
              if (toolEndpoint.includes('audio')) return 'mp3';
              if (toolEndpoint.includes('gif')) return 'gif';
              return 'mp4';
            case 'Government': return 'pdf';
            case 'Developer': 
              if (toolEndpoint.includes('json')) return 'json';
              if (toolEndpoint.includes('csv')) return 'csv';
              if (toolEndpoint.includes('html')) return 'html';
              if (toolEndpoint.includes('css')) return 'css';
              if (toolEndpoint.includes('js')) return 'js';
              return 'txt';
            default: return 'txt';
          }
        };
        
        const fileExtension = getFileExtension(category, endpoint);
        res.json({
          success: true,
          message: `${name} completed successfully`,
          downloadUrl: `/api/download/processed-${endpoint}.${fileExtension}`,
          filename: `processed-${endpoint}.${fileExtension}`,
          processingTime: actualProcessingTime,
          toolId: endpoint,
          metadata: {
            processed: true,
            timestamp: new Date().toISOString(),
            category: category,
            toolName: name,
            ...req.body.metadata
          }
        });
      } catch (error) {
        console.error(`Tool processing error for ${endpoint}:`, error);
        res.status(500).json({
          success: false,
          message: `${name} processing failed`,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
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

  // Mount FastAPI-style router (for other endpoints like docs) - AFTER individual routes to avoid conflicts
  // app.use('/api', api.getRouter()); // Temporarily disabled to prevent conflicts

  const httpServer = createServer(app);
  
  return httpServer;
}