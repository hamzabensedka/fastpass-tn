# Screen 01 — Restaurant Owner Login

**App:** Restaurant Owner Dashboard  
**Type:** Authentication  
**Platform:** Web Browser

---

## Purpose

Login page for the restaurant owner/manager to access their analytics dashboard, manage deals, and view their subscription. Uses the same credentials as the cashier app but leads to a different interface.

---

## Screen Content

### Layout (centered card on a branded background)
- FastPass logo (top center)
- Title: "Restaurant Dashboard"
- Subtitle: "Manage your restaurant on FastPass"

### Form Fields
1. **Email** — text input
   - Placeholder: "your@restaurant.com"
2. **Password** — password input
   - Placeholder: "Password"
   - Show/hide toggle
3. **Remember me** — checkbox (keeps session alive for 30 days)

### Actions
- **"Log In"** button (full width, brand color)
- **"Forgot Password?"** link → triggers password reset email
- **"New to FastPass? Apply here"** link → redirects to restaurant application form

### Error States
- Invalid credentials: "Incorrect email or password."
- Account pending approval: "Your application is under review. We'll notify you by email once approved."
- Subscription lapsed: "Your subscription has expired. Please renew to access the dashboard." + "Contact Support" link

---

## Behavior

- On success: redirect to Dashboard Overview
- Session stored in HTTP-only cookie, expires in 30 days if "Remember me" is checked, else on browser close
- Password reset sends a link valid for 1 hour
- If account is suspended by admin, show suspension message with support contact

---

## Design Notes

- Clean, professional login page — business-facing, not consumer-facing
- Centered card layout with branded background (subtle pattern or gradient)
- Responsive: works on desktop and tablet browsers
- No mobile-specific layout needed (restaurant owners use this on a computer)
