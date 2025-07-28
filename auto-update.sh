
#!/bin/bash
# Suntyn AI Auto-Update Script

echo "🔄 Starting Suntyn AI Auto-Update..."

# Update Node.js dependencies
echo "📦 Updating Node.js dependencies..."
npm update
npm audit fix --force

# Update Python dependencies
echo "🐍 Updating Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt --upgrade

# Update system packages (if needed)
echo "🔧 Checking system updates..."
apt-get update > /dev/null 2>&1 || echo "System update not available"

# Clear cache and temporary files
echo "🧹 Cleaning up..."
rm -rf node_modules/.cache
rm -rf uploads/*
rm -rf static/processed-*
rm -rf fastapi_backend/uploads/*

# Reinstall node modules for fresh start
echo "🔄 Reinstalling Node modules..."
rm -rf node_modules
npm install

# Check for security vulnerabilities
echo "🔒 Security audit..."
npm audit --audit-level moderate

# Restart services
echo "🚀 Restarting services..."
pkill -f "uvicorn"
pkill -f "node"
sleep 2

echo "✅ Auto-update completed!"
echo "📝 Run 'npm run dev' to start the application"
