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
    .from("daily_restaurant_stats")
    .select("stat_date,scans,unique_customers,total_spend_dt,total_points_issued,total_redemptions")
    .eq("restaurant_id", parsed.data.restaurantId)
    .order("stat_date", { ascending: false })
    .limit(31);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ stats: data });
}
