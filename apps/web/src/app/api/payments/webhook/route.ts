import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!webhookSecret || request.headers.get("x-payment-webhook-secret") !== webhookSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const providerPaymentId = body?.payment_id ?? body?.paymentRef ?? body?.provider_payment_id;
  const status = body?.status === "SUCCESS" || body?.status === "completed" ? "paid" : String(body?.status ?? "failed");

  if (!providerPaymentId) {
    return NextResponse.json({ error: "Missing provider payment id" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();
  const { data: payment, error } = await supabase
    .from("payments")
    .update({ status, paid_at: status === "paid" ? new Date().toISOString() : null })
    .eq("provider_payment_id", providerPaymentId)
    .select("id,subscription_id,status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (payment.status === "paid") {
    await supabase
      .from("subscriptions")
      .update({
        status: "active",
        grace_period_ends_at: null,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq("id", payment.subscription_id);
  }

  return NextResponse.json({ ok: true });
}
