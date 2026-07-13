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
    .from("transactions")
    .select("created_at,amount_dt,points_earned,user_id")
    .eq("restaurant_id", parsed.data.restaurantId)
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const csv = [
    "created_at,amount_dt,points_earned,user_id",
    ...(data ?? []).map((row) => `${row.created_at},${row.amount_dt},${row.points_earned},${row.user_id}`)
  ].join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=fastpass-transactions.csv"
    }
  });
}
