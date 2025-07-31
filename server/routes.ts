import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { storage } from './storage';
import { insertUserSchema, insertToolUsageSchema, insertUserFileSchema } from '@shared/schema';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware for authentication
const authenticateToken = (req: any, res: any, next: any) => {
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

// User registration
router.post('/auth/register', async (req, res) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data' });
  }
});

// User login
router.post('/auth/login', async (req, res) => {
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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/auth/me', authenticateToken, async (req: any, res) => {
  try {
    const user = await storage.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Create tool usage record
router.post('/tool-usage', authenticateToken, async (req: any, res) => {
  try {
    const usageData = insertToolUsageSchema.parse({
      ...req.body,
      userId: req.user.userId,
    });

    const usage = await storage.createToolUsage(usageData);
    res.json(usage);
  } catch (error) {
    res.status(400).json({ error: 'Invalid usage data' });
  }
});

// Get user's tool usage
router.get('/tool-usage', authenticateToken, async (req: any, res) => {
  try {
    const usages = await storage.getToolUsageByUserId(req.user.userId);
    res.json(usages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tool usage' });
  }
});

// Get tool usage statistics
router.get('/tool-usage/stats', async (req, res) => {
  try {
    const stats = await storage.getToolUsageStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// File upload and processing endpoints
router.post('/files/upload', authenticateToken, async (req: any, res) => {
  try {
    // Simulate file processing
    const fileData = {
      userId: req.user.userId,
      originalName: req.body.fileName || 'processed-file.pdf',
      storedName: `${Date.now()}-${req.body.fileName || 'file'}`,
      filePath: `/static/${Date.now()}-processed.pdf`,
      fileSize: req.body.fileSize || 1024,
      mimeType: req.body.mimeType || 'application/pdf',
      toolUsageId: req.body.toolUsageId || null,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    };

    const file = await storage.createUserFile(fileData);
    res.json(file);
  } catch (error) {
    res.status(400).json({ error: 'File upload failed' });
  }
});

// Get user files
router.get('/files', authenticateToken, async (req: any, res) => {
  try {
    const files = await storage.getUserFilesByUserId(req.user.userId);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Tool processing endpoints - these would connect to actual processing services
router.post('/tools/:toolName/process', authenticateToken, async (req: any, res) => {
  try {
    const { toolName } = req.params;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create tool usage record
    const usage = await storage.createToolUsage({
      userId: req.user.userId,
      toolName,
      toolCategory: req.body.category || 'general',
      fileName: req.body.fileName,
      fileSize: req.body.fileSize,
      processingTime: 2000,
      success: true,
      metadata: req.body.metadata || {},
    });

    // Return processing result
    res.json({
      success: true,
      message: `${toolName} processing completed`,
      downloadUrl: `/static/processed-${Date.now()}.pdf`,
      usage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

export default router;