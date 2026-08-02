import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data structures (persisted during server lifespan)
interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  lastLoginAt?: string;
  avatarUrl?: string;
}

interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
}

interface SecurityLog {
  id: string;
  timestamp: string;
  type: string;
  identifier: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  mode: string;
}

const users: StoredUser[] = [];
const sessions: Map<string, StoredSession> = new Map();
const securityLogs: SecurityLog[] = [];

// Helper to seed default demo accounts
async function seedDefaultAccounts() {
  if (users.length === 0) {
    const saltRounds = 10;
    const defaultPasswordHash = await bcrypt.hash('Password123!', saltRounds);

    const demoUser: StoredUser = {
      id: 'usr_demo_001',
      username: 'alexdev',
      email: 'alex.dev@example.com',
      passwordHash: defaultPasswordHash,
      role: 'Software Engineer',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    const adminUser: StoredUser = {
      id: 'usr_demo_002',
      username: 'admin_security',
      email: 'security.admin@example.com',
      passwordHash: defaultPasswordHash,
      role: 'Security Specialist',
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    };

    users.push(demoUser, adminUser);

    securityLogs.push({
      id: 'log_seed_1',
      timestamp: new Date().toISOString(),
      type: 'REGISTER_SUCCESS',
      identifier: 'alexdev',
      details: 'Demo account initialized with bcrypt password hash',
      ipAddress: '127.0.0.1',
      userAgent: 'System Seed Script',
      mode: 'express_bcrypt',
    });
  }
}

// Seed on startup
seedDefaultAccounts().catch(console.error);

// Helper for security logging
function logSecurityEvent(
  type: string,
  identifier: string,
  details: string,
  req: express.Request
) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';

  securityLogs.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    type,
    identifier,
    details,
    ipAddress: ip,
    userAgent,
    mode: 'express_bcrypt',
  });

  // Limit log count
  if (securityLogs.length > 100) {
    securityLogs.pop();
  }
}

// ==================== REST API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Seed demo user API
app.post('/api/auth/seed', async (req, res) => {
  await seedDefaultAccounts();
  res.json({
    success: true,
    message: 'Demo accounts seeded successfully',
    usersCount: users.length,
  });
});

// User Registration Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic Form Validation (no empty submissions)
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields (username, email, password) are strictly required.',
      });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedUsername.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Username must be at least 3 characters long.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // 2. Password Validation (min 8 chars, at least 1 number)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long.',
      });
    }

    if (!/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password must contain at least 1 number.',
      });
    }

    // 3. Duplicate Username / Email Check
    const existingUser = users.find(
      (u) =>
        u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
        u.email.toLowerCase() === trimmedEmail
    );

    if (existingUser) {
      const field = existingUser.email.toLowerCase() === trimmedEmail ? 'email' : 'username';
      logSecurityEvent(
        'REGISTER_FAILED',
        trimmedUsername,
        `Duplicate registration attempt (${field} conflict)`,
        req
      );

      return res.status(400).json({
        success: false,
        error: `A user with this ${field} already exists. Please login or choose a different one.`,
      });
    }

    // 4. Secure Password Hashing with bcryptjs
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser: StoredUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      username: trimmedUsername,
      email: trimmedEmail,
      passwordHash,
      role: 'Registered Member',
      createdAt: new Date().toISOString(),
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(trimmedUsername)}`,
    };

    users.push(newUser);

    logSecurityEvent('REGISTER_SUCCESS', trimmedUsername, 'New account created with bcrypt hash', req);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully! You can now log in.',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred during registration.',
    });
  }
});

// User Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1. Basic Form Validation
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter both your username/email and password.',
      });
    }

    const trimmedIdentifier = identifier.trim().toLowerCase();

    // 2. Find User by Username or Email
    const user = users.find(
      (u) =>
        u.username.toLowerCase() === trimmedIdentifier ||
        u.email.toLowerCase() === trimmedIdentifier
    );

    // 3. Password Verification with bcrypt
    let isMatch = false;
    if (user) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    }

    // 4. Incorrect Credential Handling
    // SECURITY PRINCIPLE: Do NOT reveal whether username or password was wrong
    if (!user || !isMatch) {
      logSecurityEvent(
        'LOGIN_FAILED',
        identifier,
        'Invalid login attempt (obfuscated error returned to user)',
        req
      );

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please check your username/email and password.',
      });
    }

    // 5. Update last login timestamp
    user.lastLoginAt = new Date().toISOString();

    // 6. Generate Session Token
    const token = `sess_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    const session: StoredSession = {
      token,
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt,
      ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown Browser',
    };

    sessions.set(token, session);

    logSecurityEvent('LOGIN_SUCCESS', user.username, 'Successful authentication via bcrypt verify', req);

    // Return profile without exposing raw password hash
    return res.json({
      success: true,
      message: 'Authentication successful!',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
          avatarUrl: user.avatarUrl,
          passwordHashPreview: `${user.passwordHash.substring(0, 20)}...[bcrypt salted]`,
        },
        expiresAt,
        loginMethod: 'express_bcrypt',
        loginTimestamp: Date.now(),
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred during login.',
    });
  }
});

// Protected Session Authorization Middleware / Me Route
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: No active session token found.',
    });
  }

  const token = authHeader.split(' ')[1];
  const session = sessions.get(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Session expired or invalid. Please log in again.',
    });
  }

  const user = users.find((u) => u.id === session.userId);
  if (!user) {
    sessions.delete(token);
    return res.status(401).json({
      success: false,
      error: 'User account associated with this session no longer exists.',
    });
  }

  return res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        avatarUrl: user.avatarUrl,
        passwordHashPreview: `${user.passwordHash.substring(0, 20)}...[bcrypt salted]`,
      },
      expiresAt: session.expiresAt,
      loginMethod: 'express_bcrypt',
      loginTimestamp: new Date(session.createdAt).getTime(),
    },
  });
});

// Logout Route
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const session = sessions.get(token);
    if (session) {
      const user = users.find((u) => u.id === session.userId);
      logSecurityEvent(
        'LOGOUT',
        user ? user.username : 'Unknown User',
        'User terminated session token',
        req
      );
      sessions.delete(token);
    }
  }

  return res.json({
    success: true,
    message: 'Logged out successfully. Session cleared.',
  });
});

// Change Password Route (Protected)
app.post('/api/auth/change-password', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const token = authHeader.split(' ')[1];
    const session = sessions.get(token);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Session expired.' });
    }

    const user = users.find((u) => u.id === session.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      logSecurityEvent('PASSWORD_CHANGED', user.username, 'Failed password change (incorrect current password)', req);
      return res.status(400).json({ success: false, error: 'Current password is incorrect.' });
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 8 characters long and contain a number.',
      });
    }

    const saltRounds = 10;
    user.passwordHash = await bcrypt.hash(newPassword, saltRounds);

    logSecurityEvent('PASSWORD_CHANGED', user.username, 'Password successfully re-hashed with bcrypt', req);

    return res.json({
      success: true,
      message: 'Password changed successfully! Your account is updated with a new bcrypt hash.',
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Failed to update password.' });
  }
});

// Audit Logs Route
app.get('/api/auth/logs', (req, res) => {
  res.json({
    success: true,
    data: securityLogs,
  });
});

// ==================== VITE DEVELOPMENT & PRODUCTION INTEGRATION ====================

async function startAppServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🔒 Secure Auth Server running on http://0.0.0.0:${PORT}`);
  });
}

startAppServer();
