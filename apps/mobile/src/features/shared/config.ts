export const mobileConfig = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  mapboxPublicToken: process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN ?? "",
  appVariant: process.env.EXPO_PUBLIC_APP_VARIANT === "cashier" ? "cashier" : "customer"
} as const;
