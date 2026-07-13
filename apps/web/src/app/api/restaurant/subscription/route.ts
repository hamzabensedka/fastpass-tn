import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRestaurantOwner } from "../../../../lib/authGuards";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  restaurantId: z.string().uuid()
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ restaurantId: url.searchParams.get("restaurantId") });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const auth = await requireRestaurantOwner(request, parsed.data.restaurantId);
  if ("error" in auth) return auth.error;

  const supabase = auth.supabase;
  const { data, error } = await supabase
    .from("subscriptions")
    .select("tier,status,monthly_fee_dt,reward_credit_balance_dt,current_period_end,grace_period_ends_at")
    .eq("restaurant_id", parsed.data.restaurantId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ subscription: data });
}
