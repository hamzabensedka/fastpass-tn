# Screen 13 — Notifications

**App:** Customer Mobile App  
**Type:** List / Inbox  
**Platform:** iOS & Android

---

## Purpose

Central inbox for all push notifications and in-app alerts. Shows points earned, rewards redeemed, new deals, and system messages. Lets users catch up on what they missed.

---

## Screen Content

### Header
- Back arrow (top-left) → returns to previous screen
- Title: "Notifications"
- "Mark all as read" text link (top-right)

### Notification List (chronological, newest first)
Each notification item shows:
- **Icon** (type-specific):
  - Green coin icon → points earned
  - Gift icon → reward redeemed
  - Megaphone icon → new deal
  - Info icon → system message
- **Title** (bold, e.g., "Points Added")
- **Body** (e.g., "You earned 15 points at Kiko Tunis")
- **Timestamp** (e.g., "2 hours ago")
- **Read/Unread indicator:** unread items have a blue dot and slightly different background

### Notification Types

| Type | Title | Body Example |
|---|---|---|
| Points earned | "Points Added" | "You earned 15 points at Kiko Tunis" |
| Reward redeemed | "Reward Redeemed" | "Free Sandwich redeemed successfully" |
| New deal nearby | "New Deal" | "50% off burgers at Burger House — 1.2km away" |
| Points bonus event | "Double Points Weekend" | "Earn 2x points at all restaurants this weekend!" |
| System | "Welcome to FastPass" | "Start earning points at partner restaurants near you" |

### Empty State
- "No notifications yet. We'll let you know when you earn points or a deal pops up!"

---

## Behavior

- Notifications fetched from server with pagination (20 at a time)
- Tapping a notification navigates to the relevant screen:
  - Points earned → Transaction History
  - Reward redeemed → Transaction History
  - New deal → Deal Detail
  - System → stays on Notifications
- Unread count badge on the Home screen bell icon syncs with this list
- "Mark all as read" clears all unread indicators
- Old notifications (>30 days) are auto-archived

---

## Design Notes

- Keep notification items compact — scan-friendly
- Unread items should be visually distinct (subtle background color difference)
- Type-specific icons add quick recognition
- No swipe-to-delete needed at MVP
