// Simple static file server for processed files
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

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