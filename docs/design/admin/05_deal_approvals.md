# Screen 05 — Deal Approvals

**App:** Platform Owner Admin Panel  
**Type:** Review Queue  
**Platform:** Web Browser

---

## Purpose

Allows the admin to review, approve, or reject deal submissions from restaurant owners. Deals only appear in the customer discovery feed after admin approval.

---

## Screen Content

### Page Header
- Title: "Deal Approvals"
- Filter tabs: **Pending** | **Approved** | **Rejected** | **All**
- Count badge on "Pending" tab

### Deals Queue (card or table layout)
Each deal shows:
- Deal image (thumbnail)
- Deal title
- Restaurant name + logo
- Discount type and value (e.g., "50% off" or "Buy 1 Get 1")
- Valid dates (start – end)
- Submitted date
- Status badge
- "Review" button

### Deal Review Panel (opens when clicking "Review")
- **Deal image** (full size)
- **Title**
- **Description** (full text)
- **Discount details:** type, value, terms & conditions
- **Valid dates:** start and end
- **Restaurant context:**
  - Restaurant name
  - Subscription tier
  - Number of previous deals
  - Previous deal approval rate
- **Deal fee:** amount the restaurant will be charged (100–300 DT)
- **Preview:** mockup of how the deal will appear in the customer discovery feed

### Review Actions
- **"Approve"** button (green)
  - Deal goes live immediately (or on start date if future-dated)
  - Restaurant is charged the deal fee
  - Email notification sent to restaurant owner
- **"Reject"** button (red)
  - Reason text field (required)
  - Email sent with rejection reason
  - Restaurant can edit and resubmit
- **"Request Changes"** button (orange)
  - Feedback text field
  - Deal status set to "Changes Requested"
  - Restaurant can edit without creating a new submission

---

## Behavior

- Pending deals sorted by submission date (oldest first)
- Approved deals go live on their start date (or immediately if start date is today/past)
- Admin can search deals by restaurant name or deal title
- Each review action is logged in the audit trail
- Deals from suspended restaurants are auto-rejected

---

## Design Notes

- The deal preview is crucial — admin should see what customers will see
- Card layout works well for visual deals (images are important)
- Pending count creates urgency
- Rejection requires a reason — this creates transparency with restaurant owners
- Quick-action buttons (approve/reject) should be accessible without opening the full review panel for obvious approvals
