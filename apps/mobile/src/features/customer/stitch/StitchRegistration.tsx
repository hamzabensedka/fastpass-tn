import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { stitchColors, stitchSpace } from "./colors";

const HERO_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAFCfjiV8VVDhkrouAQWwLykKVWzrNtEmjqeq-23Xk5LC6QNLGb2Pf8q1d-l_OqTZHgtwVnPy9vwD8R-afDN3ZGRJ1cTnXB9UE5MpmqRTuIhaktJjuNea3C6nXIh_XVdKvKigm0pnhLKonybF8oOe842WRGRSPq_FmEFpkbVFdfsOHqtQmcZ9MXxDW3NVPWYtCvxeA6iiRWo8sf5AZWdOVYsWrgJgZzEzEL8ugJ4ZV0j6iQBcAZgx4oJ2eEbC5GWqNhR9d0La6rFnNy";

const HERO_H = 530;
const SHEET_RADIUS = 32;

export type StitchRegistrationPayload = {
  fullName: string;
  /** Local digits only (8 for Tunisia), no country code */
  phoneDigits: string;
};

type Props = {
  termsUrl?: string;
  privacyUrl?: string;
  onBack: () => void;
  onContinue: (payload: StitchRegistrationPayload) => Promise<void>;
  onSignIn: () => void;
  onFacebookRegister?: () => void;
  onGoogleRegister?: () => void;
};

function formatTnPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)} ${d.slice(2)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

export function StitchRegistration({
  termsUrl = "https://fastpass.tn/terms",
  privacyUrl = "https://fastpass.tn/privacy",
  onBack,
  onContinue,
  onSignIn,
  onFacebookRegister,
  onGoogleRegister
}: Props) {
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get("window").width;

  const [fullName, setFullName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameOk = fullName.trim().length >= 2;
  const phoneOk = phoneDigits.length === 8;
  const canSubmit = nameOk && phoneOk && termsAccepted && !loading;

  const phoneDisplay = useMemo(() => formatTnPhone(phoneDigits), [phoneDigits]);

  const onPhoneChange = useCallback((t: string) => {
    setPhoneDigits(t.replace(/\D/g, "").slice(0, 8));
  }, []);

  const submit = useCallback(async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await onContinue({ fullName: fullName.trim(), phoneDigits });
    } finally {
      setLoading(false);
    }
  }, [canSubmit, fullName, onContinue, phoneDigits]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={styles.shell}
    >
      <View style={styles.flex1}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.flex1}
        >
        {/* Hero */}
        <View style={[styles.hero, { width: screenW }]}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={{ uri: HERO_URI }}
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={["rgba(40,23,18,0)", "rgba(40,23,18,0.8)"]}
            locations={[0, 1]}
            style={styles.heroGradient}
          >
            <View style={styles.heroGradInner}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeTxt}>New Arrival</Text>
              </View>
              <Text style={styles.heroTitle}>Taste the Joy</Text>
              <Text style={styles.heroBody}>
                Experience the authentic warmth of Tunisian fast food, delivered at the speed of light.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Sheet */}
        <View style={[styles.sheet, { marginTop: -stitchSpace.xl }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Create Account</Text>
            <Text style={styles.sheetSubtitle}>Join the FastPass family for exclusive rewards.</Text>
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.labelRow}>
              <MaterialIcons color={stitchColors.onSurfaceVariant} name="person" size={18} />
              <Text style={styles.labelText}> Full Name</Text>
            </Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect
              onChangeText={setFullName}
              placeholder="Walid Ben Salah"
              placeholderTextColor={`${stitchColors.onSurfaceVariant}99`}
              style={styles.input}
              value={fullName}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.labelRow}>
              <MaterialIcons color={stitchColors.onSurfaceVariant} name="phone-iphone" size={18} />
              <Text style={styles.labelText}> Phone Number</Text>
            </Text>
            <View style={styles.phoneRow}>
              <View style={styles.prefixBox}>
                <Text style={styles.prefixText}>+216</Text>
              </View>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={onPhoneChange}
                placeholder="12 345 678"
                placeholderTextColor={`${stitchColors.onSurfaceVariant}99`}
                style={[styles.input, styles.phoneInput]}
                value={phoneDisplay}
              />
            </View>
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: termsAccepted }}
            onPress={() => setTermsAccepted((v) => !v)}
            style={styles.termsRow}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxOn]}>
              {termsAccepted ? (
                <MaterialIcons color={stitchColors.onPrimary} name="check" size={16} />
              ) : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text
                onPress={() => void Linking.openURL(termsUrl)}
                style={styles.termsLink}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                onPress={() => void Linking.openURL(privacyUrl)}
                style={styles.termsLink}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={!canSubmit}
            onPress={() => void submit()}
            style={({ pressed }) => [
              styles.primaryBtn,
              !canSubmit && styles.primaryBtnDisabled,
              pressed && canSubmit && styles.primaryBtnPressed
            ]}
          >
            {loading ? (
              <ActivityIndicator color={stitchColors.onPrimary} />
            ) : (
              <>
                <Text style={styles.primaryBtnLabel}>Start Your Journey</Text>
                <MaterialIcons color={stitchColors.onPrimary} name="arrow-forward" size={22} />
              </>
            )}
          </Pressable>

          <View style={styles.altWrap}>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerCap}>Or register with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <Pressable
                accessibilityRole="button"
                disabled={!onFacebookRegister}
                onPress={onFacebookRegister}
                style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}
              >
                <Ionicons color="#1877F2" name="logo-facebook" size={22} />
                <Text style={styles.socialLabel}>Facebook</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={!onGoogleRegister}
                onPress={onGoogleRegister}
                style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}
              >
                <Ionicons color={stitchColors.error} name="logo-google" size={22} />
                <Text style={styles.socialLabel}>Google</Text>
              </Pressable>
            </View>

            <Pressable accessibilityRole="button" onPress={onSignIn} style={styles.signInHit}>
              <Text style={styles.signInLine}>
                Already have an account? <Text style={styles.signInBold}>Sign In</Text>
              </Text>
            </Pressable>
          </View>

          <View style={{ height: stitchSpace.xl + insets.bottom }} />
        </View>
        </ScrollView>

        {/* Fixed overlay — matches Stitch `fixed top-0` app bar */}
        <View pointerEvents="box-none" style={[styles.topBar, { paddingTop: insets.top }]}>
          <Pressable accessibilityLabel="Go back" accessibilityRole="button" hitSlop={12} onPress={onBack}>
            <MaterialIcons color={stitchColors.white} name="arrow-back" size={24} />
          </Pressable>
          <Text style={styles.topBrand}>FastPass</Text>
          <View style={styles.topSpacer} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  altWrap: {
    marginTop: stitchSpace.xl,
    rowGap: stitchSpace.md
  },
  checkbox: {
    alignItems: "center",
    borderColor: stitchColors.outlineVariant,
    borderRadius: 4,
    borderWidth: 1,
    height: 20,
    justifyContent: "center",
    marginTop: 2,
    width: 20
  },
  checkboxOn: {
    backgroundColor: stitchColors.primary,
    borderColor: stitchColors.primary
  },
  dividerCap: {
    backgroundColor: stitchColors.surface,
    color: stitchColors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    lineHeight: 16,
    paddingHorizontal: stitchSpace.md,
    textTransform: "uppercase"
  },
  dividerLine: {
    backgroundColor: stitchColors.outlineVariant,
    flex: 1,
    height: StyleSheet.hairlineWidth
  },
  flex1: {
    flex: 1
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: stitchSpace.sm
  },
  fieldBlock: {
    marginBottom: stitchSpace.md,
    rowGap: stitchSpace.xs
  },
  hero: {
    height: HERO_H,
    position: "relative"
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: stitchColors.primary,
    borderRadius: 8,
    marginBottom: stitchSpace.sm,
    paddingHorizontal: stitchSpace.sm,
    paddingVertical: stitchSpace.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8
  },
  heroBadgeTxt: {
    color: stitchColors.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    lineHeight: 16,
    textTransform: "uppercase"
  },
  heroBody: {
    color: stitchColors.white,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    opacity: 0.9
  },
  heroGradInner: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 100,
    paddingHorizontal: stitchSpace.xl
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end"
  },
  heroTitle: {
    color: stitchColors.white,
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 44,
    marginBottom: stitchSpace.xs,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  input: {
    backgroundColor: stitchColors.surfaceContainerLow,
    borderColor: stitchColors.outlineVariant,
    borderRadius: 12,
    borderWidth: 1,
    color: stitchColors.onSurface,
    fontSize: 16,
    fontWeight: "400",
    height: 56,
    lineHeight: 24,
    paddingHorizontal: stitchSpace.md,
    width: "100%"
  },
  labelRow: {
    alignItems: "center",
    flexDirection: "row"
  },
  labelText: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.14,
    lineHeight: 20
  },
  phoneInput: {
    flex: 1,
    width: undefined
  },
  phoneRow: {
    columnGap: stitchSpace.sm,
    flexDirection: "row"
  },
  prefixBox: {
    alignItems: "center",
    backgroundColor: stitchColors.surfaceContainerHigh,
    borderColor: stitchColors.outlineVariant,
    borderRadius: 12,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 80
  },
  prefixText: {
    color: stitchColors.onPrimaryFixedVariant,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20
  },
  primaryBtn: {
    alignItems: "center",
    backgroundColor: stitchColors.primary,
    borderRadius: 12,
    columnGap: stitchSpace.sm,
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
    marginTop: stitchSpace.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16
  },
  primaryBtnDisabled: {
    opacity: 0.45
  },
  primaryBtnLabel: {
    color: stitchColors.onPrimary,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28
  },
  primaryBtnPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.98 }]
  },
  scrollContent: {
    backgroundColor: stitchColors.background,
    flexGrow: 1
  },
  sheet: {
    backgroundColor: stitchColors.surface,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    elevation: 16,
    paddingHorizontal: stitchSpace.xl,
    paddingTop: stitchSpace.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 24
  },
  sheetHandle: {
    alignSelf: "center",
    backgroundColor: stitchColors.outlineVariant,
    borderRadius: 999,
    height: 4,
    marginBottom: stitchSpace.lg,
    opacity: 0.5,
    width: 48
  },
  sheetHeader: {
    marginBottom: stitchSpace.lg
  },
  sheetSubtitle: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    marginTop: stitchSpace.xs
  },
  sheetTitle: {
    color: stitchColors.onSurface,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.24,
    lineHeight: 32
  },
  shell: {
    backgroundColor: stitchColors.background,
    flex: 1
  },
  signInBold: {
    color: stitchColors.primary,
    fontWeight: "700"
  },
  signInHit: {
    alignSelf: "center",
    paddingVertical: stitchSpace.md
  },
  signInLine: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center"
  },
  socialBtn: {
    alignItems: "center",
    borderColor: stitchColors.outlineVariant,
    borderRadius: 12,
    borderWidth: 1,
    columnGap: stitchSpace.sm,
    flex: 1,
    flexDirection: "row",
    height: 56,
    justifyContent: "center"
  },
  socialBtnPressed: {
    backgroundColor: stitchColors.surfaceContainerLow
  },
  socialLabel: {
    color: stitchColors.onSurface,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20
  },
  socialRow: {
    columnGap: stitchSpace.md,
    flexDirection: "row"
  },
  termsLink: {
    color: stitchColors.primary,
    fontWeight: "700"
  },
  termsRow: {
    alignItems: "flex-start",
    columnGap: stitchSpace.sm,
    flexDirection: "row",
    paddingTop: stitchSpace.sm
  },
  termsText: {
    color: stitchColors.onSurfaceVariant,
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: stitchSpace.containerMargin,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 50
  },
  topBrand: {
    color: stitchColors.white,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.64,
    lineHeight: 40,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  topSpacer: {
    width: 40
  }
});
