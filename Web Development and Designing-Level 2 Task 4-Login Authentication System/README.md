# TASK 4 · Secure Login Authentication System

A production-grade, full-stack authentication web application featuring user registration, credential validation, secure password hashing, session management, and access control for protected routes.

---

## 🚀 Key Features

1. **User Registration with Password Policy Enforcement**
   - Live validation: minimum 8 characters, at least 1 number, plus optional strength indicators.
   - Duplicate check: prevents duplicate registrations by username or email address.
   - Input sanitization and email formatting checks.

2. **Secure Login & Generic Failure Messaging**
   - Supports login via either registered **username** or **email**.
   - **Privacy-safe error reporting**: Displays `"Invalid credentials provided"` without disclosing whether the username or password was incorrect.

3. **Non-Plaintext Password Security (Hashing)**
   - **Full-Stack Mode**: Node.js + Express backend utilizing `bcryptjs` salted hashing (10 salt rounds).
   - **Client-Side Mode**: Web Crypto API using `SHA-256` hashing with custom user salting.
   - Plaintext passwords are **never** stored in memory or storage.

4. **Protected Dashboard Route & Access Control**
   - Strictly guards access: Direct URL access without a valid session token immediately redirects to the Login view.
   - Interactive security inspector displaying the hashed password preview, session metadata, token expiration timer, and audit history.

5. **Session Management & Logout**
   - Session tokens backed by server-side state or localStorage.
   - One-click logout that immediately revokes session tokens and redirects to Login.

6. **Security Audit Log & Activity Timeline**
   - Logs all successful logins, failed attempts, registrations, and password updates with timestamps and IP/user-agent metadata.

7. **Dual Technical Architecture Switcher**
   - Toggle seamlessly between **Express REST API (Node.js/bcrypt)** and **Client-Side Storage (Browser LocalStorage/SHA-256)** to evaluate both stack approaches.

---

## 🛠️ Technical Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion Animation library.
- **Backend**: Node.js, Express 4, `bcryptjs` for secure password hashing.
- **Storage**: Express in-memory JSON data store with auto-seeding + browser `localStorage` client engine.
- **API Spec**:
  - `POST /api/auth/register` - Create user with password hashing
  - `POST /api/auth/login` - Verify credentials & issue session token
  - `GET /api/auth/me` - Validate session token & return profile
  - `POST /api/auth/logout` - Invalidate session token
  - `POST /api/auth/change-password` - Re-hash & update user password
  - `GET /api/auth/logs` - Fetch security audit timeline

---

## 📋 Evaluation Criteria Checklist

- [x] **Registration Page**: Fields for username/email, password, and Register button.
- [x] **Password Validation**: Minimum 8 characters, at least 1 number.
- [x] **Duplicate Prevention**: Rejects duplicate username or email with clear error feedback.
- [x] **Login Page**: Fields for username/email, password, and Login button.
- [x] **Incorrect Credential Handling**: Obfuscates specific error details (generic error).
- [x] **Protected Page**: Unauthenticated access redirects to login.
- [x] **Logout Functionality**: Clears active session and redirects to login.
- [x] **Password Hashing**: Passwords stored as `bcrypt` / `SHA-256` salted hashes.
- [x] **Form Validation**: Rejects empty submissions, whitespace-only inputs, and invalid formats.
- [x] **Documentation**: Complete README and built-in interactive reader.

---

## ⚡ Quick Test Credentials

Click **"Seed Demo Accounts"** on the Login screen or use:
- **Email**: `alex.dev@example.com`
- **Username**: `alexdev`
- **Password**: `Password123!`
