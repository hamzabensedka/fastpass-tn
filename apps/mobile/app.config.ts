import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "FastPass Tunisia",
  slug: "fastpass-tunisia",
  scheme: "fastpass",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "tn.fastpass.app"
  },
  android: {
    package: "tn.fastpass.app",
    permissions: ["CAMERA", "POST_NOTIFICATIONS"]
  },
  plugins: ["expo-router", "expo-secure-store", "expo-notifications", "expo-camera"],
  extra: {
    appVariant: process.env.EXPO_PUBLIC_APP_VARIANT ?? "customer"
  }
};

export default config;
