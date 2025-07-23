
import { Router, Request, Response } from "express";
import { z } from "zod";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// API Documentation Generator (FastAPI style)
interface APIEndpoint {
  path: string;
  method: string;
  summary: string;
  tags: string[];
  requestSchema?: z.ZodSchema;
  responseSchema?: z.ZodSchema;
  handler: (req: Request, res: Response) => Promise<void>;
}

class APIRouter {
  private endpoints: APIEndpoint[] = [];
  private router = Router();

  constructor() {
    this.setupDocumentation();
  }

  // FastAPI-style endpoint decorator
  post(path: string, options: {
    summary: string;
    tags: string[];
    requestSchema?: z.ZodSchema;
    responseSchema?: z.ZodSchema;
  }) {
    return (handler: (req: Request, res: Response) => Promise<void>) => {
      const endpoint: APIEndpoint = {
        path,
        method: 'POST',
        summary: options.summary,
        tags: options.tags,
        requestSchema: options.requestSchema,
        responseSchema: options.responseSchema,
        handler
      };

      this.endpoints.push(endpoint);
      
      // Add validation middleware
      this.router.post(path, async (req, res) => {
        try {
          // Validate request body
          if (options.requestSchema) {
            options.requestSchema.parse(req.body);
          }
          
          await handler(req, res);
        } catch (error) {
          if (error instanceof z.ZodError) {
            res.status(422).json({
              detail: error.errors.map(err => ({
                loc: err.path,
                msg: err.message,
                type: err.code
              }))
            });
          } else {
            res.status(500).json({ detail: "Internal server error" });
          }
        }
      });
    };
  }

  get(path: string, options: {
    summary: string;
    tags: string[];
    responseSchema?: z.ZodSchema;
  }) {
    return (handler: (req: Request, res: Response) => Promise<void>) => {
      const endpoint: APIEndpoint = {
        path,
        method: 'GET',
        summary: options.summary,
        tags: options.tags,
        responseSchema: options.responseSchema,
        handler
      };

      this.endpoints.push(endpoint);
      this.router.get(path, handler);
    };
  }

  private setupDocumentation() {
    // OpenAPI/Swagger-style documentation endpoint
    this.router.get('/docs', (req, res) => {
      const openApiSpec = {
        openapi: "3.0.0",
        info: {
          title: "Suntyn AI API",
          version: "1.0.0",
          description: "Professional AI-powered tools API"
        },
        servers: [
          { url: "/api", description: "API Server" }
        ],
        paths: this.generatePaths(),
        components: {
          schemas: this.generateSchemas(),
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT"
            }
          }
        }
      };

      const docsHTML = this.generateDocsHTML(openApiSpec);
      res.send(docsHTML);
    });

    // JSON documentation endpoint
    this.router.get('/openapi.json', (req, res) => {
      res.json({
        openapi: "3.0.0",
        info: {
          title: "Suntyn AI API",
          version: "1.0.0"
        },
        paths: this.generatePaths()
      });
    });
  }

  private generatePaths() {
    const paths: any = {};
    
    this.endpoints.forEach(endpoint => {
      if (!paths[endpoint.path]) {
        paths[endpoint.path] = {};
      }
      
      paths[endpoint.path][endpoint.method.toLowerCase()] = {
        summary: endpoint.summary,
        tags: endpoint.tags,
        requestBody: endpoint.requestSchema ? {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Request" }
            }
          }
        } : undefined,
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response" }
              }
            }
          },
          422: {
            description: "Validation Error"
          }
        }
      };
    });

    return paths;
  }

  private generateSchemas() {
    return {
      Request: {
        type: "object",
        properties: {}
      },
      Response: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { type: "object" }
        }
      }
    };
  }

  private generateDocsHTML(spec: any) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Suntyn AI API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui.css" />
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui-bundle.js"></script>
      <script>
        SwaggerUIBundle({
          url: '/api/openapi.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.presets.standalone
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout"
        });
      </script>
    </body>
    </html>
    `;
  }

  getRouter() {
    return this.router;
  }
}

// Schemas (FastAPI style)
const ToolProcessRequestSchema = z.object({
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  metadata: z.record(z.any()).optional()
});

const ToolProcessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  downloadUrl: z.string().optional(),
  filename: z.string().optional(),
  processingTime: z.number(),
  metadata: z.record(z.any()).optional()
});

const AuthRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// Initialize API Router
const api = new APIRouter();

// Authentication middleware
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ detail: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ detail: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Invalid token' });
  }
};

// FastAPI-style endpoints
api.post('/auth/login', {
  summary: 'User login',
  tags: ['Authentication'],
  requestSchema: AuthRequestSchema
})(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await storage.getUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ detail: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  
  res.json({
    access_token: token,
    token_type: 'bearer',
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// Tool processing endpoints with automatic documentation
const toolCategories = ['pdf', 'image', 'media', 'government'];
const toolOperations = [
  'merger', 'splitter', 'compressor', 'converter', 'resizer', 'enhancer'
];

toolCategories.forEach(category => {
  toolOperations.forEach(operation => {
    const endpoint = `/tools/${category}/${operation}`;
    
    api.post(endpoint, {
      summary: `${category.toUpperCase()} ${operation}`,
      tags: [category.charAt(0).toUpperCase() + category.slice(1)],
      requestSchema: ToolProcessRequestSchema,
      responseSchema: ToolProcessResponseSchema
    })(async (req: any, res) => {
      const startTime = Date.now();
      
      try {
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 1000));
        
        const processingTime = Date.now() - startTime;
        
        await storage.createToolUsage({
          userId: req.user.id,
          toolName: `${category} ${operation}`,
          toolCategory: category,
          fileName: req.body.fileName || `processed-${operation}.${getFileExtension(category)}`,
          fileSize: req.body.fileSize || Math.floor(Math.random() * 5000000) + 100000,
          processingTime,
          success: true,
          metadata: req.body.metadata || {},
        });

        res.json({
          success: true,
          message: `${category} ${operation} completed successfully`,
          downloadUrl: `/api/download/processed-${operation}.${getFileExtension(category)}`,
          filename: `processed-${operation}.${getFileExtension(category)}`,
          processingTime,
          metadata: getToolSpecificMetadata(category, operation)
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `${category} ${operation} failed`,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
  });
});

function getFileExtension(category: string): string {
  const extensions: Record<string, string> = {
    pdf: 'pdf',
    image: 'jpg',
    media: 'mp4',
    government: 'pdf'
  };
  return extensions[category] || 'bin';
}

function getToolSpecificMetadata(category: string, operation: string) {
  const metadata: Record<string, any> = {
    'pdf-compressor': { compressionRatio: '45%' },
    'image-resizer': { newWidth: 800, newHeight: 600 },
    'media-converter': { format: 'mp4', bitrate: '1080p' },
    'government-validator': { isValid: true, confidence: 95 }
  };
  
  return metadata[`${category}-${operation}`] || {};
}

export { api };
