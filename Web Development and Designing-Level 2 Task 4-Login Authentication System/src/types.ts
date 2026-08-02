export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role?: string;
  createdAt: string;
  lastLoginAt?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  token: string;
  user: Omit<User, 'passwordHash'> & { passwordHashPreview?: string };
  expiresAt: string;
  loginMethod: 'express_bcrypt' | 'local_sha256';
  loginTimestamp: number;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginDTO {
  identifier: string; // username or email
  password: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'REGISTER_SUCCESS' | 'REGISTER_FAILED' | 'LOGOUT' | 'PASSWORD_CHANGED';
  identifier: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  mode: 'express_bcrypt' | 'local_sha256';
}

export interface PasswordRules {
  minLength: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
  hasSpecial: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
