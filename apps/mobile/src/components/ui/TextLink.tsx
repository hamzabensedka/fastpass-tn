import type { PressableProps } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import { stitchColors } from "../../features/customer/stitch/colors";

export type TextLinkProps = Omit<PressableProps, "children"> & {
  label: string;
};

/** Secondary action — muted text (e.g. “I already have an account”). */
export function TextLink({ label, accessibilityRole = "link", style, ...rest }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      style={(state) => [styles.hit, typeof style === "function" ? style(state) : style]}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: "100%"
  },
  label: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center"
  }
});
