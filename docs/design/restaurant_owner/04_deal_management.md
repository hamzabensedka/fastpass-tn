# Screen 04 — Deal Management

**App:** Restaurant Owner Dashboard  
**Type:** CRUD / Management  
**Platform:** Web Browser

---

## Purpose

Allows the restaurant owner to create, view, and manage promotional deals. Deals are submitted for platform admin approval before they go live in the customer discovery feed.

---

## Screen Content

### Page Header
- Title: "Deals"
- **"+ New Deal"** button (brand color, top-right)

### Deals Table / List
Each deal row shows:
- Deal title
- Discount summary (e.g., "50% off burgers")
- Start date — End date
- Status badge:
  - **Draft** (gray) — not yet submitted
  - **Pending Approval** (yellow) — submitted, waiting for admin
  - **Approved / Active** (green) — live in the customer app
  - **Rejected** (red) — declined by admin, with reason shown
  - **Expired** (gray, dimmed) — past end date
- Actions: Edit (if draft) | View | Delete (if draft)

### Create / Edit Deal Form (opens as a modal or side panel)
- **Title** — text input (e.g., "Buy 1 Get 1 Free Burgers")
  - Max 60 characters
- **Description** — textarea (e.g., "Available for all burger varieties, dine-in only")
  - Max 300 characters
- **Discount Type** — dropdown: Percentage Off | Fixed Amount Off | Free Item | Buy X Get Y
- **Discount Value** — number input (e.g., "50" for 50%)
- **Deal Image** — file upload (JPG/PNG, max 2MB)
  - Image preview shown after upload
- **Start Date** — date picker
- **End Date** — date picker
- **Terms & Conditions** — textarea (optional, e.g., "Dine-in only. Cannot be combined with other offers.")
- **Actions:**
  - **"Save as Draft"** → saves locally, not submitted for approval
  - **"Submit for Approval"** → sends to platform admin for review
  - **"Cancel"** → discards changes

### Rejected Deal Detail
- Shows rejection reason from admin (e.g., "Deal description is unclear. Please provide more detail.")
- "Edit & Resubmit" button → reopens the form with pre-filled data

---

## Behavior

- Only the restaurant's own deals are visible
- Deals in "Draft" status can be edited or deleted
- Deals in "Pending" status cannot be edited (must be withdrawn first)
- Deals in "Approved" status cannot be edited (to prevent bait-and-switch)
- Rejected deals can be edited and resubmitted
- Deal submission costs money (100–300 DT per deal, as per spec) — show pricing before submission
- Image upload validation: file type, file size, minimum dimensions

---

## Design Notes

- Table view with clear status badges — owner should see all deals at a glance
- Form should be clean with proper validation messages
- Status badges use consistent color coding across the dashboard
- Rejected deals should prominently show the admin's reason
- Consider a "deal preview" showing how it will appear in the customer app
