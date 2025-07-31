import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { parse } from 'url';
import UploadHandler from './upload-handler.js';

const port = process.env.PORT || 5000;
const distPath = join(process.cwd(), 'dist/public');
const uploadHandler = new UploadHandler();

// MIME types
const mimeTypes: { [key: string]: string } = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  const parsedUrl = parse(req.url || '', true);
  const pathname = parsedUrl.pathname || '/';

  // Prevent duplicate header writes
  let headersSent = false;
  const safeWriteHead = (status: number, headers?: any) => {
    if (!headersSent && !res.headersSent) {
      res.writeHead(status, headers);
      headersSent = true;
    }
  };
  const safeEnd = (data?: any) => {
    if (!res.headersSent && !headersSent) {
      safeWriteHead(200);
    }
    if (!res.writableEnded) {
      res.end(data);
    }
  };

  try {
    // API endpoints
    if (pathname.startsWith('/api/')) {
      safeWriteHead(200, { 'Content-Type': 'application/json' });
      
      if (pathname === '/api/health') {
        safeEnd(JSON.stringify({ 
          status: 'healthy', 
          message: 'Suntyn AI server running (Express removed)',
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
        }));
        return;
      }
      
      if (pathname === '/api/tools') {
        safeEnd(JSON.stringify({
          tools: [
            { id: 'pdf-merge', name: 'PDF Merger', category: 'pdf' },
            { id: 'image-resize', name: 'Image Resizer', category: 'image' },
            { id: 'video-compress', name: 'Video Compressor', category: 'media' },
            { id: 'bg-remover', name: 'Background Remover', category: 'image' },
            { id: 'json-formatter', name: 'JSON Formatter', category: 'developer' }
          ],
          totalTools: 80,
          categories: ['pdf', 'image', 'media', 'government', 'developer']
        }));
        return;
      }

      // File upload endpoint
      if (pathname === '/api/upload') {
        await uploadHandler.handleUpload(req, res);
        return;
      }

      // File download endpoint
      if (pathname.startsWith('/api/download/')) {
        const filename = pathname.split('/api/download/')[1];
        const staticPath = join(process.cwd(), 'static', filename);
        
        if (existsSync(staticPath)) {
          const ext = extname(filename);
          const contentType = mimeTypes[ext] || 'application/octet-stream';
          
          try {
            const content = readFileSync(staticPath);
            safeWriteHead(200, { 
              'Content-Type': contentType,
              'Content-Disposition': `attachment; filename="${filename}"`
            });
            safeEnd(content);
            return;
          } catch (error) {
            safeWriteHead(500, { 'Content-Type': 'application/json' });
            safeEnd(JSON.stringify({ error: 'File read error' }));
            return;
          }
        } else {
          safeWriteHead(404, { 'Content-Type': 'application/json' });
          safeEnd(JSON.stringify({ error: 'File not found' }));
          return;
        }
      }
      
      safeWriteHead(404, { 'Content-Type': 'application/json' });
      safeEnd(JSON.stringify({ error: 'API endpoint not found' }));
      return;
    }

    // Static file serving
    let filePath = join(distPath, pathname === '/' ? 'index.html' : pathname);
    
    if (!existsSync(filePath)) {
      // SPA fallback - serve index.html for all non-API routes
      filePath = join(distPath, 'index.html');
      if (!existsSync(filePath)) {
        safeWriteHead(200, { 'Content-Type': 'text/html' });
        safeEnd(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Suntyn AI - Neural Intelligence Platform</title>
              <style>
                body { font-family: 'Inter', system-ui, sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
                .container { max-width: 600px; margin: 0 auto; text-align: center; }
                h1 { color: #2563eb; margin-bottom: 20px; }
                .status { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .success { color: #059669; }
                .building { color: #d97706; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🌟 Suntyn AI</h1>
                <div class="status">
                  <h2 class="success">✅ Server Running</h2>
                  <p class="building">🔨 Frontend is being built...</p>
                  <p>Express.js has been permanently removed. New lightweight server is active.</p>
                  <p><strong>Status:</strong> Server is healthy and ready</p>
                  <p><strong>Action needed:</strong> Run <code>npm run build</code> to build the frontend</p>
                </div>
              </div>
            </body>
          </html>
        `);
        return;
      }
    }

    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const content = readFileSync(filePath);
    safeWriteHead(200, { 'Content-Type': contentType });
    safeEnd(content);

  } catch (error) {
    console.error('Server error:', error);
    if (!res.headersSent) {
      safeWriteHead(500, { 'Content-Type': 'text/plain' });
      safeEnd('Internal Server Error');
    }
  }
});

server.listen(port, () => {
  console.log(`🌟 Suntyn AI Server running on port ${port}`);
  console.log(`📦 Express.js permanently removed - Lightweight server active`);
  console.log(`🔗 Frontend: http://localhost:${port}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
});

export {};