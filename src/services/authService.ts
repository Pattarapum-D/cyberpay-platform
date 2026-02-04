// Mock authentication service for browser compatibility
// In production, this should be replaced with proper backend API calls

export interface AuthResponse {
    success: boolean;
    user?: {
        id: string;
        email: string;
        profile: {
            username?: string;
            display_name?: string;
            avatar_url?: string;
        };
    };
    token?: string;
    message?: string;
}

// Mock user storage (in production, this would be in a real database)
const mockUsers = new Map<string, any>();

// เปลี่ยนจาก mock เป็น API calls จริง
export class AuthService {
    static async register(email: string, password: string, username?: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    user: data.user,
                    token: data.token,
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Registration failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Network error. Please try again.',
            };
        }
    }

    static async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    user: data.user,
                    token: data.token,
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Login failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Network error. Please try again.',
            };
        }
    }

    static async verifyToken(token: string): Promise<{ userId: string; email: string } | null> {
        try {
            const decoded = JSON.parse(atob(token));
            return decoded;
        } catch (error) {
            return null;
        }
    }

    static async getUserById(userId: string): Promise<any | null> {
        try {
            // Find user by ID in mock storage
            for (const [email, user] of mockUsers.entries()) {
                if (user.id === userId) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}