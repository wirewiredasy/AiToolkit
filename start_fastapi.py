
#!/usr/bin/env python3
import subprocess
import sys
import os

def start_fastapi():
    """Start FastAPI service for heavy processing"""
    try:
        print("🚀 Starting FastAPI Heavy Processing Service...")
        print("📍 Service will be available at: http://localhost:8000")
        print("📖 API docs will be at: http://localhost:8000/docs")
        
        # Change to server directory
        os.chdir('./server')
        
        # Start FastAPI with uvicorn
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "fastapi-service:app",
            "--host", "0.0.0.0",
            "--port", "8000", 
            "--reload",
            "--workers", "1"
        ], check=True)
        
    except KeyboardInterrupt:
        print("\n🛑 FastAPI service stopped")
    except Exception as e:
        print(f"❌ Error starting FastAPI: {e}")

if __name__ == "__main__":
    start_fastapi()
