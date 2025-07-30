"""
Production FastAPI Entry Point for Render.com Deployment
This file is specifically for deployment platforms that expect main.py in the root
"""
import sys
import os

# Add the fastapi_backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'fastapi_backend'))

# Import the FastAPI app from the fastapi_backend directory
from main import app

# Export the app for uvicorn
__all__ = ['app']

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)