# FastPass Tunisia Deployment and Scale Runbook

## MVP Deployment

1. Create a Supabase project and run all migrations in `supabase/migrations`.
2. Deploy Edge Functions from `supabase/functions`.
3. Deploy `apps/web` to Vercel with the variables in `.env.example`.
4. Build the Expo app with two profiles:
   - `EXPO_PUBLIC_APP_VARIANT=customer`
   - `EXPO_PUBLIC_APP_VARIANT=cashier`

## Scheduled Jobs

Run these routes every 5 minutes to nightly depending on workload:

- `POST /api/notifications/dispatch`: sends outbox push notifications.
- `POST /api/notifications/deals-nearby`: sends promoted nearby deal notifications.
- `POST /api/fraud/detect`: creates admin alerts for scan bursts.
- `POST /api/analytics/aggregate`: refreshes restaurant dashboard stats.

Use `CRON_SECRET` and send it in the `x-cron-secret` header.

## 1,000+ User Readiness

- Keep scan writes on primary Postgres through `process_scan`.
- Keep dashboard reads on `daily_restaurant_stats`, not raw `transactions`.
- Use Supabase connection pooling for web API routes.
- Use OneSignal segments for large deal campaigns.
- Run `npm run load-test:scans` against a staging scan endpoint before launch campaigns.

## 10,000+ User Readiness

- Add a Supabase read replica for restaurant dashboards and reporting.
- Move scheduled jobs to a queue-backed worker if cron duration exceeds provider limits.
- Store restaurant images and deal banners behind a CDN.
- Add Sentry with `@sentry/nextjs` and alert on payment, scan, and redemption failures.

## App Store Checklist

- Privacy policy and terms screens must mention phone number, location while app is open, transaction history, and data deletion.
- Android permissions: camera, notifications, location while in use.
- iOS permissions: camera, notifications, location while in use.
- Test on low-end Android hardware before first production release.
