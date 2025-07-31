import { IncomingMessage, ServerResponse } from 'http';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export interface FileUpload {
  filename: string;
  mimetype: string;
  size: number;
  path: string;
}

export class UploadHandler {
  private uploadsDir: string;
  private maxFileSize: number;

  constructor(uploadsDir = 'static', maxFileSize = 50 * 1024 * 1024) {
    this.uploadsDir = uploadsDir;
    this.maxFileSize = maxFileSize;
    
    // Ensure upload directory exists
    if (!existsSync(this.uploadsDir)) {
      mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async handleUpload(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      if (req.method !== 'POST') {
        this.sendError(res, 405, 'Method not allowed');
        return;
      }

      const contentType = req.headers['content-type'] || '';
      
      if (contentType.startsWith('multipart/form-data')) {
        await this.handleMultipartUpload(req, res);
      } else {
        await this.handleSimpleUpload(req, res);
      }
    } catch (error) {
      console.error('Upload error:', error);
      this.sendError(res, 500, 'Upload failed');
    }
  }

  private async handleSimpleUpload(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const filename = `upload_${Date.now()}.bin`;
    const filepath = join(this.uploadsDir, filename);
    
    let totalSize = 0;
    const writeStream = createWriteStream(filepath);

    req.on('data', (chunk) => {
      totalSize += chunk.length;
      if (totalSize > this.maxFileSize) {
        writeStream.destroy();
        this.sendError(res, 413, 'File too large');
        return;
      }
      writeStream.write(chunk);
    });

    req.on('end', () => {
      writeStream.end();
      this.sendSuccess(res, {
        message: 'File uploaded successfully',
        filename,
        size: totalSize,
        downloadUrl: `/api/download/${filename}`
      });
    });

    req.on('error', () => {
      writeStream.destroy();
      this.sendError(res, 400, 'Upload error');
    });
  }

  private async handleMultipartUpload(req: IncomingMessage, res: ServerResponse): Promise<void> {
    // Simple multipart handling - in production, use a proper library like formidable
    this.sendSuccess(res, {
      message: 'Multipart upload endpoint ready',
      note: 'Use simple POST with binary data for now'
    });
  }

  private sendSuccess(res: ServerResponse, data: any): void {
    if (!res.headersSent) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, ...data }));
    }
  }

  private sendError(res: ServerResponse, status: number, message: string): void {
    if (!res.headersSent) {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: message }));
    }
  }
}

export default UploadHandler;