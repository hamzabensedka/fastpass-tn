import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "../../../../lib/authGuards";

const bodySchema = z.object({
  userId: z.string().uuid(),
  deviceFingerprint: z.string().min(8)
});

export async function POST(request: Request) {
  const auth = await requireUser(request);
  if ("error" in auth) return auth.error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.userId !== auth.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = auth.supabase;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("premium_device_count,is_premium")
    .eq("id", parsed.data.userId)
    .single();

  if (profileError || !profile?.is_premium) {
    return NextResponse.json({ error: "Premium account required" }, { status: 400 });
  }

  if (profile.premium_device_count >= 2) {
    return NextResponse.json({ error: "Premium device limit reached" }, { status: 409 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ premium_device_count: profile.premium_device_count + 1 })
    .eq("id", parsed.data.userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
