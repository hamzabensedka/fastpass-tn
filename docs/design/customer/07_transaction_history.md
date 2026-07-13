# Screen 07 — Transaction History

**App:** Customer Mobile App  
**Type:** Detail / List  
**Platform:** iOS & Android

---

## Purpose

Complete chronological log of every point-related event — earnings, redemptions, bonus events, and adjustments. Provides transparency and builds trust with the customer.

---

## Screen Content

### Header
- Back arrow (top-left)
- Title: "Transaction History"
- Filter icon (top-right) → opens filter sheet

### Filter Sheet (bottom sheet, opened by filter icon)
- **Type filter:** All | Earned | Redeemed | Adjusted
- **Restaurant filter:** All | [list of visited restaurants]
- **Date range:** Last 7 days | Last 30 days | Last 3 months | All time
- "Apply" button + "Reset" link

### Transaction List (chronological, newest first)
Each transaction item shows:
- **Icon:** green up-arrow (earned) / red down-arrow (redeemed) / gray circle (adjusted)
- **Restaurant name** (e.g., "Kiko Tunis")
- **Description** (e.g., "Points earned" or "Redeemed: Free Sandwich")
- **Points change** (e.g., "+15" in green or "-100" in red)
- **Date & time** (e.g., "May 9, 2026 · 1:32 PM")

Transactions are grouped by date (e.g., "Today", "Yesterday", "May 7, 2026").

### Pagination
- Infinite scroll — loads 20 transactions at a time
- Loading spinner at the bottom when fetching more
- "No more transactions" text when the list ends

### Empty State
- If no transactions: illustration + "No transactions yet. Your earning and spending history will appear here."

---

## Behavior

- Data fetched with pagination from server
- Cached locally for offline viewing (last fetched data)
- Pull-to-refresh to load newest transactions
- Filter selections persist during the session but reset on app restart
- Tapping a transaction row expands to show additional details (order amount in DT, restaurant location)

---

## Design Notes

- Use clear color coding: green for earned, red for redeemed, gray for adjustments
- Date group headers should be sticky while scrolling
- Keep each transaction row compact — one-line summary with points on the right
- Filter sheet should be a bottom sheet, not a full screen
