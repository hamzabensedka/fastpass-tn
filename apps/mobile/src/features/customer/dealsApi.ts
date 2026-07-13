import type { RankedDeal } from "@fastpass/shared-types";

export type DealFeedItem = RankedDeal & {
  description?: string;
  restaurantName?: string;
  address?: string;
  city?: string;
};

export async function fetchNearbyDeals(input: {
  endpoint: string;
  lat: number;
  lng: number;
  radiusKm?: number;
  token: string;
}): Promise<DealFeedItem[]> {
  const params = new URLSearchParams({
    lat: String(input.lat),
    lng: String(input.lng),
    radiusKm: String(input.radiusKm ?? 5)
  });
  const response = await fetch(`${input.endpoint}/api/customer/deals?${params.toString()}`, {
    headers: {
      authorization: `Bearer ${input.token}`
    }
  });

  if (!response.ok) {
    return [];
  }

  const payload = await response.json();
  return payload.deals ?? [];
}
