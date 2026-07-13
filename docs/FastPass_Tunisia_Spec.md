# FastPass Tunisia — Product Specification

**Version:** 1.0  
**Date:** May 2026  
**Status:** Draft — for review and critique

---

## 1. Overview

FastPass is a cross-brand loyalty and discovery platform for the Tunisian fast food market. It connects customers, restaurants, and a central platform operator (the owner) through a points-based reward system.

There are three actors in the system:

- **Customer** — downloads the app, collects points when they eat, redeems rewards
- **Restaurant** — pays a monthly subscription, scans customers, accesses analytics, posts deals
- **Platform owner (you)** — manages the system, approves restaurants, collects revenue

---

## 2. The Three Apps

The platform is made of three separate interfaces.

---

### 2.1 Customer Mobile App

**Who uses it:** Anyone who eats at a partner restaurant.

**What it does:**

- Account creation with phone number (SMS verification)
- Personal QR code displayed on the home screen at all times
- Points wallet showing total points and history per restaurant
- Reward catalog — what they can redeem and how many points it costs
- Redemption flow — generates a one-time code to show at the counter
- Discovery feed — list of active deals from nearby partner restaurants
- Map view showing partner restaurants near the user
- Push notifications when points are added or a deal is nearby
- Transaction history — every scan, every point earned, every redemption

**Key rules:**

- 1 point per 1 Tunisian Dinar spent
- Points never expire (to keep users engaged)
- A redemption code is valid for 10 minutes only, then expires
- One QR scan per order (no double scanning)

---

### 2.2 Restaurant Cashier App

**Who uses it:** The cashier at the restaurant counter. Runs on a cheap Android tablet or phone.

**What it does:**

- Login with restaurant credentials (email + password)
- Camera opens to scan customer QR code
- After scan: cashier enters the order amount in DT
- App confirms points added and shows customer name
- Redemption tab — cashier enters the 6-digit code the customer shows, app confirms or rejects it
- Shift summary — how many scans happened today

**Key rules:**

- Cashier cannot manually add or remove points
- Redemption codes can only be used once
- If the internet is down, scans are queued locally and sync when reconnected
- Each restaurant has one login — no individual cashier accounts needed at MVP

---

### 2.3 Restaurant Owner Dashboard

**Who uses it:** The restaurant owner or manager. Accessed via web browser.

**What it does:**

- Overview stats: total customers scanned this month, total points given, total redemptions
- Customer insights: unique visitors, returning vs new ratio, average spend per visit, busiest hours and days
- Deal management: create a promoted deal (title, discount, start/end date), submit for platform approval
- Subscription status: current plan, next billing date, payment history
- Export data as CSV (their own data only)

**Key rules:**

- Owner only sees their own restaurant's data — never another restaurant's
- Deals go live only after platform owner approves them
- If subscription lapses, the restaurant is hidden from the customer app but data is preserved

---

### 2.4 Platform Owner Admin Panel

**Who uses it:** You (the platform operator). Web browser.

**What it does:**

- Approve or reject new restaurant applications
- Approve or reject deal submissions
- View all restaurants: status, subscription tier, last activity
- View all users: total count, active this month, top spenders
- Revenue dashboard: monthly recurring revenue, deal income, premium user income
- Manually adjust points for a user (for support cases)
- Suspend or ban a user or restaurant
- Send push notifications to all users or a segment

---

## 3. Revenue Model

| Stream | How it works | Estimated price |
|---|---|---|
| Restaurant subscription | Monthly flat fee to be listed | 150–300 DT/month |
| Promoted deals | Restaurant pays per deal published | 100–300 DT per deal |
| Premium user tier | Users pay for double points + no ads | 5–10 DT/month |
| Data reports | Monthly trend reports sold to brands | 500–2,000 DT per report |

---

## 4. Points & Rewards Logic

### Earning points
- 1 point per 1 DT spent at any partner restaurant
- Premium users earn 2 points per 1 DT
- Bonus point events can be created by the platform owner (e.g. double points weekend)

### Redeeming rewards
- Rewards are defined by the platform owner (e.g. 100 points = free sandwich at any partner)
- Some rewards can be restaurant-specific (e.g. 80 points = free coffee at Coffee X only)
- When a customer redeems, a 6-digit one-time code is generated
- The cashier enters the code — the system validates and marks it used
- The restaurant is reimbursed by the platform via monthly credit against their subscription

