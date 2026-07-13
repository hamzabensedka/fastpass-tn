# Screen 04 — Login

**App:** Customer Mobile App  
**Type:** Authentication  
**Platform:** iOS & Android

---

## Purpose

Allows returning customers to log in using their phone number and SMS code. No password — SMS-based authentication only at MVP.

---

## Screen Content

### Header
- Back arrow (top-left) → returns to Splash/Onboarding
- Title: "Welcome back"
- Subtitle: "Enter your phone number to log in"

### Form Fields
1. **Phone Number** — phone input with country code prefix
   - Country code pre-filled: +216 (Tunisia)
   - Placeholder: "XX XXX XXX"
   - Numeric keyboard only

### Actions
- **"Send Code"** button (full width, brand color)
  - Disabled until phone number is valid (8 digits)
  - On tap: sends SMS code, navigates to SMS Verification screen (same screen as registration, but in "login" mode)
- **"Create an account"** text link → navigates to Registration screen

---

## Behavior

- If the phone number is not registered, show inline error: "No account found with this number. Would you like to create one?" with a link to Registration
- After tapping "Send Code," the same SMS Verification screen is used
- On successful verification: auth token issued, navigate to Home screen
- Rate limit: max 3 SMS requests per phone number per hour
- Session persists until user explicitly logs out (token stored securely on device)

---

## Design Notes

- Mirror the Registration screen layout for consistency
- Single field — keep it dead simple
- "Welcome back" feels warmer than "Log in"
- Show the Tunisian flag next to +216
