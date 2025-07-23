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
    const formData = new FormData();
    
    if (files) {
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
    }
    
    formData.append('toolId', toolId);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    return this.request(`/tools/process`, {
      method: 'POST',
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
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