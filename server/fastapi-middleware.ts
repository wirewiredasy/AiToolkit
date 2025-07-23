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
  private static instance: FastAPIMiddleware;
  private fastApiAvailable = false;

  private constructor() {
    this.checkFastAPIService();
    // Refresh status every 30 seconds
    setInterval(() => this.refreshStatus(), 30000);
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
    if (!this.fastApiAvailable) {
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

      const data = await response.json();
      
      if (response.ok) {
        res.json(data);
      } else {
        res.status(response.status).json(data);
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
    return this.fastApiAvailable;
  }

  public async refreshStatus(): Promise<void> {
    await this.checkFastAPIService();
  }
}

export const fastApiMiddleware = FastAPIMiddleware.getInstance();