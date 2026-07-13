import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRestaurantOwner } from "../../../../lib/authGuards";

export const dynamic = "force-dynamic";

const dealSchema = z.object({
  restaurantId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(10),
  isPromoted: z.boolean().default(false),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime()
});

export async function POST(request: Request) {
  const parsed = dealSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const auth = await requireRestaurantOwner(request, parsed.data.restaurantId);
  if ("error" in auth) return auth.error;

  const supabase = auth.supabase;
  const { data, error } = await supabase
    .from("deals")
    .insert({
      restaurant_id: parsed.data.restaurantId,
      title: parsed.data.title,
      description: parsed.data.description,
      is_promoted: parsed.data.isPromoted,
      starts_at: parsed.data.startsAt,
      ends_at: parsed.data.endsAt,
      status: "pending_approval"
    })
    .select("id,status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ deal: data }, { status: 201 });
}

export async function GET(request: Request) {
  const restaurantId = new URL(request.url).searchParams.get("restaurantId");
  if (!restaurantId) {
    return NextResponse.json({ error: "Missing restaurantId" }, { status: 400 });
  }

  const auth = await requireRestaurantOwner(request, restaurantId);
  if ("error" in auth) return auth.error;

  const supabase = auth.supabase;
  const { data, error } = await supabase
    .from("deals")
    .select("id,title,description,status,is_promoted,starts_at,ends_at")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ deals: data });
}
