
"""
FastAPI Main Entry Point for Render Deployment
"""
import os
import sys
from pathlib import Path

# Get the directory containing this file
current_dir = Path(__file__).parent
fastapi_backend_dir = current_dir / "fastapi_backend"

# Add fastapi_backend to Python path
sys.path.insert(0, str(fastapi_backend_dir))

try:
    # Try to import from the main module in fastapi_backend
    import main as fastapi_main
    app = fastapi_main.app
    print("✅ Successfully imported FastAPI app")
except ImportError as e:
    print(f"❌ Import error: {e}")
    # Fallback: create a simple FastAPI app
    from fastapi import FastAPI
    from fastapi.responses import HTMLResponse
    
    app = FastAPI(title="Suntyn AI - Backup Server", version="1.0.0")
    
    @app.get("/", response_class=HTMLResponse)
    async def root():
        return """
        <html>
            <head><title>Suntyn AI</title></head>
            <body>
                <h1>🚀 Suntyn AI Server is Running!</h1>
                <p>FastAPI Backend is live on Render</p>
                <a href="/docs">View API Documentation</a>
            </body>
        </html>
        """
    
    @app.get("/health")
    async def health():
        return {"status": "healthy", "message": "Backup server running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