### Fraud prevention rules
- One scan per order per customer (enforced server-side)
- Redemption codes expire after 10 minutes
- Codes are single-use only
- Suspicious activity (e.g. 20 scans in 5 minutes from the same restaurant) triggers an alert for the admin

---

## 5. User Roles & Permissions

| Role | Can do |
|---|---|
| Customer | View own points, redeem rewards, see deals |
| Cashier | Scan QR codes, enter amounts, validate redemption codes |
| Restaurant owner | View own analytics, manage deals, manage subscription |
| Platform admin | Full access to all data, approve/suspend/configure |

---

## 6. Data Each Actor Owns

**Customer data (private):**
Points balance, transaction history, redemption history, location (only when app is open).

**Restaurant data (private to that restaurant):**
Their own scan logs, their own customer visit stats, their own deal performance.

**Platform data (aggregated, anonymized):**
City-wide trends, category trends, age group behavior — used for reports sold to third parties. No individual customer data is ever sold.

---

## 7. Key User Journeys

### Journey 1 — First-time customer
1. Downloads app → enters phone number → receives SMS code → verifies → account created
2. Home screen shows their QR code and 0 points
3. Goes to a partner restaurant → shows QR → cashier scans → 15 points added
4. App shows notification: "15 points added at Kiko Tunis"

### Journey 2 — Redeeming a reward
1. Customer has 100 points → taps "Rewards" → selects "Free sandwich"
2. App generates a 6-digit code valid for 10 minutes
3. Customer shows code to cashier → cashier enters it in tablet app
4. System validates → marks code as used → points deducted → cashier sees "Valid — free sandwich"

### Journey 3 — Restaurant posting a deal
1. Owner logs into dashboard → taps "New deal" → fills title, discount, dates
2. Deal sent to platform admin for review
3. Admin approves → deal appears in customer discovery feed
4. Customers nearby see it → come in → restaurant gets more visits

### Journey 4 — Restaurant subscription payment
1. Every 1st of the month, restaurant is billed automatically
2. If payment fails, restaurant gets 3-day grace period with reminder emails
3. After 3 days unpaid, restaurant is hidden from the app (not deleted)
4. Once paid, restaurant goes live again instantly

---

## 8. Notifications

| Trigger | Who gets notified | Channel |
|---|---|---|
| Points added | Customer | Push + in-app |
| Reward redeemed | Customer | Push + in-app |
| New deal nearby | Customer | Push |
| Deal approved/rejected | Restaurant owner | Email |
| Subscription renewal reminder | Restaurant owner | Email |
| Suspicious scan activity | Platform admin | Email + dashboard alert |
| New restaurant application | Platform admin | Email |

---

## 9. Offline Behavior

The cashier app must work without internet for short periods (power cuts, bad signal).

- Scans are stored locally on the device when offline
- When connection returns, scans sync automatically to the server
- The cashier app shows a clear "Offline — syncing later" indicator
- Redemption code validation requires internet (to prevent fraud)

---

## 10. What the System Does NOT Do

- It does not handle food delivery
- It does not process payments between customer and restaurant (cash/card at counter as usual)
- It does not store full payment card data
- It does not share one restaurant's customer data with another restaurant
- It does not allow customers to transfer points to another user

---

## 11. Open Questions for Review

The following areas are intentionally left open for critique and architectural decision:

1. **Authentication:** Should restaurant cashiers use a shared login or individual accounts? What happens if a tablet is stolen?
2. **QR code security:** How do we prevent a customer from screenshotting and reusing a QR? Should QR codes rotate every N seconds?
3. **Offline sync conflicts:** If two cashiers scan the same customer while offline, how is the duplicate resolved on sync?
4. **Data residency:** Should all data be hosted in Tunisia or abroad? Are there local regulations that apply?
5. **Scalability:** At what number of concurrent scans does the points system need to be queued vs real-time?
6. **Subscription billing:** What payment gateway works reliably in Tunisia for recurring billing?
7. **Reward reimbursement:** How exactly does the platform credit the restaurant for honored rewards — monthly invoice, credit note, or deduction from subscription?
8. **Premium tier enforcement:** How do we prevent a premium user from sharing their account to get double points for others?

---

*End of specification v1.0*
