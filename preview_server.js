import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from dist/public
const publicPath = path.join(__dirname, 'dist', 'public');
app.use(express.static(publicPath));

// API proxy to FastAPI backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
}));

// Static files proxy
app.use('/static', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Suntyn AI Preview Server running on http://0.0.0.0:${PORT}`);
  console.log(`📂 Static files: ${publicPath}`);
  console.log(`🔗 API proxy: /api -> http://localhost:5001`);
  console.log(`📁 Static proxy: /static -> http://localhost:3001`);
  console.log(`✅ Preview server ready for Replit!`);
});