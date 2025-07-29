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
os.makedirs("fastapi_backend/uploads", exist_ok=True)
os.makedirs("fastapi_backend/uploads/processed", exist_ok=True)

# Serve static files for processed downloads
static_dir = os.path.abspath("../static")
os.makedirs(static_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

print(f"📁 Static files served from: {static_dir}")

@app.get("/api/")
async def root():
    return {"message": "Suntyn AI - TinyWow Clone API Gateway", "status": "active", "version": "2.0.0"}

@app.get("/api")
async def api_root():
    return {"message": "Suntyn AI API Gateway", "status": "active", "endpoints": ["/api/health", "/api/process"]}

@app.get("/api/health")
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

@app.get("/api/tools/download/{filename}")
async def download_processed_file(filename: str):
    """Download processed files from any microservice"""
    # Security validation
    if '..' in filename or '/' in filename or '\\' in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    static_dir = os.path.abspath("../static")
    file_path = os.path.join(static_dir, filename)
    
    print(f"🔍 Searching for file: {file_path}")
    
    try:
        if not os.path.exists(file_path):
            # Check if file is being processed (wait up to 5 seconds)
            for i in range(10):
                if os.path.exists(file_path):
                    break
                await asyncio.sleep(0.5)
            
            if not os.path.exists(file_path):
                print(f"❌ File not found: {file_path}")
                available_files = os.listdir(static_dir) if os.path.exists(static_dir) else []
                print(f"📁 Files in static directory: {available_files}")
                raise HTTPException(
                    status_code=404, 
                    detail=f"File not found: {filename}. Available files: {len(available_files)}"
                )
        
        # Validate file is not corrupted
        file_size = os.path.getsize(file_path)
        if file_size == 0:
            raise HTTPException(status_code=422, detail="File is empty or corrupted")
        
        # Determine media type based on file extension
        media_types = {
            '.pdf': 'application/pdf',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.mp3': 'audio/mpeg',
            '.mp4': 'video/mp4',
            '.json': 'application/json',
            '.txt': 'text/plain',
            '.svg': 'image/svg+xml',
            '.csv': 'text/csv',
            '.html': 'text/html'
        }
        
        file_ext = os.path.splitext(filename)[1].lower()
        media_type = media_types.get(file_ext, 'application/octet-stream')
        
        print(f"✅ Serving file: {filename} ({file_size} bytes) as {media_type}")
        
        # Additional security headers
        headers = {
            "Content-Disposition": f"attachment; filename={filename}",
            "Content-Length": str(file_size),
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "X-Content-Type-Options": "nosniff"
        }
        
        return FileResponse(
            path=file_path,
            media_type=media_type,
            filename=filename,
            headers=headers
        )
        
    except PermissionError:
        raise HTTPException(status_code=403, detail="Permission denied accessing file")
    except OSError as e:
        raise HTTPException(status_code=500, detail=f"File system error: {str(e)}")
    except Exception as e:
        print(f"❌ Unexpected error serving file: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error while serving file")

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
        raise HTTPException(status_code=503, detail=f"Service {service} is currently unavailable")
    
    # Validate file size and type
    total_size = 0
    files_data = []
    
    for file in files:
        if file.size and file.size > 50 * 1024 * 1024:  # 50MB limit
            raise HTTPException(status_code=413, detail=f"File {file.filename} is too large (max 50MB)")
        
        content = await file.read()
        total_size += len(content)
        
        if total_size > 100 * 1024 * 1024:  # 100MB total limit
            raise HTTPException(status_code=413, detail="Total file size exceeds 100MB limit")
            
        files_data.append(("files", (file.filename, content, file.content_type)))
    
    # Prepare form data with validation
    form_data = {}
    if metadata:
        try:
            # Validate JSON if metadata is provided
            if metadata.strip().startswith('{'):
                json.loads(metadata)
            form_data["metadata"] = metadata
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid metadata format")
    
    # Health check for service
    async with httpx.AsyncClient() as client:
        try:
            health_check = await client.get(f"{service_url}/health", timeout=5.0)
            if health_check.status_code != 200:
                raise HTTPException(status_code=503, detail=f"Service {service} is unhealthy")
        except:
            raise HTTPException(status_code=503, detail=f"Service {service} is not responding")
        
        # Process request with retries
        max_retries = 2
        for attempt in range(max_retries + 1):
            try:
                response = await client.post(
                    f"{service_url}/process/{tool_name}",
                    files=files_data,
                    data=form_data,
                    timeout=45.0  # Increased timeout
                )
                
                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 422:
                    raise HTTPException(status_code=422, detail="Invalid input parameters")
                elif response.status_code == 429:
                    if attempt < max_retries:
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                        continue
                    raise HTTPException(status_code=429, detail="Service is busy, please try again later")
                else:
                    response_text = response.text
                    raise HTTPException(status_code=response.status_code, detail=f"Service error: {response_text}")
                    
            except httpx.TimeoutException:
                if attempt < max_retries:
                    await asyncio.sleep(1)
                    continue
                raise HTTPException(status_code=504, detail="Processing timeout - file might be too large or complex")
            except httpx.NetworkError as e:
                if attempt < max_retries:
                    await asyncio.sleep(1)
                    continue
                raise HTTPException(status_code=502, detail=f"Network error connecting to service: {str(e)}")
            except json.JSONDecodeError:
                raise HTTPException(status_code=502, detail="Invalid response from processing service")
            except Exception as e:
                if attempt < max_retries:
                    await asyncio.sleep(1)
                    continue
                raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """Download processed files"""
    file_path = f"../static/{filename}"
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