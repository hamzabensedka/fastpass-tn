import { describe, expect, it } from "vitest";
import {
  aggregateDailyRestaurantStats,
  calculateSubscriptionInvoice,
  createNotificationPayload
} from "../src/index";

describe("billing and analytics", () => {
  it("deducts reward credits from subscription and rolls over negative balances", () => {
    expect(
      calculateSubscriptionInvoice({
        subscriptionFeeDt: 300,
        rewardCreditsDt: 80,
        previousCreditBalanceDt: 0
      })
    ).toEqual({ amountDueDt: 220, creditBalanceDt: 0 });

    expect(
      calculateSubscriptionInvoice({
        subscriptionFeeDt: 150,
        rewardCreditsDt: 220,
        previousCreditBalanceDt: 20
      })
    ).toEqual({ amountDueDt: 0, creditBalanceDt: 90 });
  });

  it("aggregates restaurant stats for read-optimized dashboards", () => {
    const stats = aggregateDailyRestaurantStats([
      { userId: "a", amountDt: 10, pointsEarned: 10, createdAt: new Date("2026-05-10T12:00:00Z") },
      { userId: "a", amountDt: 20, pointsEarned: 20, createdAt: new Date("2026-05-10T13:00:00Z") },
      { userId: "b", amountDt: 30, pointsEarned: 30, createdAt: new Date("2026-05-10T14:00:00Z") }
    ]);

    expect(stats).toEqual({
      scans: 3,
      uniqueCustomers: 2,
      totalSpendDt: 60,
      totalPointsIssued: 60,
      averageSpendDt: 20
    });
  });

  it("builds role-aware notification payloads", () => {
    expect(
      createNotificationPayload({
        type: "points_added",
        locale: "fr",
        points: 15,
        restaurantName: "Kiko Tunis"
      })
    ).toMatchObject({
      channel: "push",
      title: "Points ajoutés",
      body: "15 points ajoutés chez Kiko Tunis"
    });
  });
});
