import { createNotificationPayload, distanceKm } from "@fastpass/shared-types";
import { NextResponse } from "next/server";
import { sendPushMessage } from "../../../../lib/notifications/oneSignal";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("x-cron-secret") !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServiceClient();
  const { data: deals, error } = await supabase
    .from("deals")
    .select("id,title,restaurant_id,restaurants(name,lat,lng)")
    .eq("status", "approved")
    .eq("is_promoted", true)
    .lte("starts_at", new Date().toISOString())
    .gte("ends_at", new Date().toISOString())
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  let sent = 0;
  for (const deal of deals ?? []) {
    const restaurant = Array.isArray(deal.restaurants) ? deal.restaurants[0] : deal.restaurants;
    if (!restaurant) continue;

    const { data: tokens } = await supabase
      .from("notification_tokens")
      .select("user_id,locale,profiles(last_lat,last_lng)")
      .eq("enabled", true)
      .limit(1000);

    for (const token of tokens ?? []) {
      const profile = Array.isArray(token.profiles) ? token.profiles[0] : token.profiles;
      if (!profile?.last_lat || !profile?.last_lng) continue;

      const nearby = distanceKm(
        { lat: Number(profile.last_lat), lng: Number(profile.last_lng) },
        { lat: Number(restaurant.lat), lng: Number(restaurant.lng) }
      ) <= 5;

      if (!nearby) continue;

      const payload = createNotificationPayload({
        type: "deal_nearby",
        locale: token.locale === "ar" ? "ar" : "fr",
        dealTitle: deal.title,
        restaurantName: restaurant.name
      });

      await sendPushMessage({
        userIds: [token.user_id],
        title: payload.title,
        body: payload.body,
        data: { dealId: deal.id }
      });
      sent += 1;
    }
  }

  return NextResponse.json({ sent });
}
