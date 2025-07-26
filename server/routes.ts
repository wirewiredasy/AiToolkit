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
import { SitemapRobotsGenerator } from "./sitemap-generator";
import { AutoUpdater } from "./auto-updater";
import { FileProcessor } from "./file-processors";
import { EnhancedFileProcessor } from "./enhanced-processors";
import { RealFileProcessor } from "./real-file-processor";
import multer from "multer";
import path from "path";
import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(64).toString('hex');

// Authentication middleware
function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true });
  }
  if (!fs.existsSync('./uploads/processed')) {
    fs.mkdirSync('./uploads/processed', { recursive: true });
  }

  // Initialize auto-updater
  try {
    const autoUpdater = new AutoUpdater();
    if (autoUpdater.startWatching) {
      autoUpdater.startWatching();
    }
  } catch (error) {
    console.log('Auto-updater initialization skipped');
  }

  // Initialize sitemap generator
  const sitemapGenerator = new SitemapRobotsGenerator();
  sitemapGenerator.generateAllFiles();

  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, name } = signupSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        name,
      });

      const token = jwt.sign({ userId: Number(user.id), email: user.email }, JWT_SECRET);
      
      res.json({ 
        message: "User created successfully", 
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: Number(user.id), email: user.email }, JWT_SECRET);
      
      res.json({ 
        message: "Login successful", 
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // Real file processing for all tools
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
    { endpoint: 'pdf-crop', name: 'PDF Crop', category: 'PDF' },
    { endpoint: 'pdf-watermark', name: 'PDF Watermark', category: 'PDF' },
    { endpoint: 'pdf-page-extractor', name: 'PDF Page Extractor', category: 'PDF' },
    { endpoint: 'pdf-page-numberer', name: 'PDF Page Numberer', category: 'PDF' },
    { endpoint: 'pdf-bookmarks', name: 'PDF Bookmarks', category: 'PDF' },
    { endpoint: 'pdf-form-filler', name: 'PDF Form Filler', category: 'PDF' },
    { endpoint: 'pdf-metadata-editor', name: 'PDF Metadata Editor', category: 'PDF' },
    { endpoint: 'pdf-repair', name: 'PDF Repair', category: 'PDF' },
    { endpoint: 'pdf-organizer', name: 'PDF Organizer', category: 'PDF' },
    { endpoint: 'pdf-flattener', name: 'PDF Flattener', category: 'PDF' },
    { endpoint: 'pdf-optimizer', name: 'PDF Optimizer', category: 'PDF' },

    // Image Tools
    { endpoint: 'image-resizer', name: 'Image Resizer', category: 'Image' },
    { endpoint: 'bg-remover', name: 'Background Remover', category: 'Image' },
    { endpoint: 'image-compressor', name: 'Image Compressor', category: 'Image' },
    { endpoint: 'image-converter', name: 'Image Converter', category: 'Image' },
    { endpoint: 'image-flipper', name: 'Image Flipper', category: 'Image' },
    { endpoint: 'image-rotator', name: 'Image Rotator', category: 'Image' },
    { endpoint: 'image-cropper', name: 'Image Cropper', category: 'Image' },
    { endpoint: 'image-filter', name: 'Image Filter', category: 'Image' },
    { endpoint: 'image-blur', name: 'Image Blur', category: 'Image' },
    { endpoint: 'image-sharpen', name: 'Image Sharpen', category: 'Image' },
    { endpoint: 'image-brightness', name: 'Image Brightness', category: 'Image' },
    { endpoint: 'image-contrast', name: 'Image Contrast', category: 'Image' },
    { endpoint: 'image-saturation', name: 'Image Saturation', category: 'Image' },
    { endpoint: 'image-watermark', name: 'Image Watermark', category: 'Image' },
    { endpoint: 'image-border', name: 'Image Border', category: 'Image' },
    { endpoint: 'image-frames', name: 'Image Frames', category: 'Image' },
    { endpoint: 'meme-generator', name: 'Meme Generator', category: 'Image' },
    { endpoint: 'image-collage', name: 'Image Collage', category: 'Image' },
    { endpoint: 'image-metadata-extractor', name: 'Image Metadata Extractor', category: 'Image' },
    { endpoint: 'image-optimizer', name: 'Image Optimizer', category: 'Image' },

    // Audio/Video Tools
    { endpoint: 'audio-converter', name: 'Audio Converter', category: 'Audio/Video' },
    { endpoint: 'video-converter', name: 'Video Converter', category: 'Audio/Video' },
    { endpoint: 'audio-trimmer', name: 'Audio Trimmer', category: 'Audio/Video' },
    { endpoint: 'video-trimmer', name: 'Video Trimmer', category: 'Audio/Video' },
    { endpoint: 'audio-extractor', name: 'Audio Extractor', category: 'Audio/Video' },
    { endpoint: 'video-extractor', name: 'Video Extractor', category: 'Audio/Video' },
    { endpoint: 'audio-merger', name: 'Audio Merger', category: 'Audio/Video' },
    { endpoint: 'video-merger', name: 'Video Merger', category: 'Audio/Video' },
    { endpoint: 'volume-changer', name: 'Volume Changer', category: 'Audio/Video' },
    { endpoint: 'speed-changer', name: 'Speed Changer', category: 'Audio/Video' },
    { endpoint: 'pitch-changer', name: 'Pitch Changer', category: 'Audio/Video' },
    { endpoint: 'audio-reverser', name: 'Audio Reverser', category: 'Audio/Video' },
    { endpoint: 'video-reverser', name: 'Video Reverser', category: 'Audio/Video' },
    { endpoint: 'noise-reducer', name: 'Noise Reducer', category: 'Audio/Video' },
    { endpoint: 'echo-remover', name: 'Echo Remover', category: 'Audio/Video' },
    { endpoint: 'audio-normalizer', name: 'Audio Normalizer', category: 'Audio/Video' },
    { endpoint: 'video-resizer', name: 'Video Resizer', category: 'Audio/Video' },
    { endpoint: 'video-cropper', name: 'Video Cropper', category: 'Audio/Video' },
    { endpoint: 'subtitle-extractor', name: 'Subtitle Extractor', category: 'Audio/Video' },
    { endpoint: 'gif-maker', name: 'GIF Maker', category: 'Audio/Video' },

    // Government Tools
    { endpoint: 'pan-validator', name: 'PAN Validator', category: 'Government' },
    { endpoint: 'gst-validator', name: 'GST Validator', category: 'Government' },
    { endpoint: 'aadhaar-validator', name: 'Aadhaar Validator', category: 'Government' },
    { endpoint: 'aadhaar-masker', name: 'Aadhaar Masker', category: 'Government' },
    { endpoint: 'pan-masker', name: 'PAN Masker', category: 'Government' },
    { endpoint: 'bank-validator', name: 'Bank Validator', category: 'Government' },
    { endpoint: 'ifsc-validator', name: 'IFSC Validator', category: 'Government' },
    { endpoint: 'pincode-validator', name: 'Pincode Validator', category: 'Government' },
    { endpoint: 'voter-id-validator', name: 'Voter ID Validator', category: 'Government' },
    { endpoint: 'passport-validator', name: 'Passport Validator', category: 'Government' },
    { endpoint: 'driving-license-validator', name: 'Driving License Validator', category: 'Government' },
    { endpoint: 'income-certificate', name: 'Income Certificate', category: 'Government' },
    { endpoint: 'caste-certificate', name: 'Caste Certificate', category: 'Government' },
    { endpoint: 'domicile-certificate', name: 'Domicile Certificate', category: 'Government' },
    { endpoint: 'character-certificate', name: 'Character Certificate', category: 'Government' },

    // Developer Tools
    { endpoint: 'json-formatter', name: 'JSON Formatter', category: 'Developer' },
    { endpoint: 'base64-encoder', name: 'Base64 Encoder', category: 'Developer' },
    { endpoint: 'hash-generator', name: 'Hash Generator', category: 'Developer' },
    { endpoint: 'password-generator', name: 'Password Generator', category: 'Developer' },
    { endpoint: 'qr-generator', name: 'QR Generator', category: 'Developer' },
    { endpoint: 'color-picker', name: 'Color Picker', category: 'Developer' },
    { endpoint: 'lorem-ipsum', name: 'Lorem Ipsum', category: 'Developer' },
    { endpoint: 'url-encoder', name: 'URL Encoder', category: 'Developer' },
    { endpoint: 'timestamp-converter', name: 'Timestamp Converter', category: 'Developer' },
    { endpoint: 'regex-tester', name: 'Regex Tester', category: 'Developer' },
    { endpoint: 'markdown-to-html', name: 'Markdown to HTML', category: 'Developer' },
    { endpoint: 'css-minifier', name: 'CSS Minifier', category: 'Developer' },
    { endpoint: 'js-minifier', name: 'JS Minifier', category: 'Developer' }
  ];

  // Create individual endpoints for all tools with real processing
  allToolEndpoints.forEach(({ endpoint, name, category }) => {
    app.post(`/api/tools/${endpoint}`, upload.any(), async (req: any, res) => {
      const startTime = Date.now();
      
      try {
        // Extract files and settings - handle both JSON and form data
        const files = req.files || [];
        let metadata = {};
        let inputValue = '';
        
        // Handle different content types
        if (req.body) {
          metadata = req.body.metadata || req.body || {};
          inputValue = req.body.inputValue || req.body.text || req.body.content || '';
          
          // If metadata is a string, try to parse it
          if (typeof metadata === 'string') {
            try {
              metadata = JSON.parse(metadata);
            } catch (e) {
              // If parsing fails, treat as plain object
              metadata = { text: metadata };
            }
          }
        }
        
        // Create output directory
        const outputDir = './uploads/processed';
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Generate output file with correct extension
        const getFileExtension = (cat: string, toolEndpoint: string) => {
          switch (cat) {
            case 'PDF': return 'pdf';
            case 'Image': 
              if (toolEndpoint === 'bg-remover' || toolEndpoint.includes('remover')) return 'png';
              return 'png';
            case 'Audio/Video': 
              if (toolEndpoint.includes('audio')) return 'mp3';
              return 'mp4';
            case 'Government': return 'pdf';
            case 'Developer': 
              if (toolEndpoint.includes('json')) return 'json';
              if (toolEndpoint.includes('html')) return 'html';
              return 'txt';
            default: return 'txt';
          }
        };

        const fileExtension = getFileExtension(category, endpoint);
        const outputFilename = `processed-${endpoint}.${fileExtension}`;
        const outputPath = path.join(outputDir, outputFilename);

        // Process file using Real File Processor - generates actual downloadable files
        const processingResult = await RealFileProcessor.processFile(endpoint, category, files, {
          text: inputValue,
          content: inputValue,
          ...metadata
        });
        
        // Ensure we write binary data properly with binary flag
        fs.writeFileSync(outputPath, processingResult, { flag: 'w', encoding: null });


        // Simulate realistic processing time
        let processingTime = 1000;
        switch (category) {
          case 'PDF': processingTime = Math.floor(Math.random() * 3000) + 1500; break;
          case 'Image': processingTime = Math.floor(Math.random() * 2000) + 1000; break;
          case 'Audio/Video': processingTime = Math.floor(Math.random() * 5000) + 2000; break;
          case 'Government': processingTime = Math.floor(Math.random() * 1500) + 500; break;
          case 'Developer': processingTime = Math.floor(Math.random() * 1000) + 300; break;
        }
        
        await new Promise(resolve => setTimeout(resolve, processingTime));
        const actualProcessingTime = Date.now() - startTime;

        res.json({
          success: true,
          message: `${name} completed successfully`,
          downloadUrl: `/api/download/${outputFilename}`,
          filename: outputFilename,
          processingTime: actualProcessingTime,
          toolId: endpoint,
          metadata: {
            processed: true,
            timestamp: new Date().toISOString(),
            category: category,
            toolName: name,
            ...metadata
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



  // Enhanced download endpoint - Fixed for proper binary file streaming
  app.get('/api/download/:filename', async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join('./uploads/processed', filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File not found' });
      }

      // Get file stats for proper Content-Length
      const stats = fs.statSync(filePath);
      
      // Set appropriate headers for download
      const ext = path.extname(filename).toLowerCase();
      const mimeTypes: Record<string, string> = {
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',  
        '.jpeg': 'image/jpeg',
        '.mp3': 'audio/mpeg',
        '.mp4': 'video/mp4',
        '.json': 'application/json',
        '.html': 'text/html',
        '.txt': 'text/plain',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      };

      const mimeType = mimeTypes[ext] || 'application/octet-stream';
      
      // Set headers for proper binary download
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', stats.size.toString());
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      // Read file as binary buffer and send directly
      const fileBuffer = fs.readFileSync(filePath);
      res.end(fileBuffer, 'binary');
      
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ success: false, message: 'Download failed' });
    }
  });

  return httpServer;
}