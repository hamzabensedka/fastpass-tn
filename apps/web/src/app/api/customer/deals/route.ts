import { rankNearbyDeals } from "@fastpass/shared-types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  radiusKm: z.coerce.number().default(5)
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    lat: url.searchParams.get("lat"),
    lng: url.searchParams.get("lng"),
    radiusKm: url.searchParams.get("radiusKm") ?? 5
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("deals")
    .select("id,title,description,is_promoted,starts_at,ends_at,restaurant_id,restaurants(name,lat,lng,address,city,status)")
    .eq("status", "approved")
    .lte("starts_at", new Date().toISOString())
    .gte("ends_at", new Date().toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const deals = (data ?? []).flatMap((deal) => {
    const restaurant = Array.isArray(deal.restaurants) ? deal.restaurants[0] : deal.restaurants;
    if (!restaurant || restaurant.status !== "active") {
      return [];
    }

    return [{
      id: deal.id,
      title: deal.title,
      restaurantId: deal.restaurant_id,
      lat: Number(restaurant?.lat ?? 0),
      lng: Number(restaurant?.lng ?? 0),
      isPromoted: deal.is_promoted,
      startsAt: new Date(deal.starts_at),
      description: deal.description,
      restaurantName: restaurant?.name,
      address: restaurant?.address,
      city: restaurant?.city
    }];
  });

  const ranked = rankNearbyDeals({
    userLocation: { lat: parsed.data.lat, lng: parsed.data.lng },
    radiusKm: parsed.data.radiusKm,
    now: new Date(),
    deals
  });

  return NextResponse.json({ deals: ranked });
}
