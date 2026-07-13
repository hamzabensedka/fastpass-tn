# Screen 03 — SMS Verification

**App:** Customer Mobile App  
**Type:** Authentication  
**Platform:** iOS & Android

---

## Purpose

Verifies the customer's phone number by entering a 6-digit code received via SMS. Completes the registration flow.

---

## Screen Content

### Header
- Back arrow (top-left) → returns to Registration screen
- Title: "Verify your number"
- Subtitle: "We sent a 6-digit code to +216 XX XXX XXX" (shows the entered number)

### Code Input
- 6 individual digit boxes in a row
- Auto-focus on the first box
- Numeric keyboard opens automatically
- Each digit auto-advances to the next box
- Auto-submit when all 6 digits are entered

### Resend Section
- Text: "Didn't receive the code?"
- **"Resend Code"** text button (disabled for 60 seconds after last send)
- Countdown timer: "Resend in 45s"
- After timer expires, "Resend Code" becomes tappable

### Error States
- Wrong code: boxes shake animation + red border + text "Invalid code. Please try again."
- Too many attempts (5 failures): "Too many attempts. Please wait 15 minutes." + disable input

---

## Behavior

- Auto-reads SMS on Android (SMS Retriever API) — code fills automatically
- On iOS, shows the code suggestion from the keyboard toolbar
- On successful verification:
  - Account is created in the backend
  - User receives an auth token
  - Navigate to Home screen
  - Show welcome toast: "Welcome to FastPass, [Name]!"
- Code expires after 10 minutes — show "Code expired. Please request a new one."
- User can go back to change their phone number

---

## Design Notes

- Code boxes should be large and easy to tap (minimum 48x48dp)
- Success state: brief green checkmark animation before navigating
- Error shake animation should be subtle (200ms)
- The phone number in the subtitle should be partially masked on re-visits for privacy
