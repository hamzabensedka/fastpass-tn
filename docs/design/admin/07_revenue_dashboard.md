# Screen 07 — Revenue Dashboard

**App:** Platform Owner Admin Panel  
**Type:** Analytics / Finance  
**Platform:** Web Browser

---

## Purpose

The admin's financial overview. Shows all revenue streams, monthly recurring revenue (MRR), and financial health of the platform. Critical for understanding business viability and growth.

---

## Screen Content

### Page Header
- Title: "Revenue"
- Date range selector: This Month | Last 3 Months | Last 6 Months | This Year | Custom

### Revenue KPI Cards (top row)

| Card | Example | Trend |
|---|---|---|
| Monthly Recurring Revenue (MRR) | 17,400 DT | +8% |
| Deal Fee Income | 3,200 DT | +15% |
| Premium User Income | 2,850 DT | +22% |
| Data Report Income | 1,500 DT | — |
| Total Revenue | 24,950 DT | +12% |
| Active Subscriptions | 87 | +5 |

### Charts Section

**Chart 1: Revenue Over Time (line chart, multi-series)**
- X-axis: months
- Y-axis: revenue in DT
- Lines: Total | Subscriptions | Deals | Premium | Data Reports
- Each line can be toggled on/off

**Chart 2: Revenue Mix (donut/pie chart)**
- Shows proportion of each revenue stream
- Subscriptions: 70%, Deals: 13%, Premium: 11%, Data: 6%

**Chart 3: MRR Growth (area chart)**
- Shows MRR trend over time
- Highlights growth rate

### Revenue By Restaurant (table, bottom section)
Columns:
- Restaurant Name
- Subscription Tier
- Subscription Revenue (DT)
- Deal Fees Paid (DT)
- Reimbursements Owed (DT)
- Net Revenue (DT)
- Payment Status

Sorted by net revenue (highest first).

### Upcoming Payments Section
- List of upcoming subscription renewals for the next 7 days
- Highlights restaurants with failed payment methods
- Quick action: "Send Reminder" email

---

## Behavior

- Revenue data calculated from billing records
- All amounts in Tunisian Dinars (DT)
- Date range selector updates all KPIs, charts, and tables
- Charts are interactive (hover for exact values, click to drill down)
- Revenue by restaurant table is exportable as CSV
- Upcoming payments section helps proactive churn prevention

---

## Design Notes

- Financial dashboard aesthetic — precise numbers, clear trends
- Use green for growth, red for decline in trend indicators
- MRR should be the most prominent metric (it's the core business health indicator)
- Revenue mix chart provides quick understanding of diversification
- Table at the bottom provides restaurant-level granularity
