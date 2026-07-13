# Screen 09 — Redemption Code

**App:** Customer Mobile App  
**Type:** Action / Transactional  
**Platform:** iOS & Android

---

## Purpose

Generates a one-time 6-digit redemption code after the customer confirms they want to redeem a reward. This code is shown to the cashier who enters it on their device to complete the redemption.

---

## Screen Content

### Confirmation Step (first view after tapping "Redeem Now")
- Reward image (large)
- Reward title (e.g., "Free Sandwich")
- Points to be deducted (e.g., "-100 pts")
- Current balance (e.g., "1,250 pts")
- Balance after redemption (e.g., "1,150 pts")
- **"Confirm Redemption"** button (brand color, full width)
- **"Cancel"** text link

### Code Display (after confirmation)
- Large 6-digit code displayed prominently (e.g., "4 8 2 7 1 5")
- Font size: extra large, monospaced, high contrast
- Reward title below the code (e.g., "Free Sandwich")
- **Countdown timer:** "Code expires in 9:45" (counts down from 10:00)
- Timer color changes: green (>5 min) → orange (2–5 min) → red (<2 min)
- Text: "Show this code to the cashier"
- Screen brightness set to maximum automatically

### Code Expired State
- If timer reaches 0:00: "Code expired"
- **"Generate New Code"** button (costs 0 additional points — same redemption is retried)
- "Cancel" link → returns to Rewards Catalog (points are refunded)

### Success State (received from server via push or polling)
- Green checkmark animation
- "Redemption successful!"
- "Enjoy your [reward name]!"
- Points balance updated
- "Done" button → returns to Home

---

## Behavior

- Code is generated server-side — requires internet connection
- If offline: show error "You need an internet connection to redeem rewards"
- Code is valid for exactly 10 minutes
- Code is single-use — once the cashier validates it, it's marked as used
- If the user leaves the screen, the code remains active (shown in notifications)
- If the user generates a new code for the same reward, the old code is invalidated
- Points are deducted immediately upon code generation (not when cashier validates)
- If code expires without being used, points are automatically refunded

---

## Design Notes

- The 6-digit code must be the largest element on screen — impossible to miss
- Use monospaced font with generous letter-spacing for readability
- Countdown timer should create gentle urgency without causing panic
- Keep screen awake (prevent auto-lock) while code is displayed
- Success animation should feel rewarding — confetti or a subtle celebration
