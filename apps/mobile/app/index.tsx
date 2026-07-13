import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { mobileConfig } from "../src/features/shared/config";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>FastPass Tunisia</Text>
      <Text style={styles.title}>{mobileConfig.appVariant === "cashier" ? "Cashier Mode" : "Customer Mode"}</Text>
      <Link href="/customer" style={styles.link}>
        Customer app
      </Link>
      <Link href="/cashier" style={styles.link}>
        Cashier app
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f3ea"
  },
  kicker: {
    color: "#d7411f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  title: {
    color: "#171512",
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 16
  },
  link: {
    backgroundColor: "#171512",
    borderRadius: 14,
    color: "#fffaf0",
    fontWeight: "700",
    marginTop: 12,
    padding: 16,
    textAlign: "center"
  }
});
