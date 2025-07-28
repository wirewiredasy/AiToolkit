// Temporary redirect server for FastAPI backend
import express from 'express';
import { spawn } from 'child_process';
import path from 'path';

const app = express();
const PORT = 5000;

// Start FastAPI services in the background
console.log('🚀 Starting FastAPI microservices...');

// Start main gateway
const gatewayProcess = spawn('python', ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '5001', '--reload'], {
  cwd: path.join(process.cwd(), 'fastapi_backend'),
  stdio: 'inherit'
});

// Start PDF service
const pdfProcess = spawn('python', ['-m', 'uvicorn', 'pdf_service:app', '--host', '0.0.0.0', '--port', '8001', '--reload'], {
  cwd: path.join(process.cwd(), 'fastapi_backend/services'),
  stdio: 'inherit'
});

// Start Image service
const imageProcess = spawn('python', ['-m', 'uvicorn', 'image_service:app', '--host', '0.0.0.0', '--port', '8002', '--reload'], {
  cwd: path.join(process.cwd(), 'fastapi_backend/services'),
  stdio: 'inherit'
});

// Start Developer service
const devProcess = spawn('python', ['-m', 'uvicorn', 'developer_service:app', '--host', '0.0.0.0', '--port', '8005', '--reload'], {
  cwd: path.join(process.cwd(), 'fastapi_backend/services'),
  stdio: 'inherit'
});

// Proxy all requests to FastAPI
app.use('*', (req, res) => {
  // Redirect to FastAPI gateway
  const fastApiUrl = `http://localhost:5001${req.originalUrl}`;
  res.redirect(302, fastApiUrl);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Proxy server running on port ${PORT}`);
  console.log(`📡 Redirecting to FastAPI gateway on port 5001`);
  console.log(`🔧 PDF Service: http://localhost:8001`);
  console.log(`🖼️  Image Service: http://localhost:8002`);
  console.log(`💻 Developer Service: http://localhost:8005`);
  console.log(`✅ Express.js backend completely replaced with FastAPI microservices!`);
});

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping all services...');
  gatewayProcess.kill();
  pdfProcess.kill();
  imageProcess.kill();
  devProcess.kill();
  process.exit(0);
});