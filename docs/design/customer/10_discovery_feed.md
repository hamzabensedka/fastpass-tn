# Screen 10 — Discovery Feed

**App:** Customer Mobile App  
**Type:** Feed / Browsing  
**Platform:** iOS & Android

---

## Purpose

Displays active deals and promotions from partner restaurants. Acts as the discovery engine — helps customers find new restaurants and take advantage of limited-time offers. Drives foot traffic to partner restaurants.

---

## Screen Content

### Header
- Title: "Discover"
- Location indicator (top-right): "[City/Area name]" with a pin icon
  - Tapping opens location picker or uses GPS to update

### Deal Cards (vertical scrollable feed)
Each deal card shows:
- **Restaurant logo** (small, top-left of card)
- **Restaurant name**
- **Deal image** (wide banner — the main visual)
- **Deal title** (e.g., "Buy 1 Get 1 Free on all burgers")
- **Discount badge** (e.g., "50% OFF" in a colored tag)
- **Valid dates** (e.g., "May 10 – May 17, 2026")
- **Distance from user** (e.g., "1.2 km away")
- **Points multiplier** (if applicable, e.g., "2x points this weekend")

### Sorting Options (horizontal chips at top, below header)
- **Nearby** (default) | **Newest** | **Ending Soon** | **Popular**

### Tapping a Deal Card → Deal Detail (full screen)
- Full-size deal image
- Restaurant name + logo
- Deal title and full description
- Terms & conditions (e.g., "Valid for dine-in only", "Cannot be combined with other offers")
- Valid dates
- "Get Directions" button → opens Maps app
- "View Restaurant" → navigates to Restaurant Detail screen
- Share button → share deal via messaging apps

### Empty State
- If no deals nearby: "No deals in your area right now. Check back soon!"
- "Explore the map" button → navigates to Map View

---

## Behavior

- Deals are fetched from server based on user's location
- Only approved deals are shown (admin-approved)
- Deals from restaurants with lapsed subscriptions are hidden
- Pull-to-refresh to update feed
- Deals auto-sorted by proximity by default
- Location permission prompt on first visit to this tab
- If location is denied, deals are shown without distance and sorted by newest

---

## Design Notes

- Deal cards should be visually rich — large images, bold discount badges
- Feed should feel like a social media feed (Instagram-style cards)
- Distance labels help users decide quickly
- "Ending Soon" deals could have a subtle urgency indicator (red timer icon)
- Use the bottom navigation bar (Discover tab is active/highlighted)
