export type RedemptionResponse =
  | { ok: true; redemptionId: string; code: string; expiresAt: string }
  | { ok: false; message: string };

export async function createRewardRedemption(
  endpoint: string,
  rewardId: string,
  token: string
): Promise<RedemptionResponse> {
  const response = await fetch(`${endpoint}/functions/v1/create-redemption`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ rewardId })
  });

  const payload = await response.json();
  if (!response.ok) {
    return { ok: false, message: payload.error ?? "Redemption failed" };
  }

  return {
    ok: true,
    redemptionId: payload.redemptionId,
    code: payload.code,
    expiresAt: payload.expiresAt
  };
}
