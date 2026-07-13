# Screen 07 — Shift Summary

**App:** Restaurant Cashier App  
**Type:** Report / Dashboard  
**Platform:** Android (tablet or phone)

---

## Purpose

Shows a summary of today's activity — how many customers were scanned, total points distributed, and redemptions processed. Gives the cashier (and restaurant manager looking over their shoulder) a quick snapshot of the day.

---

## Screen Content

### Header
- Back arrow → returns to QR Scanner
- Title: "Today's Summary"
- Date displayed (e.g., "May 10, 2026")

### Stats Cards (top section, 2x2 grid or horizontal scroll)

| Stat | Icon | Example |
|---|---|---|
| Total Scans | QR icon | 47 |
| Total Points Given | Coin icon | 2,340 pts |
| Total Revenue Scanned | DT icon | 2,340 DT |
| Redemptions Processed | Gift icon | 5 |

### Recent Scans List (scrollable, below stats)
Each item shows:
- Customer name
- Amount (DT)
- Points awarded
- Time (e.g., "2:15 PM")
- Type badge: "Scan" (blue) or "Redemption" (purple)

List sorted by most recent first.

### Pending Syncs (only visible when there are offline transactions)
- Yellow banner at top: "X transactions pending sync"
- List of pending items with "Waiting to sync" status
- "Sync Now" button (if internet is available)

### Footer
- "Log Out" button (red text, bottom of screen)
  - Confirmation: "Are you sure you want to log out?"

---

## Behavior

- Data is calculated from local transaction log + server data
- Pull-to-refresh to update from server
- Stats reset at midnight (new day = new summary)
- Pending syncs section only appears when offline transactions exist
- "Sync Now" attempts to push all pending transactions to the server
- Log out clears session but preserves pending offline transactions (they sync next login)

---

## Design Notes

- Stats cards should be large and readable — like a dashboard
- Use clear iconography for each stat type
- The recent scans list provides accountability and transparency
- Pending syncs banner should feel urgent (yellow/orange) but not alarming
- Simple, functional design — this is a quick-reference screen, not a deep analytics tool
