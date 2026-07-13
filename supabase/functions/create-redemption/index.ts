import { handleCors } from "../_shared/cors.ts";
import { sha256Hex } from "../_shared/crypto.ts";
import { badRequest, json, unauthorized } from "../_shared/response.ts";
import { cacheRedemptionCode } from "../_shared/redis.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const cors = handleCors(request);
  if (cors) return cors;

  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorized();

  const body = await request.json().catch(() => null);
  if (!body?.rewardId) return badRequest("Missing rewardId");

  const supabase = createServiceClient();
  const { data: reward, error: rewardError } = await supabase
    .from("rewards")
    .select("id,restaurant_id,points_cost,reimbursement_value_dt,is_active")
    .eq("id", body.rewardId)
    .single();

  if (rewardError || !reward?.is_active) return badRequest("Reward is not available");

  const { data: balance, error: balanceError } = await supabase
    .from("point_balances")
    .select("total_points")
    .eq("user_id", user.id)
    .single();

  if (balanceError || !balance || balance.total_points < reward.points_cost) {
    return badRequest("Insufficient points");
  }

  const code = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
  const codeText = code.toString().padStart(6, "0");
  const codeHash = await sha256Hex(codeText);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const { data: redemption, error } = await supabase
    .from("redemptions")
    .insert({
      user_id: user.id,
      reward_id: reward.id,
      restaurant_id: reward.restaurant_id,
      code_hash: codeHash,
      points_cost: reward.points_cost,
      reimbursement_value_dt: reward.reimbursement_value_dt,
      expires_at: expiresAt.toISOString()
    })
    .select("id,expires_at,status")
    .single();

  if (error || !redemption) return badRequest("Unable to create redemption", error?.message);

  await cacheRedemptionCode(codeHash, redemption.id);

  return json({
    redemptionId: redemption.id,
    code: codeText,
    expiresAt: redemption.expires_at
  });
});
