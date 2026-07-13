# Screen 06 — Points Wallet

**App:** Customer Mobile App  
**Type:** Detail / Information  
**Platform:** iOS & Android

---

## Purpose

Shows the customer's detailed points breakdown — total balance plus points earned at each partner restaurant. Helps users understand where they earn the most and motivates continued visits.

---

## Screen Content

### Header
- Back arrow (top-left) → returns to Home
- Title: "My Points"

### Total Balance Card (top)
- Large points number (e.g., "1,250")
- Label: "Total Points"
- Subtitle: "Across all restaurants"
- If premium: "2x earning rate active" badge

### Points Per Restaurant (scrollable list)
Each item shows:
- Restaurant logo (small circle)
- Restaurant name
- Points earned at this restaurant (e.g., "380 pts")
- Progress bar showing proportion of total points
- Last visit date (e.g., "Last visit: 2 days ago")

List is sorted by highest points first.

### Empty State
- If user has 0 points: illustration + "No points yet. Visit a partner restaurant and show your QR code to start earning!"
- "Find restaurants" button → navigates to Map View

---

## Behavior

- Data fetched from server on load; cached locally for offline viewing
- Pull-to-refresh to update
- Tapping on a restaurant row navigates to that restaurant's detail page
- Points breakdown is calculated from transaction history

---

## Design Notes

- Total balance card should be visually prominent — same style as Home screen card
- Restaurant logos add visual variety to the list
- Use brand accent color for the progress bars
- Keep the layout clean — no charts at MVP, just numbers and bars
