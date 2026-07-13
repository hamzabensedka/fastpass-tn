# Screen 14 — Profile & Settings

**App:** Customer Mobile App  
**Type:** Settings / Account Management  
**Platform:** iOS & Android

---

## Purpose

Allows customers to view and edit their profile, manage app preferences, and access account-related actions like premium subscription, support, and logout.

---

## Screen Content

### Profile Section (top)
- User avatar (placeholder icon or uploaded photo)
- Full name (editable)
- Phone number (displayed, not editable — changing phone requires re-verification)
- Member since date (e.g., "Member since May 2026")
- Premium badge (if subscribed)
- "Edit Profile" button → inline edit mode for name and avatar

### Account Section (grouped list)
- **Premium Subscription** → navigates to Premium Upgrade screen
  - Shows current status: "Free" or "Premium (active until June 1)"
- **Transaction History** → navigates to Transaction History
- **My Points** → navigates to Points Wallet

### Preferences Section (grouped list)
- **Notifications** → toggle switches:
  - Push notifications (on/off)
  - Deal alerts (on/off)
  - Points updates (on/off)
- **Language** → Arabic / French / English (picker)
- **Location Services** → opens system settings for the app

### Support Section (grouped list)
- **Help & FAQ** → opens FAQ page (in-app browser)
- **Contact Support** → opens email draft or chat
- **Report a Problem** → simple form (subject + description + submit)

### Legal Section (grouped list)
- **Terms of Service** → in-app browser
- **Privacy Policy** → in-app browser
- **App Version** → displayed as text (e.g., "v1.0.0")

### Danger Zone
- **Log Out** button (red text)
  - Confirmation dialog: "Are you sure you want to log out?"
  - On confirm: clear auth token, navigate to Splash/Login
- **Delete Account** text link (small, gray)
  - Confirmation dialog with warning: "This will permanently delete your account and all your points. This cannot be undone."
  - Requires entering phone number to confirm
  - On confirm: account deleted, navigate to Splash

---

## Behavior

- Profile changes (name, avatar) save immediately on change
- Language change refreshes the entire app UI
- Notification toggles save immediately
- Log out clears all local data and cached content
- Delete account sends a request to the server and requires a confirmation step
- Premium subscription status fetched from server on load

---

## Design Notes

- Use grouped/sectioned list layout (iOS Settings style)
- Profile section at top should feel personal
- Danger zone actions (logout, delete) should be visually separated and de-emphasized
- Use the bottom navigation bar (Profile tab is active/highlighted)
