import { NextResponse } from "next/server";
import { requirePlatformAdmin } from "../../../../lib/authGuards";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requirePlatformAdmin(request);
  if ("error" in auth) return auth.error;

  const supabase = auth.supabase;
  const { data, error } = await supabase
    .from("deals")
    .select("id,restaurant_id,title,status,is_promoted,starts_at,ends_at,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ deals: data });
}
