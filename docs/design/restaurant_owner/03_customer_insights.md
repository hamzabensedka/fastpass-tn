# Screen 03 — Customer Insights

**App:** Restaurant Owner Dashboard  
**Type:** Analytics  
**Platform:** Web Browser

---

## Purpose

Detailed analytics about the restaurant's customers on FastPass. Shows visitor patterns, loyalty metrics, and behavioral insights to help the restaurant owner make informed decisions.

---

## Screen Content

### Page Header
- Title: "Customer Insights"
- Date range selector (same as Dashboard Overview)

### KPI Cards Row (4 cards)

| Card | Description | Example |
|---|---|---|
| Unique Visitors | Distinct customers this period | 198 |
| Returning Customers | Customers who visited more than once | 87 (44%) |
| New Customers | First-time visitors this period | 111 (56%) |
| Avg Visits per Customer | Average number of visits per customer | 1.7 |

### Charts Section

**Chart 1: New vs Returning Customers (stacked bar chart)**
- X-axis: weeks or days
- Y-axis: number of customers
- Two colors: new (blue) and returning (green)

**Chart 2: Busiest Hours (heatmap or bar chart)**
- X-axis: hours of the day (8 AM – 11 PM)
- Y-axis: number of scans
- Highlights peak hours

**Chart 3: Busiest Days of the Week (bar chart)**
- X-axis: Mon – Sun
- Y-axis: average scans per day
- Highlights busiest day

### Top Customers Table
- Top 10 customers by points earned at this restaurant
- Columns: Rank | Customer Name (partial, privacy) | Total Visits | Total Spend (DT) | Points Earned
- Note: "Customer names are partially hidden for privacy"

---

## Behavior

- All data scoped to the logged-in restaurant only
- Date range selector updates all metrics
- Charts render client-side
- Top customers table is anonymized (show first name + last initial only)
- Restaurant owner cannot see other restaurants' data
- Export button in the header exports this page's data as CSV

---

## Design Notes

- Focus on actionable insights — "your busiest hours" helps with staffing
- Heatmap visualization for hours makes peak times instantly recognizable
- Keep the analytics accessible — not every restaurant owner is data-savvy
- Include brief explanatory text under each chart (e.g., "Your restaurant is busiest on Fridays between 12–2 PM")
