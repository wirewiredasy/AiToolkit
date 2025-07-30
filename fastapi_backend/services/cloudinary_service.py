"""
Cloudinary Integration Service for FastAPI
Handles media uploads, transformations, and optimizations
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url
import os
import tempfile
import asyncio
from typing import Optional, Dict, Any
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Cloudinary Integration Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME", "dimyd0tdl"),
    api_key=os.getenv("CLOUDINARY_API_KEY", "559832996883783"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET", "92dxr3N-B4Q6_8_inYLbQo3xu3Q"),
    secure=True
)

@app.get("/")
async def root():
    return {
        "service": "Cloudinary Integration Service",
        "status": "active",
        "version": "1.0.0",
        "cloud_name": os.getenv("CLOUDINARY_CLOUD_NAME", "dimyd0tdl")
    }

@app.get("/health")
async def health_check():
    try:
        # Test Cloudinary connection
        result = cloudinary.api.ping()
        return {
            "status": "healthy",
            "service": "cloudinary-integration",
            "cloudinary_status": "connected"
        }
    except Exception as e:
        return {
            "status": "degraded",
            "service": "cloudinary-integration",
            "cloudinary_status": "error",
            "error": str(e)
        }

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    folder: Optional[str] = Form(None),
    public_id: Optional[str] = Form(None),
    transformation: Optional[str] = Form(None)
):
    """Upload file to Cloudinary with optional transformations"""
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        # Prepare upload options
        upload_options = {
            "resource_type": "auto",
            "quality": "auto",
            "fetch_format": "auto"
        }

        if folder:
            upload_options["folder"] = folder
        if public_id:
            upload_options["public_id"] = public_id
        if transformation:
            try:
                trans_data = json.loads(transformation)
                upload_options.update(trans_data)
            except json.JSONDecodeError:
                logger.warning(f"Invalid transformation JSON: {transformation}")

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(temp_file_path, **upload_options)

        # Clean up temp file
        os.unlink(temp_file_path)

        return {
            "success": True,
            "public_id": result["public_id"],
            "secure_url": result["secure_url"],
            "url": result["url"],
            "width": result.get("width"),
            "height": result.get("height"),
            "format": result["format"],
            "resource_type": result["resource_type"],
            "bytes": result["bytes"],
            "duration": result.get("duration"),
            "created_at": result["created_at"]
        }

    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.post("/upload-multiple")
async def upload_multiple_files(
    files: list[UploadFile] = File(...),
    folder: Optional[str] = Form(None)
):
    """Upload multiple files to Cloudinary"""
    results = []
    errors = []

    for i, file in enumerate(files):
        try:
            # Create temporary file
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                content = await file.read()
                temp_file.write(content)
                temp_file_path = temp_file.name

            # Upload options
            upload_options = {
                "resource_type": "auto",
                "quality": "auto",
                "fetch_format": "auto"
            }
            
            if folder:
                upload_options["folder"] = folder

            # Upload to Cloudinary
            result = cloudinary.uploader.upload(temp_file_path, **upload_options)

            # Clean up temp file
            os.unlink(temp_file_path)

            results.append({
                "success": True,
                "file_index": i,
                "filename": file.filename,
                "public_id": result["public_id"],
                "secure_url": result["secure_url"],
                "format": result["format"],
                "bytes": result["bytes"]
            })

        except Exception as e:
            errors.append({
                "file_index": i,
                "filename": file.filename,
                "error": str(e)
            })

    return {
        "success": len(results) > 0,
        "uploaded": len(results),
        "failed": len(errors),
        "results": results,
        "errors": errors if errors else None
    }

@app.post("/transform")
async def transform_image(
    public_id: str = Form(...),
    transformations: str = Form(...)
):
    """Generate transformed image URL"""
    try:
        trans_data = json.loads(transformations)
        
        # Generate transformed URL
        transformed_url, options = cloudinary_url(public_id, **trans_data)
        
        return {
            "success": True,
            "public_id": public_id,
            "original_url": cloudinary_url(public_id)[0],
            "transformed_url": transformed_url,
            "transformations": trans_data
        }

    except Exception as e:
        logger.error(f"Transform error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Transform failed: {str(e)}")

@app.post("/signature")
async def generate_signature(
    folder: Optional[str] = None,
    public_id: Optional[str] = None
):
    """Generate signature for direct uploads"""
    try:
        import time
        
        timestamp = int(time.time())
        params = {
            "timestamp": timestamp,
            "folder": folder or "suntyn-ai"
        }
        
        if public_id:
            params["public_id"] = public_id

        signature = cloudinary.utils.api_sign_request(
            params, 
            os.getenv("CLOUDINARY_API_SECRET")
        )

        return {
            "signature": signature,
            "timestamp": timestamp,
            "api_key": os.getenv("CLOUDINARY_API_KEY"),
            "cloud_name": os.getenv("CLOUDINARY_CLOUD_NAME"),
            "folder": params["folder"]
        }

    except Exception as e:
        logger.error(f"Signature error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Signature generation failed: {str(e)}")

@app.delete("/delete/{public_id}")
async def delete_asset(public_id: str, resource_type: str = "image"):
    """Delete asset from Cloudinary"""
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        
        return {
            "success": result["result"] == "ok",
            "public_id": public_id,
            "result": result["result"]
        }

    except Exception as e:
        logger.error(f"Delete error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")

@app.get("/assets")
async def list_assets(
    resource_type: str = "image",
    max_results: int = 50,
    next_cursor: Optional[str] = None
):
    """List assets from Cloudinary"""
    try:
        params = {
            "resource_type": resource_type,
            "max_results": max_results
        }
        
        if next_cursor:
            params["next_cursor"] = next_cursor

        result = cloudinary.api.resources(**params)
        
        return {
            "success": True,
            "resources": result["resources"],
            "next_cursor": result.get("next_cursor"),
            "rate_limit_remaining": result.get("rate_limit_remaining")
        }

    except Exception as e:
        logger.error(f"List assets error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"List assets failed: {str(e)}")

@app.post("/optimize")
async def optimize_media(
    public_id: str = Form(...),
    media_type: str = Form("image")  # image, video, auto
):
    """Generate optimized URLs for different media types"""
    try:
        optimizations = {}
        
        if media_type == "image":
            # Image optimizations
            optimizations = {
                "auto_quality": cloudinary_url(public_id, quality="auto")[0],
                "auto_format": cloudinary_url(public_id, fetch_format="auto")[0],
                "optimized": cloudinary_url(public_id, quality="auto", fetch_format="auto")[0],
                "webp": cloudinary_url(public_id, format="webp", quality="auto")[0],
                "thumbnail": cloudinary_url(public_id, width=300, height=300, crop="auto")[0]
            }
        elif media_type == "video":
            # Video optimizations
            optimizations = {
                "auto_quality": cloudinary_url(public_id, resource_type="video", quality="auto")[0],
                "compressed": cloudinary_url(public_id, resource_type="video", quality="auto", video_codec="auto")[0],
                "thumbnail": cloudinary_url(public_id, resource_type="video", format="jpg")[0]
            }
        
        return {
            "success": True,
            "public_id": public_id,
            "media_type": media_type,
            "original_url": cloudinary_url(public_id)[0],
            "optimizations": optimizations
        }

    except Exception as e:
        logger.error(f"Optimize error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Optimize failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8006, reload=True)