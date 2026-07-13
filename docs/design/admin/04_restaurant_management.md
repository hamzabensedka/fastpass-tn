# Screen 04 — Restaurant Management

**App:** Platform Owner Admin Panel  
**Type:** Management / CRUD  
**Platform:** Web Browser

---

## Purpose

Central view of all restaurants on the platform. Allows the admin to see every restaurant's status, subscription, activity, and take actions like suspending or contacting a restaurant.

---

## Screen Content

### Page Header
- Title: "Restaurants"
- Search bar: "Search by name, city, or cuisine..."
- Filter dropdowns:
  - Status: All | Active | Suspended | Grace Period | Subscription Lapsed
  - City: All | Tunis | Sousse | Sfax | etc.
  - Subscription Tier: All | Standard | Premium
- **"Export List"** button (CSV download)

### Restaurants Table
Columns:
- Restaurant Name (with logo thumbnail)
- City
- Cuisine Type
- Subscription Tier
- Subscription Status (Active / Grace Period / Lapsed / Suspended)
- Last Activity (e.g., "2 hours ago")
- Total Scans (all time)
- Active Deals Count
- Actions (View | Suspend | Unsuspend)

### Restaurant Detail (opens when clicking "View" or the restaurant name)
- **Profile tab:**
  - All restaurant info (name, address, logo, cover photo, contact details)
  - Member since date
  - Subscription tier and status
  - Cashier login credentials (masked, with "Reset Password" option)
- **Activity tab:**
  - Total scans, total points given, total redemptions
  - Monthly activity chart
  - Last 20 transactions table
- **Deals tab:**
  - List of all deals (past and current) from this restaurant
  - Deal status and performance metrics
- **Billing tab:**
  - Payment history
  - Current balance / credits
  - Reimbursement history
- **Actions tab:**
  - **"Suspend Restaurant"** — hides from customer app, blocks cashier login
  - **"Unsuspend"** — reverses suspension
  - **"Reset Cashier Password"** — generates new password, emails to restaurant
  - **"Contact Owner"** — opens email draft

### Suspend Modal
- Title: "Suspend [Restaurant Name]"
- Reason text field (required): "Reason for suspension"
- Warning: "This will hide the restaurant from all customers and block cashier access"
- "Confirm Suspension" button (red) | "Cancel"

---

## Behavior

- Table supports sorting by any column
- Pagination: 25 restaurants per page
- Real-time search filters as the admin types
- Suspension/unsuspension is effective immediately
- All admin actions are logged in the audit trail
- Suspended restaurants retain their data — nothing is deleted

---

## Design Notes

- Table-centric design — admin needs to scan many restaurants quickly
- Status badges use consistent colors: green (active), orange (grace), red (lapsed/suspended)
- Detail view uses tabs to organize dense information
- Actions with consequences (suspend) use confirmation modals with warnings
- Search and filters should be prominent — the admin will manage dozens to hundreds of restaurants
