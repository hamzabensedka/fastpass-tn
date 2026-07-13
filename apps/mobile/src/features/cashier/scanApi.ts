import type { OfflineScan } from "./offlineQueue";

export type ScanResult =
  | { ok: true; pointsEarned: number; customerId: string }
  | { ok: false; message: string };

export async function submitScan(endpoint: string, scan: OfflineScan, token: string): Promise<ScanResult> {
  const response = await fetch(`${endpoint}/functions/v1/scan`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      qrPayload: scan.qrPayload,
      restaurantId: scan.restaurantId,
      deviceId: scan.deviceId,
      amountDt: scan.amountDt,
      offlineId: scan.idempotencyKey,
      scannedAt: scan.scannedAt
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    return { ok: false, message: payload.error ?? "Scan failed" };
  }

  return {
    ok: true,
    pointsEarned: payload.pointsEarned,
    customerId: payload.customerId
  };
}
