import { hmacSha256Base64Url } from "./crypto.ts";

export type QrVerification =
  | { valid: true; userId: string }
  | { valid: false; reason: "malformed" | "expired" | "signature_mismatch" };

export async function verifyQrPayload(payload: string, now: Date, secret: string): Promise<QrVerification> {
  const parts = payload.split(".");
  if (parts.length !== 3) {
    return { valid: false, reason: "malformed" };
  }

  const [userId, issuedAtSeconds, signature] = parts;
  if (!userId || !issuedAtSeconds || !signature || Number.isNaN(Number(issuedAtSeconds))) {
    return { valid: false, reason: "malformed" };
  }

  const ageSeconds = Math.abs(Math.floor(now.getTime() / 1000) - Number(issuedAtSeconds));
  if (ageSeconds > 60) {
    return { valid: false, reason: "expired" };
  }

  const expected = await hmacSha256Base64Url(`${userId}.${issuedAtSeconds}`, secret);
  if (expected !== signature) {
    return { valid: false, reason: "signature_mismatch" };
  }

  return { valid: true, userId };
}
