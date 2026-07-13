# Screen 04 — Scan Confirmation

**App:** Restaurant Cashier App  
**Type:** Confirmation / Success  
**Platform:** Android (tablet or phone)

---

## Purpose

Confirms to the cashier that points have been successfully added to the customer's account. Brief screen that provides closure before returning to the scanner for the next customer.

---

## Screen Content

### Success State (primary view)
- Large green checkmark icon (animated)
- **"Points Added!"** (large text)
- Customer name (e.g., "Ahmed")
- Amount charged: "15.500 DT"
- Points awarded: "+15 points"
- New balance: "1,265 pts"
- If premium: "2x bonus applied"

### Actions
- **"Scan Next Customer"** button (full width, brand color) → returns to QR Scanner
- Auto-return to QR Scanner after 5 seconds (countdown shown)

### Offline Confirmation (alternate view)
- Yellow/orange warning icon instead of green checkmark
- **"Saved Offline"**
- "Points will be added when internet connection is restored"
- Same auto-return behavior

### Error State (if server rejects)
- Red X icon
- **"Could not add points"**
- Error reason (e.g., "Customer already scanned for this order")
- "Try Again" button → returns to Enter Amount screen
- "Cancel" → returns to QR Scanner

---

## Behavior

- Screen auto-dismisses after 5 seconds (configurable) → returns to QR Scanner
- Cashier can tap "Scan Next Customer" immediately without waiting
- Success sound plays on confirmation
- If offline, the transaction is queued and will sync automatically
- No back navigation from this screen — only forward to scanner

---

## Design Notes

- Large, unmistakable success indicator — the cashier needs to confirm at a glance
- Auto-return countdown keeps the flow moving during busy hours
- Minimal information — just enough to confirm the action
- Error state should be clearly different from success (red vs green)
