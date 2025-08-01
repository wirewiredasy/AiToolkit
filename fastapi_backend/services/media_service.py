"""
Media Tools Microservice
Handles all video and audio processing operations
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
import uvicorn
import os
import tempfile
from datetime import datetime
import json
import asyncio

app = FastAPI(title="Media Tools Microservice", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.get("/")
async def root():
    return {"service": "Media Processing Microservice", "status": "active", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "media-tools", "microservice": "FastAPI"}

@app.post("/process/{tool_name}")
async def process_media_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Process media tool request"""
    
    start_time = datetime.now()
    print(f"🎬 Media Service: Processing {tool_name} with {len(files)} files")
    
    # Parse metadata
    meta_data = {}
    if metadata:
        try:
            meta_data = json.loads(metadata)
        except:
            meta_data = {"text": metadata}
    
    # Simulate processing
    await asyncio.sleep(1)
    
    # Generate output filename
    timestamp = int(datetime.now().timestamp() * 1000)
    if tool_name.startswith('video'):
        output_filename = f"processed_{tool_name}_{timestamp}.mp4"
        file_size = "15.2MB"
    elif tool_name.startswith('audio'):
        output_filename = f"processed_{tool_name}_{timestamp}.mp3"
        file_size = "3.8MB"
    else:
        output_filename = f"processed_{tool_name}_{timestamp}.mp4"
        file_size = "8.5MB"
    
    processing_time = (datetime.now() - start_time).total_seconds()
    
    return {
        "status": "success",
        "message": f"✅ {tool_name} processing completed successfully",
        "downloadUrl": f"/api/download/{output_filename}",
        "metadata": {
            "processingTime": f"{processing_time:.1f}s",
            "fileSize": file_size,
            "toolName": tool_name,
            "outputFormat": "mp4" if 'video' in tool_name else "mp3"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)