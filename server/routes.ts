import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { storage } from './storage';
import { loginSchema, signupSchema, insertToolUsageSchema } from '@shared/schema';
import { z } from 'zod';

const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Multer configuration for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Extended Request interface
interface AuthenticatedRequest extends Request {
  user?: { userId: number; email: string };
}

// Auth middleware
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to validate request body
const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

// Auth routes
router.post('/auth/signup', validateBody(loginSchema.extend({ name: z.string().min(2) })), async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/auth/login', validateBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User routes
router.get('/user/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await storage.getUserById(req.user!.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Tool usage routes
router.post('/tools/usage', authenticateToken, validateBody(z.object({ toolName: z.string(), toolCategory: z.string(), fileName: z.string().optional(), fileSize: z.number().optional(), processingTime: z.number().optional(), success: z.boolean(), metadata: z.any().optional() })), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const toolUsage = await storage.createToolUsage({
      ...req.body,
      userId: req.user!.userId,
    });
    
    res.json(toolUsage);
  } catch (error) {
    console.error('Tool usage error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tools/usage', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const usage = await storage.getToolUsageByUserId(req.user!.userId);
    res.json(usage);
  } catch (error) {
    console.error('Get tool usage error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Tool processing routes (stub implementations)
router.post('/tools/pdf/:toolName', authenticateToken, upload.single('file'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toolName } = req.params;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create tool usage record
    await storage.createToolUsage({
      userId: req.user!.userId,
      toolName,
      toolCategory: 'pdf',
      fileName: file.originalname,
      fileSize: file.size,
      processingTime: 2000,
      success: true,
    });

    // Return a simple response (stub)
    res.json({
      success: true,
      filename: `processed_${file.originalname}`,
      downloadUrl: `/api/download/processed_${file.originalname}`,
    });
  } catch (error) {
    console.error('PDF tool error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tools/image/:toolName', authenticateToken, upload.single('file'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toolName } = req.params;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create tool usage record
    await storage.createToolUsage({
      userId: req.user!.userId,
      toolName,
      toolCategory: 'image',
      fileName: file.originalname,
      fileSize: file.size,
      processingTime: 1500,
      success: true,
    });

    // Return a simple response (stub)
    res.json({
      success: true,
      filename: `processed_${file.originalname}`,
      downloadUrl: `/api/download/processed_${file.originalname}`,
    });
  } catch (error) {
    console.error('Image tool error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tools/media/:toolName', authenticateToken, upload.single('file'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toolName } = req.params;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create tool usage record
    await storage.createToolUsage({
      userId: req.user!.userId,
      toolName,
      toolCategory: 'media',
      fileName: file.originalname,
      fileSize: file.size,
      processingTime: 3000,
      success: true,
    });

    // Return a simple response (stub)
    res.json({
      success: true,
      filename: `processed_${file.originalname}`,
      downloadUrl: `/api/download/processed_${file.originalname}`,
    });
  } catch (error) {
    console.error('Media tool error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tools/government/:toolName', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toolName } = req.params;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Create tool usage record
    await storage.createToolUsage({
      userId: req.user!.userId,
      toolName,
      toolCategory: 'government',
      fileName: null,
      fileSize: null,
      processingTime: 2500,
      success: true,
    });

    // Return a simple response (stub)
    res.json({
      success: true,
      result: `${toolName} processing completed`,
      data: { status: 'valid', details: 'Document validated successfully' },
    });
  } catch (error) {
    console.error('Government tool error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tools/developer/:toolName', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toolName } = req.params;
    const { input } = req.body;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create tool usage record
    await storage.createToolUsage({
      userId: req.user!.userId,
      toolName,
      toolCategory: 'developer',
      fileName: null,
      fileSize: null,
      processingTime: 1000,
      success: true,
    });

    // Return a simple response (stub)
    res.json({
      success: true,
      result: `${toolName} processing completed`,
      output: input ? `Processed: ${input}` : 'No input provided',
    });
  } catch (error) {
    console.error('Developer tool error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download route (stub)
router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  res.json({ 
    message: 'Download endpoint - would serve processed file',
    filename,
    note: 'This is a stub implementation' 
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;