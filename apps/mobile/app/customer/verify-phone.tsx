import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../src/components/ui";
import { stitchColors, stitchSpace } from "../../src/features/customer/stitch/colors";

/** Placeholder after registration — SMS OTP UI ships next. */
export default function VerifyPhoneRoute() {
  const router = useRouter();
  const { fullName, phoneDigits } = useLocalSearchParams<{ fullName?: string; phoneDigits?: string }>();
  const phone =
    typeof phoneDigits === "string" && phoneDigits.length > 0 ? `+216 ${phoneDigits}` : "—";

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Verify your phone</Text>
      <Text style={styles.meta}>
        {typeof fullName === "string" && fullName.length > 0 ? `${fullName} · ` : ""}
        {phone}
      </Text>
      <Text style={styles.lead}>SMS verification will be wired here.</Text>
      <Button title="Back to registration" variant="inverse" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  lead: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: stitchSpace.lg,
    textAlign: "center"
  },
  meta: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: stitchSpace.md,
    textAlign: "center"
  },
  title: {
    color: stitchColors.onSurface,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: stitchSpace.sm,
    textAlign: "center"
  },
  wrap: {
    backgroundColor: stitchColors.background,
    flex: 1,
    gap: stitchSpace.sm,
    justifyContent: "center",
    padding: stitchSpace.xl
  }
});
