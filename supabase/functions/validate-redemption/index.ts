import { handleCors } from "../_shared/cors.ts";
import { sha256Hex } from "../_shared/crypto.ts";
import { badRequest, json, unauthorized } from "../_shared/response.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const cors = handleCors(request);
  if (cors) return cors;

  const actor = await getAuthenticatedUser(request);
  if (!actor) return unauthorized();

  const body = await request.json().catch(() => null);
  if (!body?.code || !body?.restaurantId) {
    return badRequest("Missing redemption code or restaurantId");
  }

  const codeHash = await sha256Hex(String(body.code));
  const supabase = createServiceClient();
  const { data: actorProfile, error: actorError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", actor.id)
    .single();

  if (actorError || !["cashier", "restaurant_owner", "platform_admin"].includes(actorProfile.role)) {
    return unauthorized("Cashier access required");
  }

  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("status")
    .eq("id", body.restaurantId)
    .single();

  if (restaurantError || restaurant?.status !== "active") {
    return badRequest("Restaurant is not active");
  }

  const { data, error } = await supabase.rpc("redeem_code", {
    p_code_hash: codeHash,
    p_restaurant_id: body.restaurantId
  });

  if (error) {
    return badRequest("Invalid or expired redemption code", error.message);
  }

  return json({
    valid: true,
    redemption: data
  });
});
