import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextLink } from "../../src/components/ui";
import { setCustomerSessionDemo } from "../../src/features/customer/onboarding/storage";

export default function CustomerLoginRoute() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.lead}>Placeholder login — SMS auth ships next.</Text>
      <Button
        onPress={async () => {
          await setCustomerSessionDemo();
          router.replace("/customer/wallet");
        }}
        title="Continue as demo"
        variant="inverse"
      />
      <TextLink label="Create an account" onPress={() => router.push("/customer/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f3ea",
    flex: 1,
    gap: 16,
    justifyContent: "center",
    padding: 24
  },
  lead: {
    color: "#6f675c",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    textAlign: "center"
  }
});
