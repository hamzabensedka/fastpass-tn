# Screen 05 — Redemption Code Entry

**App:** Restaurant Cashier App  
**Type:** Data Entry  
**Platform:** Android (tablet or phone)

---

## Purpose

The cashier enters the 6-digit redemption code that the customer shows on their phone. Validates whether the code is legitimate, not expired, and not already used.

---

## Screen Content

### Header
- Back arrow → returns to QR Scanner
- Title: "Validate Redemption"

### Instructions
- Text: "Enter the 6-digit code shown on the customer's phone"

### Code Input (center, hero element)
- 6 individual digit boxes (large, monospaced)
- Auto-focus on first box
- Numeric keypad (same style as Enter Amount screen)
- Each digit auto-advances to next box
- Auto-submit when all 6 digits are entered

### Validation States

**Validating:**
- Loading spinner replaces the input
- Text: "Checking code..."

**Valid Code → shows Redemption Result screen (success)**

**Invalid Code:**
- Red border on input boxes + shake animation
- Error text based on reason:
  - "Invalid code. Please check and try again."
  - "Code has expired. Ask the customer to generate a new one."
  - "Code already used."
- "Try Again" button → clears input, refocuses on first box

---

## Behavior

- Redemption validation REQUIRES internet — cannot be done offline
- If offline: show "Internet connection required to validate redemptions"
- Code is validated against the server: checks existence, expiry (10 min), single-use status
- On valid code: navigate to Redemption Result screen
- On invalid code: stay on this screen, show error, allow retry
- Auto-submit triggers validation immediately when 6th digit is entered
- No manual "Submit" button needed (auto-submit on completion)

---

## Design Notes

- Input boxes should be extra large — the cashier is entering a code read from someone else's phone
- Use monospaced font matching the customer's code display
- Validation feedback must be fast (loading state should appear instantly)
- Error messages should be helpful — guide the cashier on what to do next
- Keyboard should be on-screen (custom numeric, not system keyboard)
