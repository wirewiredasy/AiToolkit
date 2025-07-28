#!/usr/bin/env python3
"""
FastAPI Microservices Startup Script for Suntyn AI
Replaces Express.js backend completely
"""
import subprocess
import sys
import time
import os

def main():
    """Start FastAPI microservices"""
    print("🚀 Starting Suntyn AI FastAPI Microservices")
    print("=" * 50)
    
    try:
        # Change to fastapi_backend directory
        os.chdir("fastapi_backend")
        
        # Start main gateway
        print("📡 Starting Main Gateway (Port 5000)...")
        subprocess.run([
            sys.executable, "-m", "uvicorn",
            "main:app",
            "--host", "0.0.0.0", 
            "--port", "5000",
            "--reload"
        ])
        
    except KeyboardInterrupt:
        print("\n🛑 Stopping FastAPI services...")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()