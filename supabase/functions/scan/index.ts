import { handleCors } from "../_shared/cors.ts";
import { sha256Hex } from "../_shared/crypto.ts";
import { badRequest, json, unauthorized } from "../_shared/response.ts";
import { verifyQrPayload } from "../_shared/qr.ts";
import { createServiceClient, getAuthenticatedUser } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const cors = handleCors(request);
  if (cors) return cors;

  const actor = await getAuthenticatedUser(request);
  if (!actor) return unauthorized();

  const secret = Deno.env.get("QR_SIGNING_SECRET");
  if (!secret) return badRequest("QR signing secret is not configured");

  const body = await request.json().catch(() => null);
  if (!body) return badRequest("Invalid JSON body");

  const amountDt = Number(body.amountDt);
  if (!Number.isFinite(amountDt) || amountDt < 1 || amountDt > 500) {
    return badRequest("Order amount must be between 1 and 500 DT");
  }

  const qr = await verifyQrPayload(String(body.qrPayload ?? ""), new Date(), secret);
  if (!qr.valid) return json(qr, { status: 400 });

  const supabase = createServiceClient();
  const { data: actorProfile, error: actorError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", actor.id)
    .single();

  if (actorError || !["cashier", "restaurant_owner", "platform_admin"].includes(actorProfile.role)) {
    return unauthorized("Cashier access required");
  }

  const { data: device, error: deviceError } = await supabase
    .from("restaurant_devices")
    .select("id,is_active,restaurants(status)")
    .eq("id", body.deviceId)
    .eq("restaurant_id", body.restaurantId)
    .single();

  const restaurant = Array.isArray(device?.restaurants) ? device?.restaurants[0] : device?.restaurants;
  if (deviceError || !device?.is_active || restaurant?.status !== "active") {
    return badRequest("Restaurant device is not active");
  }

  const { data: customer, error: customerError } = await supabase
    .from("profiles")
    .select("id,is_premium")
    .eq("id", qr.userId)
    .single();

  if (customerError || !customer) return badRequest("Customer not found");

  const pointsEarned = Math.floor(amountDt) * (customer.is_premium ? 2 : 1);
  const scannedAt = body.scannedAt ? new Date(body.scannedAt) : new Date();
  const idempotencyKey =
    body.offlineId ??
    (await sha256Hex(
      [qr.userId, body.restaurantId, Math.floor(amountDt), Math.floor(scannedAt.getTime() / 300_000)].join(":")
    ));

  const { data, error } = await supabase.rpc("process_scan", {
    p_user_id: qr.userId,
    p_restaurant_id: body.restaurantId,
    p_device_id: body.deviceId,
    p_amount_dt: amountDt,
    p_points_earned: pointsEarned,
    p_idempotency_key: idempotencyKey,
    p_source: body.offlineId ? "offline_sync" : "online",
    p_scanned_at: scannedAt.toISOString()
  });

  if (error) {
    return badRequest("Unable to process scan", error.message);
  }

  return json({
    transaction: data,
    pointsEarned,
    customerId: qr.userId,
    idempotencyKey
  });
});
