#!/usr/bin/env python3
"""
Simple FastAPI server for Suntyn AI - Quick start version
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import os

# Create FastAPI app
app = FastAPI(
    title="Suntyn AI - FastAPI Backend", 
    version="2.0.0",
    description="AI-powered toolkit with 108+ tools"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
async def root():
    """Main landing page"""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suntyn AI - FastAPI Backend Running</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                text-align: center;
            }
            .container { max-width: 800px; margin: 0 auto; }
            .logo { font-size: 3rem; margin-bottom: 20px; }
            .status { 
                background: rgba(255,255,255,0.2); 
                padding: 20px; 
                border-radius: 10px; 
                margin: 20px 0; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🌞 Suntyn AI</div>
            <h1>FastAPI Backend is Running Successfully!</h1>
            <div class="status">
                <h2>✅ Status: Active</h2>
                <p>🚀 FastAPI server running on port 5000</p>
                <p>📱 Ready to handle 108+ AI tools</p>
                <p>🔗 Microservices architecture available</p>
            </div>
            <p><a href="/docs" style="color: #ffd700;">📖 API Documentation</a></p>
            <p><a href="/health" style="color: #ffd700;">💚 Health Check</a></p>
        </div>
    </body>
    </html>
    """

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "message": "Suntyn AI FastAPI backend running successfully",
        "version": "2.0.0",
        "services": "Ready for 108+ AI tools"
    }

@app.get("/api/status")
async def api_status():
    """API status endpoint"""
    return {
        "message": "Suntyn AI FastAPI Backend",
        "status": "active",
        "version": "2.0.0",
        "tools": "108+ AI tools available",
        "architecture": "FastAPI microservices"
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🌟 Starting Suntyn AI FastAPI server on port {port}")
    uvicorn.run(
        "simple_fastapi:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )