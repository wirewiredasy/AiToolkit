
"""
FastAPI Main Entry Point for Deployment
Simplified version to avoid circular imports
"""
import os
import sys
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import httpx
import asyncio
import logging
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Suntyn AI - FastAPI Gateway", 
    version="2.0.0",
    description="AI-powered toolkit with 108+ tools for PDF, Image, Media, and Government document processing"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Microservice endpoints
SERVICES = {
    "pdf": "http://localhost:8001",
    "image": "http://localhost:8002", 
    "media": "http://localhost:8003",
    "government": "http://localhost:8004",
    "developer": "http://localhost:8005"
}

@app.get("/", response_model=Dict[str, Any])
async def root():
    """Main endpoint with service status"""
    return {
        "message": "Suntyn AI - FastAPI Gateway",
        "status": "active",
        "version": "2.0.0",
        "services": len(SERVICES)
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": "2025-01-31", "services": SERVICES}

@app.get("/docs-html", response_class=HTMLResponse)
async def docs_html():
    """HTML documentation page"""
    return """
    <html>
        <head><title>Suntyn AI API</title></head>
        <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h1>🚀 Suntyn AI - FastAPI Gateway</h1>
            <p><strong>Status:</strong> Active and Running</p>
            <p><strong>Version:</strong> 2.0.0</p>
            <p><strong>Services:</strong> 5 microservices available</p>
            <div style="margin: 30px 0;">
                <h3>Available Services:</h3>
                <ul>
                    <li>📄 PDF Service (Port 8001) - 25+ PDF processing tools</li>
                    <li>🖼️ Image Service (Port 8002) - 20+ image editing tools</li>
                    <li>🎵 Media Service (Port 8003) - 20+ audio/video tools</li>
                    <li>🏛️ Government Service (Port 8004) - 15+ document validators</li>
                    <li>💻 Developer Service (Port 8005) - 13+ coding utilities</li>
                </ul>
            </div>
            <p><a href="/docs" style="color: #0066cc;">View Interactive API Documentation</a></p>
        </body>
    </html>
    """

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
