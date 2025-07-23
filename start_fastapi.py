#!/usr/bin/env python3
"""Script to start FastAPI service in background"""

import os
import sys
import subprocess
import time

# Change to server directory
os.chdir('server')

# Start FastAPI service
try:
    process = subprocess.Popen(
        [sys.executable, 'fastapi-service.py'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    print(f"FastAPI service started with PID: {process.pid}")
    
    # Wait a bit to check if it started successfully
    time.sleep(3)
    
    if process.poll() is None:
        print("✅ FastAPI service is running on port 8000")
    else:
        stdout, stderr = process.communicate()
        print(f"❌ FastAPI service failed to start")
        print(f"stdout: {stdout}")
        print(f"stderr: {stderr}")
        
except Exception as e:
    print(f"Error starting FastAPI service: {e}")