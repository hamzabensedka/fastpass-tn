const cards = [
  { label: "Pending restaurants", value: "Review queue", href: "/api/admin/restaurants" },
  { label: "Deal approvals", value: "Moderation", href: "/api/admin/deals" },
  { label: "Users", value: "Support tools", href: "/api/admin/users" },
  { label: "Point adjustments", value: "Audited changes", href: "/api/admin/points-adjustments" }
];

export default function AdminPage() {
  return (
    <main className="shell">
      <p className="kicker">Platform Admin</p>
      <h1>Operations command center</h1>
      <section className="grid">
        {cards.map((card) => (
          <a className="card" href={card.href} key={card.href}>
            <h2>{card.label}</h2>
            <p className="muted">{card.value}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
