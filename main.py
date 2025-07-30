
"""
Main entry point for Render deployment
Imports and runs the FastAPI app from fastapi_backend
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'fastapi_backend'))

from fastapi_backend.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))
