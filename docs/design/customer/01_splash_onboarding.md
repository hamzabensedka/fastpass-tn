# Screen 01 — Splash & Onboarding

**App:** Customer Mobile App  
**Type:** Introductory / First Launch Only  
**Platform:** iOS & Android

---

## Purpose

First screen the user sees when opening the app for the first time. Sets the brand tone and guides new users toward registration. Returning users skip this and go straight to the Home screen.

---

## Screen Content

### Splash (shown for 2–3 seconds on every cold launch)
- FastPass logo (centered, large)
- Tagline: "Earn points. Eat more. Pay less."
- Background: brand gradient or solid brand color

### Onboarding Carousel (first launch only, 3 slides)

| Slide | Illustration | Headline | Subtext |
|---|---|---|---|
| 1 | QR code scan illustration | "Scan & Earn" | "Show your QR code at any partner restaurant and earn 1 point per dinar spent" |
| 2 | Gift/reward illustration | "Redeem Rewards" | "Turn your points into free meals, drinks, and exclusive deals" |
| 3 | Map pin illustration | "Discover Nearby" | "Find the best deals from restaurants around you" |

### Bottom Actions
- **"Get Started"** button → navigates to Registration screen
- **"I already have an account"** text link → navigates to Login screen
- Dot indicators showing current slide position (1/3, 2/3, 3/3)
- Swipe gesture to navigate between slides

---

## Behavior

- Splash appears on every app open (cold start), lasts 2–3 seconds
- Onboarding carousel only appears on first launch (tracked via local storage flag)
- User can skip onboarding by tapping "Get Started" on any slide
- After onboarding is dismissed, the user never sees it again
- If the user is already logged in, skip everything and go to Home screen

---

## Design Notes

- Keep illustrations simple, flat-style, brand-colored
- Large readable text — users should understand the value in under 3 seconds per slide
- "Get Started" button should be prominent (filled, brand color, full width)
- "I already have an account" should be subtle (text link, not a button)
