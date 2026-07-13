import { describe, expect, it } from "vitest";
import { createRedemption, validateRedemption } from "../src/index";

describe("redemption codes", () => {
  it("creates six-digit codes that expire after ten minutes", () => {
    const redemption = createRedemption({
      userId: "user-1",
      rewardId: "reward-1",
      pointsCost: 100,
      now: new Date("2026-05-10T12:00:00Z")
    });

    expect(redemption.code).toMatch(/^\d{6}$/);
    expect(redemption.expiresAt.toISOString()).toBe("2026-05-10T12:10:00.000Z");
  });

  it("validates single-use unexpired codes only", () => {
    const redemption = createRedemption({
      userId: "user-1",
      rewardId: "reward-1",
      pointsCost: 100,
      now: new Date("2026-05-10T12:00:00Z")
    });

    expect(
      validateRedemption({
        redemption,
        code: redemption.code,
        now: new Date("2026-05-10T12:09:59Z")
      })
    ).toEqual({ valid: true });

    expect(
      validateRedemption({
        redemption: { ...redemption, status: "used" },
        code: redemption.code,
        now: new Date("2026-05-10T12:09:59Z")
      })
    ).toEqual({ valid: false, reason: "already_used" });

    expect(
      validateRedemption({
        redemption,
        code: redemption.code,
        now: new Date("2026-05-10T12:10:01Z")
      })
    ).toEqual({ valid: false, reason: "expired" });
  });
});
