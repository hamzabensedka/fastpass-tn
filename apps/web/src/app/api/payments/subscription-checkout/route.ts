import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRestaurantOwner } from "../../../../lib/authGuards";
import { createCheckoutSession } from "../../../../lib/payments/providers";

const bodySchema = z.object({
  restaurantId: z.string().uuid(),
  successUrl: z.string().url(),
  failUrl: z.string().url()
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const auth = await requireRestaurantOwner(request, parsed.data.restaurantId);
  if ("error" in auth) return auth.error;

  const supabase = auth.supabase;
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("id,monthly_fee_dt,reward_credit_balance_dt")
    .eq("restaurant_id", parsed.data.restaurantId)
    .single();

  if (error || !subscription) {
    return NextResponse.json({ error: error?.message ?? "Subscription not found" }, { status: 404 });
  }

  const amountDt = Math.max(0, Number(subscription.monthly_fee_dt) - Number(subscription.reward_credit_balance_dt));
  const checkout = await createCheckoutSession({
    amountDt,
    description: "FastPass restaurant subscription",
    successUrl: parsed.data.successUrl,
    failUrl: parsed.data.failUrl
  });

  await supabase.from("payments").insert({
    subscription_id: subscription.id,
    provider: checkout.provider,
    provider_payment_id: checkout.paymentId,
    amount_dt: amountDt,
    status: "pending"
  });

  return NextResponse.json({ checkout });
}
