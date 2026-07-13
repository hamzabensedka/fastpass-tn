# Screen 12 — Restaurant Detail

**App:** Customer Mobile App  
**Type:** Detail Page  
**Platform:** iOS & Android

---

## Purpose

Shows full information about a specific partner restaurant — location, active deals, and the customer's points history with that restaurant. Helps customers decide to visit and see what they can earn or redeem there.

---

## Screen Content

### Header (collapsible)
- Restaurant cover photo (full width banner)
- Restaurant logo (overlapping the banner, bottom-left)
- Restaurant name (large)
- Cuisine type (e.g., "Pizza & Pasta")
- Address (one line)
- Open/Closed status with hours

### Action Buttons Row
- **"Get Directions"** → opens native Maps app
- **"Call"** → opens phone dialer with restaurant number
- **"Share"** → share restaurant via messaging apps

### My Points at This Restaurant (card)
- Points earned here (e.g., "380 pts earned")
- Number of visits (e.g., "12 visits")
- Last visit date
- "View history" link → opens Transaction History filtered to this restaurant

### Active Deals Section
- List of currently active deals at this restaurant
- Each deal card: title, discount badge, valid dates
- Tapping a deal → opens Deal Detail (same as from Discovery Feed)
- If no active deals: "No active deals right now"

### Available Rewards Section
- Rewards that can be redeemed specifically at this restaurant
- Each reward: title, points cost, "Redeem" button
- Also shows universal rewards (valid at any restaurant)

---

## Behavior

- Data fetched from server on load
- Points and visit data are specific to the logged-in customer
- "Get Directions" uses the restaurant's coordinates
- Deals shown only if they are admin-approved and currently active
- If restaurant subscription is lapsed, this screen is not accessible

---

## Design Notes

- Cover photo + logo combo creates visual identity for each restaurant
- Keep the layout modular — cards for each section
- Points card should feel personalized ("your" stats at this restaurant)
- Deals and rewards should be easy to act on from this screen
