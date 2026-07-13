import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePlatformAdmin } from "../../../../../lib/authGuards";

const bodySchema = z.object({
  status: z.enum(["pending", "active", "grace_period", "hidden", "suspended"])
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePlatformAdmin(request);
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = auth.supabase;
  const { data, error } = await supabase
    .from("restaurants")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id,status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ restaurant: data });
}
