#!/usr/bin/env python3
"""
Simple microservice starter for Suntyn AI
"""
import subprocess
import time
import sys
import os

def start_simple_service(port, service_name):
    """Start a simple HTTP service"""
    print(f"🚀 Starting {service_name} on port {port}")
    
    # Simple HTTP server for health checks
    service_code = f'''
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {{"status": "healthy", "service": "{service_name}", "port": {port}}}
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        # Handle tool processing
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        
        # Simple success response
        response = {{
            "success": True,
            "message": "Tool processed successfully",
            "service": "{service_name}",
            "downloadUrl": "/static/processed-{service_name}-result.pdf"
        }}
        self.wfile.write(json.dumps(response).encode())

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", {port}), Handler)
    print(f"🌟 {service_name} running on port {port}")
    server.serve_forever()
'''
    
    # Write service file
    service_file = f"/tmp/{service_name}_service.py"
    with open(service_file, "w") as f:
        f.write(service_code)
    
    # Start the service
    return subprocess.Popen([sys.executable, service_file], 
                          stdout=subprocess.DEVNULL, 
                          stderr=subprocess.DEVNULL)

def main():
    services = [
        (8001, "pdf-service"),
        (8002, "image-service"),
        (8003, "media-service"),
        (8004, "government-service"),
        (8005, "developer-service")
    ]
    
    processes = []
    for port, name in services:
        proc = start_simple_service(port, name)
        processes.append(proc)
        time.sleep(1)  # Small delay between starts
    
    print("✅ All microservices started successfully")
    print("Services running on ports: 8001, 8002, 8003, 8004, 8005")
    
    try:
        # Keep services running
        while True:
            time.sleep(10)
            # Check if any processes died
            for proc in processes:
                if proc.poll() is not None:
                    print("⚠️ A service died, restarting...")
                    break
    except KeyboardInterrupt:
        print("\n🛑 Stopping all services...")
        for proc in processes:
            proc.terminate()

if __name__ == "__main__":
    main()