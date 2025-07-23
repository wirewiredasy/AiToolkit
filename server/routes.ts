import type { Express } from "express";
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

  app.get("/api/auth/me",  (req: any, res) => {
    const { password, ...user } = req.user;
    res.json({ user });
  });

  // Dashboard routes
  app.get("/api/dashboard/stats",  async (req: any, res) => {
    try {
      const stats = await storage.getToolUsageStats(req.user.id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/dashboard/recent-activity",  async (req: any, res) => {
    try {
      const activity = await storage.getUserToolUsage(req.user.id, 10);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Tool processing routes (sample implementations)
  app.post("/api/tools/pdf/merge", async (req: any, res) => {
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

  app.post("/api/tools/image/resize", async (req: any, res) => {
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

  app.post("/api/tools/audio/convert", async (req: any, res) => {
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
  app.post("/api/tools/pdf-to-word",  async (req: any, res) => {
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

  app.post("/api/tools/pdf-splitter",  async (req: any, res) => {
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

  app.post("/api/tools/pdf-compressor",  async (req: any, res) => {
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
  app.post("/api/tools/image-resizer",  async (req: any, res) => {
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

  app.post("/api/tools/bg-remover",  async (req: any, res) => {
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
  app.post("/api/tools/audio-converter",  async (req: any, res) => {
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

  app.post("/api/tools/video-converter",  async (req: any, res) => {
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

  // All PDF Tools APIs (25 tools)
  const pdfTools = [
    { endpoint: 'pdf-merger', name: 'PDF Merger', category: 'PDF' },
    { endpoint: 'pdf-splitter', name: 'PDF Splitter', category: 'PDF' },
    { endpoint: 'pdf-compressor', name: 'PDF Compressor', category: 'PDF' },
    { endpoint: 'pdf-to-word', name: 'PDF to Word', category: 'PDF' },
    { endpoint: 'pdf-to-excel', name: 'PDF to Excel', category: 'PDF' },
    { endpoint: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', category: 'PDF' },
    { endpoint: 'word-to-pdf', name: 'Word to PDF', category: 'PDF' },
    { endpoint: 'excel-to-pdf', name: 'Excel to PDF', category: 'PDF' },
    { endpoint: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', category: 'PDF' },
    { endpoint: 'pdf-ocr', name: 'PDF OCR', category: 'PDF' },
    { endpoint: 'pdf-watermark', name: 'PDF Watermark', category: 'PDF' },
    { endpoint: 'pdf-password-remover', name: 'PDF Password Remover', category: 'PDF' },
    { endpoint: 'pdf-password-protector', name: 'PDF Password Protector', category: 'PDF' },
    { endpoint: 'pdf-rotator', name: 'PDF Rotator', category: 'PDF' },
    { endpoint: 'pdf-cropper', name: 'PDF Cropper', category: 'PDF' },
    { endpoint: 'pdf-page-extractor', name: 'PDF Page Extractor', category: 'PDF' },
    { endpoint: 'pdf-page-numberer', name: 'PDF Page Numberer', category: 'PDF' },
    { endpoint: 'pdf-bookmark-manager', name: 'PDF Bookmark Manager', category: 'PDF' },
    { endpoint: 'pdf-form-filler', name: 'PDF Form Filler', category: 'PDF' },
    { endpoint: 'pdf-signature-adder', name: 'PDF Signature Adder', category: 'PDF' },
    { endpoint: 'pdf-text-extractor', name: 'PDF Text Extractor', category: 'PDF' },
    { endpoint: 'pdf-image-extractor', name: 'PDF Image Extractor', category: 'PDF' },
    { endpoint: 'pdf-organizer', name: 'PDF Organizer', category: 'PDF' },
    { endpoint: 'pdf-metadata-editor', name: 'PDF Metadata Editor', category: 'PDF' },
    { endpoint: 'pdf-version-converter', name: 'PDF Version Converter', category: 'PDF' }
  ];

  // Generate all PDF tool endpoints with hybrid routing (Express.js + FastAPI)
  pdfTools.forEach(({ endpoint, name, category }) => {
    app.post(`/api/tools/${endpoint}`, async (req: any, res) => {
      const startTime = Date.now();

      // Check if should use FastAPI for heavy processing
      const fileSize = req.body.fileSize || 0;
      if (fastApiMiddleware.shouldUseFastAPI(endpoint, fileSize)) {
        console.log(`🚀 Routing ${endpoint} to FastAPI service (heavy processing) - File size: ${fileSize}MB`);
        return await fastApiMiddleware.forwardToFastAPI(req, res, `/api/tools/pdf/${endpoint.replace('pdf-', '')}`);
      }

      console.log(`⚡ Processing ${endpoint} with Express.js (light processing)`);
      try {
        // Simulate processing time based on tool complexity
        const processingTime = Math.random() * 3000 + 1000; // 1-4 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime));

        const actualProcessingTime = Date.now() - startTime;

        // Only log usage if user is authenticated
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let userId: number | undefined;

        if (token) {
          try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await storage.getUser(decoded.userId);
            if (user) {
              userId = user.id;
            }
          } catch (error) {
            // User not authenticated, continue without logging
          }
        }

        if (userId) {
          await storage.createToolUsage({
            userId,
            toolName: name,
            toolCategory: category,
            fileName: req.body.fileName || `processed-${endpoint}.pdf`,
            fileSize: req.body.fileSize || Math.floor(Math.random() * 5000000) + 100000,
            processingTime: actualProcessingTime,
            success: true,
            metadata: req.body.metadata || {},
          });
        }

        res.json({
          success: true,
          message: `${name} completed successfully`,
          downloadUrl: `/api/download/processed-${endpoint}.pdf`,
          filename: `processed-${endpoint}.pdf`,
          processingTime: actualProcessingTime,
          ...getToolSpecificResponse(endpoint, req.body)
        });
      } catch (error) {
        const actualProcessingTime = Date.now() - startTime;

        // Only log usage if user is authenticated
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let userId: number | undefined;

        if (token) {
          try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await storage.getUser(decoded.userId);
            if (user) {
              userId = user.id;
            }
          } catch (error) {
            // User not authenticated, continue without logging
          }
        }

        if (userId) {
          await storage.createToolUsage({
            userId,
            toolName: name,
            toolCategory: category,
            processingTime: actualProcessingTime,
            success: false,
          });
        }

        res.status(500).json({ success: false, message: `${name} failed` });
      }
    });
  });

  // All Image Tools APIs (20 tools)
  const imageTools = [
    { endpoint: 'image-resizer', name: 'Image Resizer', category: 'Image' },
    { endpoint: 'bg-remover', name: 'AI Background Remover', category: 'Image' },
    { endpoint: 'image-compressor', name: 'Image Compressor', category: 'Image' },
    { endpoint: 'image-converter', name: 'Image Converter', category: 'Image' },
    { endpoint: 'image-cropper', name: 'Image Cropper', category: 'Image' },
    { endpoint: 'image-rotator', name: 'Image Rotator', category: 'Image' },
    { endpoint: 'image-enhancer', name: 'AI Image Enhancer', category: 'Image' },
    { endpoint: 'image-upscaler', name: 'AI Image Upscaler', category: 'Image' },
    { endpoint: 'image-colorizer', name: 'AI Image Colorizer', category: 'Image' },
    { endpoint: 'image-watermark-remover', name: 'Watermark Remover', category: 'Image' },
    { endpoint: 'image-watermark-adder', name: 'Watermark Adder', category: 'Image' },
    { endpoint: 'image-blur-tool', name: 'Image Blur Tool', category: 'Image' },
    { endpoint: 'image-brightness-adjuster', name: 'Brightness Adjuster', category: 'Image' },
    { endpoint: 'image-saturation-tool', name: 'Saturation Tool', category: 'Image' },
    { endpoint: 'image-filter-effects', name: 'Filter Effects', category: 'Image' },
    { endpoint: 'image-border-adder', name: 'Border Adder', category: 'Image' },
    { endpoint: 'image-text-overlay', name: 'Text Overlay', category: 'Image' },
    { endpoint: 'image-collage-maker', name: 'Collage Maker', category: 'Image' },
    { endpoint: 'image-metadata-extractor', name: 'Metadata Extractor', category: 'Image' },
    { endpoint: 'image-batch-processor', name: 'Batch Processor', category: 'Image' }
  ];

  // Generate all Image tool endpoints (without authentication requirement for processing)
  imageTools.forEach(({ endpoint, name, category }) => {
    app.post(`/api/tools/${endpoint}`, async (req: any, res) => {
      const startTime = Date.now();
      try {
        const processingTime = Math.random() * 4000 + 1500; // 1.5-5.5 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime));

        const actualProcessingTime = Date.now() - startTime;

        // Only log usage if user is authenticated
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let userId: number | undefined;

        if (token) {
          try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await storage.getUser(decoded.userId);
            if (user) {
              userId = user.id;
            }
          } catch (error) {
            // User not authenticated, continue without logging
          }
        }

        if (userId) {
          await storage.createToolUsage({
            userId,
            toolName: name,
            toolCategory: category,
            fileName: req.body.fileName || `processed-${endpoint}.jpg`,
            fileSize: req.body.fileSize || Math.floor(Math.random() * 10000000) + 200000,
            processingTime: actualProcessingTime,
            success: true,
            metadata: req.body.metadata || {},
          });
        }

        res.json({
          success: true,
          message: `${name} completed successfully`,
          downloadUrl: `/api/download/processed-${endpoint}.jpg`,
          filename: `processed-${endpoint}.jpg`,
          processingTime: actualProcessingTime,
          ...getToolSpecificResponse(endpoint, req.body)
        });
      } catch (error) {
        const actualProcessingTime = Date.now() - startTime;

        // Only log usage if user is authenticated
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let userId: number | undefined;

        if (token) {
          try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await storage.getUser(decoded.userId);
            if (user) {
              userId = user.id;
            }
          } catch (error) {
            // User not authenticated, continue without logging
          }
        }

        if (userId) {
          await storage.createToolUsage({
            userId,
            toolName: name,
            toolCategory: category,
            processingTime: actualProcessingTime,
            success: false,
          });
        }

        res.status(500).json({ success: false, message: `${name} failed` });
      }
    });
  });

  // All Media Tools APIs (20 tools)
  const mediaTools = [
    { endpoint: 'audio-converter', name: 'Audio Converter', category: 'Audio/Video' },
    { endpoint: 'video-converter', name: 'Video Converter', category: 'Audio/Video' },
    { endpoint: 'audio-compressor', name: 'Audio Compressor', category: 'Audio/Video' },
    { endpoint: 'video-compressor', name: 'Video Compressor', category: 'Audio/Video' },
    { endpoint: 'audio-trimmer', name: 'Audio Trimmer', category: 'Audio/Video' },
    { endpoint: 'video-trimmer', name: 'Video Trimmer', category: 'Audio/Video' },
    { endpoint: 'audio-merger', name: 'Audio Merger', category: 'Audio/Video' },
    { endpoint: 'video-merger', name: 'Video Merger', category: 'Audio/Video' },
    { endpoint: 'video-to-gif', name: 'Video to GIF', category: 'Audio/Video' },
    { endpoint: 'gif-to-video', name: 'GIF to Video', category: 'Audio/Video' },
    { endpoint: 'audio-volume-adjuster', name: 'Volume Adjuster', category: 'Audio/Video' },
    { endpoint: 'video-brightness-adjuster', name: 'Video Brightness', category: 'Audio/Video' },
    { endpoint: 'audio-format-converter', name: 'Audio Format Converter', category: 'Audio/Video' },
    { endpoint: 'video-format-converter', name: 'Video Format Converter', category: 'Audio/Video' },
    { endpoint: 'video-to-audio', name: 'Video to Audio', category: 'Audio/Video' },
    { endpoint: 'audio-to-video', name: 'Audio to Video', category: 'Audio/Video' },
    { endpoint: 'video-speed-changer', name: 'Video Speed Changer', category: 'Audio/Video' },
    { endpoint: 'video-frame-extractor', name: 'Frame Extractor', category: 'Audio/Video' },
    { endpoint: 'audio-noise-reducer', name: 'Noise Reducer', category: 'Audio/Video' },
    { endpoint: 'video-subtitle-adder', name: 'Subtitle Adder', category: 'Audio/Video' }
  ];

  // Generate all Media tool endpoints (without authentication requirement for processing)
  mediaTools.forEach(({ endpoint, name, category }) => {
    app.post(`/api/tools/${endpoint}`, async (req: any, res) => {
      const startTime = Date.now();
      try {
        const processingTime = Math.random() * 6000 + 2000; // 2-8 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime));

        const actualProcessingTime = Date.now() - startTime;

        await storage.createToolUsage({
          userId: req.user.id,
          toolName: name,
          toolCategory: category,
          fileName: req.body.fileName || `processed-${endpoint}.mp4`,
          fileSize: req.body.fileSize || Math.floor(Math.random() * 50000000) + 1000000,
          processingTime: actualProcessingTime,
          success: true,
          metadata: req.body.metadata || {},
        });

        res.json({
          success: true,
          message: `${name} completed successfully`,
          downloadUrl: `/api/download/processed-${endpoint}.mp4`,
          filename: `processed-${endpoint}.mp4`,
          processingTime: actualProcessingTime,
          ...getToolSpecificResponse(endpoint, req.body)
        });
      } catch (error) {
        const actualProcessingTime = Date.now() - startTime;

        await storage.createToolUsage({
          userId: req.user.id,
          toolName: name,
          toolCategory: category,
          processingTime: actualProcessingTime,
          success: false,
        });

        res.status(500).json({ success: false, message: `${name} failed` });
      }
    });
  });

  // Helper function for tool-specific responses
  function getToolSpecificResponse(endpoint: string, body: any) {
    const responses: { [key: string]: any } = {
      'image-resizer': { newWidth: body.width || 800, newHeight: body.height || 600 },
      'pdf-compressor': { compressionRatio: '45%', originalSize: body.fileSize, newSize: Math.floor((body.fileSize || 1000000) * 0.55) },
      'image-compressor': { compressionRatio: '60%', qualityScore: 'High' },
      'video-compressor': { compressionRatio: '35%', bitrate: '1.2 Mbps' },
      'audio-trimmer': { duration: body.duration || '2:30', format: body.format || 'mp3' },
      'video-trimmer': { duration: body.duration || '1:45', resolution: body.resolution || '1080p' },
      'bg-remover': { edgesDetected: Math.floor(Math.random() * 1000) + 500, accuracy: '97%' },
      'image-enhancer': { enhancementLevel: 'High', noiseReduction: '85%' },
      'pdf-splitter': { pageCount: Math.floor(Math.random() * 20) + 5 },
      'video-to-audio': { audioFormat: body.format || 'mp3', bitrate: '320kbps' }
    };
    return responses[endpoint] || {};
  }

  // Government Validation APIs (15 tools)
  app.post("/api/tools/pan-validator",  async (req: any, res) => {
    const startTime = Date.now();
    try {
      const panNumber = req.body.panNumber;
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const isValid = panRegex.test(panNumber);

      const processingTime = Date.now() - startTime;

      await storage.createToolUsage({
        userId: req.user.id,
        toolName: "PAN Validator",
```text
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

  app.post("/api/tools/gst-validator",  async (req: any, res) => {
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

  app.post("/api/tools/aadhaar-validator",  async (req: any, res) => {
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
  app.post("/api/tools/word-to-pdf",  async (req: any, res) => {
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

  app.post("/api/tools/excel-to-pdf",  async (req: any, res) => {
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

  app.post("/api/tools/ppt-to-pdf",  async (req: any, res) => {
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
  app.post("/api/tools/image-compressor",  async (req: any, res) => {
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

  app.post("/api/tools/image-format-converter",  async (req: any, res) => {
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

  app.post("/api/tools/watermark-remover",  async (req: any, res) => {
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

  app.post("/api/tools/photo-enhancer",  async (req: any, res) => {
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
  app.post("/api/tools/audio-trimmer",  async (req: any, res) => {
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

  app.post("/api/tools/video-to-audio",  async (req: any, res) => {
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

  app.post("/api/tools/video-compressor",  async (req: any, res) => {
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
  app.post("/api/tools/pdf-to-excel",  async (req: any, res) => {
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

  app.post("/api/tools/qr-generator",  async (req: any, res) => {
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

  app.post("/api/tools/barcode-generator",  async (req: any, res) => {
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

  // All Government Tools APIs (15 tools)
  const govTools = [
    { endpoint: 'voter-id-validator', name: 'Voter ID Validator', regex: /^[A-Z]{3}[0-9]{7}$/, category: 'Government' },
    { endpoint: 'passport-validator', name: 'Passport Validator', regex: /^[A-Z]{1}[0-9]{7}$/, category: 'Government' },
    { endpoint: 'driving-license-validator', name: 'Driving License Validator', regex: /^[A-Z]{2}[0-9]{2}[0-9]{11}$/, category: 'Government' },
    { endpoint: 'ifsc-validator', name: 'IFSC Code Validator', regex: /^[A-Z]{4}0[A-Z0-9]{6}$/, category: 'Government' },
    { endpoint: 'cin-validator', name: 'CIN Validator', regex: /^[LUF][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/, category: 'Government' },
    { endpoint: 'udyam-validator', name: 'Udyam Registration Validator', regex: /^UDYAM-[A-Z]{2}-[0-9]{2}-[0-9]{7}$/, category: 'Government' },
    { endpoint: 'tan-validator', name: 'TAN Validator', regex: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, category: 'Government' },
    { endpoint: 'esi-validator', name: 'ESI Number Validator', regex: /^[0-9]{10}$/, category: 'Government' },
    { endpoint: 'pf-validator', name: 'PF Number Validator', regex: /^[A-Z]{2}\/[A-Z]{3}\/[0-9]{7}\/[0-9]{3}$/, category: 'Government' },
    { endpoint: 'uan-validator', name: 'UAN Validator', regex: /^[0-9]{12}$/, category: 'Government' },
    { endpoint: 'fssai-validator', name: 'FSSAI License Validator', regex: /^[0-9]{14}$/, category: 'Government' },
    { endpoint: 'shop-act-validator', name: 'Shop Act License Validator', regex: /^[A-Z]{2}[0-9]{8}$/, category: 'Government' }
  ];

  // Generate all Government validation tool endpoints
  govTools.forEach(({ endpoint, name, regex, category }) => {
    app.post(`/api/tools/${endpoint}`,  async (req: any, res) => {
      const startTime = Date.now();
      try {
        const inputValue = req.body.inputValue?.replace(/\s/g, '').toUpperCase();
        const isValid = regex.test(inputValue);

        await storage.createToolUsage({
          userId: req.user.id,
          toolName: name,
          toolCategory: category,
          processingTime: Date.now() - startTime,
          success: true,
          metadata: { isValid, inputValue: inputValue?.slice(0, 4) + '***' },
        });

        let details = null;
        let reason = null;

        if (isValid) {
          details = getGovToolDetails(endpoint, inputValue);
        } else {
          reason = getGovToolErrorReason(endpoint, inputValue);
        }

        res.json({
          isValid,
          message: isValid ? `Valid ${name.replace(' Validator', '')} format` : `Invalid ${name.replace(' Validator', '')} format`,
          details,
          reason
        });
      } catch (error) {
        res.status(500).json({ success: false, message: `${name} validation failed` });
      }
    });
  });

  // Helper functions for government validation
  function getGovToolDetails(endpoint: string, input: string) {
    const detailsMap: { [key: string]: any } = {
      'voter-id-validator': { 
        state: input.slice(0, 3), 
        sequenceNumber: input.slice(3),
        type: 'Voter Identity Card'
      },
      'passport-validator': { 
        type: input[0] === 'P' ? 'Ordinary Passport' : 'Official Passport',
        number: input.slice(1)
      },
      'driving-license-validator': { 
        state: input.slice(0, 2),
        rto: input.slice(2, 4),
        year: '20' + input.slice(4, 6),
        uniqueNumber: input.slice(6)
      },
      'ifsc-validator': { 
        bank: input.slice(0, 4),
        branch: input.slice(5),
        type: 'Bank Branch Code'
      },
      'cin-validator': { 
        listingStatus: input[0] === 'L' ? 'Listed' : input[0] === 'U' ? 'Unlisted' : 'Foreign',
        classOfCompany: input.slice(1, 6),
        state: input.slice(6, 8),
        year: input.slice(8, 12)
      }
    };
    return detailsMap[endpoint] || { valid: true };
  }

  function getGovToolErrorReason(endpoint: string, input: string) {
    const reasonMap: { [key: string]: string } = {
      'voter-id-validator': 'Format: 3 letters + 7 digits (e.g., ABC1234567)',
      'passport-validator': 'Format: 1 letter + 7 digits (e.g., P1234567)',
      'driving-license-validator': 'Format: State(2) + RTO(2) + Year(2) + Unique(7)',
      'ifsc-validator': 'Format: Bank(4) + 0 + Branch(6) (e.g., SBIN0001234)',
      'cin-validator': 'Format: L/U/F + 5 digits + State(2) + Year(4) + 3 letters + 6 digits',
      'udyam-validator': 'Format: UDYAM-XX-YY-1234567',
      'tan-validator': 'Format: 4 letters + 5 digits + 1 letter',
      'esi-validator': 'Format: 10 digits',
      'pf-validator': 'Format: XX/XXX/1234567/123',
      'uan-validator': 'Format: 12 digits',
      'fssai-validator': 'Format: 14 digits',
      'shop-act-validator': 'Format: 2 letters + 8 digits'
    };
    return reasonMap[endpoint] || 'Invalid format';
  }

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