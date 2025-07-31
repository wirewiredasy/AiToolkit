#!/bin/bash
# Clean Deployment Script - Bypasses conflicted requirements.txt

echo "🧹 CLEAN DEPLOYMENT - Fixing uvicorn conflicts..."

# Step 1: Uninstall ALL conflicting packages
echo "❌ Removing conflicted packages..."
pip uninstall -y fastapi uvicorn starlette pydantic

# Step 2: Install EXACT clean versions
echo "✅ Installing clean versions..."
pip install fastapi==0.116.1
pip install "uvicorn[standard]==0.35.0"
pip install python-multipart==0.0.20
pip install httpx==0.28.1
pip install requests==2.32.4

# Step 3: Install other essentials
echo "📦 Installing other packages..."
pip install pypdf==5.9.0
pip install pypdf2==3.0.1
pip install reportlab==4.4.3
pip install "Pillow==11.3.0"
pip install python-dotenv==1.1.1
pip install "pydantic==2.11.7"
pip install cloudinary==1.44.1
pip install rembg==2.0.67
pip install aiofiles==24.1.0

echo "✅ Clean installation completed!"
echo "🚀 Starting application..."
uvicorn main:app --host=0.0.0.0 --port=${PORT:-10000}