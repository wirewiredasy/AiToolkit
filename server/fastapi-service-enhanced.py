# 🔹 FastAPI Static File Serving for Production
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import io
from typing import List
import aiofiles
import asyncio

app = FastAPI(title="Suntyn AI File Processing API", version="2.0.0")

# Enhanced CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 2. Static file mounting for production deployment
app.mount("/static", StaticFiles(directory="uploads"), name="static")
app.mount("/processed", StaticFiles(directory="uploads/processed"), name="processed")

# Create directories if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("uploads/processed", exist_ok=True)
os.makedirs("uploads/temp", exist_ok=True)

# 🔹 3. Production deployment endpoints with enhanced validation

@app.post("/process-pdf")
async def process_pdf(files: List[UploadFile] = File(...)):
    """Process PDF files with streaming response"""
    try:
        processed_files = []
        
        for file in files:
            # 🔹 File validation
            if file.content_type != "application/pdf":
                raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")
            
            if file.size and file.size > 50 * 1024 * 1024:  # 50MB limit
                raise HTTPException(status_code=400, detail="File too large")
            
            # Read file content
            contents = await file.read()
            
            # Save to temp directory
            temp_path = f"uploads/temp/{file.filename}"
            async with aiofiles.open(temp_path, 'wb') as f:
                await f.write(contents)
            
            # Process and save to processed directory  
            processed_path = f"uploads/processed/processed-{file.filename}"
            async with aiofiles.open(processed_path, 'wb') as f:
                await f.write(contents)  # Placeholder processing
            
            processed_files.append({
                "filename": f"processed-{file.filename}",
                "download_url": f"/processed/processed-{file.filename}",
                "size": len(contents)
            })
            
            # Clean up temp file
            os.remove(temp_path)
        
        return {
            "success": True,
            "message": "PDF processing completed",
            "files": processed_files
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/process-image") 
async def process_image(files: List[UploadFile] = File(...)):
    """Process image files with validation"""
    try:
        allowed_types = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"]
        processed_files = []
        
        for file in files:
            if file.content_type not in allowed_types:
                raise HTTPException(status_code=400, detail=f"Invalid image type: {file.content_type}")
            
            contents = await file.read()
            
            # Process image (placeholder)
            processed_path = f"uploads/processed/processed-{file.filename}"
            async with aiofiles.open(processed_path, 'wb') as f:
                await f.write(contents)
            
            processed_files.append({
                "filename": f"processed-{file.filename}",
                "download_url": f"/processed/processed-{file.filename}",
                "size": len(contents)
            })
        
        return {
            "success": True,
            "message": "Image processing completed", 
            "files": processed_files
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{filename}")
async def download_file(filename: str):
    """Enhanced file download with streaming for large files"""
    file_path = f"uploads/processed/{filename}"
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Get file size
    file_size = os.path.getsize(file_path)
    
    # 🔹 3. Streaming for large files (>10MB)
    if file_size > 10 * 1024 * 1024:
        def iterfile(file_path: str):
            with open(file_path, mode="rb") as file_like:
                yield from file_like
        
        return StreamingResponse(
            iterfile(file_path),
            media_type='application/octet-stream',
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    else:
        # Regular file response for smaller files
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type='application/octet-stream'
        )

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    """🔄 Enhanced FormData upload endpoint"""
    try:
        uploaded_files = []
        
        for file in files:
            # Save uploaded file
            file_path = f"uploads/{file.filename}"
            
            async with aiofiles.open(file_path, 'wb') as f:
                contents = await file.read()
                await f.write(contents)
            
            uploaded_files.append({
                "filename": file.filename,
                "size": len(contents),
                "content_type": file.content_type,
                "url": f"/static/{file.filename}"
            })
        
        return {
            "success": True,
            "message": f"Uploaded {len(uploaded_files)} files",
            "files": uploaded_files
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🔹 Auto cleanup scheduler
async def cleanup_old_files():
    """Clean up files older than 1 hour"""
    import time
    
    while True:
        try:
            current_time = time.time()
            
            # Clean processed files
            for filename in os.listdir("uploads/processed"):
                file_path = os.path.join("uploads/processed", filename)
                if os.path.isfile(file_path):
                    file_age = current_time - os.path.getmtime(file_path)
                    if file_age > 3600:  # 1 hour
                        os.remove(file_path)
                        print(f"🗑️ Auto-cleaned: {filename}")
            
            # Clean temp files (30 minutes)
            for filename in os.listdir("uploads/temp"):
                file_path = os.path.join("uploads/temp", filename)
                if os.path.isfile(file_path):
                    file_age = current_time - os.path.getmtime(file_path)
                    if file_age > 1800:  # 30 minutes
                        os.remove(file_path)
                        print(f"🗑️ Auto-cleaned temp: {filename}")
                        
        except Exception as e:
            print(f"Cleanup error: {e}")
        
        await asyncio.sleep(300)  # Run every 5 minutes

@app.on_event("startup")
async def startup_event():
    """Start background cleanup task"""
    asyncio.create_task(cleanup_old_files())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)