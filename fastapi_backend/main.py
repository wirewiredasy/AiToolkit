"""
Main FastAPI Gateway Server
Routes requests to specific microservices
"""
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import os
import uvicorn
from typing import Optional, List
import json
import asyncio
import logging
from datetime import datetime
import time
from collections import defaultdict
import hashlib
import secrets
from typing import Dict, List
from pathlib import Path


app = FastAPI(title="Suntyn AI - TinyWow Clone", version="2.0.0")

# Configure logging for better error tracking
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Security Middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["*"]  # Configure with your actual domains in production
)

# Rate Limiting Storage
rate_limit_storage: Dict[str, List[float]] = defaultdict(list)
RATE_LIMIT_REQUESTS = 100  # requests per window
RATE_LIMIT_WINDOW = 900   # 15 minutes in seconds

def get_client_ip(request: Request) -> str:
    """Get real client IP address"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

def is_rate_limited(client_ip: str) -> bool:
    """Check if client is rate limited"""
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW

    # Clean old requests
    rate_limit_storage[client_ip] = [
        req_time for req_time in rate_limit_storage[client_ip] 
        if req_time > window_start
    ]

    # Check if over limit
    if len(rate_limit_storage[client_ip]) >= RATE_LIMIT_REQUESTS:
        return True

    # Add current request
    rate_limit_storage[client_ip].append(now)
    return False

@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    """Add security headers and rate limiting"""

    # Rate limiting check
    client_ip = get_client_ip(request)
    if is_rate_limited(client_ip):
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Try again later."
        )

    response = await call_next(request)

    # Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"

    return response

# CORS Configuration (More restrictive)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",
        "https://*.replit.dev",
        "https://*.repl.co",
        "https://suntyn.ai"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
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

@app.get("/")
async def root():
    """Root endpoint for health check"""
    return {"message": "Suntyn AI - FastAPI Gateway", "status": "active", "version": "2.0.0", "services": len(MICROSERVICES)}

@app.get("/api/")
async def api_root():
    return {"message": "Suntyn AI - TinyWow Clone API Gateway", "status": "active", "version": "2.0.0"}

@app.get("/api")
async def api_endpoint():
    return {"message": "Suntyn AI API Gateway", "status": "active", "endpoints": ["/api/health", "/api/process"]}

@app.get("/api/health")
async def health_check():
    """Check health of all microservices with enhanced monitoring"""
    health_status = {}
    overall_status = "healthy"
    timestamp = datetime.now().isoformat()

    async with httpx.AsyncClient() as client:
        for service, url in MICROSERVICES.items():
            try:
                start_time = datetime.now()
                response = await client.get(f"{url}/health", timeout=10.0)
                response_time = (datetime.now() - start_time).total_seconds()

                if response.status_code == 200:
                    health_status[service] = {
                        "status": "healthy",
                        "response_time_ms": round(response_time * 1000, 2),
                        "url": url
                    }
                else:
                    health_status[service] = {
                        "status": "unhealthy",
                        "status_code": response.status_code,
                        "url": url
                    }
                    overall_status = "degraded"

            except httpx.TimeoutException:
                health_status[service] = {
                    "status": "timeout",
                    "error": "Service response timeout",
                    "url": url
                }
                overall_status = "degraded"
            except httpx.NetworkError as e:
                health_status[service] = {
                    "status": "down",
                    "error": f"Network error: {str(e)}",
                    "url": url
                }
                overall_status = "degraded"
            except Exception as e:
                health_status[service] = {
                    "status": "error",
                    "error": f"Unknown error: {str(e)}",
                    "url": url
                }
                overall_status = "degraded"
                logger.error(f"Health check error for {service}: {str(e)}")

    return {
        "status": overall_status,
        "timestamp": timestamp,
        "microservices": health_status,
        "total_services": len(MICROSERVICES),
        "healthy_services": len([s for s in health_status.values() if s.get("status") == "healthy"])
    }

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

# All Tools Endpoints (Fixed routing)
@app.post("/tools/{tool_name}")
async def route_tool_request(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Route tool requests to appropriate microservice"""
    return await process_tool_routing(tool_name, files, metadata)

@app.post("/api/tools/{tool_name}")
async def process_tool_routing(
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
                   "video-resizer", "video-cropper", "subtitle-extractor", "gif-maker",
                   "vocal-remover", "audio-compressor", "video-compressor", "gif-to-video",
                   "video-to-gif", "video-stabilizer", "audio-enhancer"]

    if tool_name in media_tools:
        return await route_to_microservice("media", tool_name, files, metadata)

    government_tools = ["pan-validator", "gst-validator", "aadhaar-validator", "aadhaar-masker",
                       "pan-masker", "bank-validator", "ifsc-validator", "pincode-validator",
                       "voter-id-validator", "passport-validator", "driving-license-validator",
                       "income-certificate", "caste-certificate", "domicile-certificate", 
                       "character-certificate", "birth-certificate", "death-certificate",
                       "ration-card-status", "shop-act-licence-validator"]

    if tool_name in government_tools:
        return await route_to_microservice("government", tool_name, files, metadata)

    developer_tools = ["json-formatter", "base64-encoder", "hash-generator", "password-generator",
                      "qr-generator", "color-picker", "lorem-ipsum", "url-encoder",
                      "timestamp-converter", "regex-tester", "markdown-to-html", "css-minifier", "js-minifier"]

    if tool_name in developer_tools:
        return await route_to_microservice("developer", tool_name, files, metadata)

    raise HTTPException(status_code=404, detail=f"Tool {tool_name} not found")

