
// Suntyn AI Environment Configuration Loader
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

export const environmentConfig = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 5000,
  
  // FastAPI Configuration
  FASTAPI_HOST: process.env.FASTAPI_HOST || '0.0.0.0',
  FASTAPI_PORT: parseInt(process.env.FASTAPI_PORT) || 5001,
  FASTAPI_RELOAD: process.env.FASTAPI_RELOAD === 'true',
  
  // Microservices Ports
  PDF_SERVICE_PORT: parseInt(process.env.PDF_SERVICE_PORT) || 8001,
  IMAGE_SERVICE_PORT: parseInt(process.env.IMAGE_SERVICE_PORT) || 8002,
  MEDIA_SERVICE_PORT: parseInt(process.env.MEDIA_SERVICE_PORT) || 8003,
  GOVERNMENT_SERVICE_PORT: parseInt(process.env.GOVERNMENT_SERVICE_PORT) || 8004,
  DEVELOPER_SERVICE_PORT: parseInt(process.env.DEVELOPER_SERVICE_PORT) || 8005,
  
  // Static Server
  STATIC_SERVER_PORT: parseInt(process.env.STATIC_SERVER_PORT) || 3001,
  
  // API Configuration
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5001/api',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  PROCESSED_DIR: process.env.PROCESSED_DIR || './static',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '50MB',
  
  // Performance
  ENABLE_FAST_MODE: process.env.ENABLE_FAST_MODE === 'true',
  CACHE_STATIC_FILES: process.env.CACHE_STATIC_FILES === 'true',
  ENABLE_COMPRESSION: process.env.ENABLE_COMPRESSION === 'true',
  
  // Development
  DEBUG: process.env.DEBUG === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  HOT_RELOAD: process.env.HOT_RELOAD === 'true'
};

// Validate required environment variables
const requiredVars = ['NODE_ENV', 'PORT'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
  console.warn('📝 Using default values. Create .env file for custom configuration.');
}

console.log('🔧 Environment configuration loaded successfully');
console.log(`📊 Mode: ${environmentConfig.NODE_ENV}`);
console.log(`🌐 Port: ${environmentConfig.PORT}`);

export default environmentConfig;
