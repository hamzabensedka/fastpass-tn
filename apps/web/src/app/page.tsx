const pillars = [
  "Rotating QR loyalty",
  "Restaurant dashboards",
  "Admin approval workflows",
  "Tunisia-ready billing"
];

export default function HomePage() {
  return (
    <main className="shell">
      <p className="kicker">FastPass Tunisia</p>
      <h1>Cross-brand loyalty for fast food teams and their customers.</h1>
      <p className="muted">
        This workspace contains the admin and restaurant dashboard shell. Mobile users and cashiers are served by
        the Expo app.
      </p>
      <section className="grid">
        {pillars.map((pillar) => (
          <article className="card" key={pillar}>
            <h2>{pillar}</h2>
            <p className="muted">Designed for secure MVP delivery and growth past 1,000 active users.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
