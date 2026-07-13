# Screen 03 — Restaurant Applications

**App:** Platform Owner Admin Panel  
**Type:** Review Queue  
**Platform:** Web Browser

---

## Purpose

Allows the admin to review, approve, or reject new restaurant applications. New restaurants cannot go live on the platform until the admin approves them.

---

## Screen Content

### Page Header
- Title: "Restaurant Applications"
- Filter tabs: **Pending** | **Approved** | **Rejected** | **All**
- Count badge on "Pending" tab (e.g., "3")

### Applications Table
Columns:
- Restaurant Name
- Owner Name
- Email
- Phone
- City / Location
- Cuisine Type
- Applied Date
- Status (Pending / Approved / Rejected)
- Actions

### Application Detail (opens as a side panel or modal when clicking a row)
- **Restaurant Information:**
  - Name
  - Description / About
  - Cuisine type
  - Address + map preview
  - Phone number
  - Email
  - Website (if any)
  - Logo (uploaded by applicant)
  - Cover photo (uploaded by applicant)
- **Owner Information:**
  - Full name
  - Phone number
  - Email
  - National ID or tax registration number
- **Business Documents:**
  - Tax registration document (uploaded)
  - Commercial license (uploaded)
  - Any additional supporting documents
- **Subscription Plan Selected:**
  - Which plan the restaurant chose

### Review Actions (bottom of detail panel)
- **"Approve"** button (green)
  - Triggers: restaurant goes live, cashier credentials are generated, welcome email sent
- **"Reject"** button (red)
  - Opens a text field: "Reason for rejection" (required)
  - Triggers: rejection email sent to the restaurant with the reason
- **"Request More Info"** button (yellow/orange)
  - Opens a text field for specifying what additional info is needed
  - Triggers: email sent to restaurant asking for more details

---

## Behavior

- Applications sorted by date (oldest pending first — FIFO)
- Approved restaurants immediately appear in the customer app
- Rejected restaurants can re-apply with a new application
- Admin can search applications by name, city, or cuisine
- Each application review action is logged in the audit trail
- Email notifications are sent automatically on approve/reject

---

## Design Notes

- Pending applications should feel like an inbox that needs processing
- Detail panel should show all relevant info without the admin needing to leave the page
- Approve/Reject buttons should be clearly differentiated (green vs red)
- Uploaded documents should be viewable inline (PDF viewer, image viewer)
- Badge count on the "Pending" tab creates urgency
