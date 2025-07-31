# Suntyn AI - Deployment Guide

## ✅ Problem Fixed: Vercel Deployment Error

**Issue:** `The 'functions' property cannot be used in conjunction with the 'builds' property`

**Solution:** Updated vercel.json to remove conflicting properties

## 🚀 Vercel Deployment Steps

### Step 1: Updated Configuration
- ✅ Fixed vercel.json (removed builds/functions conflict)
- ✅ Set proper output directory: `dist/public`
- ✅ Configured Vite framework detection

### Step 2: Deploy to Vercel

1. **Go to Vercel:** https://vercel.com/new
2. **Import GitHub repo:** Select your Suntyn AI repository
3. **Configure settings:**
   - Framework: **Vite** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Step 3: Environment Variables
```env
VITE_API_URL=https://your-backend-url.render.com
NODE_ENV=production
```

## 🔧 Backend Deployment (Render.com)

### For Python FastAPI Backend:
1. **Create Web Service on Render**
2. **Use files:**
   - `main.py` (deployment entry point)
   - `requirements-production.txt` (clean dependencies)
   - `render.yaml` (configuration)

3. **Settings:**
   - Build Command: `pip install -r requirements-production.txt`
   - Start Command: `python main.py`
   - Environment: Python 3.12

## 📁 Files Fixed:
- ✅ `vercel.json` - Removed builds/functions conflict
- ✅ `main.py` - Fixed circular import for deployment
- ✅ `requirements-production.txt` - Clean dependencies
- ✅ `render.yaml` - Backend deployment config

## 🎯 Deploy Commands:
```bash
# Frontend (Vercel)
npm run build
# Deploy via Vercel dashboard

# Backend (Render)
# Push to GitHub, deploy via Render dashboard
```

Your deployment should now work without errors!