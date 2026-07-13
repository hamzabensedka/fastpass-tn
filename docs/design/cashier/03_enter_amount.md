# Screen 03 — Enter Order Amount

**App:** Restaurant Cashier App  
**Type:** Data Entry  
**Platform:** Android (tablet or phone)

---

## Purpose

After scanning a customer's QR code, the cashier enters the order total in Tunisian Dinars (DT). The system calculates points to award based on the amount.

---

## Screen Content

### Header
- Back arrow → returns to QR Scanner (cancels this transaction)
- Title: "Enter Amount"

### Customer Info Card (top)
- Customer first name (e.g., "Ahmed")
- Customer avatar or placeholder icon
- Current points balance (e.g., "1,250 pts")
- Premium badge (if applicable, showing "2x points")

### Amount Input (center, hero element)
- Large numeric display showing entered amount (e.g., "15.500")
- Currency label: "DT" (Tunisian Dinars)
- Numeric keypad (custom, large buttons):
  - Digits 0–9
  - Decimal point (.)
  - Backspace/delete
  - Clear all (C)
- Points preview: "= 15 points" (calculated live as amount is entered)
  - If premium customer: "= 30 points (2x)"

### Actions
- **"Confirm"** button (large, green, full width)
  - Disabled until a valid amount > 0 is entered
  - On tap: submits to server, navigates to Scan Confirmation screen
- **"Cancel"** text link → returns to QR Scanner

---

## Behavior

- Amount must be a positive number > 0
- Maximum amount: configurable (e.g., 999.999 DT) — prevents accidental extra digits
- Points calculation: 1 point per 1 DT (rounded down). Premium: 2 points per 1 DT
- On "Confirm":
  - Points are added to the customer's account server-side
  - Transaction is logged with: customer ID, restaurant ID, amount, points, timestamp
  - Navigate to Scan Confirmation screen
- If offline: transaction is queued locally, "Confirm" shows "Saved offline — will sync later"
- Cashier cannot modify points directly — only enter the DT amount

---

## Design Notes

- Amount input should be VERY large — readable at arm's length from a tablet
- Custom numeric keypad with big buttons (minimum 60dp touch targets)
- Points preview provides instant feedback and builds customer trust
- Green "Confirm" button communicates a positive action
- Keep the screen focused — only the essential elements
