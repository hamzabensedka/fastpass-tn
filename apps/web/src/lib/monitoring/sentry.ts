export function captureServerError(error: unknown, context: Record<string, unknown> = {}) {
  const dsn = process.env.SENTRY_DSN;
  const message = error instanceof Error ? error.message : String(error);

  if (!dsn) {
    console.error("FastPass server error", { message, context });
    return;
  }

  console.error("Sentry DSN configured; install @sentry/nextjs during deployment bootstrap", {
    message,
    context
  });
}
