
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

@app.get("/", response_class=HTMLResponse)
async def root():
    """Main landing page with proper HTML interface"""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suntyn AI - Neural Intelligence Platform</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: white;
            }
            .container { 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 40px 20px; 
            }
            .header {
                text-align: center;
                margin-bottom: 60px;
            }
            .logo {
                font-size: 3.5rem;
                font-weight: 700;
                margin-bottom: 20px;
                background: linear-gradient(45deg, #ffd700, #ffaa00);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .tagline {
                font-size: 1.3rem;
                opacity: 0.9;
                margin-bottom: 10px;
            }
            .status {
                display: inline-block;
                background: rgba(255, 255, 255, 0.2);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9rem;
                margin-top: 20px;
            }
            .services-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 30px;
                margin-bottom: 60px;
            }
            .service-card {
                background: rgba(255, 255, 255, 0.1);
                padding: 30px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease;
            }
            .service-card:hover {
                transform: translateY(-5px);
            }
            .service-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }
            .service-title {
                font-size: 1.4rem;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .service-desc {
                opacity: 0.8;
                line-height: 1.6;
            }
            .tools-count {
                color: #ffd700;
                font-weight: 600;
            }
            .footer {
                text-align: center;
                opacity: 0.7;
                margin-top: 40px;
            }
            .api-links {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            .api-link {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 25px;
                transition: background 0.3s ease;
            }
            .api-link:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🌞 Suntyn AI</div>
                <div class="tagline">Neural Intelligence Platform</div>
                <div class="tagline">108+ AI-Powered Tools for Professional Document Processing</div>
                <div class="status">🟢 All Systems Active • Version 2.0.0</div>
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">📄</div>
                    <div class="service-title">PDF Processing Suite</div>
                    <div class="service-desc">Professional PDF tools including merger, splitter, compressor, converter, and advanced document processing. <span class="tools-count">25+ Tools</span></div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🖼️</div>
                    <div class="service-title">Image Processing Studio</div>
                    <div class="service-desc">Advanced image editing tools with background removal, resizing, compression, format conversion, and enhancement features. <span class="tools-count">20+ Tools</span></div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🎵</div>
                    <div class="service-title">Media Conversion Center</div>
                    <div class="service-desc">Audio and video processing tools for conversion, trimming, compression, and format optimization. <span class="tools-count">20+ Tools</span></div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🏛️</div>
                    <div class="service-title">Government Document Hub</div>
                    <div class="service-desc">Official document validators for PAN, Aadhaar, GST, and certificate generation with government compliance. <span class="tools-count">15+ Tools</span></div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">💻</div>
                    <div class="service-title">Developer Utilities</div>
                    <div class="service-desc">Essential coding tools including JSON formatter, QR generator, password generator, and development utilities. <span class="tools-count">13+ Tools</span></div>
                </div>
            </div>

            <div class="api-links">
                <a href="/docs" class="api-link">📖 API Documentation</a>
                <a href="/health" class="api-link">💚 Health Check</a>
                <a href="/docs-html" class="api-link">🔧 Service Status</a>
            </div>

            <div class="footer">
                <p>Powered by FastAPI • Microservices Architecture • Real-time Processing</p>
                <p style="margin-top: 10px;">© 2025 Suntyn AI Platform - Professional Grade AI Tools</p>
            </div>
        </div>
    </body>
    </html>
    """

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": "2025-01-31", "services": SERVICES}

@app.get("/api-status", response_model=Dict[str, Any])
async def api_status():
    """JSON API status endpoint"""
    return {
        "message": "Suntyn AI - FastAPI Gateway",
        "status": "active",
        "version": "2.0.0",
        "services": len(SERVICES),
        "microservices": SERVICES,
        "features": [
            "108+ AI-powered tools",
            "Real-time processing",
            "Professional file output",
            "Microservices architecture"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
