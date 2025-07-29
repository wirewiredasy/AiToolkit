// Direct Vite + FastAPI integration server
import { spawn } from 'child_process';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  console.log('🚀 Starting Suntyn AI Full-Stack Application...');
  
  // Start FastAPI services in the background
  console.log('🔧 Starting FastAPI microservices...');
  
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

  // Start Media service
  const mediaProcess = spawn('python', ['-m', 'uvicorn', 'media_service:app', '--host', '0.0.0.0', '--port', '8003', '--reload'], {
    cwd: path.join(process.cwd(), 'fastapi_backend/services'),
    stdio: 'inherit'
  });

  // Start Government service
  const govProcess = spawn('python', ['-m', 'uvicorn', 'government_service:app', '--host', '0.0.0.0', '--port', '8004', '--reload'], {
    cwd: path.join(process.cwd(), 'fastapi_backend/services'),
    stdio: 'inherit'
  });

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
    if (!require('fs').existsSync(distPath)) {
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
      gatewayProcess.kill();
      pdfProcess.kill();
      imageProcess.kill();
      devProcess.kill();
      mediaProcess.kill();
      govProcess.kill();
      staticProcess.kill();
      previewProcess.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting Vite server:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);