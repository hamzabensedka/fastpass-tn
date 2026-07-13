import { LinearGradient } from "expo-linear-gradient";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import type { ReactNode } from "react";
import { stitchColors } from "../../features/customer/stitch/colors";

const neutralStrong = "#171512";
const cream = "#fffaf0";

export type ButtonVariant = "gradient" | "solid" | "inverse";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  title: string;
  variant?: ButtonVariant;
  iconRight?: ReactNode;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Primary actions — shared styles across customer flows.
 * - `gradient`: Stitch CTA (orange gradient, default)
 * - `solid`: flat brand orange
 * - `inverse`: dark bar + cream text (auth placeholders, dense CTAs)
 */
export function Button({
  title,
  variant = "gradient",
  iconRight,
  loading = false,
  disabled,
  style,
  accessibilityRole = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  if (variant === "inverse") {
    return (
      <Pressable
        accessibilityRole={accessibilityRole}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.inverseRoot,
          pressed && styles.pressed,
          isDisabled && styles.disabled,
          style
        ]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={cream} />
        ) : (
          <Text style={styles.inverseLabel}>{title}</Text>
        )}
      </Pressable>
    );
  }

  if (variant === "solid") {
    return (
      <Pressable
        accessibilityRole={accessibilityRole}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.solidRoot,
          pressed && styles.pressed,
          isDisabled && styles.disabled,
          style
        ]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={stitchColors.onPrimary} />
        ) : (
          <Row>
            <Text style={styles.gradientLabel}>{title}</Text>
            {iconRight}
          </Row>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.gradientOuter,
        pressed && styles.pressedOuter,
        isDisabled && styles.disabledOuter,
        style
      ]}
      {...rest}
    >
      <LinearGradient
        colors={[stitchColors.primary, stitchColors.primaryContainer]}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradientInner}
      >
        {loading ? (
          <ActivityIndicator color={stitchColors.onPrimary} />
        ) : (
          <Row>
            <Text style={styles.gradientLabel}>{title}</Text>
            {iconRight}
          </Row>
        )}
      </LinearGradient>
    </Pressable>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.45
  },
  disabledOuter: {
    opacity: 0.45
  },
  gradientInner: {
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%"
  },
  gradientLabel: {
    color: stitchColors.onPrimary,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28
  },
  gradientOuter: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%"
  },
  inverseLabel: {
    color: cream,
    fontSize: 17,
    fontWeight: "800"
  },
  inverseRoot: {
    alignItems: "center",
    backgroundColor: neutralStrong,
    borderRadius: 16,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%"
  },
  pressed: {
    opacity: 0.92
  },
  pressedOuter: {
    opacity: 0.92
  },
  row: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
    justifyContent: "center"
  },
  solidRoot: {
    alignItems: "center",
    backgroundColor: stitchColors.primary,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%"
  }
});
