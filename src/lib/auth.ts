// Admin authentication for Vercel-only admin panel

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Simple JWT token handling
export const generateToken = (user: AdminUser): string => {
  const payload = {
    username: user.username,
    isAuthenticated: user.isAuthenticated,
    timestamp: Date.now(),
  };
  
  // Simple base64 encoding (for demo - in production use proper JWT)
  return btoa(JSON.stringify(payload));
};

export const verifyToken = (token: string): AdminUser | null => {
  try {
    const payload = JSON.parse(atob(token));
    
    // Check if token is older than 30 minutes
    const now = Date.now();
    const tokenAge = now - payload.timestamp;
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    if (tokenAge > maxAge) {
      return null;
    }
    
    return {
      username: payload.username,
      isAuthenticated: payload.isAuthenticated,
    };
  } catch {
    return null;
  }
};

export const validateCredentials = (credentials: LoginCredentials): boolean => {
  // Admin credentials MUST be set in environment variables for security
  const adminUsername = import.meta.env.VITE_ADMIN_USER;
  const adminPassword = import.meta.env.VITE_ADMIN_PASS;
  
  // Fail fast if credentials are not set
  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured. Please set VITE_ADMIN_USER and VITE_ADMIN_PASS environment variables.');
    return false;
  }
  
  return credentials.username === adminUsername && credentials.password === adminPassword;
};
