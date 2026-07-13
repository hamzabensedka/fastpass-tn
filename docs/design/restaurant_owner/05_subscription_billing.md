# Screen 05 — Subscription & Billing

**App:** Restaurant Owner Dashboard  
**Type:** Account / Billing  
**Platform:** Web Browser

---

## Purpose

Shows the restaurant's current subscription status, billing history, and payment management. Allows the owner to view their plan, update payment methods, and see upcoming charges.

---

## Screen Content

### Page Header
- Title: "Subscription & Billing"

### Current Plan Card (top)
- Plan name (e.g., "Standard Plan")
- Monthly price (e.g., "200 DT/month")
- Status: **Active** (green) | **Grace Period** (orange, 3 days to pay) | **Suspended** (red)
- Next billing date (e.g., "June 1, 2026")
- Renewal type: "Auto-renew" with toggle to cancel auto-renewal
- If suspended: prominent banner "Your restaurant is hidden from the app. Renew now to go live again."

### Payment Method Section
- Current payment method (last 4 digits, card type icon, or payment gateway name)
- "Update Payment Method" button → opens payment gateway flow
- "Add Payment Method" if none set up

### Billing History Table
- Columns: Date | Description | Amount (DT) | Status | Invoice
- Rows example:
  - May 1, 2026 | Monthly subscription | 200 DT | Paid | [Download PDF]
  - May 5, 2026 | Deal promotion: "Burger BOGO" | 150 DT | Paid | [Download PDF]
  - Apr 1, 2026 | Monthly subscription | 200 DT | Paid | [Download PDF]
- Pagination: 10 items per page

### Reward Reimbursement Section
- Shows credits earned from customer redemptions at this restaurant
- Current credit balance (e.g., "450 DT credit")
- Text: "Credits are deducted from your next subscription payment"
- History of reimbursements: Date | Reward redeemed | Credit amount

### Cancel Subscription (bottom, de-emphasized)
- "Cancel Subscription" link (red text)
- Confirmation dialog: "If you cancel, your restaurant will be hidden from the app at the end of your billing period. Your data will be preserved."
- Shows end date if canceled: "Active until June 1, 2026"

---

## Behavior

- Billing is automated on the 1st of each month
- Failed payment triggers a 3-day grace period
- After grace period: restaurant is suspended (hidden from customer app)
- Payment updates take effect immediately
- Invoice PDFs are generated server-side and downloadable
- Reward reimbursements are calculated monthly and applied as credits
- Cancellation takes effect at end of current billing period

---

## Design Notes

- Current plan card should be prominent and immediately readable
- Grace period and suspended states should have visual urgency (orange/red)
- Billing history should be a clean, standard table
- Payment method section should feel secure (show minimal card info)
- "Cancel" action should be accessible but not prominent
