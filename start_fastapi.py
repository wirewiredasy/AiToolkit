
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
    """Install required Python packages using pip directly"""
    try:
        print("📦 Installing FastAPI dependencies...")
        
        # Use python3 directly without any virtual environment
        cmd = [
            "python3", "-m", "pip", "install", "--user",
            "fastapi>=0.116.1", 
            "uvicorn[standard]>=0.35.0", 
            "python-multipart>=0.0.20", 
            "requests>=2.32.4"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Dependencies installed successfully")
        else:
            print(f"⚠️ Installation had warnings but may still work: {result.stderr}")
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        # Don't exit - try to continue anyway
        print("🔄 Attempting to continue with existing packages...")

def start_fastapi_service():
    """Start FastAPI service with proper production configuration"""
    
    # Install packages first
    install_packages()
    
    # Set working directory to server
    server_dir = Path(__file__).parent / "server"
    if server_dir.exists():
        os.chdir(server_dir)
        print(f"📁 Working directory: {os.getcwd()}")
    
    # Production environment variables
    os.environ.update({
        'PYTHONPATH': str(Path(__file__).parent),
        'HOST': '0.0.0.0',
        'PORT': '8000',
        'ENV': 'production'
    })
    
    try:
        print("🚀 Starting Suntyn AI FastAPI Service (Production Mode)")
        print(f"🌐 Service will be available at: http://0.0.0.0:8000")
        
        # Try direct uvicorn command first
        try:
            import uvicorn
            print("✅ Uvicorn found, starting service directly...")
            
            # Import the app to check if it loads
            sys.path.insert(0, os.getcwd())
            from fastapi_service import app
            
            # Start uvicorn programmatically
            uvicorn.run(
                app,
                host="0.0.0.0",
                port=8000,
                log_level="info",
                reload=False
            )
            
        except ImportError:
            print("⚠️ Uvicorn not available via import, trying command line...")
            
            # Fallback to command line uvicorn
            cmd = [
                "python3", 
                "-m", "uvicorn", 
                "fastapi-service:app",
                "--host", "0.0.0.0",
                "--port", "8000",
                "--log-level", "info"
            ]
            
            print(f"🔧 Command: {' '.join(cmd)}")
            subprocess.run(cmd, check=True)
        
    except KeyboardInterrupt:
        print("\n⚠️ Service interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ FastAPI service failed to start: {e}")
        print("🔄 Trying alternative startup method...")
        
        # Alternative: Run the Python file directly
        try:
            cmd = ["python3", "fastapi-service.py"]
            print(f"🔧 Alternative command: {' '.join(cmd)}")
            subprocess.run(cmd, check=True)
        except Exception as e2:
            print(f"❌ Alternative startup also failed: {e2}")
            sys.exit(1)

if __name__ == "__main__":
    start_fastapi_service()
