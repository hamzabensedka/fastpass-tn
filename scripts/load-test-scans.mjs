const endpoint = process.env.FASTPASS_SCAN_ENDPOINT;
const token = process.env.FASTPASS_TEST_TOKEN;

if (!endpoint || !token) {
  console.error("Set FASTPASS_SCAN_ENDPOINT and FASTPASS_TEST_TOKEN before running load tests.");
  process.exit(1);
}

const concurrency = Number(process.env.CONCURRENCY ?? 50);
const total = Number(process.env.TOTAL_SCANS ?? 500);

let completed = 0;
let failed = 0;

async function sendScan(index) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      qrPayload: process.env.FASTPASS_TEST_QR_PAYLOAD,
      restaurantId: process.env.FASTPASS_TEST_RESTAURANT_ID,
      deviceId: process.env.FASTPASS_TEST_DEVICE_ID,
      amountDt: 15,
      offlineId: `load-test-${Date.now()}-${index}`,
      scannedAt: new Date().toISOString()
    })
  });

  if (!response.ok) failed += 1;
  completed += 1;
}

async function main() {
  const startedAt = Date.now();
  for (let i = 0; i < total; i += concurrency) {
    await Promise.all(
      Array.from({ length: Math.min(concurrency, total - i) }, (_, offset) => sendScan(i + offset))
    );
  }

  const elapsedSeconds = (Date.now() - startedAt) / 1000;
  console.log(JSON.stringify({ total, completed, failed, elapsedSeconds, scansPerSecond: total / elapsedSeconds }));
}

await main();
