# Screen 06 — Data Export

**App:** Restaurant Owner Dashboard  
**Type:** Utility / Export  
**Platform:** Web Browser

---

## Purpose

Allows the restaurant owner to export their data as CSV files. Owners can only export their own restaurant's data — never another restaurant's.

---

## Screen Content

### Page Header
- Title: "Export Data"
- Subtitle: "Download your restaurant's data as CSV files"

### Export Options (card-based layout, one card per export type)

**Card 1: Transaction History**
- Description: "All customer scans and redemptions at your restaurant"
- Date range selector: Start date — End date
- Columns included: Date, Time, Customer ID (anonymized), Amount (DT), Points, Type (Scan/Redemption)
- **"Export CSV"** button

**Card 2: Customer Insights**
- Description: "Aggregated customer metrics and visit patterns"
- Date range selector: Start date — End date
- Columns included: Period, Unique Visitors, Returning %, New %, Avg Spend, Total Points
- **"Export CSV"** button

**Card 3: Deals Performance**
- Description: "Performance data for all your published deals"
- Columns included: Deal Title, Status, Start Date, End Date, Views, Redemptions Driven
- **"Export CSV"** button

**Card 4: Billing History**
- Description: "All billing transactions and invoices"
- Columns included: Date, Description, Amount, Status
- **"Export CSV"** button

### Export History (bottom section)
- Table of recent exports: Date | Type | File Size | Status | Download
- Files are available for download for 7 days after generation
- "Generating..." status while CSV is being prepared

---

## Behavior

- CSV generation happens server-side (can take a few seconds for large datasets)
- Show progress indicator while generating
- File downloads automatically when ready or is available via download link
- Maximum date range: 12 months per export
- Customer data in exports is anonymized (customer IDs, not names)
- Restaurant can only export their own data
- Rate limit: max 10 exports per day

---

## Design Notes

- Card layout makes each export type distinct and easy to find
- Each card should clearly describe what data is included
- Date range pickers should default to "Last 30 days"
- Download buttons should be clear and actionable
- Keep the page simple — it's a utility, not a feature to browse
