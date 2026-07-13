import { createClient } from "npm:@supabase/supabase-js@2.49.4";

export function createServiceClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}

export async function getAuthenticatedUser(request: Request) {
  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authorization = request.headers.get("authorization");

  if (!url || !anonKey || !authorization) {
    return null;
  }

  const client = createClient(url, anonKey, {
    global: {
      headers: {
        authorization
      }
    },
    auth: {
      persistSession: false
    }
  });

  const { data, error } = await client.auth.getUser();
  if (error || !data.user) {
    return null;
  }

  return data.user;
}
