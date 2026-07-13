# Screen 02 — QR Scanner

**App:** Restaurant Cashier App  
**Type:** Main Screen / Camera  
**Platform:** Android (tablet or phone)

---

## Purpose

The primary screen of the cashier app. Opens the device camera to scan a customer's QR code. This is where most of the cashier's interaction happens — scan, enter amount, confirm.

---

## Screen Content

### Top Bar
- Restaurant name (top-left)
- Offline indicator: yellow "Offline" badge (only visible when internet is down)
- Menu icon (top-right) → opens side drawer or bottom sheet with:
  - Redemptions tab
  - Shift Summary
  - Log Out

### Camera Viewfinder (takes up ~70% of screen)
- Live camera preview
- QR code scanning frame (rounded square overlay in the center)
- Corner brackets to guide alignment
- Text below frame: "Point at customer's QR code"
- Auto-focus and auto-scan (no manual shutter button needed)
- Flash toggle button (bottom-left of viewfinder) for dark environments

### Scan Status Area (below viewfinder)
- Before scan: "Ready to scan" (neutral state)
- Scanning: subtle pulsing animation on the frame corners
- Success: green flash + haptic feedback + sound, transitions to Enter Amount screen
- Error: red flash + "Invalid QR code. Try again." (stays on scanner)

### Quick Stats Bar (bottom of screen)
- Today's scans count (e.g., "Scans today: 23")
- Tapping opens Shift Summary

---

## Behavior

- Camera opens immediately when screen loads (camera permission requested on first use)
- QR code is decoded client-side and validated against server
- On successful scan:
  - Vibration + success sound
  - Customer data fetched from server (name, points balance)
  - Auto-navigate to Enter Amount screen within 500ms
- On invalid QR: stay on scanner, show error, allow re-scan
- If customer was already scanned for this order: "Customer already scanned. One scan per order."
- Offline mode: scans are stored locally with timestamp, synced when internet returns
- Camera stays active (no timeout) — cashier app is always ready to scan

---

## Design Notes

- Viewfinder must be large and uncluttered — scanning should feel instant
- Dark UI around the viewfinder (camera preview stands out better)
- Success/error feedback must be immediate and unmistakable (sound + visual + haptic)
- "Offline" badge should be prominent but not block the viewfinder
- Support both portrait and landscape orientations
