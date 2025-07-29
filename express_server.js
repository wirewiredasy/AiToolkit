import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Suntyn AI Frontend',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// API proxy to FastAPI gateway
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  timeout: 90000,
  proxyTimeout: 90000,
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ 
      error: 'Backend service unavailable',
      message: 'FastAPI services may be starting up'
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying: ${req.method} ${req.url} -> http://localhost:5001${req.url}`);
  }
}));

// Static files proxy
app.use('/static', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  timeout: 30000,
  onError: (err, req, res) => {
    console.error('Static file proxy error:', err.message);
    res.status(502).json({ 
      error: 'Static file service unavailable' 
    });
  }
}));

// Serve static files from dist directory (built frontend)
const distPath = path.join(__dirname, 'dist', 'public');
app.use(express.static(distPath));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  console.log('Serving index.html for route:', req.url);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send(`
        <html>
          <head><title>Suntyn AI</title></head>
          <body style="font-family: Arial; padding: 20px; text-align: center;">
            <h1>🚀 Suntyn AI</h1>
            <p>Building frontend... Please wait a moment and refresh.</p>
            <button onclick="window.location.reload()">Refresh</button>
            <p>Path: ${distPath}</p>
            <p>Index: ${indexPath}</p>
          </body>
        </html>
      `);
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Express error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Suntyn AI Express server running on http://0.0.0.0:${PORT}`);
  console.log(`📂 Serving static files from: ${distPath}`);
  console.log(`🔗 API proxy: /api -> http://localhost:5001`);
  console.log(`📁 Static proxy: /static -> http://localhost:3001`);
});