import { describe, expect, it } from "vitest";
import { rankNearbyDeals } from "../src/index";

describe("deal discovery", () => {
  it("keeps deals inside the radius and ranks by paid promotion, distance, then recency", () => {
    const ranked = rankNearbyDeals({
      userLocation: { lat: 36.8065, lng: 10.1815 },
      radiusKm: 5,
      now: new Date("2026-05-10T12:00:00Z"),
      deals: [
        {
          id: "far",
          title: "Far deal",
          restaurantId: "r3",
          lat: 36.9,
          lng: 10.3,
          isPromoted: true,
          startsAt: new Date("2026-05-09T12:00:00Z")
        },
        {
          id: "promoted",
          title: "Promoted",
          restaurantId: "r1",
          lat: 36.807,
          lng: 10.182,
          isPromoted: true,
          startsAt: new Date("2026-05-08T12:00:00Z")
        },
        {
          id: "near-recent",
          title: "Near recent",
          restaurantId: "r2",
          lat: 36.807,
          lng: 10.182,
          isPromoted: false,
          startsAt: new Date("2026-05-10T11:00:00Z")
        }
      ]
    });

    expect(ranked.map((deal) => deal.id)).toEqual(["promoted", "near-recent"]);
  });
});
