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

  // Wait a moment for services to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Create Vite server directly on port 5000
    console.log('🖥️  Starting Vite development server...');
    
    const vite = await createViteServer({
      server: { 
        port: 5000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://localhost:5001',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api')
          }
        }
      },
      appType: 'spa',
      root: path.join(process.cwd(), 'client'),
      configFile: path.join(process.cwd(), 'vite.config.ts')
    });

    await vite.listen();
    
    console.log(`🎯 Suntyn AI running on http://localhost:5000`);
    console.log(`🖥️  Frontend: React + Vite (Development server)`);
    console.log(`🔗 Backend: FastAPI Gateway on port 5001`);
    console.log(`🔧 PDF Service: http://localhost:8001`);
    console.log(`🖼️  Image Service: http://localhost:8002`);
    console.log(`💻 Developer Service: http://localhost:8005`);
    console.log(`✅ Full-stack application ready!`);

    // Cleanup on exit
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all services...');
      gatewayProcess.kill();
      pdfProcess.kill();
      imageProcess.kill();
      devProcess.kill();
      vite.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting Vite server:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);