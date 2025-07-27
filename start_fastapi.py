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

        # Force reinstall with --force-reinstall to fix broken packages
        packages = [
            "fastapi==0.104.1",
            "uvicorn[standard]==0.24.0", 
            "python-multipart==0.0.6",
            "requests==2.31.0",
            "pydantic==2.5.2"
        ]

        for package in packages:
            print(f"Installing {package}...")
            cmd = ["python3", "-m", "pip", "install", "--force-reinstall", "--no-cache-dir", package]
            result = subprocess.run(cmd, capture_output=True, text=True)

            if result.returncode != 0:
                print(f"⚠️ Warning installing {package}: {result.stderr}")
            else:
                print(f"✅ {package} installed successfully")

    except Exception as e:
        print(f"❌ Installation error: {e}")

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
        'PORT': '8001',
        'ENV': 'production'
    })

    try:
        print("🚀 Starting Suntyn AI FastAPI Service (Production Mode)")
        print(f"🌐 Service will be available at: http://0.0.0.0:8001")

        # Run the FastAPI service directly with python
        cmd = ["python3", "fastapi-service.py"]
        print(f"🔧 Starting command: {' '.join(cmd)}")

        process = subprocess.Popen(cmd)

        # Wait for the process
        process.wait()

    except KeyboardInterrupt:
        print("\n⚠️ Service interrupted by user")
        if 'process' in locals():
            process.terminate()
        sys.exit(0)
    except Exception as e:
        print(f"❌ FastAPI service failed to start: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_fastapi_service()