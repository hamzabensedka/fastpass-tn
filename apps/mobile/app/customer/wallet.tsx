import { t } from "@fastpass/shared-types";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, Text, View } from "react-native";
import { createCustomerHomeModel } from "../../src/features/customer/customerModel";

const demo = createCustomerHomeModel({
  displayName: "Demo Customer",
  totalPoints: 120,
  qrPayload: "demo-user.1778414400.demo-signature",
  rewardCount: 3
});

export default function CustomerWalletScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Customer Wallet</Text>
      <Text style={styles.title}>Bonjour, {demo.displayName}</Text>
      <View style={styles.card}>
        <QRCode value={demo.qrPayload} size={180} />
        <Text style={styles.caption}>Rotating QR appears here after auth.</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.stat}>{demo.totalPoints}</Text>
        <Text style={styles.label}>{t("fr", "customer.pointsAvailable")}</Text>
      </View>
      <Text style={styles.label}>
        {demo.rewardCount} {t("fr", "customer.rewardsReady")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: "#6f675c",
    marginTop: 12
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fffaf0",
    borderColor: "#e2d8c7",
    borderRadius: 20,
    borderWidth: 1,
    padding: 24
  },
  container: {
    flex: 1,
    gap: 16,
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
  label: {
    color: "#6f675c",
    fontSize: 16
  },
  row: {
    backgroundColor: "#171512",
    borderRadius: 20,
    padding: 20
  },
  stat: {
    color: "#fffaf0",
    fontSize: 42,
    fontWeight: "900"
  },
  title: {
    color: "#171512",
    fontSize: 28,
    fontWeight: "800"
  }
});
