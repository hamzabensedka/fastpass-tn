# Screen 02 — Registration

**App:** Customer Mobile App  
**Type:** Authentication  
**Platform:** iOS & Android

---

## Purpose

Allows a new customer to create an account using their phone number. This is the only registration method at MVP — no email, no social login.

---

## Screen Content

### Header
- Back arrow (top-left) → returns to Splash/Onboarding
- Title: "Create your account"

### Form Fields
1. **Full Name** — text input, required
   - Placeholder: "Your full name"
   - Validation: minimum 2 characters
2. **Phone Number** — phone input with country code prefix
   - Country code pre-filled: +216 (Tunisia)
   - Placeholder: "XX XXX XXX"
   - Validation: 8 digits for Tunisian numbers
   - Numeric keyboard only

### Actions
- **"Continue"** button (full width, brand color)
  - Disabled until both fields are valid
  - On tap: sends SMS verification code, navigates to SMS Verification screen
- **"I already have an account"** text link → navigates to Login screen

### Legal
- Small text below the button: "By creating an account, you agree to our [Terms of Service] and [Privacy Policy]"
- Terms and Privacy links open in an in-app browser

---

## Behavior

- Phone number must be unique — if already registered, show inline error: "This number is already registered. Try logging in."
- Show loading spinner on the "Continue" button while SMS is being sent
- If SMS fails to send, show error toast: "Could not send verification code. Please try again."
- Rate limit: max 3 SMS requests per phone number per hour

---

## Design Notes

- Clean, minimal form — only two fields on screen
- Phone input should auto-format as the user types (XX XXX XXX)
- Country flag icon next to +216 prefix
- Keyboard should auto-open on the phone number field
