import { LinearGradient } from "expo-linear-gradient";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { stitchColors, stitchSpace } from "./colors";

const LOGO_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDC32kwlr9X27lDM-TX_jq2Tz9W6NL856ffyISmx0jkdcDbFijt_skFlGvGsy7Ztbwshh-CehFEGlko7jVzvOWRoldSaLBiy-MFCPtLX7h4KsMB4R6ZRouDblTU9fmbzKEYlq5ju9v39PLCbC-Ym2pCvi-kKTYNdmzasfXs1oIMgwfD5TFDUSpYpSuDs83HByHGNQuyBjrlNC0rYHZuoIw3Xz2hB7W-QmT35S3_q4eLgkfH-LjNGhT4vjMNx3opQUIOO6L1V_iGbP46";

const BG_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbKX32PYhB6zMkjeNTRuD-RbDmkArmpUq5acNL-6wWNVbE17XaKYK6A89Y8k4f1jVAY8K58yHiT_XlHqObXDhTkcbmkq8HnLcA_gR15wD_-gpn84yZunrTAuBYK-f-GOQS4N_0FYTxi8uQFsDpa2hw6IWC93RdZtmJsyqS5jAECHKHW1m6p2DUS2rsV94tgwg5RJUZGWaILZjWYNmaAriV3pvp9QAcv40BEqiMuhnYaanjGsuIsE7BlGyZz7MdTeSdi5CgcxvkxtB9";

/** Mirrors `splash_screen/code.html` */
export function StitchSplash() {
  return (
    <View style={styles.root}>
      <LinearGradient colors={[stitchColors.primary, stitchColors.primaryContainer]} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
        <View pointerEvents="none" style={styles.velocityHint} />
        <View pointerEvents="none" style={[styles.glowBlob, styles.glowTop]} />
        <View pointerEvents="none" style={[styles.glowBlobSecondary, styles.glowBottom]} />

        <View style={styles.centerWrap}>
          <View style={styles.logoCard}>
            <Image accessibilityLabel="FastPass Logo" resizeMode="contain" source={{ uri: LOGO_URI }} style={styles.logoImg} />
          </View>
          <View style={styles.tagBlock}>
            <Text style={styles.headline}>Earn points. Eat more. Pay less.</Text>
            <View style={styles.premiumRow}>
              <View style={styles.rule} />
              <Text style={styles.premiumLabel}>Premium Velocity</Text>
              <View style={styles.rule} />
            </View>
          </View>
        </View>

        <View style={styles.loadingWrap}>
          <View style={styles.track}>
            <View style={styles.trackFill} />
          </View>
          <Text style={styles.loadingCaption}>Initializing FastPass...</Text>
        </View>

        <LinearGradient colors={["transparent", "rgba(0,0,0,0.2)"]} pointerEvents="none" style={styles.bottomFade} />
      </LinearGradient>

      <Image blurRadius={Platform.OS === "web" ? 0 : 1} resizeMode="cover" source={{ uri: BG_URI }} style={styles.backPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  backPhoto: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    zIndex: -1
  },
  bottomFade: {
    bottom: 0,
    height: 128,
    left: 0,
    position: "absolute",
    right: 0
  },
  centerWrap: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    maxWidth: 420,
    paddingHorizontal: stitchSpace.containerMargin,
    zIndex: 10
  },
  glowBlob: {
    backgroundColor: stitchColors.primaryFixed,
    borderRadius: 300,
    height: 600,
    opacity: 0.2,
    position: "absolute",
    width: 600
  },
  glowBlobSecondary: {
    backgroundColor: stitchColors.tertiaryContainer,
    borderRadius: 200,
    height: 400,
    opacity: 0.1,
    position: "absolute",
    width: 400
  },
  glowBottom: {
    bottom: 0,
    right: 0
  },
  glowTop: {
    left: -160,
    top: -160
  },
  headline: {
    color: stitchColors.white,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.24,
    lineHeight: 32,
    textAlign: "center"
  },
  loadingCaption: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    lineHeight: 16,
    marginTop: stitchSpace.sm,
    textAlign: "center"
  },
  loadingWrap: {
    alignSelf: "center",
    bottom: stitchSpace.xl,
    left: stitchSpace.gutter,
    maxWidth: 200,
    position: "absolute",
    right: stitchSpace.gutter,
    width: "100%"
  },
  logoCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: stitchSpace.lg,
    padding: stitchSpace.xl,
    ...Platform.select({
      android: { elevation: 12 },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24
      }
    })
  },
  logoImg: {
    height: 96,
    width: 256
  },
  premiumLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2.8,
    lineHeight: 20,
    marginHorizontal: stitchSpace.sm,
    textTransform: "uppercase"
  },
  premiumRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: stitchSpace.md
  },
  root: {
    flex: 1,
    overflow: "hidden"
  },
  rule: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    height: 2,
    width: 32
  },
  tagBlock: {
    gap: stitchSpace.sm
  },
  track: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    height: 6,
    overflow: "hidden",
    width: "100%"
  },
  trackFill: {
    backgroundColor: stitchColors.white,
    borderRadius: 999,
    height: "100%",
    width: "66.666%",
    ...Platform.select({
      android: { elevation: 4 },
      default: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12
      }
    })
  },
  velocityHint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    opacity: 0.3
  }
});
