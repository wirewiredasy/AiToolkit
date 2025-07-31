#!/bin/bash
echo "Testing Vercel build process..."
echo "1. Installing dependencies..."
npm install --verbose 2>&1 | grep -E "(vite|@vitejs)" || echo "Vite not found in install"

echo "2. Testing vite build directly..."
npx vite --version 2>&1 || echo "Vite command not available"

echo "3. Trying vercel-build script..."
npm run vercel-build 2>&1 || echo "vercel-build failed"

echo "4. Checking build output..."
ls -la dist/public/ 2>&1 || echo "No build output found"