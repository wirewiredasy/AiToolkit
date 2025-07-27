
#!/bin/bash

# Start FastAPI service for heavy processing
echo "Starting Suntyn AI FastAPI Processing Service..."

# Install required packages directly (no virtual environment needed in Replit)
echo "Installing Python dependencies..."
pip install fastapi uvicorn python-multipart

# Start the FastAPI service
echo "Starting FastAPI service on port 8000..."
cd server
python3 fastapi-service.py

echo "FastAPI service started! Available at http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/health"
