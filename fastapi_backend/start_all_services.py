
#!/usr/bin/env python3
"""
Start All Suntyn AI Microservices
Enhanced version with proper port binding and error handling
"""
import subprocess
import sys
import time
import os
import signal
import atexit
from pathlib import Path
import requests
from typing import List, Tuple

# Store process references for cleanup
processes: List[subprocess.Popen] = []

def cleanup_processes():
    """Clean up all spawned processes"""
    print("\n🧹 Cleaning up processes...")
    for process in processes:
        try:
            if process.poll() is None:  # Still running
                process.terminate()
                process.wait(timeout=5)
        except:
            try:
                process.kill()
            except:
                pass

def signal_handler(signum, frame):
    """Handle shutdown signals"""
    print(f"\n⚠️ Received signal {signum}, shutting down...")
    cleanup_processes()
    sys.exit(0)

# Register cleanup handlers
atexit.register(cleanup_processes)
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

def check_port_available(port: int) -> bool:
    """Check if port is available"""
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('0.0.0.0', port))
            return True
        except OSError:
            return False

def start_service(name: str, port: int, script: str) -> subprocess.Popen:
    """Start a microservice with proper error handling"""
    print(f"🚀 Starting {name} on port {port}...")
    
    if not check_port_available(port):
        print(f"⚠️ Port {port} is busy, {name} may not start properly")
    
    try:
        # Use proper host binding for Replit
        env = os.environ.copy()
        env['HOST'] = '0.0.0.0'
        env['PORT'] = str(port)
        
        process = subprocess.Popen(
            [sys.executable, f"{script}.py"],
            cwd=Path(__file__).parent,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
            bufsize=1
        )
        
        processes.append(process)
        
        # Check if process started successfully
        time.sleep(2)
        if process.poll() is not None:
            print(f"❌ {name} failed to start")
            return None
        
        print(f"✅ {name} started successfully (PID: {process.pid})")
        return process
        
    except Exception as e:
        print(f"❌ Error starting {name}: {e}")
        return None

def wait_for_service(port: int, timeout: int = 30) -> bool:
    """Wait for service to be healthy"""
    for i in range(timeout):
        try:
            response = requests.get(f"http://localhost:{port}/health", timeout=2)
            if response.status_code == 200:
                return True
        except:
            pass
        time.sleep(1)
    return False

def main():
    """Start all microservices with enhanced monitoring"""
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
    
    started_services = []
    
    try:
        # Start microservices first (except main gateway)
        for name, port, script in services[1:]:
            process = start_service(name, port, script)
            if process:
                started_services.append((name, port, process))
                print(f"⏳ Waiting for {name} to be ready...")
                if wait_for_service(port, 15):
                    print(f"🟢 {name} is healthy")
                else:
                    print(f"🟡 {name} started but health check timeout")
            time.sleep(2)
        
        # Start main gateway last
        main_process = start_service("Main Gateway", 5000, "main")
        if main_process:
            started_services.append(("Main Gateway", 5000, main_process))
        
        print(f"\n🎯 Services Started: {len(started_services)}/{len(services)}")
        print("📊 Service Status:")
        for name, port, process in started_services:
            status = "🟢 Running" if process.poll() is None else "🔴 Stopped"
            print(f"  - {name}: {status} (Port: {port}, PID: {process.pid})")
        
        print("\n🌐 Access URLs:")
        print("  - Main Gateway: http://localhost:5000")
        print("  - API Health: http://localhost:5000/api/health")
        print("  - Frontend: http://localhost:5000")
        
        print(f"\n✨ All services ready! Press Ctrl+C to stop all services")
        
        # Keep main process alive and monitor services
        try:
            while True:
                time.sleep(5)
                # Check if any service died
                for name, port, process in started_services:
                    if process.poll() is not None:
                        print(f"⚠️ {name} stopped unexpectedly")
                        
        except KeyboardInterrupt:
            print("\n👋 Shutdown requested by user")
            
    except Exception as e:
        print(f"❌ Critical error: {e}")
    finally:
        cleanup_processes()

if __name__ == "__main__":
    main()
