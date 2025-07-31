#!/usr/bin/env python3
"""
Suntyn AI - Simple FastAPI Server to Replace Express.js
Serves the React frontend and provides API endpoints
"""
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from pathlib import Path

# Create FastAPI app
app = FastAPI(title="Suntyn AI", version="2.0.0", description="Neural Intelligence Platform")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
dist_path = Path("dist/public")
if dist_path.exists():
    app.mount("/assets", StaticFiles(directory=str(dist_path / "assets")), name="assets")
    app.mount("/static", StaticFiles(directory=str(dist_path)), name="static")

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Suntyn AI FastAPI server is running"}

# API endpoints stub
@app.get("/api/tools")
async def get_tools():
    """Get available tools"""
    return {
        "tools": [
            {"id": "pdf-merge", "name": "PDF Merger", "category": "pdf"},
            {"id": "image-resize", "name": "Image Resizer", "category": "image"},
            {"id": "video-compress", "name": "Video Compressor", "category": "media"},
        ]
    }

# Serve frontend for all non-API routes
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve the React frontend for all non-API routes"""
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    index_path = dist_path / "index.html"
    if index_path.exists():
        return FileResponse(str(index_path), media_type="text/html")
    
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
        <head>
            <title>Suntyn AI - Neural Intelligence Platform</title>
            <style>
                body { font-family: 'Inter', system-ui, sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
                .container { max-width: 600px; margin: 0 auto; text-align: center; }
                h1 { color: #2563eb; margin-bottom: 20px; }
                .status { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .success { color: #059669; }
                .building { color: #d97706; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🌟 Suntyn AI</h1>
                <div class="status">
                    <h2 class="success">✅ FastAPI Server Running</h2>
                    <p class="building">🔨 Frontend is being built...</p>
                    <p>Express.js has been permanently removed. FastAPI is now serving the application.</p>
                    <p><strong>Status:</strong> FastAPI server is healthy and ready</p>
                </div>
            </div>
        </body>
    </html>
    """)

if __name__ == "__main__":
    print("🌟 Starting Suntyn AI FastAPI Server...")
    print("📦 Express.js permanently removed - FastAPI only")
    
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=5000,
        reload=False,
        log_level="info"
    )