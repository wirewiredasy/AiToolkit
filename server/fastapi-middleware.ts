import { Request, Response } from 'express';

// FastAPI service configuration
const FASTAPI_PORT = 8000;
const FASTAPI_URL = `http://localhost:${FASTAPI_PORT}`;

// Heavy processing tools that should use FastAPI
const HEAVY_PROCESSING_TOOLS = [
  'pdf-merger', 'pdf-splitter', 'pdf-compressor',
  'video-converter', 'video-compressor', 'audio-converter',
  'image-upscaler', 'bg-remover', 'image-enhancer'
];

// File size threshold for FastAPI routing (10MB)
const HEAVY_PROCESSING_THRESHOLD = 10 * 1024 * 1024;

export class FastAPIMiddleware {
  private baseUrl = 'http://localhost:8000';
  private isAvailable = false;
  private lastCheck = 0;
  private checkInterval = 30000; // 30 seconds

  constructor() {
    this.checkAvailability();
    // Check availability periodically
    setInterval(() => this.checkAvailability(), this.checkInterval);
  }

  private async checkAvailability() {
    const now = Date.now();
    if (now - this.lastCheck < 5000) return; // Don't check too frequently

    this.lastCheck = now;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const response = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        this.isAvailable = data.status === 'healthy';
        if (this.isAvailable && now - this.lastCheck > 30000) {
          console.log('✅ FastAPI service connected successfully');  
        }
      } else {
        this.isAvailable = false;
      }
    } catch (error) {
      this.isAvailable = false;
      if (now - this.lastCheck > 60000) { // Only log every minute
        console.log('⚠️ FastAPI service not available, using Express.js for all processing');
      }
    }
  }

  public static getInstance(): FastAPIMiddleware {
    if (!FastAPIMiddleware.instance) {
      FastAPIMiddleware.instance = new FastAPIMiddleware();
    }
    return FastAPIMiddleware.instance;
  }

  private async checkFastAPIService(): Promise<void> {
    try {
      const response = await fetch(`${FASTAPI_URL}/health`);
      this.fastApiAvailable = response.ok;
      console.log(`FastAPI service ${this.fastApiAvailable ? 'available' : 'unavailable'} on port ${FASTAPI_PORT}`);
    } catch (error: any) {
      this.fastApiAvailable = false;
      console.log('FastAPI service not available, using Express.js for all processing');
    }
  }

  public shouldUseFastAPI(toolName: string, fileSize?: number): boolean {
    if (!this.isAvailable) {
      return false;
    }

    // Check if tool is in heavy processing list
    const isHeavyTool = HEAVY_PROCESSING_TOOLS.some(tool => toolName.includes(tool));

    // Check file size threshold
    const isLargeFile = fileSize ? fileSize > HEAVY_PROCESSING_THRESHOLD : false;

    return isHeavyTool || isLargeFile;
  }

  public async forwardToFastAPI(req: Request, res: Response, toolPath: string): Promise<void> {
    try {
      const response = await fetch(`${FASTAPI_URL}${toolPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization || '',
        },
        body: JSON.stringify(req.body),
      });

      // Check if this is a download request
      if (toolPath.includes('/download/')) {
        // Handle binary file download
        if (response.ok) {
          const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
          const contentDisposition = response.headers.get('Content-Disposition');
          
          res.setHeader('Content-Type', contentType);
          if (contentDisposition) {
            res.setHeader('Content-Disposition', contentDisposition);
          }
          
          const buffer = await response.arrayBuffer();
          res.send(Buffer.from(buffer));
        } else {
          res.status(response.status).json({ error: 'File not found' });
        }
      } else {
        // Handle JSON response for processing requests
        const data = await response.json();

        if (response.ok) {
          res.json(data);
        } else {
          res.status(response.status).json(data);
        }
      }
    } catch (error: any) {
      console.error('FastAPI service error:', error);
      // Fallback to Express.js processing
      res.status(503).json({
        success: false,
        message: 'Heavy processing service temporarily unavailable, please try again',
        fallback: true
      });
    }
  }

  public isAvailable(): boolean {
    return this.isAvailable;
  }

  public async refreshStatus(): Promise<void> {
    await this.checkAvailability();
  }
}

export const fastApiMiddleware = FastAPIMiddleware.getInstance();