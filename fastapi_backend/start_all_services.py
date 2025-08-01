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

import signal
from multiprocessing import Process

def start_service(service_name, port, script_path):
    """Start a microservice on specified port"""
    try:
        print(f"🚀 Starting {service_name} on port {port}...")

        # Get the current directory
        current_dir = os.getcwd()

        # Start the service using uvicorn with correct module path
        module_name = os.path.basename(script_path).replace('.py', '')
        cmd = [
            sys.executable, "-m", "uvicorn", 
            f"services.{module_name}:app",
            "--host", "0.0.0.0",
            "--port", str(port),
            "--reload",
            "--log-level", "info"
        ]

        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            cwd=current_dir
        )

        # Wait for the service to start
        time.sleep(3)

        # Check if process is still running
        if process.poll() is None:
            print(f"✅ {service_name} started successfully on port {port}")
            return process
        else:
            print(f"❌ {service_name} failed to start")
            try:
                stdout, _ = process.communicate(timeout=1)
                print(f"Output: {stdout[:500]}...")
            except:
                pass
            return None

    except Exception as e:
        print(f"❌ {service_name} failed to start")
        print(f"Error: {str(e)}")
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
    print("🌟 Suntyn AI - FastAPI Microservices Startup")
    print("=" * 50)

    # Change to fastapi_backend directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # Service configurations - use relative paths from fastapi_backend
    services = [
        ("PDF Service", 8001, "pdf_service"),
        ("Image Service", 8002, "image_service"),
        ("Media Service", 8003, "media_service"),
        ("Government Service", 8004, "government_service"),
        ("Developer Service", 8005, "developer_service"),
    ]

    processes = []

    # Start all services
    for service_name, port, script_name in services:
        process = start_service(service_name, port, f"{script_name}.py")
        if process:
            processes.append((service_name, process))
        time.sleep(1)  # Stagger startup

    print(f"\n🎯 Services Started: {len(processes)}/{len(services)}")
    print("📊 Service Status:")

    # Print active services
    for service_name, _ in processes:
        print(f"  ✅ {service_name}")

    # Print service URLs
    print("\n🌐 Access URLs:")
    for service_name, port, _ in services:
        if any(proc[0] == service_name for proc in processes):
            print(f"  - {service_name}: http://localhost:{port}")

    print("\n✨ Services ready! Main server should be running on port 5000")
    print("Press Ctrl+C to stop all services")

    try:
        # Keep the main process running
        while True:
            time.sleep(5)

            # Check if any process has died and restart
            for i, (service_name, process) in enumerate(processes[:]):
                if process.poll() is not None:
                    print(f"⚠️  {service_name} has stopped unexpectedly. Restarting...")
                    processes.remove((service_name, process))

                    # Find the service config and restart
                    for svc_name, port, script_name in services:
                        if svc_name == service_name:
                            new_process = start_service(service_name, port, f"{script_name}.py")
                            if new_process:
                                processes.append((service_name, new_process))
                            break

    except KeyboardInterrupt:
        print("\n🛑 Shutting down all services...")

        # Terminate all processes
        for service_name, process in processes:
            print(f"🔄 Stopping {service_name}...")
            try:
                process.terminate()
                process.wait(timeout=5)
                print(f"✅ {service_name} stopped")
            except subprocess.TimeoutExpired:
                print(f"🔪 Force killing {service_name}...")
                process.kill()
                process.wait()
            except Exception as e:
                print(f"❌ Error stopping {service_name}: {e}")

        print("👋 All services stopped. Goodbye!")

if __name__ == "__main__":
    main()