import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Extend Express Request type to include session
declare module 'express-serve-static-core' {
  interface Request {
    session?: any;
  }
}

// Input sanitization and validation middleware
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  // Basic XSS protection - sanitize string inputs
  const sanitizeString = (str: string): string => {
    return str
      .replace(/[<>'"]/g, (match) => {
        const escapes: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;'
        };
        return escapes[match] || match;
      })
      .trim();
  };

  // Recursively sanitize object properties
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value);
      }
      return sanitized;
    }
    return obj;
  };

  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  next();
}

// File upload validation
export const fileUploadSchema = z.object({
  originalname: z.string().max(255),
  mimetype: z.string().regex(/^[a-zA-Z0-9\-\/]+$/),
  size: z.number().max(50 * 1024 * 1024), // 50MB limit
});

// Validate file uploads
export function validateFileUpload(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    try {
      fileUploadSchema.parse(req.file);
      
      // Additional security checks
      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv'
      ];

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ 
          error: 'Invalid file type',
          details: 'File type not supported for processing'
        });
      }

      // Check for suspicious file extensions
      const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js'];
      const hassuspicious = suspiciousExtensions.some(ext => 
        req.file!.originalname.toLowerCase().endsWith(ext)
      );

      if (hassuspicious) {
        return res.status(400).json({ 
          error: 'Invalid file',
          details: 'Executable files are not allowed'
        });
      }

    } catch (error) {
      return res.status(400).json({ 
        error: 'Invalid file upload',
        details: 'File validation failed'
      });
    }
  }

  next();
}

// Rate limiting per user (in addition to IP-based)
const userRequestCounts = new Map<string, { count: number; resetTime: number }>();

export function userRateLimit(maxRequests: number = 50, windowMs: number = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.headers['x-user-id'] as string) || req.ip || 'unknown';
    const now = Date.now();
    
    const userLimit = userRequestCounts.get(userId);
    
    if (!userLimit || now > userLimit.resetTime) {
      userRequestCounts.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (userLimit.count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        details: 'User rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
      });
    }
    
    userLimit.count++;
    next();
  };
}

// CSRF protection for state-changing operations
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const token = req.headers['x-csrf-token'] as string;
    const sessionToken = req.session?.csrfToken;
    
    if (!token || !sessionToken || token !== sessionToken) {
      return res.status(403).json({
        error: 'CSRF token validation failed',
        details: 'Invalid or missing CSRF token'
      });
    }
  }
  
  next();
}