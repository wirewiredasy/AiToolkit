
#!/bin/bash

# Start FastAPI service for heavy processing
echo "Starting Suntyn AI FastAPI Processing Service..."

# Install required packages directly (no virtual environment needed in Replit)
echo "Installing Python dependencies..."
python3 -m pip install --user fastapi uvicorn python-multipart requests

# Start the FastAPI service
echo "Starting FastAPI service on port 8000..."
cd server
python3 fastapi-service.py

echo "FastAPI service started! Available at http://0.0.0.0:8000"
echo "API Documentation: http://0.0.0.0:8000/docs"
echo "Health Check: http://0.0.0.0:8000/health"
