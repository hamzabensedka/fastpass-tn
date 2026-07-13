export type OfflineScan = {
  idempotencyKey: string;
  qrPayload: string;
  restaurantId: string;
  deviceId: string;
  amountDt: number;
  scannedAt: string;
};

export function enqueueOfflineScan(queue: OfflineScan[], scan: OfflineScan): OfflineScan[] {
  if (queue.some((queuedScan) => queuedScan.idempotencyKey === scan.idempotencyKey)) {
    return queue;
  }

  return [...queue, scan];
}

export function getPendingScans(queue: OfflineScan[]): OfflineScan[] {
  return [...queue].sort((a, b) => new Date(a.scannedAt).getTime() - new Date(b.scannedAt).getTime());
}

export function markScanSynced(queue: OfflineScan[], idempotencyKey: string): OfflineScan[] {
  return queue.filter((scan) => scan.idempotencyKey !== idempotencyKey);
}
