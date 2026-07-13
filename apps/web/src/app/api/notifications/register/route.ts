import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "../../../../lib/supabaseServer";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();
  const jwt = authorization.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("notification_tokens").upsert(
    {
      user_id: userData.user.id,
      token: body.token,
      locale: body.locale === "ar" ? "ar" : "fr",
      provider: "expo",
      enabled: true
    },
    { onConflict: "token" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
