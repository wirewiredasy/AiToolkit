/**
 * FastAPI Proxy Server - Routes frontend requests to FastAPI microservices
 * This replaces the dummy Express routes with real FastAPI connections
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

// Health check for the proxy
app.get('/proxy-health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'FastAPI Proxy',
    timestamp: new Date().toISOString()
  });
});

// Proxy all /api/ requests directly to FastAPI gateway
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5000',  // FastAPI gateway
  changeOrigin: true,
  timeout: 90000,  // 90 second timeout
  proxyTimeout: 90000,
  onError: (err, req, res) => {
    console.error('❌ Proxy Error:', err.message);
    res.status(502).json({
      error: 'Gateway Error',
      message: 'Could not connect to FastAPI services',
      detail: err.message
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔗 Proxying ${req.method} ${req.url} to FastAPI gateway`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ FastAPI response: ${proxyRes.statusCode} for ${req.url}`);
  }
}));

// Start proxy server on port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🔗 FastAPI Proxy running on port ${PORT}`);
  console.log(`🎯 Routing /api/* to FastAPI gateway on port 5000`);
  console.log(`🔧 All tools will now use REAL FastAPI processing!`);
});

module.exports = app;