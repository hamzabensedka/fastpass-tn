# Screen 15 — Premium Upgrade

**App:** Customer Mobile App  
**Type:** Subscription / Paywall  
**Platform:** iOS & Android

---

## Purpose

Presents the premium subscription tier to free users. Premium users earn double points (2x per DT spent) and get an ad-free experience. This screen explains the benefits and handles the subscription flow.

---

## Screen Content

### Header
- Back arrow (top-left)
- Title: "FastPass Premium"

### Hero Section
- Premium crown/star illustration or icon (gold/accent color)
- Headline: "Earn Points Twice as Fast"
- Subtitle: "Upgrade to Premium and unlock exclusive benefits"

### Benefits List
Each benefit shown as an icon + text row:
- **2x Points** — "Earn double points on every purchase"
- **No Ads** — "Enjoy an ad-free experience"
- **Priority Deals** — "See new deals before everyone else"
- **Premium Badge** — "Stand out with a Premium badge on your profile"

### Pricing Card
- Price: "9.9 DT/month" (or configured price from the spec range: 5–10 DT)
- Billing note: "Billed monthly. Cancel anytime."
- **"Start Premium"** button (gold/accent color, full width, prominent)
- Small text: "You can cancel at any time from your profile settings"

### Already Premium (alternate view for premium users)
- Green checkmark + "You're a Premium member!"
- Current billing cycle: "Next billing: June 1, 2026"
- Benefits list (same as above but all marked as "Active")
- **"Cancel Subscription"** text link (red, bottom)
  - Confirmation dialog: "You'll keep Premium until [end date]. After that, you'll return to the free plan."

### Payment Method Section
- Selected payment method (if any)
- "Add payment method" or "Change" link
- Payment gateway integration (based on what works in Tunisia)

---

## Behavior

- Free users see the upgrade view with benefits and pricing
- Premium users see their active subscription details
- "Start Premium" initiates payment flow (in-app purchase or payment gateway)
- After successful payment: user is immediately upgraded, points earning rate doubles
- Subscription auto-renews monthly
- If payment fails: user gets a 3-day grace period, then reverts to free tier
- Cancellation takes effect at the end of the current billing period

---

## Design Notes

- Use premium visual language: gold accents, subtle gradients, elevated design
- Benefits should feel exclusive and valuable
- Price should be clear and prominent — no hidden fees
- The "Start Premium" button should be the most eye-catching element
- For premium users, the screen should feel confirmatory and reassuring
