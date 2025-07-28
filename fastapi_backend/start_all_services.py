#!/usr/bin/env python3
"""
Start All FastAPI Microservices
Manages all microservices for Suntyn AI TinyWow Clone
"""
import subprocess
import sys
import time
import os
from pathlib import Path

def start_service(name: str, port: int, script_path: str):
    """Start a single microservice"""
    print(f"🚀 Starting {name} on port {port}...")
    
    cmd = [
        sys.executable, "-m", "uvicorn",
        f"{script_path}:app",
        "--host", "0.0.0.0",
        "--port", str(port),
        "--reload",
        "--log-level", "info"
    ]
    
    try:
        process = subprocess.Popen(
            cmd,
            cwd=os.path.dirname(script_path) if os.path.dirname(script_path) else ".",
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
        print(f"✅ {name} started successfully (PID: {process.pid})")
        return process
    except Exception as e:
        print(f"❌ Failed to start {name}: {e}")
        return None

def main():
    """Start all microservices"""
    print("🌟 Suntyn AI - FastAPI Microservices Startup")
    print("=" * 50)
    
    # Change to fastapi_backend directory
    os.chdir(Path(__file__).parent)
    
    services = [
        ("Main Gateway", 5000, "main"),
        ("PDF Service", 8001, "services/pdf_service"),
        ("Image Service", 8002, "services/image_service"), 
        ("Media Service", 8003, "services/media_service"),
        ("Government Service", 8004, "services/government_service"),
        ("Developer Service", 8005, "services/developer_service")
    ]
    
    processes = []
    
    try:
        for name, port, script in services:
            process = start_service(name, port, script)
            if process:
                processes.append((name, process))
            time.sleep(2)  # Wait between service starts
        
        print("\n🎯 All services started successfully!")
        print("📊 Service Status:")
        for name, process in processes:
            status = "Running" if process.poll() is None else "Stopped"
            print(f"  - {name}: {status} (PID: {process.pid})")
        
        print("\n🌐 Access URLs:")
        print("  - Main Gateway: http://localhost:5000")
        print("  - PDF Service: http://localhost:8001")
        print("  - Image Service: http://localhost:8002")
        print("  - Media Service: http://localhost:8003")
        print("  - Government Service: http://localhost:8004")
        print("  - Developer Service: http://localhost:8005")
        
        print("\n💡 Health Check: http://localhost:5000/health")
        print("📖 API Docs: http://localhost:5000/docs")
        
        # Keep running
        print("\n⌨️  Press Ctrl+C to stop all services")
        
        while True:
            time.sleep(1)
            # Check if all processes are still running
            for name, process in processes:
                if process.poll() is not None:
                    print(f"⚠️  {name} has stopped unexpectedly!")
                    
    except KeyboardInterrupt:
        print("\n🛑 Stopping all services...")
        for name, process in processes:
            print(f"🔄 Terminating {name}...")
            process.terminate()
            process.wait()
        print("✅ All services stopped successfully!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()