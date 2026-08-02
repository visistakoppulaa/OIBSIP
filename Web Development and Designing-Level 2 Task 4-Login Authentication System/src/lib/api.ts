import { AuthSession, LoginDTO, RegisterDTO, SecurityLog, User } from '../types';
import { hashPasswordSHA256 } from './cryptoUtils';

export type AuthMode = 'express_bcrypt' | 'local_sha256';

const MODE_KEY = 'auth_app_active_mode_v1';
const SESSION_KEY = 'auth_app_session_v1';
const LOCAL_USERS_KEY = 'auth_app_local_users_v1';
const LOCAL_LOGS_KEY = 'auth_app_local_logs_v1';

export function getActiveAuthMode(): AuthMode {
  const stored = localStorage.getItem(MODE_KEY);
  return (stored as AuthMode) || 'express_bcrypt';
}

export function setActiveAuthMode(mode: AuthMode): void {
  localStorage.setItem(MODE_KEY, mode);
}

// LocalStorage helpers for Client-Side Mode
function getLocalUsers(): User[] {
  const data = localStorage.getItem(LOCAL_USERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLocalUsers(users: User[]) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getLocalLogs(): SecurityLog[] {
  const data = localStorage.getItem(LOCAL_LOGS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function addLocalLog(type: SecurityLog['type'], identifier: string, details: string) {
  const logs = getLocalLogs();
  const newLog: SecurityLog = {
    id: `log_local_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    type,
    identifier,
    details,
    ipAddress: '127.0.0.1 (Client)',
    userAgent: navigator.userAgent || 'Browser Client',
    mode: 'local_sha256',
  };
  logs.unshift(newLog);
  if (logs.length > 50) logs.pop();
  localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs));
}

export function getCurrentSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const session: AuthSession = JSON.parse(raw);
    // Check expiration
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ==================== AUTH API ENGINE ====================

export async function apiRegister(dto: RegisterDTO, mode: AuthMode = getActiveAuthMode()) {
  const { username, email, password } = dto;
  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim().toLowerCase();

  // Validate inputs
  if (!trimmedUsername || !trimmedEmail || !password) {
    throw new Error('All fields are required.');
  }

  if (trimmedUsername.length < 3) {
    throw new Error('Username must be at least 3 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least 1 number.');
  }

  // --- MODE A: Express Backend (bcrypt) ---
  if (mode === 'express_bcrypt') {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, email: trimmedEmail, password }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Registration failed.');
      }
      return json;
    } catch (err: any) {
      if (err.message && err.message.includes('fetch')) {
        // Fallback info
        throw new Error('Express server connection offline. Try switching to LocalStorage mode.');
      }
      throw err;
    }
  }

  // --- MODE B: Client-Side LocalStorage (SHA-256) ---
  const users = getLocalUsers();
  const existing = users.find(
    (u) =>
      u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
      u.email.toLowerCase() === trimmedEmail
  );

  if (existing) {
    const field = existing.email.toLowerCase() === trimmedEmail ? 'email' : 'username';
    addLocalLog('REGISTER_FAILED', trimmedUsername, `Duplicate ${field} registration conflict`);
    throw new Error(`A user with this ${field} is already registered.`);
  }

  // Hash password with SHA-256 Web Crypto
  const passwordHash = await hashPasswordSHA256(password, trimmedUsername);

  const newUser: User = {
    id: `usr_local_${Date.now()}`,
    username: trimmedUsername,
    email: trimmedEmail,
    passwordHash,
    role: 'Registered Member',
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(trimmedUsername)}`,
  };

  users.push(newUser);
  saveLocalUsers(users);
  addLocalLog('REGISTER_SUCCESS', trimmedUsername, 'Created user with SHA-256 salted hash');

  return {
    success: true,
    message: 'User registered successfully with LocalStorage engine!',
    data: newUser,
  };
}

export async function apiLogin(dto: LoginDTO, mode: AuthMode = getActiveAuthMode()): Promise<AuthSession> {
  const { identifier, password } = dto;
  const trimmed = identifier.trim().toLowerCase();

  if (!trimmed || !password) {
    throw new Error('Please enter both username/email and password.');
  }

  // --- MODE A: Express Backend (bcrypt) ---
  if (mode === 'express_bcrypt') {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: trimmed, password }),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Invalid credentials. Please check your username/email and password.');
    }

    const session: AuthSession = json.data;
    saveSession(session);
    return session;
  }

  // --- MODE B: Client LocalStorage (SHA-256) ---
  const users = getLocalUsers();
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === trimmed ||
      u.email.toLowerCase() === trimmed
  );

  let isMatch = false;
  if (user) {
    const computedHash = await hashPasswordSHA256(password, user.username);
    isMatch = computedHash === user.passwordHash;
  }

  // SECURITY: Generic error message (do not reveal which field failed)
  if (!user || !isMatch) {
    addLocalLog('LOGIN_FAILED', identifier, 'Failed authentication attempt (obfuscated error)');
    throw new Error('Invalid credentials. Please check your username/email and password.');
  }

  user.lastLoginAt = new Date().toISOString();
  saveLocalUsers(users);

  const token = `sess_local_${Math.random().toString(36).substring(2, 15)}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const session: AuthSession = {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      avatarUrl: user.avatarUrl,
      passwordHashPreview: `${user.passwordHash.substring(0, 24)}...[SHA-256 salted]`,
    },
    expiresAt,
    loginMethod: 'local_sha256',
    loginTimestamp: Date.now(),
  };

  saveSession(session);
  addLocalLog('LOGIN_SUCCESS', user.username, 'Authenticated via SHA-256 verification');
  return session;
}

export async function apiLogout(): Promise<void> {
  const session = getCurrentSession();
  if (session && session.loginMethod === 'express_bcrypt') {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
      });
    } catch (e) {
      console.warn('Logout server notification failed, clearing local session.');
    }
  } else if (session && session.loginMethod === 'local_sha256') {
    addLocalLog('LOGOUT', session.user.username, 'Cleared client local session');
  }

  clearSession();
}

export async function apiGetMe(): Promise<AuthSession | null> {
  const session = getCurrentSession();
  if (!session) return null;

  if (session.loginMethod === 'express_bcrypt') {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        saveSession(json.data);
        return json.data;
      } else {
        clearSession();
        return null;
      }
    } catch {
      return session; // return cached if offline
    }
  }

  return session;
}

export async function apiChangePassword(currentPass: string, newPass: string): Promise<string> {
  const session = getCurrentSession();
  if (!session) throw new Error('No active session token found.');

  if (session.loginMethod === 'express_bcrypt') {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Password update failed.');
    }
    return json.message;
  } else {
    const users = getLocalUsers();
    const user = users.find((u) => u.id === session.user.id);
    if (!user) throw new Error('User not found in LocalStorage.');

    const currentHash = await hashPasswordSHA256(currentPass, user.username);
    if (currentHash !== user.passwordHash) {
      addLocalLog('PASSWORD_CHANGED', user.username, 'Failed password change (incorrect current pass)');
      throw new Error('Current password is incorrect.');
    }

    if (newPass.length < 8 || !/\d/.test(newPass)) {
      throw new Error('New password must be at least 8 characters long and contain a number.');
    }

    user.passwordHash = await hashPasswordSHA256(newPass, user.username);
    saveLocalUsers(users);
    addLocalLog('PASSWORD_CHANGED', user.username, 'Password updated with new SHA-256 salted hash');
    return 'Password updated successfully with new SHA-256 hash!';
  }
}

export async function apiGetLogs(): Promise<SecurityLog[]> {
  const mode = getActiveAuthMode();
  if (mode === 'express_bcrypt') {
    try {
      const res = await fetch('/api/auth/logs');
      const json = await res.json();
      if (res.ok && json.success) {
        return json.data;
      }
    } catch {
      // fallback to local logs
    }
  }
  return getLocalLogs();
}

export async function apiSeedDemoAccounts(): Promise<void> {
  const mode = getActiveAuthMode();
  if (mode === 'express_bcrypt') {
    await fetch('/api/auth/seed', { method: 'POST' });
  } else {
    const users = getLocalUsers();
    if (users.length === 0) {
      const passHash = await hashPasswordSHA256('Password123!', 'alexdev');
      users.push({
        id: 'usr_local_seed_1',
        username: 'alexdev',
        email: 'alex.dev@example.com',
        passwordHash: passHash,
        role: 'Software Engineer',
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
      saveLocalUsers(users);
      addLocalLog('REGISTER_SUCCESS', 'alexdev', 'Local demo account seeded');
    }
  }
}
