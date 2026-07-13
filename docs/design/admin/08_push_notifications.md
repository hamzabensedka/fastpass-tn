# Screen 08 — Push Notifications Manager

**App:** Platform Owner Admin Panel  
**Type:** Communication / Campaign  
**Platform:** Web Browser

---

## Purpose

Allows the admin to send push notifications to all users or targeted segments. Used for announcements, promotional events (double points weekends), and platform-wide communications.

---

## Screen Content

### Page Header
- Title: "Push Notifications"
- **"+ New Notification"** button (brand color)

### Notification History Table
Columns:
- Title
- Body (truncated)
- Audience (All Users / Premium / City / Custom Segment)
- Sent Date
- Recipients Count
- Open Rate (%)
- Status (Sent / Scheduled / Draft / Failed)
- Actions (View | Duplicate | Delete)

### Create Notification Form (modal or side panel)
- **Title** — text input (max 50 characters)
  - Preview shows how it appears on the device
- **Body** — textarea (max 200 characters)
  - Push notification body text
- **Audience Selector:**
  - **All Users** — sends to everyone
  - **Premium Users Only** — only premium subscribers
  - **City** — dropdown: Tunis / Sousse / Sfax / etc.
  - **Custom Segment:**
    - Active in last 7 days
    - Inactive for 30+ days
    - Users with 100+ points
    - Users who haven't redeemed in 30+ days
- **Link (optional):** deep link URL — where the notification navigates when tapped
  - Options: None | Specific Deal | Rewards Catalog | Discovery Feed | Custom URL
- **Schedule:**
  - **Send Now** — immediate delivery
  - **Schedule** — date + time picker for future delivery
- **Preview:** shows a phone mockup with the notification as it would appear

### Actions
- **"Send Now"** / **"Schedule"** button (brand color)
  - Confirmation dialog: "Send to [X] users now?" with preview
- **"Save as Draft"** — saves without sending
- **"Cancel"** — discards

---

## Behavior

- Notifications are sent via Firebase Cloud Messaging (FCM) / APNs
- Audience count is calculated live as segment filters change
- Scheduled notifications can be cancelled before send time
- Sent notifications cannot be recalled
- Open rate tracking (if users open the notification)
- Failed deliveries are logged (invalid tokens, uninstalled apps)
- Rate limit: max 3 push notifications per user per day

---

## Design Notes

- Phone mockup preview is essential — the admin should see exactly what users will see
- Character counters on title/body fields prevent truncation on devices
- Audience count provides confidence before sending
- History table helps track what was sent and its effectiveness
- Scheduled notifications should be clearly marked in the table
