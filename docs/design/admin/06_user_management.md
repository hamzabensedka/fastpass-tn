# Screen 06 — User Management

**App:** Platform Owner Admin Panel  
**Type:** Management / List  
**Platform:** Web Browser

---

## Purpose

View and manage all customer accounts on the platform. Allows the admin to search users, view their activity, manually adjust points (for support cases), and suspend/ban accounts.

---

## Screen Content

### Page Header
- Title: "Users"
- Total count: "12,450 registered users"
- Search bar: "Search by name, phone, or user ID..."
- Filter dropdowns:
  - Status: All | Active | Suspended | Banned
  - Tier: All | Free | Premium
  - Activity: All | Active (30d) | Inactive (30d+)

### Users Table
Columns:
- User Name
- Phone Number (partially masked: +216 XX XXX X45)
- Tier (Free / Premium badge)
- Points Balance
- Total Scans (lifetime)
- Last Active (e.g., "3 hours ago")
- Status (Active / Suspended / Banned)
- Actions (View | Adjust Points | Suspend)

### User Detail (opens when clicking "View")
- **Profile tab:**
  - Full name
  - Phone number
  - Registration date
  - Tier: Free or Premium (with subscription dates)
  - Current points balance
  - Lifetime points earned / redeemed
- **Transaction History tab:**
  - Full list of all transactions (same format as customer's view but admin sees all details)
  - Filter by restaurant, date, type
  - Each transaction shows: date, restaurant, amount, points, type
- **Redemptions tab:**
  - History of all redemptions
  - Code, reward, restaurant, date, status (used / expired / refunded)
- **Activity tab:**
  - Visited restaurants list
  - Visit frequency chart
  - Points earning trend

### Admin Actions (sidebar or action bar)
- **"Adjust Points"** button
  - Opens modal: "Add or Remove Points"
  - Amount field: positive (add) or negative (remove)
  - Reason field (required): "Why are you adjusting points?"
  - Confirmation: "Are you sure you want to [add/remove] [X] points? Reason: [reason]"
  - Logged in audit trail with admin name, timestamp, and reason
- **"Suspend User"** button (orange)
  - Reason field (required)
  - Suspends account — user cannot earn or redeem
  - User sees "Account suspended" message in their app
- **"Ban User"** button (red, de-emphasized)
  - Reason field (required)
  - Permanently bans the account
  - Confirmation dialog with warning
- **"Unsuspend"** / **"Unban"** — reversal actions when viewing a suspended/banned user

---

## Behavior

- User search is real-time (debounced, 300ms)
- Pagination: 50 users per page
- Point adjustments are immediate and visible to the customer
- All admin actions are logged in audit trail (who, what, when, why)
- Suspended users can still see their account but cannot transact
- Banned users are fully locked out
- Admin cannot delete a user account — only suspend or ban

---

## Design Notes

- Table-first design — admin needs to find specific users quickly
- Phone numbers partially masked by default (click to reveal for support cases)
- Point adjustment modal should clearly show the impact
- Suspend/ban actions use confirmation modals with consequences listed
- "Top Spenders" sort helps identify VIP users for support priority
