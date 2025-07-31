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

  // FastAPI services temporarily disabled during migration - Python version issues
  console.log('⚠️  FastAPI services temporarily disabled during migration');
  console.log('🔧 Focusing on frontend-first approach for Replit compatibility');

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
    console.log(`📁 Static file server running on port 3001`);
    console.log(`✅ Application ready for Replit!`);

    // Cleanup on exit
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all services...');
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