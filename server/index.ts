import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { parse } from 'url';

const port = process.env.PORT || 5000;
const distPath = join(process.cwd(), 'dist/public');

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

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url || '', true);
  const pathname = parsedUrl.pathname || '/';

  // API endpoints
  if (pathname.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (pathname === '/api/health') {
      res.end(JSON.stringify({ status: 'healthy', message: 'Suntyn AI server running (Express removed)' }));
      return;
    }
    if (pathname === '/api/tools') {
      res.end(JSON.stringify({
        tools: [
          { id: 'pdf-merge', name: 'PDF Merger', category: 'pdf' },
          { id: 'image-resize', name: 'Image Resizer', category: 'image' },
          { id: 'video-compress', name: 'Video Compressor', category: 'media' }
        ]
      }));
      return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Static file serving
  let filePath = join(distPath, pathname === '/' ? 'index.html' : pathname);
  
  if (!existsSync(filePath)) {
    // SPA fallback - serve index.html for all non-API routes
    filePath = join(distPath, 'index.html');
    if (!existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
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

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`🌟 Suntyn AI Server running on port ${port}`);
  console.log(`📦 Express.js permanently removed - Lightweight server active`);
  console.log(`🔗 Frontend: http://localhost:${port}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
});

export {};