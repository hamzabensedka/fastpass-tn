import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#f7f3ea" },
        headerStyle: { backgroundColor: "#fffaf0" },
        headerTintColor: "#171512"
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="wallet" options={{ headerShown: true, title: "Wallet" }} />
      <Stack.Screen name="login" options={{ title: "Welcome back" }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="verify-phone" options={{ title: "Verify phone" }} />
    </Stack>
  );
}
