import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("x-cron-secret") !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.rpc("detect_scan_fraud", {
    p_window_minutes: 5
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ alertsCreated: data });
}
