#!/usr/bin/env python3
"""
Suntyn AI - Production FastAPI Only Setup
Starts all microservices for production deployment
"""
import subprocess
import time
import os
import sys

def start_services():
    """Start all FastAPI microservices for production"""
    print("🚀 Starting Suntyn AI - FastAPI-Only Production")
    print("🔧 Express server permanently removed")
    print("📦 Frontend built successfully")
    print("⚡ Starting FastAPI microservices...")
    
    # Change to FastAPI backend directory
    os.chdir("fastapi_backend")
    
    # Start all services using the existing script
    subprocess.run([sys.executable, "start_all_services.py"])

if __name__ == "__main__":
    start_services()