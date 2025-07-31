import { spawn } from 'child_process';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log('🚀 Starting Suntyn AI Full-Stack Application...');

  // Temporarily disable FastAPI services during migration
  console.log('⚠️  FastAPI services temporarily disabled during migration');
  console.log('🔄 Will start services after Python dependencies are resolved');

  // Create placeholder processes for cleanup
  let gatewayProcess: any = null;
  let pdfProcess: any = null;
  let imageProcess: any = null;
  let devProcess: any = null;
  let mediaProcess: any = null;
  let govProcess: any = null;

  // Start FastAPI services using Python directly
  console.log('⚠️  FastAPI services temporarily disabled during migration');
  console.log('🔄 Will start services after Python dependencies are resolved');

  // Start static file server
  const staticProcess = spawn('node', ['static_server.js'], {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  // Wait a moment for services to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Check if build exists, if not create it
    const distPath = path.join(process.cwd(), 'dist', 'public');

    if (!fs.existsSync(distPath)) {
      console.log('🔨 Building React app first...');
      const buildProcess = spawn('npm', ['run', 'build'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      });

      await new Promise((resolve, reject) => {
        buildProcess.on('close', (code) => {
          if (code === 0) {
            console.log('✅ Build completed successfully!');
            resolve(true);
          } else {
            console.error('❌ Build failed!');
            reject(new Error('Build failed'));
          }
        });
      });
    }

    // Start the preview server for built React app
    console.log('🖥️  Starting Preview server for built React app...');

    const previewProcess = spawn('node', ['preview_server.js'], {
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    // Wait for preview server to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`🎯 Suntyn AI running on http://localhost:5000`);
    console.log(`🖥️  Frontend: React + Vite (Development server)`);
    console.log(`🔗 Backend: FastAPI Gateway on port 5001`);
    console.log(`🔧 PDF Service: http://localhost:8001`);
    console.log(`🖼️  Image Service: http://localhost:8002`);
    console.log(`🎵 Media Service: http://localhost:8003`);
    console.log(`🏛️  Government Service: http://localhost:8004`);
    console.log(`💻 Developer Service: http://localhost:8005`);
    console.log(`✅ Full-stack application ready!`);

    // Cleanup on exit
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all services...');
      if (gatewayProcess) gatewayProcess.kill();
      if (pdfProcess) pdfProcess.kill();
      if (imageProcess) imageProcess.kill();
      if (devProcess) devProcess.kill();
      if (mediaProcess) mediaProcess.kill();
      if (govProcess) govProcess.kill();
      staticProcess.kill();
      previewProcess.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);