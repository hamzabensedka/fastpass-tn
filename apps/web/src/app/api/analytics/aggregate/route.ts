import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("x-cron-secret") !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { statDate } = await request.json().catch(() => ({ statDate: undefined }));
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.rpc("aggregate_restaurant_stats", {
    p_stat_date: statDate ?? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ rowsAffected: data });
}
