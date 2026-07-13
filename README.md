# FastPass Tunisia

Cross-brand loyalty, restaurant discovery, and rewards platform for Tunisian fast food. Customers earn points via rotating QR codes; cashiers scan in dedicated mode; restaurant owners manage deals and stats from a web dashboard.

## Apps

| App | Path | Description |
|-----|------|-------------|
| Mobile | `apps/mobile` | Expo React Native — customer + cashier modes |
| Web | `apps/web` | Next.js — restaurant owner and platform admin |
| Shared types | `packages/shared-types` | Domain schemas and validation rules |
| UI | `packages/ui` | Shared web UI helpers |
| Supabase | `supabase/` | Database schema, RLS policies, seeds, Edge Functions |

## Features

- **Customer:** Discover restaurants, earn/redeem points, transaction history, rewards catalog, map view, premium upgrade.
- **Cashier:** QR scanner, amount entry, scan confirmation, redemption flow, shift summary, offline queue support.
- **Restaurant owner:** Dashboard, customer insights, deal management, subscription billing, data export.
- **Platform admin:** Restaurant applications, deal approvals, user management, revenue dashboard, push notifications.

## Architecture highlights

- Rotating HMAC-signed QR payloads (not static customer codes)
- Server-side point calculation with cashier amount guardrails
- Idempotency keys for online and offline scan processing
- Supabase Row-Level Security for customer / restaurant / admin isolation
- Read-optimized daily stats for dashboards at 1,000+ users

## Getting started

### Prerequisites

- Node.js 18+
- Supabase project
- Redis (optional for local dev)
- Copy `.env.example` → `.env` and fill Supabase, Redis, payment, notification, and map tokens

### Install and verify

```bash
npm install
npm run typecheck
npm run test
```

### Run apps

```bash
# Mobile
cd apps/mobile && npx expo start

# Web
cd apps/web && npm run dev
```

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/FastPass_Tunisia_Spec.md](docs/FastPass_Tunisia_Spec.md) | Full product specification |
| [docs/Deployment_and_Scale_Runbook.md](docs/Deployment_and_Scale_Runbook.md) | Deployment and scaling guide |
| [docs/design/](docs/design/) | Screen-by-screen design specs |

## License

Private — portfolio project.
