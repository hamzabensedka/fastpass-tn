type RedisCommand = ["GET", string] | ["SET", string, string, "EX", number] | ["DEL", string];

export async function redisCommand(command: RedisCommand): Promise<unknown> {
  const url = Deno.env.get("UPSTASH_REDIS_REST_URL");
  const token = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");

  if (!url || !token) {
    return null;
  }

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify([command])
  });

  if (!response.ok) {
    throw new Error(`Redis command failed with status ${response.status}`);
  }

  const [result] = await response.json();
  return result?.result ?? null;
}

export async function cacheRedemptionCode(codeHash: string, redemptionId: string): Promise<void> {
  await redisCommand(["SET", `redemption:${codeHash}`, redemptionId, "EX", 600]);
}
