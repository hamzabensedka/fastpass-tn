import { describe, expect, it } from "vitest";
import { generateRotatingQrPayload, verifyRotatingQrPayload } from "../src/index";

describe("rotating QR security", () => {
  it("accepts HMAC-signed QR payloads inside the 60-second tolerance", async () => {
    const secret = "test-secret";
    const now = new Date("2026-05-10T12:00:30Z");
    const payload = await generateRotatingQrPayload({
      userId: "user-123",
      issuedAt: new Date("2026-05-10T12:00:00Z"),
      secret
    });

    const result = await verifyRotatingQrPayload({
      payload,
      now,
      secret
    });

    expect(result).toEqual({ valid: true, userId: "user-123" });
  });

  it("rejects expired or tampered QR payloads", async () => {
    const secret = "test-secret";
    const payload = await generateRotatingQrPayload({
      userId: "user-123",
      issuedAt: new Date("2026-05-10T12:00:00Z"),
      secret
    });

    await expect(
      verifyRotatingQrPayload({
        payload,
        now: new Date("2026-05-10T12:02:01Z"),
        secret
      })
    ).resolves.toMatchObject({ valid: false, reason: "expired" });

    await expect(
      verifyRotatingQrPayload({
        payload: payload.replace("user-123", "user-999"),
        now: new Date("2026-05-10T12:00:30Z"),
        secret
      })
    ).resolves.toMatchObject({ valid: false, reason: "signature_mismatch" });
  });
});
