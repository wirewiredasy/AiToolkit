"""
Developer Tools Microservice
Handles all developer tools like JSON formatter, XML validator, etc.
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

app = FastAPI(title="Developer Tools Microservice", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.get("/")
async def root():
    return {"service": "Developer Tools Microservice", "status": "active", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "developer-tools", "microservice": "FastAPI"}

@app.post("/process/{tool_name}")
async def process_developer_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Process developer tool request"""
    
    start_time = datetime.now()
    print(f"👨‍💻 Developer Service: Processing {tool_name} with {len(files)} files")
    
    # Parse metadata
    meta_data = {}
    if metadata:
        try:
            meta_data = json.loads(metadata)
        except:
            meta_data = {"text": metadata}
    
    # Simulate processing
    await asyncio.sleep(0.8)
    
    # Generate output filename
    timestamp = int(datetime.now().timestamp() * 1000)
    
    if 'json' in tool_name:
        output_filename = f"formatted_{tool_name}_{timestamp}.json"
        ext = "json"
    elif 'xml' in tool_name:
        output_filename = f"formatted_{tool_name}_{timestamp}.xml"
        ext = "xml"
    elif 'code' in tool_name:
        output_filename = f"minified_{tool_name}_{timestamp}.js"
        ext = "js"
    else:
        output_filename = f"processed_{tool_name}_{timestamp}.txt"
        ext = "txt"
    
    processing_time = (datetime.now() - start_time).total_seconds()
    
    return {
        "status": "success",
        "message": f"✅ {tool_name} processing completed successfully",
        "downloadUrl": f"/api/download/{output_filename}",
        "metadata": {
            "processingTime": f"{processing_time:.1f}s",
            "fileSize": "145KB",
            "toolName": tool_name,
            "outputFormat": ext,
            "linesProcessed": 1247
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)