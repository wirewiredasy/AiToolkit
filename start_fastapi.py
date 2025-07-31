#!/usr/bin/env python3
"""
Suntyn AI FastAPI Server Startup Script
Completely replaces Express.js with FastAPI
"""
import os
import sys
import subprocess
import signal
import time
from pathlib import Path

def build_frontend():
    """Build the frontend before starting the server"""
    print("🔨 Building frontend...")
    try:
        result = subprocess.run(["npm", "run", "build"], 
                              capture_output=True, text=True, timeout=120)
        if result.returncode == 0:
            print("✅ Frontend build completed successfully")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("❌ Frontend build timed out")
        return False
    except Exception as e:
        print(f"❌ Frontend build error: {e}")
        return False

def start_fastapi():
    """Start the FastAPI server"""
    print("🚀 Starting Suntyn AI FastAPI server...")
    
    # Change to the fastapi_backend directory
    os.chdir("fastapi_backend")
    
    try:
        # Start the main gateway
        subprocess.run([
            "python", "main.py"
        ], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ FastAPI server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("🌟 Suntyn AI - Neural Intelligence Platform")
    print("📦 Express.js permanently removed - FastAPI only")
    
    # Build frontend first
    if not build_frontend():
        print("⚠️  Frontend build failed, but starting server anyway...")
    
    # Start FastAPI server
    start_fastapi()