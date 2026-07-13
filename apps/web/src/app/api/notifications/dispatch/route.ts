import { createNotificationPayload } from "@fastpass/shared-types";
import { NextResponse } from "next/server";
import { sendPushMessage } from "../../../../lib/notifications/oneSignal";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("x-cron-secret") !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServiceClient();
  const { data: pending, error } = await supabase
    .from("notification_outbox")
    .select("id,user_id,event_type,payload")
    .eq("status", "pending")
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  for (const item of pending ?? []) {
    if (item.event_type === "points_added") {
      const payload = createNotificationPayload({
        type: "points_added",
        locale: "fr",
        points: Number(item.payload.points),
        restaurantName: String(item.payload.restaurantName)
      });

      await sendPushMessage({
        userIds: [item.user_id],
        title: payload.title,
        body: payload.body,
        data: { outboxId: item.id }
      });
    }

    await supabase
      .from("notification_outbox")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", item.id);
  }

  return NextResponse.json({ dispatched: pending?.length ?? 0 });
}
