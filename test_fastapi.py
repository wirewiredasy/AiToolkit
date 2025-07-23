#!/usr/bin/env python3
"""Test FastAPI service directly"""

import requests
import json

try:
    # Test health endpoint
    response = requests.get("http://localhost:8000/health", timeout=5)
    print(f"Health check: {response.status_code} - {response.json()}")
    
    # Test PDF merger endpoint
    data = {"fileName": "test.pdf", "fileSize": 50000000}
    response = requests.post("http://localhost:8000/api/tools/pdf/merger", 
                           json=data, timeout=10)
    print(f"PDF Merger: {response.status_code} - {response.json()}")
    
except Exception as e:
    print(f"Connection error: {e}")