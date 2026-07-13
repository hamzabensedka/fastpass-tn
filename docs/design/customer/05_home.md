# Screen 05 — Home

**App:** Customer Mobile App  
**Type:** Main Screen / Hub  
**Platform:** iOS & Android

---

## Purpose

The primary screen customers see after login. Displays their personal QR code prominently (for scanning at restaurants) and provides quick access to their points balance and key features. This screen is the heart of the app.

---

## Screen Content

### Top Bar
- Greeting: "Hi, [First Name]" (top-left)
- Notification bell icon (top-right) with red badge if unread notifications exist
- Premium badge icon next to name (if user is a premium subscriber)

### QR Code Section (hero area — takes up the top 50% of screen)
- Large personal QR code (centered)
- Text below QR: "Show this to the cashier to earn points"
- QR code contains encoded user ID
- Brightness auto-increases when this screen is visible (for easier scanning in dim environments)
- Subtle pulsing animation on the QR border to draw attention

### Points Summary Card
- Total points balance (large number, prominent)
- Label: "Total Points"
- Small text: "1 point = 1 DT spent"
- If premium user: show "2x points active" badge
- Tap on card → navigates to Points Wallet screen

### Quick Actions Row (horizontal scroll or grid)
- **Rewards** icon + label → navigates to Rewards Catalog
- **History** icon + label → navigates to Transaction History
- **Deals** icon + label → navigates to Discovery Feed
- **Map** icon + label → navigates to Map View

### Recent Activity (compact list, max 3 items)
- Shows last 3 transactions (points earned or redeemed)
- Each item shows: restaurant name, points (+15 or -100), date
- "See all" link → navigates to Transaction History

---

## Bottom Navigation Bar (persistent across screens)

| Icon | Label | Destination |
|---|---|---|
| Home icon | Home | Home (current) |
| Gift icon | Rewards | Rewards Catalog |
| Compass icon | Discover | Discovery Feed |
| Map icon | Map | Map View |
| Person icon | Profile | Profile & Settings |

---

## Behavior

- QR code is always available — even offline (generated from locally stored user ID)
- Points balance fetches from server on screen load; shows cached value if offline
- Pull-to-refresh to update points and recent activity
- If premium user, the points card has a gold/accent border
- Notification badge count syncs with unread notifications from server

---

## Design Notes

- QR code must be high contrast (black on white) for reliable scanning
- Points number should be the second most prominent element after the QR code
- Use card-based layout for the points summary and quick actions
- Bottom nav bar should have 5 items max — clear, simple icons
- Screen should feel clean and uncluttered despite showing multiple sections
