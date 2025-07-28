// Simple static file server for processed files
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Serve static files from /static directory
app.use('/static', express.static(path.join(__dirname, 'static'), {
  maxAge: '1h',
  etag: true,
  lastModified: true
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'static-file-server' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📁 Static file server running on http://localhost:${PORT}`);
});