#!/usr/bin/env python3
"""
Install and run FastAPI services for Suntyn AI
"""
import subprocess
import sys
import os
import time

def install_packages():
    """Install required packages"""
    packages = [
        "fastapi", "uvicorn", "python-multipart", 
        "pillow", "pypdf2", "reportlab", "httpx", "pydantic"
    ]
    
    print("🔧 Installing FastAPI packages...")
    try:
        for package in packages:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print("✅ All packages installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install packages: {e}")
        return False

def run_fastapi_gateway():
    """Run FastAPI main gateway"""
    print("🚀 Starting FastAPI Gateway on port 5000...")
    
    # Change to fastapi_backend directory
    os.chdir("fastapi_backend")
    
    try:
        # Run the main FastAPI app
        subprocess.run([
            sys.executable, "-m", "uvicorn",
            "main:app",
            "--host", "0.0.0.0",
            "--port", "5000",
            "--reload",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        print("🛑 FastAPI Gateway stopped by user")
    except Exception as e:
        print(f"❌ Error running FastAPI: {e}")

def main():
    print("🌟 Suntyn AI - FastAPI Service Launcher")
    print("=" * 50)
    
    # Install packages first
    if not install_packages():
        print("❌ Package installation failed. Exiting.")
        sys.exit(1)
    
    # Wait a moment
    time.sleep(2)
    
    # Run FastAPI gateway
    run_fastapi_gateway()

if __name__ == "__main__":
    main()