import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePlatformAdmin } from "../../../../lib/authGuards";

const bodySchema = z.object({
  userId: z.string().uuid(),
  adminId: z.string().uuid().optional(),
  pointsDelta: z.number().int(),
  reason: z.string().min(5)
});

export async function POST(request: Request) {
  const auth = await requirePlatformAdmin(request);
  if ("error" in auth) return auth.error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = auth.supabase;
  const { data, error } = await supabase.rpc("adjust_points", {
    p_user_id: parsed.data.userId,
    p_admin_id: parsed.data.adminId ?? auth.user.id,
    p_points_delta: parsed.data.pointsDelta,
    p_reason: parsed.data.reason
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ adjustment: data });
}
