import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@fastpass/customer_onboarding_complete_v1";
const SESSION_KEY = "@fastpass/customer_session_v1";

export async function hasCompletedCustomerOnboarding(): Promise<boolean> {
  const v = await AsyncStorage.getItem(ONBOARDING_KEY);
  return v === "true";
}

export async function setCustomerOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

export async function hasCustomerSession(): Promise<boolean> {
  const v = await AsyncStorage.getItem(SESSION_KEY);
  return Boolean(v);
}

/** Demo/session helper until Supabase auth is wired */
export async function setCustomerSessionDemo(): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, "demo");
}

export async function clearCustomerSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
