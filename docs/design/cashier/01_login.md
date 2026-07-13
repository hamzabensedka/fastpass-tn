# Screen 01 — Cashier Login

**App:** Restaurant Cashier App  
**Type:** Authentication  
**Platform:** Android (tablet or phone)

---

## Purpose

Allows the restaurant cashier to log in using the restaurant's shared credentials. One login per restaurant — no individual cashier accounts at MVP.

---

## Screen Content

### Header
- FastPass logo (centered, top)
- Subtitle: "Restaurant Cashier"

### Form Fields
1. **Email** — text input
   - Placeholder: "Restaurant email"
   - Keyboard: email keyboard type
2. **Password** — password input
   - Placeholder: "Password"
   - Show/hide toggle icon (eye icon)

### Actions
- **"Log In"** button (full width, brand color)
  - Disabled until both fields are filled
  - On tap: authenticate, navigate to QR Scanner screen
- **"Forgot Password?"** text link → triggers password reset email

### Error States
- Invalid credentials: "Incorrect email or password. Please try again."
- Account suspended: "This restaurant account has been suspended. Contact FastPass support."
- Subscription lapsed: "Your subscription has expired. Contact your restaurant manager."

---

## Behavior

- Session persists until explicit logout (the tablet stays logged in at the counter)
- If already logged in, skip to QR Scanner screen on app launch
- Failed login attempts: lock after 5 failed attempts for 15 minutes
- Show loading spinner on the button while authenticating
- Offline: show "No internet connection. Please check your connection and try again."

---

## Design Notes

- Simple, utilitarian design — cashiers need speed, not aesthetics
- Large touch targets (minimum 48dp) — the tablet might be greasy or used with gloves
- Logo reinforces brand but takes minimal space
- Consider landscape orientation support for tablets
