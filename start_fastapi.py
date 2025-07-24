
#!/usr/bin/env python3
"""
Production-ready FastAPI service launcher
Fixed for Replit deployment environment
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def install_packages():
    """Install required Python packages"""
    try:
        print("📦 Installing FastAPI dependencies...")
        subprocess.run([
            sys.executable, "-m", "pip", "install", 
            "fastapi>=0.116.1", 
            "uvicorn>=0.35.0", 
            "python-multipart>=0.0.20", 
            "requests>=2.32.4"
        ], check=True)
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        sys.exit(1)

def start_fastapi_service():
    """Start FastAPI service with proper production configuration"""
    
    # Install packages first
    install_packages()
    
    # Set working directory to server
    server_dir = Path(__file__).parent / "server"
    if server_dir.exists():
        os.chdir(server_dir)
    
    # Production environment variables
    os.environ.update({
        'PYTHONPATH': str(Path(__file__).parent),
        'HOST': '0.0.0.0',
        'PORT': '8000',
        'ENV': 'production'
    })
    
    try:
        print("🚀 Starting Suntyn AI FastAPI Service (Production Mode)")
        print(f"📁 Working directory: {os.getcwd()}")
        print(f"🌐 Service will be available at: http://0.0.0.0:8000")
        
        # Direct uvicorn command for production
        cmd = [
            sys.executable, 
            "-m", "uvicorn", 
            "fastapi-service:app",
            "--host", "0.0.0.0",
            "--port", "8000",
            "--workers", "1",
            "--log-level", "info",
            "--reload"
        ]
        
        print(f"🔧 Command: {' '.join(cmd)}")
        
        # Start the service
        process = subprocess.run(cmd, check=True)
        
    except KeyboardInterrupt:
        print("\n⚠️ Service interrupted by user")
        sys.exit(0)
    except subprocess.CalledProcessError as e:
        print(f"❌ FastAPI service failed to start: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_fastapi_service()
