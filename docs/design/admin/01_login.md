# Screen 01 — Admin Login

**App:** Platform Owner Admin Panel  
**Type:** Authentication  
**Platform:** Web Browser

---

## Purpose

Secure login for the platform administrator (you, the platform owner). Provides access to the central control panel for managing the entire FastPass ecosystem.

---

## Screen Content

### Layout (centered card on a dark/professional background)
- FastPass logo (top center)
- Title: "Admin Panel"
- Subtitle: "Platform Management"

### Form Fields
1. **Email** — text input
   - Placeholder: "admin@fastpass.tn"
2. **Password** — password input
   - Show/hide toggle
3. **2FA Code** (if enabled) — 6-digit input
   - Appears after email+password validation succeeds

### Actions
- **"Log In"** button (full width)
- **"Forgot Password?"** link

### Security Features
- Rate limiting: 5 failed attempts → 30-minute lockout
- IP logging for all login attempts
- Session timeout after 1 hour of inactivity
- Forced logout from all sessions option (in settings)

---

## Behavior

- Admin credentials are separate from restaurant credentials
- Only pre-configured admin accounts can log in (no self-registration)
- On success: redirect to Admin Dashboard Overview
- 2FA is strongly recommended (TOTP via authenticator app)
- Login events are logged in an audit trail

---

## Design Notes

- More security-oriented design than the restaurant login
- Dark background or distinct color scheme to differentiate from restaurant dashboard
- "Admin Panel" label makes it clear this is not the restaurant interface
- Minimal, focused — no marketing content or sign-up links
