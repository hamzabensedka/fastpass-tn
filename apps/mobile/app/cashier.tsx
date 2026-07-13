import { t } from "@fastpass/shared-types";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { enqueueOfflineScan, type OfflineScan } from "../src/features/cashier/offlineQueue";

export default function CashierScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [amountDt, setAmountDt] = useState("15");
  const [queue, setQueue] = useState<OfflineScan[]>([]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera permission required</Text>
        <Button title="Allow camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Cashier Scanner</Text>
      <Text style={styles.title}>{t("fr", "cashier.scanCustomer")}</Text>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          const scan: OfflineScan = {
            idempotencyKey: `${data}:${amountDt}:${Math.floor(Date.now() / 300_000)}`,
            qrPayload: data,
            restaurantId: "20000000-0000-0000-0000-000000000001",
            deviceId: "50000000-0000-0000-0000-000000000001",
            amountDt: Number(amountDt),
            scannedAt: new Date().toISOString()
          };
          setQueue((current) => enqueueOfflineScan(current, scan));
        }}
      />
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={setAmountDt}
        style={styles.input}
        value={amountDt}
        placeholder="Amount in DT"
      />
      <Text style={styles.label}>
        {queue.length} {t("fr", "cashier.offlineQueue")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  title: {
    color: "#171512",
    fontSize: 28,
    fontWeight: "800"
  },
  camera: {
    borderRadius: 20,
    height: 300,
    overflow: "hidden"
  },
  input: {
    backgroundColor: "#fffaf0",
    borderColor: "#e2d8c7",
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 18,
    padding: 16
  },
  label: {
    color: "#6f675c",
    fontSize: 16
  }
});
