
"""
FastAPI Main Entry Point for Replit Deployment
"""
import os
import sys

# Add fastapi_backend to Python path
fastapi_backend_path = os.path.join(os.path.dirname(__file__), 'fastapi_backend')
sys.path.insert(0, fastapi_backend_path)

# Import the FastAPI app from fastapi_backend
from main import app

# Export the app for uvicorn
__all__ = ['app']

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )
