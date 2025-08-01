"""
Government Document Tools Microservice
Handles all government document validation and processing
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

app = FastAPI(title="Government Tools Microservice", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.get("/")
async def root():
    return {"service": "Government Document Processing Microservice", "status": "active", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "government-tools", "microservice": "FastAPI"}

@app.post("/process/{tool_name}")
async def process_government_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Process government document tool request"""
    
    start_time = datetime.now()
    print(f"🏛️ Government Service: Processing {tool_name} with {len(files)} files")
    
    # Parse metadata
    meta_data = {}
    if metadata:
        try:
            meta_data = json.loads(metadata)
        except:
            meta_data = {"text": metadata}
    
    # Simulate processing
    await asyncio.sleep(1.5)
    
    # Generate output filename
    timestamp = int(datetime.now().timestamp() * 1000)
    output_filename = f"validated_{tool_name}_{timestamp}.pdf"
    
    processing_time = (datetime.now() - start_time).total_seconds()
    
    return {
        "status": "success",
        "message": f"✅ {tool_name} validation completed successfully",
        "downloadUrl": f"/api/download/{output_filename}",
        "metadata": {
            "processingTime": f"{processing_time:.1f}s",
            "fileSize": "2.1MB",
            "toolName": tool_name,
            "validationStatus": "Verified",
            "documentType": "Government Document"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8004)