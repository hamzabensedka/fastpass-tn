import { corsHeaders } from "./cors.ts";

export function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...corsHeaders,
      ...init.headers
    }
  });
}

export function badRequest(message: string, details?: unknown): Response {
  return json({ error: message, details }, { status: 400 });
}

export function unauthorized(message = "Unauthorized"): Response {
  return json({ error: message }, { status: 401 });
}
