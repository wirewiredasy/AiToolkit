import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

// 🔹 3. Production deployment security and validation
export class FileValidationMiddleware {
  
  // Validate file size for streaming/chunking
  static validateFileSize(maxSize: number = 50 * 1024 * 1024) {
    return (req: Request, res: Response, next: NextFunction) => {
      const contentLength = req.headers['content-length'];
      if (contentLength && parseInt(contentLength) > maxSize) {
        return res.status(413).json({
          success: false,
          message: `File too large. Maximum size is ${Math.floor(maxSize / (1024 * 1024))}MB`
        });
      }
      next();
    };
  }

  // Enhanced file type validation
  static validateFileType(allowedTypes: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
      if (!req.files || req.files.length === 0) {
        return next(); // No files to validate
      }

      for (const file of req.files) {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;
        
        // Check both MIME type and extension
        const isValidMime = allowedTypes.includes(mimeType);
        const extensionMap: Record<string, string[]> = {
          'application/pdf': ['.pdf'],
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'audio/mpeg': ['.mp3'],
          'video/mp4': ['.mp4'],
          'application/json': ['.json'],
          'text/html': ['.html'],
          'text/plain': ['.txt']
        };
        
        const validExtensions = extensionMap[mimeType] || [];
        const isValidExtension = validExtensions.includes(fileExtension);
        
        if (!isValidMime || !isValidExtension) {
          return res.status(400).json({
            success: false,
            message: `Invalid file type: ${file.originalname}. MIME: ${mimeType}, Extension: ${fileExtension}`
          });
        }
      }
      
      next();
    };
  }

  // Auto cleanup old files
  static cleanupOldFiles(directory: string, maxAge: number = 3600000) { // 1 hour default
    return () => {
      if (!fs.existsSync(directory)) return;
      
      fs.readdir(directory, (err, files) => {
        if (err) return;
        
        files.forEach(file => {
          const filePath = path.join(directory, file);
          fs.stat(filePath, (err, stats) => {
            if (err) return;
            
            const fileAge = Date.now() - stats.mtime.getTime();
            if (fileAge > maxAge) {
              fs.unlink(filePath, (err) => {
                if (!err) {
                  console.log(`🗑️ Auto-cleaned old file: ${file}`);
                }
              });
            }
          });
        });
      });
    };
  }

  // File streaming for large files
  static streamLargeFile(filePath: string, res: Response) {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
      // Handle range requests for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'application/octet-stream',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Regular streaming
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'application/octet-stream',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }
}

// Schedule automatic cleanup every hour
setInterval(
  FileValidationMiddleware.cleanupOldFiles('./uploads/processed'),
  3600000 // 1 hour
);

setInterval(
  FileValidationMiddleware.cleanupOldFiles('./uploads/temp'),
  1800000 // 30 minutes for temp files
);