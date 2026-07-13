import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#fffaf0" },
          headerTintColor: "#171512",
          contentStyle: { backgroundColor: "#f7f3ea" }
        }}
      >
        <Stack.Screen name="customer" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
