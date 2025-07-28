"""
Main FastAPI Gateway Server
Routes requests to specific microservices
"""
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import httpx
import os
import uvicorn
from typing import Optional, List
import json

app = FastAPI(title="Suntyn AI - TinyWow Clone", version="2.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

# Microservice URLs
MICROSERVICES = {
    "pdf": "http://localhost:8001",
    "image": "http://localhost:8002", 
    "media": "http://localhost:8003",
    "government": "http://localhost:8004",
    "developer": "http://localhost:8005"
}

# Create uploads directory
os.makedirs("../uploads", exist_ok=True)
os.makedirs("../uploads/processed", exist_ok=True)

# Serve static files
app.mount("/uploads", StaticFiles(directory="../uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "Suntyn AI - TinyWow Clone API Gateway", "status": "active"}

@app.get("/health")
async def health_check():
    """Check health of all microservices"""
    health_status = {}
    
    async with httpx.AsyncClient() as client:
        for service, url in MICROSERVICES.items():
            try:
                response = await client.get(f"{url}/health", timeout=5.0)
                health_status[service] = "healthy" if response.status_code == 200 else "unhealthy"
            except:
                health_status[service] = "down"
    
    return {"status": "ok", "microservices": health_status}

# PDF Tools Endpoints
@app.post("/api/tools/pdf-{tool_name}")
async def process_pdf_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Route PDF tools to PDF microservice"""
    return await route_to_microservice("pdf", f"pdf-{tool_name}", files, metadata)

# Image Tools Endpoints  
@app.post("/api/tools/{tool_name}")
async def process_image_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Route image tools to Image microservice"""
    image_tools = ["bg-remover", "image-resizer", "image-compressor", "image-converter", 
                   "image-flipper", "image-rotator", "image-cropper", "image-filter",
                   "image-blur", "image-sharpen", "image-brightness", "image-contrast",
                   "image-saturation", "image-watermark", "image-border", "image-frames",
                   "meme-generator", "image-collage", "image-metadata-extractor", "image-optimizer"]
    
    if tool_name in image_tools:
        return await route_to_microservice("image", tool_name, files, metadata)
    
    # Check other categories
    media_tools = ["audio-converter", "video-converter", "audio-trimmer", "video-trimmer",
                   "audio-extractor", "video-extractor", "audio-merger", "video-merger",
                   "volume-changer", "speed-changer", "pitch-changer", "audio-reverser",
                   "video-reverser", "noise-reducer", "echo-remover", "audio-normalizer",
                   "video-resizer", "video-cropper", "subtitle-extractor", "gif-maker"]
    
    if tool_name in media_tools:
        return await route_to_microservice("media", tool_name, files, metadata)
    
    government_tools = ["pan-validator", "gst-validator", "aadhaar-validator", "aadhaar-masker",
                       "pan-masker", "bank-validator", "ifsc-validator", "pincode-validator",
                       "voter-id-validator", "passport-validator", "driving-license-validator",
                       "income-certificate", "caste-certificate", "domicile-certificate", "character-certificate"]
    
    if tool_name in government_tools:
        return await route_to_microservice("government", tool_name, files, metadata)
    
    developer_tools = ["json-formatter", "base64-encoder", "hash-generator", "password-generator",
                      "qr-generator", "color-picker", "lorem-ipsum", "url-encoder",
                      "timestamp-converter", "regex-tester", "markdown-to-html", "css-minifier", "js-minifier"]
    
    if tool_name in developer_tools:
        return await route_to_microservice("developer", tool_name, files, metadata)
    
    raise HTTPException(status_code=404, detail=f"Tool {tool_name} not found")

async def route_to_microservice(service: str, tool_name: str, files: List[UploadFile], metadata: Optional[str]):
    """Route request to appropriate microservice"""
    service_url = MICROSERVICES.get(service)
    if not service_url:
        raise HTTPException(status_code=500, detail=f"Service {service} not available")
    
    # Prepare files for forwarding
    files_data = []
    for file in files:
        content = await file.read()
        files_data.append(("files", (file.filename, content, file.content_type)))
    
    # Prepare form data
    form_data = {}
    if metadata:
        form_data["metadata"] = metadata
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{service_url}/process/{tool_name}",
                files=files_data,
                data=form_data,
                timeout=30.0
            )
            return response.json()
        except httpx.TimeoutException:
            raise HTTPException(status_code=504, detail="Processing timeout")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Service error: {str(e)}")

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """Download processed files"""
    file_path = f"uploads/processed/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )