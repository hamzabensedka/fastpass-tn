import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "./supabaseServer";

export async function requireUser(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const supabase = createSupabaseServiceClient();
  const jwt = authorization.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
  if (userError || !userData.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { supabase, user: userData.user };
}

export async function requirePlatformAdmin(request: Request) {
  const auth = await requireUser(request);
  if ("error" in auth) return auth;

  const { data: profile, error } = await auth.supabase
    .from("profiles")
    .select("role")
    .eq("id", auth.user.id)
    .single();

  if (error || profile?.role !== "platform_admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return auth;
}

export async function requireRestaurantOwner(request: Request, restaurantId: string) {
  const auth = await requireUser(request);
  if ("error" in auth) return auth;

  const { data: restaurant, error } = await auth.supabase
    .from("restaurants")
    .select("id")
    .eq("id", restaurantId)
    .eq("owner_id", auth.user.id)
    .single();

  if (error || !restaurant) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return auth;
}
