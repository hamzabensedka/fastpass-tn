# Screen 02 — Dashboard Overview

**App:** Restaurant Owner Dashboard  
**Type:** Dashboard / Home  
**Platform:** Web Browser

---

## Purpose

The landing page after login. Provides an at-a-glance view of the restaurant's performance on FastPass — how many customers, how many points, and how many redemptions this month.

---

## Screen Content

### Top Navigation Bar (persistent across all dashboard pages)
- FastPass logo (left)
- Navigation links: **Overview** | **Insights** | **Deals** | **Subscription** | **Export**
- Restaurant name + logo (right)
- User menu dropdown (right): Settings, Log Out

### Page Header
- Title: "Dashboard"
- Subtitle: "Welcome back, [Restaurant Name]"
- Date range selector: "This Month" dropdown (This Week | This Month | Last 30 Days | Last 3 Months | Custom)

### KPI Cards Row (4 cards, top of page)

| Card | Value Example | Comparison |
|---|---|---|
| Customers Scanned | 342 | +12% vs last month |
| Total Points Given | 18,450 pts | +8% vs last month |
| Redemptions Processed | 27 | -3% vs last month |
| Average Spend per Visit | 54 DT | +5% vs last month |

Each card shows: metric name, current value, percentage change (green up/red down arrow).

### Charts Section (below KPI cards)

**Chart 1: Daily Scans (bar chart)**
- X-axis: days of the selected period
- Y-axis: number of scans
- Hovering shows exact count per day

**Chart 2: Points Distribution (line chart)**
- X-axis: days
- Y-axis: points given
- Shows trend over time

### Recent Activity (bottom section)
- Table showing last 10 transactions:
  - Date/Time | Customer Name (partial) | Amount (DT) | Points | Type (Scan/Redemption)
- "View All" link → navigates to full transaction log

---

## Behavior

- All data is scoped to the logged-in restaurant only
- Data refreshes on page load; no auto-refresh
- Date range selector updates all KPIs and charts simultaneously
- Charts rendered client-side (Chart.js or similar)
- Percentage comparisons calculated against the previous equivalent period
- If no data yet (new restaurant): show empty state with tips on getting started

---

## Design Notes

- Professional dashboard aesthetic — clean, data-focused, well-spaced
- KPI cards should be scannable at a glance (large numbers)
- Charts should be simple and readable — no 3D, no excessive decoration
- Responsive layout: KPI cards stack on smaller screens
- Use the restaurant's brand color as an accent where possible
