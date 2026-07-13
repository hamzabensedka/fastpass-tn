# Screen 06 — Redemption Result

**App:** Restaurant Cashier App  
**Type:** Confirmation  
**Platform:** Android (tablet or phone)

---

## Purpose

Confirms to the cashier that a redemption code is valid and tells them exactly what to give the customer. This is the cashier's instruction screen — it must be crystal clear what reward to fulfill.

---

## Screen Content

### Success View
- Large green checkmark icon (animated)
- **"Redemption Valid!"** (large text)
- Reward details card:
  - Reward name (e.g., **"Free Sandwich"**)
  - Description (e.g., "Any regular sandwich from the menu")
  - Customer name (e.g., "Ahmed")
  - Points deducted from customer: "-100 pts"
- Instruction text (prominent): **"Please give the customer: 1x Regular Sandwich"**

### Actions
- **"Done"** button (full width, green) → returns to QR Scanner
- Auto-return to QR Scanner after 10 seconds

---

## Behavior

- Code is marked as "used" on the server immediately upon reaching this screen
- The reward cannot be un-redeemed from the cashier app
- Success sound plays
- Transaction logged: customer ID, reward ID, restaurant ID, timestamp, code
- Auto-return countdown (10 seconds) ensures flow continues

---

## Design Notes

- The reward name and instruction must be the LARGEST text on screen
- The cashier should be able to read "Free Sandwich" from 1 meter away
- Use a card layout to frame the reward details
- Simple, direct language — "Please give the customer: [item]"
- No ambiguity — this screen tells the cashier exactly what to do
