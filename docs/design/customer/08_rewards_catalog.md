# Screen 08 — Rewards Catalog

**App:** Customer Mobile App  
**Type:** Catalog / Browsing  
**Platform:** iOS & Android

---

## Purpose

Displays all available rewards the customer can redeem with their points. Motivates earning by showing what's attainable and creates a goal-oriented experience.

---

## Screen Content

### Header
- Title: "Rewards"
- Current points balance shown in top-right corner (e.g., "1,250 pts")

### Category Tabs (horizontal scroll)
- **All** | **Food** | **Drinks** | **Desserts** | **Specials**
- Active tab highlighted with brand color underline

### Rewards Grid / List
Each reward card shows:
- **Reward image** (photo of the item)
- **Title** (e.g., "Free Sandwich")
- **Points cost** (e.g., "100 pts")
- **Restaurant scope:** "Any restaurant" or "Only at [Restaurant Name]"
- **Availability badge:** "Available" (green) or "Need X more points" (gray)
- If available: subtle glow or highlight to draw attention

Cards sorted by: Available first, then by points cost (low to high).

### Tapping a Reward Card → Reward Detail (inline expand or modal)
- Larger image
- Full title
- Points cost
- Description (e.g., "Any regular sandwich from the menu at participating restaurants")
- Valid at: list of restaurant names or "All partner restaurants"
- Expiry: "No expiry" or specific date
- **"Redeem Now"** button (active only if user has enough points)
- "You have [X] points — you need [Y] more" (if insufficient)

---

## Behavior

- Rewards catalog is fetched from server and cached locally
- Pull-to-refresh to update
- "Redeem Now" tap → navigates to Redemption Code screen
- If user doesn't have enough points, button shows "Need X more" in disabled state
- Rewards availability is filtered server-side based on restaurant subscription status

---

## Design Notes

- Reward cards should feel aspirational — good food photography helps
- Points cost should be prominent on each card
- "Available" vs "need more points" should be immediately visually distinguishable
- Consider a progress indicator on "need more" cards showing how close they are
- Use the bottom navigation bar (Rewards tab is active/highlighted)
