import { describe, expect, it } from "vitest";
import { enqueueOfflineScan, getPendingScans, markScanSynced } from "../src/features/cashier/offlineQueue";

describe("cashier offline queue", () => {
  it("deduplicates offline scans by idempotency key and removes synced scans", () => {
    const first = enqueueOfflineScan([], {
      idempotencyKey: "same-key",
      qrPayload: "qr",
      restaurantId: "restaurant-1",
      deviceId: "device-1",
      amountDt: 18,
      scannedAt: "2026-05-10T12:00:00.000Z"
    });
    const duplicate = enqueueOfflineScan(first, {
      idempotencyKey: "same-key",
      qrPayload: "qr",
      restaurantId: "restaurant-1",
      deviceId: "device-1",
      amountDt: 18,
      scannedAt: "2026-05-10T12:02:00.000Z"
    });

    expect(getPendingScans(duplicate)).toHaveLength(1);
    expect(markScanSynced(duplicate, "same-key")).toHaveLength(0);
  });
});
