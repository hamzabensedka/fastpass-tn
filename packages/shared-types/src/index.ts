import { createHash, createHmac, randomInt } from "node:crypto";
import { z } from "zod";

export const roleSchema = z.enum(["customer", "cashier", "restaurant_owner", "platform_admin"]);
export type Role = z.infer<typeof roleSchema>;

export const restaurantStatusSchema = z.enum([
  "pending",
  "active",
  "grace_period",
  "hidden",
  "suspended"
]);
export type RestaurantStatus = z.infer<typeof restaurantStatusSchema>;

export const dealStatusSchema = z.enum(["draft", "pending_approval", "approved", "rejected", "expired"]);
export type DealStatus = z.infer<typeof dealStatusSchema>;

export const redemptionStatusSchema = z.enum(["pending", "used", "expired", "cancelled"]);
export type RedemptionStatus = z.infer<typeof redemptionStatusSchema>;

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  phone: z.string().min(6),
  name: z.string().min(1),
  role: roleSchema,
  isPremium: z.boolean().default(false),
  locale: z.enum(["fr", "ar"]).default("fr")
});
export type UserProfile = z.infer<typeof userProfileSchema>;

export const restaurantSchema = z.object({
  id: z.string().uuid(),
  groupId: z.string().uuid().nullable(),
  ownerId: z.string().uuid(),
  name: z.string().min(1),
  address: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
  status: restaurantStatusSchema
});
export type Restaurant = z.infer<typeof restaurantSchema>;

export const scanRequestSchema = z.object({
  qrPayload: z.string().min(1),
  restaurantId: z.string().uuid(),
  deviceId: z.string().uuid(),
  amountDt: z.number(),
  scannedAt: z.coerce.date(),
  offlineId: z.string().optional()
});
export type ScanRequest = z.infer<typeof scanRequestSchema>;

export type QrPayloadInput = {
  userId: string;
  issuedAt: Date;
  secret: string;
};

export type VerifyQrInput = {
  payload: string;
  now: Date;
  secret: string;
  toleranceSeconds?: number;
};

export type VerifyQrResult =
  | { valid: true; userId: string }
  | { valid: false; reason: "malformed" | "expired" | "signature_mismatch" };

export function calculatePoints(input: { amountDt: number; isPremium: boolean }): number {
  const basePoints = Math.floor(input.amountDt);
  return input.isPremium ? basePoints * 2 : basePoints;
}

export function validateOrderAmount(amountDt: number): { success: true } | { success: false; reason: string } {
  if (!Number.isFinite(amountDt)) {
    return { success: false, reason: "amount_must_be_numeric" };
  }

  if (amountDt < 1) {
    return { success: false, reason: "amount_below_minimum" };
  }

  if (amountDt > 500) {
    return { success: false, reason: "amount_above_fast_food_limit" };
  }

  return { success: true };
}

export function createOfflineScanIdempotencyKey(input: {
  customerId: string;
  restaurantId: string;
  amountDt: number;
  scannedAt: Date;
}): string {
  const fiveMinuteWindow = Math.floor(input.scannedAt.getTime() / (5 * 60 * 1000));
  return createHash("sha256")
    .update([input.customerId, input.restaurantId, Math.floor(input.amountDt), fiveMinuteWindow].join(":"))
    .digest("hex");
}

export function detectSuspiciousScanBurst(scanTimes: Date[], now: Date): boolean {
  const fiveMinutesAgo = now.getTime() - 5 * 60 * 1000;
  const recentScans = scanTimes.filter((scanTime) => scanTime.getTime() >= fiveMinutesAgo);
  return recentScans.length >= 20;
}

export async function generateRotatingQrPayload(input: QrPayloadInput): Promise<string> {
  const issuedAtSeconds = Math.floor(input.issuedAt.getTime() / 1000);
  const body = `${input.userId}.${issuedAtSeconds}`;
  const signature = sign(body, input.secret);
  return `${body}.${signature}`;
}

export async function verifyRotatingQrPayload(input: VerifyQrInput): Promise<VerifyQrResult> {
  const parts = input.payload.split(".");
  if (parts.length !== 3) {
    return { valid: false, reason: "malformed" };
  }

  const [userId, issuedAtSeconds, signature] = parts;
  if (!userId || !issuedAtSeconds || !signature || Number.isNaN(Number(issuedAtSeconds))) {
    return { valid: false, reason: "malformed" };
  }

  const ageSeconds = Math.abs(Math.floor(input.now.getTime() / 1000) - Number(issuedAtSeconds));
  if (ageSeconds > (input.toleranceSeconds ?? 60)) {
    return { valid: false, reason: "expired" };
  }

  const body = `${userId}.${issuedAtSeconds}`;
  if (sign(body, input.secret) !== signature) {
    return { valid: false, reason: "signature_mismatch" };
  }

  return { valid: true, userId };
}

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export type Redemption = {
  id: string;
  userId: string;
  rewardId: string;
  pointsCost: number;
  code: string;
  status: RedemptionStatus;
  expiresAt: Date;
};

export function createRedemption(input: {
  userId: string;
  rewardId: string;
  pointsCost: number;
  now: Date;
}): Redemption {
  return {
    id: createHash("sha256")
      .update(`${input.userId}:${input.rewardId}:${input.now.toISOString()}:${randomInt(1000, 9999)}`)
      .digest("hex")
      .slice(0, 32),
    userId: input.userId,
    rewardId: input.rewardId,
    pointsCost: input.pointsCost,
    code: randomInt(0, 1_000_000).toString().padStart(6, "0"),
    status: "pending",
    expiresAt: new Date(input.now.getTime() + 10 * 60 * 1000)
  };
}

