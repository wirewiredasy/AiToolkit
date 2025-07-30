"""
Cloudinary Integration Service for FastAPI
Handles media uploads, transformations, and optimizations
"""
from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url
import os
import tempfile
import asyncio
from typing import Optional, List, Dict, Any
import json
import uuid
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Cloudinary Integration Service - Suntyn AI", version="1.0.0")

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
        "service": "Cloudinary Integration Service - Suntyn AI",
        "status": "active",
        "version": "1.0.0",
        "endpoints": [
            "/upload", "/upload-multiple", "/transform", "/delete/{public_id}", 
            "/assets", "/optimize", "/signature"
        ],
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
    folder: Optional[str] = Form("suntyn-ai/uploads"),
    tags: Optional[str] = Form(None),
    transformation: Optional[str] = Form(None)
):
    """Upload a single file to Cloudinary with optional transformations"""
    try:
        # Parse tags
        tag_list = tags.split(',') if tags else ['suntyn-ai']

        # Parse transformation options
        transform_options = {}
        if transformation:
            try:
                transform_options = json.loads(transformation)
            except json.JSONDecodeError:
                pass

        # Upload options
        upload_options = {
            'folder': folder,
            'tags': tag_list,
            'resource_type': 'auto',
            'public_id': f"suntyn-{uuid.uuid4().hex[:12]}_{int(datetime.now().timestamp())}"
        }

        # Add transformations if provided
        if transform_options:
            upload_options['transformation'] = transform_options

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(file.file, **upload_options)

        return JSONResponse({
            "success": True,
            "data": {
                "public_id": result.get('public_id'),
                "version": result.get('version'),
                "signature": result.get('signature'),
                "width": result.get('width'),
                "height": result.get('height'),
                "format": result.get('format'),
                "resource_type": result.get('resource_type'),
                "created_at": result.get('created_at'),
                "tags": result.get('tags', []),
                "bytes": result.get('bytes'),
                "type": result.get('type'),
                "etag": result.get('etag'),
                "url": result.get('url'),
                "secure_url": result.get('secure_url'),
                "original_filename": file.filename
            },
            "message": "File uploaded successfully"
        })

    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.post("/upload-multiple")
async def upload_multiple_files(
    files: List[UploadFile] = File(...),
    folder: Optional[str] = Form("suntyn-ai/uploads"),
    tags: Optional[str] = Form(None)
):
    """Upload multiple files to Cloudinary"""
    try:
        tag_list = tags.split(',') if tags else ['suntyn-ai', 'batch-upload']
        results = []

        for file in files:
            upload_options = {
                'folder': folder,
                'tags': tag_list,
                'resource_type': 'auto',
                'public_id': f"suntyn-batch-{uuid.uuid4().hex[:8]}_{int(datetime.now().timestamp())}"
            }

            result = cloudinary.uploader.upload(file.file, **upload_options)
            results.append({
                "filename": file.filename,
                "public_id": result.get('public_id'),
                "secure_url": result.get('secure_url'),
                "bytes": result.get('bytes')
            })

        return JSONResponse({
            "success": True,
            "data": results,
            "message": f"Successfully uploaded {len(results)} files"
        })

    except Exception as e:
        logger.error(f"Batch upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Batch upload failed: {str(e)}")

@app.post("/transform")
async def transform_image(request: Dict[str, Any] = Body(...)):
    """Apply transformations to existing Cloudinary image"""
    try:
        public_id = request.get('public_id')
        transformations = request.get('transformations', {})

        if not public_id:
            raise HTTPException(status_code=400, detail="public_id is required")

        # Generate URL with transformations
        url = cloudinary.CloudinaryImage(public_id).build_url(**transformations)
        secure_url = url.replace('http://', 'https://')

        return JSONResponse({
            "success": True,
            "data": {
                "url": url,
                "secure_url": secure_url,
                "public_id": public_id,
                "transformations": transformations
            },
            "message": "Transformation applied successfully"
        })

    except Exception as e:
        logger.error(f"Transform error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Transformation failed: {str(e)}")

@app.delete("/delete/{public_id:path}")
async def delete_asset(public_id: str):
    """Delete an asset from Cloudinary"""
    try:
        result = cloudinary.uploader.destroy(public_id)

        if result.get('result') == 'ok':
            return JSONResponse({
                "success": True,
                "message": f"Asset {public_id} deleted successfully"
            })
        else:
            return JSONResponse({
                "success": False,
                "message": f"Failed to delete asset: {result.get('result')}"
            })

    except Exception as e:
        logger.error(f"Delete error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")

@app.get("/assets")
async def list_assets(
    folder: Optional[str] = "suntyn-ai",
    max_results: Optional[int] = 50,
    next_cursor: Optional[str] = None
):
    """List assets from Cloudinary"""
    try:
        options = {
            'type': 'upload',
            'prefix': folder,
            'max_results': max_results
        }

        if next_cursor:
            options['next_cursor'] = next_cursor

        result = cloudinary.api.resources(**options)

        return JSONResponse({
            "success": True,
            "data": {
                "resources": result.get('resources', []),
                "next_cursor": result.get('next_cursor'),
                "total_count": result.get('total_count', 0)
            },
            "message": "Assets retrieved successfully"
        })

    except Exception as e:
        logger.error(f"List assets error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"List assets failed: {str(e)}")

@app.post("/optimize")
async def optimize_media(request: Dict[str, Any] = Body(...)):
    """Optimize image/video for web delivery"""
    try:
        public_id = request.get('public_id')
        media_type = request.get('type', 'image')  # 'image' or 'video'

        if not public_id:
            raise HTTPException(status_code=400, detail="public_id is required")

        if media_type == 'image':
            # Image optimization
            optimized_url = cloudinary.CloudinaryImage(public_id).build_url(
                quality='auto',
                fetch_format='auto',
                dpr='auto',
                width='auto',
                crop='scale'
            )
        else:
            # Video optimization
            optimized_url = cloudinary.CloudinaryVideo(public_id).build_url(
                quality='auto',
                fetch_format='auto'
            )

        return JSONResponse({
            "success": True,
            "data": {
                "optimized_url": optimized_url.replace('http://', 'https://'),
                "public_id": public_id,
                "type": media_type
            },
            "message": "Media optimized successfully"
        })

    except Exception as e:
        logger.error(f"Optimize error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Optimization failed: {str(e)}")

@app.post("/signature")
async def generate_signature(request: Dict[str, Any] = Body(...)):
    """Generate signature for client-side uploads"""
    try:
        params_to_sign = request.get('params_to_sign', {})
        timestamp = params_to_sign.get('timestamp', int(datetime.now().timestamp()))

        # Add timestamp if not provided
        params_to_sign['timestamp'] = timestamp

        signature = cloudinary.utils.api_sign_request(
            params_to_sign, 
            cloudinary.config().api_secret
        )

        return JSONResponse({
            "success": True,
            "data": {
                "signature": signature,
                "timestamp": timestamp,
                "api_key": cloudinary.config().api_key,
                "cloud_name": cloudinary.config().cloud_name
            },
            "message": "Signature generated successfully"
        })

    except Exception as e:
        logger.error(f"Signature error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Signature generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8006, reload=True)