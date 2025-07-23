#!/bin/bash

# Start FastAPI service for heavy processing
echo "Starting Suntyn AI FastAPI Processing Service..."

# Check if Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install required packages
echo "Installing Python dependencies..."
pip install fastapi uvicorn python-multipart

# Start the FastAPI service
echo "Starting FastAPI service on port 8000..."
cd server
python3 fastapi-service.py

echo "FastAPI service started! Available at http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/health"