export function validateRedemption(input: {
  redemption: Redemption;
  code: string;
  now: Date;
}): { valid: true } | { valid: false; reason: "code_mismatch" | "already_used" | "expired" } {
  if (input.redemption.code !== input.code) {
    return { valid: false, reason: "code_mismatch" };
  }

  if (input.redemption.status === "used") {
    return { valid: false, reason: "already_used" };
  }

  if (input.redemption.expiresAt.getTime() < input.now.getTime()) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true };
}

export type LocationPoint = {
  lat: number;
  lng: number;
};

export type DiscoverableDeal = LocationPoint & {
  id: string;
  title: string;
  restaurantId: string;
  isPromoted: boolean;
  startsAt: Date;
};

export type RankedDeal = DiscoverableDeal & {
  distanceKm: number;
};

export function rankNearbyDeals(input: {
  userLocation: LocationPoint;
  radiusKm: number;
  now: Date;
  deals: DiscoverableDeal[];
}): RankedDeal[] {
  return input.deals
    .map((deal) => ({
      ...deal,
      distanceKm: distanceKm(input.userLocation, deal)
    }))
    .filter((deal) => deal.distanceKm <= input.radiusKm && deal.startsAt.getTime() <= input.now.getTime())
    .sort((a, b) => {
      if (a.isPromoted !== b.isPromoted) {
        return a.isPromoted ? -1 : 1;
      }

      if (Math.abs(a.distanceKm - b.distanceKm) > 0.05) {
        return a.distanceKm - b.distanceKm;
      }

      return b.startsAt.getTime() - a.startsAt.getTime();
    });
}

export function distanceKm(a: LocationPoint, b: LocationPoint): number {
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const haversine =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateSubscriptionInvoice(input: {
  subscriptionFeeDt: number;
  rewardCreditsDt: number;
  previousCreditBalanceDt: number;
}): { amountDueDt: number; creditBalanceDt: number } {
  const net = input.subscriptionFeeDt - input.rewardCreditsDt - input.previousCreditBalanceDt;
  if (net >= 0) {
    return { amountDueDt: roundCurrency(net), creditBalanceDt: 0 };
  }

  return { amountDueDt: 0, creditBalanceDt: roundCurrency(Math.abs(net)) };
}

export type RestaurantTransactionSummary = {
  userId: string;
  amountDt: number;
  pointsEarned: number;
  createdAt: Date;
};

export function aggregateDailyRestaurantStats(transactions: RestaurantTransactionSummary[]): {
  scans: number;
  uniqueCustomers: number;
  totalSpendDt: number;
  totalPointsIssued: number;
  averageSpendDt: number;
} {
  const totalSpendDt = transactions.reduce((sum, transaction) => sum + transaction.amountDt, 0);
  const totalPointsIssued = transactions.reduce((sum, transaction) => sum + transaction.pointsEarned, 0);
  return {
    scans: transactions.length,
    uniqueCustomers: new Set(transactions.map((transaction) => transaction.userId)).size,
    totalSpendDt: roundCurrency(totalSpendDt),
    totalPointsIssued,
    averageSpendDt: transactions.length === 0 ? 0 : roundCurrency(totalSpendDt / transactions.length)
  };
}

export type NotificationInput =
  | {
      type: "points_added";
      locale: "fr" | "ar";
      points: number;
      restaurantName: string;
    }
  | {
      type: "reward_redeemed";
      locale: "fr" | "ar";
      rewardTitle: string;
    }
  | {
      type: "deal_nearby";
      locale: "fr" | "ar";
      dealTitle: string;
      restaurantName: string;
    };

export function createNotificationPayload(input: NotificationInput): {
  channel: "push";
  title: string;
  body: string;
} {
  if (input.type === "points_added") {
    return input.locale === "ar"
      ? { channel: "push", title: "تمت إضافة النقاط", body: `${input.points} نقطة أضيفت في ${input.restaurantName}` }
      : { channel: "push", title: "Points ajoutés", body: `${input.points} points ajoutés chez ${input.restaurantName}` };
  }

  if (input.type === "reward_redeemed") {
    return input.locale === "ar"
      ? { channel: "push", title: "تم استعمال المكافأة", body: `تم استعمال ${input.rewardTitle}` }
      : { channel: "push", title: "Récompense utilisée", body: `${input.rewardTitle} a été utilisée` };
  }

  return input.locale === "ar"
    ? { channel: "push", title: "عرض قريب منك", body: `${input.dealTitle} عند ${input.restaurantName}` }
    : { channel: "push", title: "Offre près de vous", body: `${input.dealTitle} chez ${input.restaurantName}` };
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export type Locale = "fr" | "ar";

const translations = {
  fr: {
    "customer.pointsAvailable": "points disponibles",
    "customer.rewardsReady": "récompenses disponibles",
    "cashier.scanCustomer": "Scanner le QR client",
    "cashier.offlineQueue": "scans hors ligne en attente",
    "restaurant.dashboard": "Tableau de bord restaurant",
    "admin.dashboard": "Centre d'administration"
  },
  ar: {
    "customer.pointsAvailable": "نقاط متاحة",
    "customer.rewardsReady": "مكافآت متاحة",
    "cashier.scanCustomer": "امسح رمز العميل",
    "cashier.offlineQueue": "عمليات مسح دون اتصال في الانتظار",
    "restaurant.dashboard": "لوحة تحكم المطعم",
    "admin.dashboard": "مركز الإدارة"
  }
} as const;

export type TranslationKey = keyof typeof translations.fr;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.fr[key];
}
