import { handleCors } from "../_shared/cors.ts";
import { badRequest, json, unauthorized } from "../_shared/response.ts";
import { getAuthenticatedUser } from "../_shared/supabase.ts";
import { verifyQrPayload } from "../_shared/qr.ts";

Deno.serve(async (request) => {
  const cors = handleCors(request);
  if (cors) return cors;

  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorized();

  const secret = Deno.env.get("QR_SIGNING_SECRET");
  if (!secret) return badRequest("QR signing secret is not configured");

  const body = await request.json().catch(() => null);
  if (!body?.payload) return badRequest("Missing QR payload");

  const result = await verifyQrPayload(String(body.payload), new Date(), secret);
  return json(result, { status: result.valid ? 200 : 400 });
});
