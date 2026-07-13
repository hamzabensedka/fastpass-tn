const stats = [
  { label: "Scans this month", value: "0" },
  { label: "Points issued", value: "0" },
  { label: "Redemptions", value: "0" },
  { label: "Average spend", value: "0 DT" }
];

export default function RestaurantDashboardPage() {
  return (
    <main className="shell">
      <p className="kicker">Restaurant Dashboard</p>
      <h1>Track visits, rewards, and deals from one place.</h1>
      <section className="grid">
        {stats.map((stat) => (
          <article className="card" key={stat.label}>
            <p className="muted">{stat.label}</p>
            <h2>{stat.value}</h2>
          </article>
        ))}
      </section>
      <section className="card" style={{ marginTop: 16 }}>
        <h2>Deal management</h2>
        <p className="muted">Submit a deal for platform approval through `/api/restaurant/deals`.</p>
      </section>
    </main>
  );
}
