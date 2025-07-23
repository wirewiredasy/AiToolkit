
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// FastAPI-style dependency injection
interface Dependency<T = any> {
  provide: () => Promise<T>;
}

class Depends<T> {
  constructor(private dependency: () => Promise<T>) {}
  
  async resolve(): Promise<T> {
    return await this.dependency();
  }
}

// Authentication dependency
export const getCurrentUser = (): Depends<any> => {
  return new Depends(async () => {
    // This will be injected by middleware
    return null;
  });
};

// File upload dependency
export const getUploadedFile = (): Depends<Express.Multer.File | null> => {
  return new Depends(async () => {
    return null;
  });
};

// FastAPI-style response models
export class HTTPException extends Error {
  constructor(
    public status_code: number,
    public detail: string,
    public headers?: Record<string, string>
  ) {
    super(detail);
    this.name = 'HTTPException';
  }
}

// Response wrapper
export const JSONResponse = (content: any, status_code: number = 200) => {
  return {
    status_code,
    content,
    headers: { 'Content-Type': 'application/json' }
  };
};

// Background tasks (FastAPI style)
export class BackgroundTasks {
  private tasks: (() => Promise<void>)[] = [];

  add_task(func: () => Promise<void>) {
    this.tasks.push(func);
  }

  async execute() {
    await Promise.all(this.tasks.map(task => task()));
  }
}

// File cleanup background task
export const cleanupTempFiles = async (filePath: string) => {
  setTimeout(async () => {
    try {
      await storage.deleteFile(filePath);
    } catch (error) {
      console.error('File cleanup failed:', error);
    }
  }, 3600000); // 1 hour
};

// Status code constants (FastAPI style)
export const status = {
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_403_FORBIDDEN: 403,
  HTTP_404_NOT_FOUND: 404,
  HTTP_422_UNPROCESSABLE_ENTITY: 422,
  HTTP_500_INTERNAL_SERVER_ERROR: 500
};

// Response models
export const SuccessResponse = z.object({
  success: z.boolean().default(true),
  message: z.string(),
  data: z.any().optional()
});

export const ErrorResponse = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  detail: z.string().optional()
});

export const ToolProcessResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  downloadUrl: z.string().optional(),
  filename: z.string().optional(),
  processingTime: z.number(),
  metadata: z.record(z.any()).optional()
});

// Validation decorator
export const validate = (schema: z.ZodSchema) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const [req, res] = args;
      
      try {
        req.body = schema.parse(req.body);
        return await method.apply(this, args);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(422).json({
            detail: error.errors.map(err => ({
              loc: err.path,
              msg: err.message,
              type: err.code
            }))
          });
        }
        throw error;
      }
    };
  };
};

// Rate limiting (FastAPI style)
export const rateLimit = (calls: number, period: number) => {
  const requests = new Map<string, number[]>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const userRequests = requests.get(key)!;
    const cutoff = now - period * 1000;
    
    // Remove old requests
    const recentRequests = userRequests.filter(time => time > cutoff);
    
    if (recentRequests.length >= calls) {
      return res.status(429).json({
        detail: `Rate limit exceeded: ${calls} calls per ${period} seconds`
      });
    }
    
    recentRequests.push(now);
    requests.set(key, recentRequests);
    
    next();
  };
};

export default {
  getCurrentUser,
  getUploadedFile,
  HTTPException,
  JSONResponse,
  BackgroundTasks,
  cleanupTempFiles,
  status,
  SuccessResponse,
  ErrorResponse,
  ToolProcessResponse,
  validate,
  rateLimit
};
