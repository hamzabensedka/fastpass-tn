# Screen 09 — System Alerts & Settings

**App:** Platform Owner Admin Panel  
**Type:** Monitoring / Configuration  
**Platform:** Web Browser

---

## Purpose

Shows system alerts (suspicious activity, failed payments, errors) and provides platform-wide configuration settings. The admin's control center for platform health and behavior tuning.

---

## Screen Content

### Section A: Alerts (top half)

#### Alert Header
- Title: "System Alerts"
- Filter tabs: **Active** | **Resolved** | **All**
- Unread count badge on "Active" tab

#### Alerts List
Each alert shows:
- **Severity icon:** Red (critical) | Orange (warning) | Blue (info)
- **Title** (e.g., "Suspicious scan activity detected")
- **Description** (e.g., "Restaurant 'Burger House' had 25 scans in 5 minutes from the same customer")
- **Timestamp** (e.g., "15 minutes ago")
- **Source:** restaurant name or system component
- **Actions:**
  - "Investigate" → opens relevant detail page (restaurant or user)
  - "Dismiss" → marks as resolved
  - "Suspend [entity]" → quick suspend action

#### Alert Types (as defined in the spec)

| Alert | Severity | Trigger |
|---|---|---|
| Suspicious scan activity | Critical | 20+ scans in 5 min from same restaurant |
| Failed subscription payment | Warning | Payment failed for a restaurant |
| New restaurant application | Info | New application submitted |
| High redemption rate | Warning | Unusual redemption volume at a restaurant |
| User complaint | Warning | Support ticket flagged for admin |

---

### Section B: Platform Settings (bottom half or separate tab)

#### Points Configuration
- Points per DT (default: 1) — editable
- Premium multiplier (default: 2x) — editable
- Bonus event creator:
  - Event name (e.g., "Double Points Weekend")
  - Multiplier (e.g., 2x, 3x)
  - Start date/time — End date/time
  - Applies to: All restaurants | Specific restaurants
  - "Activate" button

#### Rewards Configuration
- List of all reward definitions
- Each reward: Name | Points Cost | Scope (all restaurants or specific) | Status (active/inactive)
- "Add Reward" button → form: name, description, points cost, image, scope, active toggle
- Edit / deactivate existing rewards

#### Redemption Settings
- Code expiry time (default: 10 minutes) — editable
- Code length (default: 6 digits)
- Max redemptions per user per day

#### Subscription Tiers
- List of subscription plans
- Each plan: Name | Price (DT/month) | Features
- Edit pricing and features
- Grace period duration (default: 3 days) — editable

#### Platform Fees
- Deal promotion fee: editable (100–300 DT range)
- Premium user price: editable (5–10 DT/month range)
- Data report pricing: editable

---

## Behavior

- Alerts are pushed in real-time (WebSocket or polling every 30 seconds)
- Critical alerts also trigger email notifications to admin
- Settings changes take effect immediately (with confirmation dialog)
- Audit trail logs all settings changes (who changed what, when)
- Points/rewards configuration changes do not affect existing transactions
- Bonus events can be scheduled in advance

---

## Design Notes

- Alerts section should feel like a monitoring dashboard — severity colors are critical
- Active alerts with critical severity should be visually urgent (red highlighting)
- Settings section uses standard form layouts — grouped by category
- Each setting group should have a "Save" button to prevent accidental changes
- Bonus event creation should show a preview of affected restaurants and estimated impact
