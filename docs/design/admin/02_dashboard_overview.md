# Screen 02 — Admin Dashboard Overview

**App:** Platform Owner Admin Panel  
**Type:** Dashboard / Home  
**Platform:** Web Browser

---

## Purpose

The admin's home screen. Provides a high-level view of the entire FastPass platform — users, restaurants, revenue, and pending actions. The admin should be able to assess platform health in under 10 seconds.

---

## Screen Content

### Top Navigation Bar (persistent across all admin pages)
- FastPass logo (left) + "Admin" label
- Navigation: **Dashboard** | **Restaurants** | **Deals** | **Users** | **Revenue** | **Notifications** | **Alerts**
- Admin name + avatar (right)
- Dropdown: Settings, Audit Log, Log Out

### Pending Actions Banner (top, only visible when items need attention)
- Yellow/orange alert bar: "You have [X] items requiring your attention"
- Quick links: "[3] restaurant applications" | "[2] deal submissions" | "[1] alert"

### KPI Cards Row (4–6 cards)

| Card | Value Example | Trend |
|---|---|---|
| Total Users | 12,450 | +340 this month |
| Active Users (30d) | 4,280 | 34% of total |
| Active Restaurants | 87 | +5 this month |
| Monthly Revenue | 24,500 DT | +12% vs last month |
| Deals Live | 23 | — |
| Redemptions Today | 142 | — |

### Charts Section

**Chart 1: User Growth (line chart)**
- X-axis: months
- Y-axis: total registered users
- Shows growth trajectory

**Chart 2: Revenue Breakdown (stacked bar chart)**
- X-axis: months
- Y-axis: revenue in DT
- Stacked by source: Subscriptions | Deal fees | Premium users | Data reports

**Chart 3: Platform Activity (area chart)**
- Daily scans across all restaurants
- Shows overall platform engagement

### Recent Activity Feed (right sidebar or bottom)
- Live feed of recent events:
  - "New restaurant application: Chez Ali — 5 min ago"
  - "Deal submitted for approval: Burger BOGO — 12 min ago"
  - "User milestone: 10,000th user registered — 1 hour ago"
  - "Alert: Suspicious scan activity at Restaurant X — 2 hours ago"

---

## Behavior

- Data aggregated across ALL restaurants and users
- Auto-refreshes every 5 minutes (or manual refresh)
- Clicking any KPI card navigates to the relevant detail page
- Pending actions banner links directly to the approval queues
- Alerts are highlighted with urgency indicators

---

## Design Notes

- Dense but organized — lots of data, but well-structured
- KPI cards should be scannable immediately
- Pending actions banner creates a clear call-to-action
- Activity feed adds a sense of real-time platform monitoring
- Professional, control-panel aesthetic
