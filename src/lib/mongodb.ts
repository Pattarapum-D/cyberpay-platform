// MongoDB API Client
// This file contains functions to interact with your MongoDB backend server

const MONGODB_API_URL = import.meta.env.VITE_MONGODB_API_URL;

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UserData {
  _id?: string;
  email: string;
  createdAt?: string;
}

interface AuthResponse {
  user: UserData;
  token: string;
}

// Helper function for making API requests
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${MONGODB_API_URL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    };
  }
}

// ==================== Auth API ====================

export async function registerUser(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  return fetchApi<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function loginUser(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  return fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
}

export async function getCurrentUser(): Promise<UserData | null> {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    try {
      return JSON.parse(userData) as UserData;
    } catch {
      return null;
    }
  }
  return null;
}

export async function resetPassword(email: string): Promise<ApiResponse> {
  return fetchApi('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function updatePassword(token: string, newPassword: string): Promise<ApiResponse> {
  return fetchApi('/auth/update-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

// ==================== Session Management ====================

export function saveAuthSession(token: string, user: UserData): void {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_data', JSON.stringify(user));
}

export function clearAuthSession(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('auth_token');
}
