# Screen 11 — Map View

**App:** Customer Mobile App  
**Type:** Map / Location  
**Platform:** iOS & Android

---

## Purpose

Shows all partner restaurants on a map relative to the user's current location. Helps customers find the nearest place to earn or spend points.

---

## Screen Content

### Header
- Title: "Nearby Restaurants"
- Search icon (top-right) → opens search bar to find a specific restaurant by name

### Map Area (takes up ~65% of screen)
- Full interactive map (Google Maps or Mapbox)
- User's current location shown as a blue dot
- Partner restaurants shown as branded pins (FastPass pin icon)
- Pin clusters when zoomed out (e.g., "5 restaurants" cluster)
- Tapping a pin shows a preview card (see below)

### Restaurant Preview Card (bottom sheet, appears on pin tap)
- Restaurant logo + name
- Cuisine type (e.g., "Burgers & Sandwiches")
- Distance (e.g., "800m away")
- Rating (if available, or omit at MVP)
- Active deal count (e.g., "2 deals active")
- "View Details" button → navigates to Restaurant Detail screen
- "Get Directions" button → opens native Maps app

### List Toggle (bottom of screen)
- Toggle button: "Map" / "List" switch
- List view shows the same restaurants as a scrollable list sorted by distance
- Each list item: logo, name, cuisine, distance, deal count

### Search Bar (appears when search icon is tapped)
- Text input: "Search restaurants..."
- Results filter the map pins and list in real-time
- Keyboard with search action button

---

## Behavior

- Requires location permission — prompt on first visit
- If location denied: show map centered on Tunis with a message "Enable location for nearby results"
- Map auto-centers on user location on load
- Pins only show restaurants with active subscriptions
- Pull-to-refresh or map drag to reload pins for the visible area
- List view remembers scroll position when switching back from map

---

## Design Notes

- Map should dominate the screen — it's the primary interface here
- Restaurant pins should be visually distinct from default map markers
- Preview card should slide up from the bottom (bottom sheet pattern)
- Smooth transitions between map and list views
- Use the bottom navigation bar (Map tab is active/highlighted)
