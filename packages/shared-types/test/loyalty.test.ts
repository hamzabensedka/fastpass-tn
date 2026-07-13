import { describe, expect, it } from "vitest";
import {
  calculatePoints,
  createOfflineScanIdempotencyKey,
  detectSuspiciousScanBurst,
  validateOrderAmount
} from "../src/index";

describe("loyalty rules", () => {
  it("floors Tunisian dinar amounts and doubles premium points", () => {
    expect(calculatePoints({ amountDt: 15.75, isPremium: false })).toBe(15);
    expect(calculatePoints({ amountDt: 15.75, isPremium: true })).toBe(30);
  });

  it("rejects cashier-entered amounts outside fast-food guardrails", () => {
    expect(validateOrderAmount(0).success).toBe(false);
    expect(validateOrderAmount(501).success).toBe(false);
    expect(validateOrderAmount(25.5).success).toBe(true);
  });

  it("creates stable offline idempotency keys within a five-minute window", () => {
    const first = createOfflineScanIdempotencyKey({
      customerId: "user-1",
      restaurantId: "restaurant-1",
      amountDt: 18,
      scannedAt: new Date("2026-05-10T12:01:30Z")
    });
    const duplicate = createOfflineScanIdempotencyKey({
      customerId: "user-1",
      restaurantId: "restaurant-1",
      amountDt: 18,
      scannedAt: new Date("2026-05-10T12:04:59Z")
    });
    const nextWindow = createOfflineScanIdempotencyKey({
      customerId: "user-1",
      restaurantId: "restaurant-1",
      amountDt: 18,
      scannedAt: new Date("2026-05-10T12:06:00Z")
    });

    expect(duplicate).toBe(first);
    expect(nextWindow).not.toBe(first);
  });

  it("flags suspicious scan bursts from one restaurant", () => {
    const now = new Date("2026-05-10T12:05:00Z");
    const scanTimes = Array.from(
      { length: 20 },
      (_, index) => new Date(now.getTime() - index * 10_000)
    );

    expect(detectSuspiciousScanBurst(scanTimes, now)).toBe(true);
  });
});
