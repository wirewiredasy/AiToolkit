import { LoginInput, SignupInput } from "@shared/schema";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

class AuthService {
  private token: string | null = null;
  private user: AuthUser | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  async login(credentials: LoginInput): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    this.setAuth(data);
    return data;
  }

  async signup(userData: SignupInput): Promise<AuthResponse> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    const data: AuthResponse = await response.json();
    this.setAuth(data);
    return data;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    if (!this.token) return null;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        this.logout();
        return null;
      }

      const data = await response.json();
      this.user = data.user;
      return data.user;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setAuth(authData: AuthResponse): void {
    this.token = authData.token;
    this.user = authData.user;
    localStorage.setItem('auth_token', authData.token);
  }

  getAuthHeaders(): Record<string, string> {
    if (!this.token) {
      throw new Error('No authentication token available');
    }
    return {
      'Authorization': `Bearer ${this.token}`,
    };
  }
}

export const authService = new AuthService();
