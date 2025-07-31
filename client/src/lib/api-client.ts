// API Client for Suntyn AI platform
const API_BASE = '/api';

export interface ToolProcessResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
  filename?: string;
  processingTime: number;
  metadata?: Record<string, any>;
}

export interface ApiError {
  detail: string | Array<{loc: string[], msg: string, type: string}>;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(Array.isArray(errorData.detail) 
          ? errorData.detail.map((e: any) => e.msg).join(', ')
          : errorData.detail || `HTTP ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Tool processing endpoints
  async processWithTool(toolId: string, files?: FileList, metadata?: Record<string, any>): Promise<ToolProcessResponse> {
    // For demo mode (no auth required)
    const endpoint = `/tools/${toolId}/demo`;
    
    const requestData = {
      toolName: toolId,
      category: this.getCategoryFromToolId(toolId),
      fileName: files?.[0]?.name || 'input-file',
      fileSize: files?.[0]?.size || 1024,
      metadata: metadata || {},
    };

    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  private getCategoryFromToolId(toolId: string): string {
    if (toolId.includes('pdf')) return 'PDF';
    if (toolId.includes('image') || toolId.includes('bg-') || toolId.includes('photo')) return 'Image';
    if (toolId.includes('audio') || toolId.includes('video') || toolId.includes('media')) return 'Media';
    if (toolId.includes('pan') || toolId.includes('gst') || toolId.includes('aadhaar') || toolId.includes('government')) return 'Government';
    return 'Developer';
  }

  // Individual tool endpoints
  async callTool(toolId: string, data: any = {}): Promise<ToolProcessResponse> {
    return this.request(`/tools/${toolId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string, name: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  // Health check
  async health() {
    return this.request('/health');
  }

  // API documentation
  getDocsUrl() {
    return `${API_BASE}/docs`;
  }
}

export const apiClient = new ApiClient();
export default apiClient;