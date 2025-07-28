
"""
Suntyn AI FastAPI Configuration
Environment-based configuration for FastAPI microservices
"""

import os
from dotenv import load_dotenv
from pydantic import BaseSettings
from typing import Optional

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Server Configuration
    HOST: str = os.getenv("FASTAPI_HOST", "0.0.0.0")
    PORT: int = int(os.getenv("FASTAPI_PORT", "5001"))
    RELOAD: bool = os.getenv("FASTAPI_RELOAD", "true").lower() == "true"
    
    # Microservices Ports
    PDF_SERVICE_PORT: int = int(os.getenv("PDF_SERVICE_PORT", "8001"))
    IMAGE_SERVICE_PORT: int = int(os.getenv("IMAGE_SERVICE_PORT", "8002"))
    MEDIA_SERVICE_PORT: int = int(os.getenv("MEDIA_SERVICE_PORT", "8003"))
    GOVERNMENT_SERVICE_PORT: int = int(os.getenv("GOVERNMENT_SERVICE_PORT", "8004"))
    DEVELOPER_SERVICE_PORT: int = int(os.getenv("DEVELOPER_SERVICE_PORT", "8005"))
    
    # File Processing
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    PROCESSED_DIR: str = os.getenv("PROCESSED_DIR", "./static")
    MAX_FILE_SIZE: str = os.getenv("MAX_FILE_SIZE", "50MB")
    TEMP_FILE_CLEANUP_MINUTES: int = int(os.getenv("TEMP_FILE_CLEANUP_MINUTES", "30"))
    PROCESSED_FILE_CLEANUP_SECONDS: int = int(os.getenv("PROCESSED_FILE_CLEANUP_SECONDS", "30"))
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your-jwt-secret-here")
    
    # Performance
    ENABLE_FAST_MODE: bool = os.getenv("ENABLE_FAST_MODE", "true").lower() == "true"
    CACHE_STATIC_FILES: bool = os.getenv("CACHE_STATIC_FILES", "true").lower() == "true"
    ENABLE_COMPRESSION: bool = os.getenv("ENABLE_COMPRESSION", "true").lower() == "true"
    
    # Development
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    
    # CORS Configuration
    CORS_ORIGINS: list = [
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "https://*.replit.dev",
        "https://*.repl.co"
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

def get_service_url(service_name: str) -> str:
    """Get URL for microservice"""
    port_mapping = {
        "pdf": settings.PDF_SERVICE_PORT,
        "image": settings.IMAGE_SERVICE_PORT,
        "media": settings.MEDIA_SERVICE_PORT,
        "government": settings.GOVERNMENT_SERVICE_PORT,
        "developer": settings.DEVELOPER_SERVICE_PORT
    }
    
    port = port_mapping.get(service_name.lower())
    if port:
        return f"http://{settings.HOST}:{port}"
    return f"http://{settings.HOST}:5001"

def get_max_file_size_bytes() -> int:
    """Convert MAX_FILE_SIZE string to bytes"""
    size_str = settings.MAX_FILE_SIZE.upper()
    
    if size_str.endswith('MB'):
        return int(size_str[:-2]) * 1024 * 1024
    elif size_str.endswith('KB'):
        return int(size_str[:-2]) * 1024
    elif size_str.endswith('GB'):
        return int(size_str[:-2]) * 1024 * 1024 * 1024
    else:
        return int(size_str)

# Log configuration on import
if settings.DEBUG:
    print("🔧 FastAPI Configuration Loaded")
    print(f"📊 Mode: {'Development' if settings.DEBUG else 'Production'}")
    print(f"🌐 Host: {settings.HOST}:{settings.PORT}")
    print(f"⚡ Fast Mode: {settings.ENABLE_FAST_MODE}")