def validate_file_security(filename: str, content: bytes) -> bool:
    """Validate file for security threats"""

    # Check filename for path traversal
    if ".." in filename or "/" in filename or "\\" in filename:
        return False

    # Check for executable file extensions
    dangerous_extensions = {
        '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', 
        '.js', '.jar', '.sh', '.ps1', '.php', '.asp', '.jsp'
    }

    file_ext = Path(filename).suffix.lower()
    if file_ext in dangerous_extensions:
        return False

    # Check file content for suspicious patterns
    content_str = content[:1024].decode('utf-8', errors='ignore').lower()
    suspicious_patterns = ['<script', 'javascript:', 'data:text/html', 'vbscript:']

    for pattern in suspicious_patterns:
        if pattern in content_str:
            return False

    return True

async def route_to_microservice(service: str, tool_name: str, files: List[UploadFile], metadata: Optional[str]):
    """Route request to appropriate microservice with enhanced error handling"""
    request_id = f"{service}_{tool_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    logger.info(f"[{request_id}] Processing request for {tool_name} via {service} service")

    service_url = MICROSERVICES.get(service)
    if not service_url:
        logger.error(f"[{request_id}] Service {service} not found in MICROSERVICES")
        raise HTTPException(status_code=503, detail=f"Service {service} is currently unavailable")

    # Enhanced file validation with detailed logging
    total_size = 0
    files_data = []

    try:
        for i, file in enumerate(files):
            # Validate file existence and basic properties
            if not file.filename:
                raise HTTPException(status_code=400, detail=f"File {i+1} has no filename")

            # Read file content with size validation
            content = await file.read()
            file_size = len(content)
            total_size += file_size

            logger.info(f"[{request_id}] File {i+1}: {file.filename} ({file_size} bytes, {file.content_type})")

            # Individual file size check
            if file_size > 50 * 1024 * 1024:  # 50MB limit
                raise HTTPException(
                    status_code=413, 
                    detail=f"File '{file.filename}' is too large ({file_size/1024/1024:.1f}MB). Maximum allowed: 50MB"
                )

            # Total size check
            if total_size > 100 * 1024 * 1024:  # 100MB total limit
                raise HTTPException(
                    status_code=413, 
                    detail=f"Total file size ({total_size/1024/1024:.1f}MB) exceeds 100MB limit"
                )

            # Validate file content (basic checks for common issues)
            if file_size == 0:
                raise HTTPException(status_code=400, detail=f"File '{file.filename}' is empty")

            # Security: Validate file
            if not validate_file_security(file.filename or "unknown", content):
                raise HTTPException(status_code=400, detail="File type not allowed for security reasons")

            files_data.append(("files", (file.filename, content, file.content_type)))

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"[{request_id}] File processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing uploaded files: {str(e)}")

    # Enhanced metadata validation
    form_data = {}
    if metadata:
        try:
            # Validate JSON if metadata looks like JSON
            if metadata.strip().startswith('{') and metadata.strip().endswith('}'):
                parsed_metadata = json.loads(metadata)
                logger.info(f"[{request_id}] Metadata validated: {list(parsed_metadata.keys())}")
            form_data["metadata"] = metadata
        except json.JSONDecodeError as e:
            logger.error(f"[{request_id}] Invalid metadata JSON: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid metadata format: {str(e)}")

    # Enhanced service health check
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            start_time = datetime.now()
            health_response = await client.get(f"{service_url}/health", timeout=10.0)
            health_time = (datetime.now() - start_time).total_seconds()

            if health_response.status_code != 200:
                logger.warning(f"[{request_id}] Service {service} health check failed: {health_response.status_code}")
                raise HTTPException(
                    status_code=503, 
                    detail=f"Service {service} is unhealthy (status: {health_response.status_code})"
                )

            logger.info(f"[{request_id}] Service {service} health check passed ({health_time:.2f}s)")

        except httpx.TimeoutException:
            logger.error(f"[{request_id}] Service {service} health check timeout")
            raise HTTPException(status_code=503, detail=f"Service {service} health check timeout")
        except httpx.NetworkError as e:
            logger.error(f"[{request_id}] Service {service} network error: {str(e)}")
            raise HTTPException(status_code=503, detail=f"Service {service} is not responding")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"[{request_id}] Service {service} health check error: {str(e)}")
            raise HTTPException(status_code=503, detail=f"Service {service} health check failed")

        # Enhanced processing with retries and detailed error handling
        max_retries = 3
        base_delay = 1.0

        for attempt in range(max_retries + 1):
            try:
                logger.info(f"[{request_id}] Attempt {attempt + 1}/{max_retries + 1} - Sending to {service_url}/process/{tool_name}")

                start_time = datetime.now()
                response = await client.post(
                    f"{service_url}/process/{tool_name}",
                    files=files_data,
                    data=form_data,
                    timeout=60.0  # Increased timeout for complex processing
                )
                processing_time = (datetime.now() - start_time).total_seconds()

                logger.info(f"[{request_id}] Response received: {response.status_code} ({processing_time:.2f}s)")

                if response.status_code == 200:
                    try:
                        result = response.json()
                        logger.info(f"[{request_id}] Processing successful")
                        return result
                    except json.JSONDecodeError as e:
                        logger.error(f"[{request_id}] Invalid JSON response: {str(e)}")
                        raise HTTPException(status_code=502, detail="Invalid response format from processing service")

                elif response.status_code == 400:
                    error_detail = "Invalid request parameters"
                    try:
                        error_data = response.json()
                        error_detail = error_data.get("detail", error_detail)
                    except:
                        pass
                    logger.warning(f"[{request_id}] Bad request: {error_detail}")
                    raise HTTPException(status_code=400, detail=error_detail)

                elif response.status_code == 413:
                    logger.warning(f"[{request_id}] File too large")
                    raise HTTPException(status_code=413, detail="File size exceeds service limits")

                elif response.status_code == 415:
                    logger.warning(f"[{request_id}] Unsupported media type")
                    raise HTTPException(status_code=415, detail="Unsupported file type for this tool")

                elif response.status_code == 422:
                    error_detail = "Invalid input parameters"
                    try:
                        error_data = response.json()
                        error_detail = error_data.get("detail", error_detail)
                    except:
                        pass
                    logger.warning(f"[{request_id}] Validation error: {error_detail}")
                    raise HTTPException(status_code=422, detail=error_detail)

                elif response.status_code == 429:
                    if attempt < max_retries:
                        delay = base_delay * (2 ** attempt)  # Exponential backoff
                        logger.warning(f"[{request_id}] Rate limited, retrying in {delay}s")
                        await asyncio.sleep(delay)
                        continue
                    logger.error(f"[{request_id}] Rate limit exceeded after retries")
                    raise HTTPException(status_code=429, detail="Service is busy, please try again later")

                elif response.status_code >= 500:
                    if attempt < max_retries:
                        delay = base_delay * (2 ** attempt)
                        logger.warning(f"[{request_id}] Server error {response.status_code}, retrying in {delay}s")
                        await asyncio.sleep(delay)
                        continue
                    logger.error(f"[{request_id}] Server error {response.status_code} after retries")
                    raise HTTPException(status_code=502, detail="Processing service encountered an error")
                else:
                    response_text = response.text[:200] if response.text else "No response text"
                    logger.error(f"[{request_id}] Unexpected status {response.status_code}: {response_text}")
                    raise HTTPException(
                        status_code=response.status_code, 
                        detail=f"Service returned unexpected status: {response.status_code}"
                    )

            except httpx.TimeoutException:
                if attempt < max_retries:
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"[{request_id}] Request timeout, retrying in {delay}s")
                    await asyncio.sleep(delay)
                    continue
                logger.error(f"[{request_id}] Final timeout after {max_retries} retries")
                raise HTTPException(
                    status_code=504, 
                    detail="Processing timeout - file might be too large or complex"
                )

            except httpx.NetworkError as e:
                if attempt < max_retries:
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"[{request_id}] Network error, retrying in {delay}s: {str(e)}")
                    await asyncio.sleep(delay)
                    continue
                logger.error(f"[{request_id}] Network error after retries: {str(e)}")
                raise HTTPException(
                    status_code=502, 
                    detail=f"Network error connecting to processing service"
                )

            except HTTPException:
                raise

            except Exception as e:
                if attempt < max_retries:
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"[{request_id}] Unexpected error, retrying in {delay}s: {str(e)}")
                    await asyncio.sleep(delay)
                    continue
                logger.error(f"[{request_id}] Unexpected error after retries: {str(e)}")
                raise HTTPException(status_code=500, detail="An unexpected error occurred during processing")

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

async def upload_file(file: UploadFile = File(...)):
    """Upload and process file with security validation"""
    try:
        # Security: Check file size
        if file.size and file.size > 50 * 1024 * 1024:  # 50MB limit
            raise HTTPException(status_code=413, detail="File too large")

        # Read file content for validation
        content = await file.read()

        # Security: Validate file
        if not validate_file_security(file.filename or "unknown", content):
            raise HTTPException(status_code=400, detail="File type not allowed for security reasons")

        # Reset file position
        await file.seek(0)

        # Create uploads directory if it doesn't exist
        uploads_dir = Path("uploads")
        uploads_dir.mkdir(exist_ok=True)

        file_path = uploads_dir / file.filename
        with open(file_path, "wb") as f:
            while content := await file.read(1024 * 1024):
                f.write(content)
        return {"filename": file.filename}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )