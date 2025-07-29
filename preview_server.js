import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Suntyn AI Preview', port: PORT });
});

// API proxy to FastAPI gateway
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  timeout: 90000,
  onError: (err, req, res) => {
    console.error('API Proxy error:', err.message);
    res.status(502).json({ error: 'Backend unavailable' });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`API: ${req.method} ${req.url} -> http://localhost:5001${req.url}`);
  }
}));

// Static files proxy
app.use('/static', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  timeout: 30000,
  onError: (err, req, res) => {
    console.error('Static proxy error:', err.message);
    res.status(502).json({ error: 'Static files unavailable' });
  }
}));

// Serve the built React app
const distPath = path.join(__dirname, 'dist', 'public');
console.log(`📂 Serving static files from: ${distPath}`);

// Serve static assets
app.use(express.static(distPath, {
  maxAge: '1h',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Handle React Router routes - serve index.html for all routes
app.get('*', (req, res) => {
  // Skip API and static routes
  if (req.url.startsWith('/api') || req.url.startsWith('/static')) {
    return;
  }
  
  const indexPath = path.join(distPath, 'index.html');
  console.log(`🔗 Serving React app for route: ${req.url} from ${indexPath}`);
  
  // Check if index.html exists
  import('fs').then(fs => {
    if (!fs.existsSync(indexPath)) {
      console.error(`❌ index.html not found at: ${indexPath}`);
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Suntyn AI - Build Required</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                margin: 0;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 20px auto;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              button {
                background: white;
                color: #667eea;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                margin: 10px;
                font-size: 16px;
                font-weight: bold;
              }
              button:hover { background: #f0f0f0; }
              .info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <h1>🚀 Suntyn AI</h1>
            <div class="spinner"></div>
            <h2>Frontend Build Required</h2>
            <div class="info">
              <p><strong>Missing:</strong> ${indexPath}</p>
              <p><strong>Status:</strong> React app needs to be built</p>
            </div>
            <button onclick="window.location.href='/api/health'">Check Backend API</button>
            <button onclick="buildApp()">Build Frontend</button>
            <script>
              function buildApp() {
                alert('Please run: npm run build');
              }
            </script>
          </body>
        </html>
      `);
      return;
    }
    
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('❌ Error serving index.html:', err);
        res.status(500).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Suntyn AI - Loading...</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                margin: 0;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 20px auto;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              button {
                background: white;
                color: #667eea;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin: 10px;
                font-size: 16px;
              }
              button:hover { background: #f0f0f0; }
            </style>
          </head>
          <body>
            <h1>🚀 Suntyn AI</h1>
            <div class="spinner"></div>
            <p>Loading professional AI toolkit...</p>
            <p>Path: ${distPath}</p>
            <button onclick="window.location.reload()">Refresh</button>
            <button onclick="window.location.href='/api/health'">Check API</button>
          </body>
        </html>
      `);
      }
    });
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Suntyn AI Preview Server running on http://0.0.0.0:${PORT}`);
  console.log(`📂 Static files: ${distPath}`);
  console.log(`🔗 API proxy: /api -> http://localhost:5001`);
  console.log(`📁 Static proxy: /static -> http://localhost:3001`);
  console.log(`✅ Preview server ready for Replit!`);
});