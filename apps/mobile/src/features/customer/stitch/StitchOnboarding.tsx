import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useCallback, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextLink } from "../../../components/ui";
import { stitchColors, stitchSpace } from "./colors";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const { width: SCREEN_W } = Dimensions.get("window");
const SLIDE_COUNT = 3;

const MAP_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAyfDJIbh_M9pldXoa50OAYdSH9DHHCytCDuuZVa1sTiBWGHvxpnchhPPY3WPjDjsFMLUOzqgSVOPcWTxCAXqJxNG6PmTIe7mkQcNN_nUnvIWSImxOl7C-_i2swsnx1qIei8uQnnURFM7XXSrJb7dlOhNV8u7z28qFyeWlH3g9hK-GY93j2ACBOgsv_KxDpBu4n4o0CvuDJcJeuJm08w3WMVxtT9G1I5_1C9bUzJPg1e4aUf22gKeMPA5LvwAZvjiuMg-VwPLD_2we0";

const QR_MASK = [
  [1, 1, 0, 1],
  [1, 0, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 0, 1]
] as const;

type Props = {
  onGetStarted: () => void;
  onHaveAccount: () => void;
};

/**
 * One onboarding screen: swipe carousel = hero + headline + body from each Stitch slide.
 * Pagination + CTAs are fixed below the carousel (carousel paging fixed).
 */
export function StitchOnboarding({ onGetStarted, onHaveAccount }: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const goToSlide = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, i));
    scrollRef.current?.scrollTo({ x: clamped * SCREEN_W, animated: true });
  }, []);

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false
  });

  return (
    <View style={[styles.shell, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <MaterialIcons color={stitchColors.primary} name="bolt" size={28} />
          <Text style={styles.brandWord}>FastPass</Text>
        </View>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={onGetStarted}>
          <Text style={styles.skipTxt}>Skip</Text>
        </Pressable>
      </View>

      <AnimatedScrollView
        contentContainerStyle={styles.carouselContent}
        decelerationRate="fast"
        horizontal
        onScroll={onScroll}
        pagingEnabled
        ref={scrollRef}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        <View style={[styles.slidePage, { width: SCREEN_W }]}>
          <View style={styles.slideCenter}>
            <ScanEarnHero />
            <Text style={styles.displayTitle}>Scan & Earn</Text>
            <Text style={[styles.bodyPara, styles.bodyMax]}>
              Show your QR code at any partner restaurant and earn{" "}
              <Text style={styles.bodyStrong}>1 point per dinar</Text> spent
            </Text>
          </View>
        </View>

        <View style={[styles.slidePage, { width: SCREEN_W }]}>
          <View style={styles.slideCenter}>
            <RedeemHero />
            <Text style={[styles.displayTitle, styles.titleSpacing]}>Redeem Rewards</Text>
            <Text style={[styles.bodyPara, styles.bodyMax]}>
              Turn your points into free meals, drinks, and exclusive deals
            </Text>
          </View>
        </View>

        <View style={[styles.slidePage, { width: SCREEN_W }]}>
          <View style={styles.slideCenter}>
            <DiscoverHero />
            <Text style={[styles.displayTitle, styles.titleSpacing]}>Discover Nearby</Text>
            <Text style={[styles.bodyPara, styles.bodyMaxNarrow]}>
              Find the best deals from restaurants around you
            </Text>
          </View>
        </View>
      </AnimatedScrollView>

      <CarouselDots onChange={goToSlide} scrollX={scrollX} screenW={SCREEN_W} />

      <View style={styles.footer}>
        <Button
          iconRight={<MaterialIcons color={stitchColors.onPrimary} name="arrow-forward" size={20} />}
          onPress={onGetStarted}
          title="Get Started"
          variant="gradient"
        />
        <TextLink label="I already have an account" onPress={onHaveAccount} />
      </View>
    </View>
  );
}

function CarouselDots({
  scrollX,
  screenW,
  onChange
}: {
  scrollX: Animated.Value;
  screenW: number;
  onChange: (i: number) => void;
}) {
  const inactive = stitchColors.outlineVariant;
  const active = stitchColors.primary;

  const dot0Width = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [0, screenW],
    outputRange: [24, 8]
  });
  const dot0Bg = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [0, screenW],
    outputRange: [active, inactive]
  });

  const dot1Width = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [0, screenW, 2 * screenW],
    outputRange: [8, 24, 8]
  });
  const dot1Bg = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [0, screenW, 2 * screenW],
    outputRange: [inactive, active, inactive]
  });

  const dot2Width = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [screenW, 2 * screenW],
    outputRange: [8, 24]
  });
  const dot2Bg = scrollX.interpolate({
    extrapolate: "clamp",
    inputRange: [screenW, 2 * screenW],
    outputRange: [inactive, active]
  });

  const dims = [
    { bg: dot0Bg, w: dot0Width },
    { bg: dot1Bg, w: dot1Width },
    { bg: dot2Bg, w: dot2Width }
  ];

  return (
    <View style={styles.dotsWrap}>
      {dims.map((d, i) => (
        <Pressable
          key={i}
          accessibilityLabel={`Go to slide ${i + 1}`}
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => onChange(i)}
          style={styles.dotHit}
        >
          <Animated.View
            style={[
              styles.dotAnimated,
              {
                backgroundColor: d.bg,
                width: d.w
              }
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
}

function ScanEarnHero() {
  return (
    <View style={styles.heroWrap}>
      <View style={styles.scanAccentTop} />
      <View style={styles.scanAccentBottom} />
      <View style={styles.heroSquare}>
        <View style={styles.heroGlow} />
        <View style={styles.qrShell}>
          <View style={styles.qrTopRow}>
            <View style={styles.qrDot} />
            <MaterialIcons color={stitchColors.primary} name="restaurant" size={22} />
          </View>
          <View style={styles.qrFrame}>
            <View style={styles.qrMatrix}>
              {QR_MASK.map((row, r) => (
                <View key={r} style={styles.qrRow}>
                  {row.map((cell, c) => (
                    <View
                      key={c}
                      style={[styles.qrCell, cell === 1 ? styles.qrCellFill : styles.qrCellEmpty]}
                    />
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.scanLine} />
          </View>
          <View style={styles.miniTrack}>
            <View style={styles.miniTrackFill} />
          </View>
        </View>
        <View style={styles.rewardChip}>
          <MaterialIcons color={stitchColors.onTertiaryContainer} name="stars" size={16} />
          <Text style={styles.rewardChipTxt}>+1 Point</Text>
        </View>
      </View>
    </View>
  );
}

function RedeemHero() {
  return (
    <View style={styles.heroWrap}>
      <View style={styles.redeemHero}>
        <View style={styles.redeemGlow} />
        <LinearGradient colors={[stitchColors.primary, stitchColors.primaryContainer]} style={styles.redeemCard}>
          <View style={styles.redeemDecorTL} />
          <View style={styles.redeemDecorBR} />
          <View style={styles.redeemIconBubble}>
            <MaterialIcons color={stitchColors.primary} name="card-giftcard" size={48} />
          </View>
          <View style={styles.redeemTitles}>
            <Text style={styles.unlockTxt}>UNLOCKED</Text>
            <Text style={styles.tierTxt}>PREMIUM TIER</Text>
          </View>
          <View style={styles.absDot} />
          <View style={styles.absSq} />
        </LinearGradient>
        <View style={styles.overlayCard}>
          <View style={styles.overlayIconWrap}>
            <MaterialIcons color={stitchColors.tertiary} name="restaurant" size={18} />
          </View>
          <View>
            <Text style={styles.overlayTitle}>Free Bistro Entree</Text>
            <Text style={styles.overlaySub}>Ready to redeem</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function DiscoverHero() {
  return (
    <View style={styles.heroWrap}>
      <View style={styles.mapHero}>
        <View style={styles.mapGlow} />
        <View style={styles.mapCard}>
          <Image resizeMode="cover" source={{ uri: MAP_URI }} style={styles.mapImg} />
          <View style={styles.mapPinWrap}>
            <View style={styles.mapPinCircle}>
              <MaterialIcons color={stitchColors.white} name="near-me" size={52} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absDot: {
    backgroundColor: stitchColors.tertiary,
    borderRadius: 999,
    height: 16,
    left: 40,
    position: "absolute",
    top: 40,
    width: 16
  },
  absSq: {
    backgroundColor: "rgba(252,220,211,0.2)",
    borderRadius: 4,
    bottom: 48,
    height: 24,
    position: "absolute",
    right: 32,
    transform: [{ rotate: "45deg" }],
    width: 24
  },
  bodyMax: {
    maxWidth: 320,
    textAlign: "center"
  },
  bodyMaxNarrow: {
    maxWidth: 280,
    textAlign: "center"
  },
  bodyPara: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24
  },
  bodyStrong: {
    color: stitchColors.primary,
    fontWeight: "700"
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: stitchSpace.sm
  },
  brandWord: {
    color: stitchColors.primary,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.24,
    lineHeight: 32
  },
  carousel: {
    flex: 1,
    width: "100%"
  },
  carouselContent: {
    flexGrow: 1
  },
  displayTitle: {
    color: stitchColors.onSurface,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.64,
    lineHeight: 40,
    textAlign: "center"
  },
  dotAnimated: {
    borderRadius: 999,
    height: 8
  },
  dotHit: {
    paddingHorizontal: 4,
    paddingVertical: 6
  },
  dotsWrap: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: stitchSpace.sm
  },
  footer: {
    gap: stitchSpace.md,
    paddingHorizontal: stitchSpace.containerMargin,
    paddingTop: stitchSpace.md
  },
  heroGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: stitchColors.surfaceContainer,
    borderRadius: 999,
    opacity: 0.5,
    transform: [{ scale: 1.1 }]
  },
  heroSquare: {
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
    maxWidth: 280,
    position: "relative",
    width: "100%"
  },
  heroWrap: {
    alignItems: "center",
    marginBottom: stitchSpace.xl,
    overflow: "visible",
    position: "relative",
    width: "100%"
  },
  mapCard: {
    alignItems: "center",
    borderColor: "rgba(230,190,178,0.3)",
    borderRadius: 40,
    borderWidth: 1,
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%"
  },
  mapGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(212,63,0,0.05)",
    borderRadius: 999
  },
  mapHero: {
    aspectRatio: 1,
    maxWidth: 320,
    position: "relative",
    width: "100%"
  },
  mapImg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8
  },
  mapPinCircle: {
    alignItems: "center",
    backgroundColor: stitchColors.primary,
    borderColor: stitchColors.surface,
    borderRadius: 999,
    borderWidth: 4,
    height: 96,
    justifyContent: "center",
    shadowColor: stitchColors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    width: 96
  },
  mapPinWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  miniTrack: {
    backgroundColor: stitchColors.surfaceContainer,
    borderRadius: 999,
    height: 8,
    marginTop: stitchSpace.md,
    overflow: "hidden",
    width: "100%"
  },
  miniTrackFill: {
    backgroundColor: stitchColors.tertiary,
    height: "100%",
    width: "75%"
  },
  overlayCard: {
    alignItems: "center",
    backgroundColor: stitchColors.white,
    borderColor: stitchColors.outlineVariant,
    borderRadius: 12,
    borderWidth: 1,
    bottom: 16,
    columnGap: stitchSpace.sm,
    flexDirection: "row",
    padding: stitchSpace.sm,
    position: "absolute",
    right: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16
  },
  overlayIconWrap: {
    alignItems: "center",
    backgroundColor: stitchColors.tertiaryFixedDim,
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    width: 32
  },
  overlaySub: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 10,
    fontWeight: "400",
    marginTop: 2,
    opacity: 0.6
  },
  overlayTitle: {
    color: stitchColors.onSurface,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    lineHeight: 16
  },
  qrCell: {
    aspectRatio: 1,
    borderRadius: 4,
    flex: 1
  },
  qrCellEmpty: {
    backgroundColor: "transparent"
  },
  qrCellFill: {
    backgroundColor: stitchColors.onSurface
  },
  qrDot: {
    backgroundColor: stitchColors.surfaceContainerHighest,
    borderRadius: 999,
    height: 32,
    width: 32
  },
  qrFrame: {
    borderColor: stitchColors.primary,
    borderRadius: 8,
    borderWidth: 4,
    height: 160,
    overflow: "hidden",
    padding: 8,
    width: 160
  },
  qrMatrix: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
    width: "100%"
  },
  qrRow: {
    columnGap: 4,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  qrShell: {
    alignItems: "center",
    backgroundColor: stitchColors.surface,
    borderColor: stitchColors.outlineVariant,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 6,
    padding: stitchSpace.lg,
    shadowColor: "rgba(93,94,97,0.12)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    width: "100%",
    zIndex: 10
  },
  qrTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: stitchSpace.md,
    width: "100%"
  },
  redeemCard: {
    alignItems: "center",
    borderRadius: 40,
    height: "80%",
    justifyContent: "center",
    overflow: "hidden",
    padding: stitchSpace.lg,
    transform: [{ rotate: "-3deg" }],
    width: "80%"
  },
  redeemDecorBR: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 999,
    bottom: -16,
    height: 96,
    left: -32,
    position: "absolute",
    width: 96
  },
  redeemDecorTL: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 999,
    height: 128,
    position: "absolute",
    right: -64,
    top: -64,
    width: 128
  },
  redeemGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: stitchColors.surfaceContainer,
    borderRadius: 999,
    opacity: 0.5,
    transform: [{ scale: 0.9 }]
  },
  redeemHero: {
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
    maxWidth: 300,
    position: "relative",
    width: "100%"
  },
  redeemIconBubble: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    marginBottom: stitchSpace.sm,
    padding: stitchSpace.md,
    transform: [{ rotate: "6deg" }]
  },
  redeemTitles: {
    alignItems: "center",
    marginTop: stitchSpace.md
  },
  rewardChip: {
    alignItems: "center",
    backgroundColor: stitchColors.tertiaryContainer,
    borderRadius: 999,
    bottom: -16,
    columnGap: 8,
    flexDirection: "row",
    paddingHorizontal: stitchSpace.md,
    paddingVertical: stitchSpace.sm,
    position: "absolute",
    right: -16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    transform: [{ rotate: "6deg" }]
  },
  rewardChipTxt: {
    color: stitchColors.onTertiaryContainer,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    lineHeight: 16
  },
  scanAccentBottom: {
    backgroundColor: stitchColors.tertiaryFixedDim,
    borderRadius: 999,
    bottom: -80,
    height: 260,
    left: -80,
    opacity: 0.05,
    position: "absolute",
    width: 260
  },
  scanAccentTop: {
    backgroundColor: stitchColors.primaryFixedDim,
    borderRadius: 999,
    height: 220,
    opacity: 0.1,
    position: "absolute",
    right: -60,
    top: -60,
    width: 220
  },
  scanLine: {
    backgroundColor: stitchColors.primary,
    height: 4,
    left: 0,
    opacity: 0.4,
    position: "absolute",
    right: 0,
    top: "50%"
  },
  shell: {
    backgroundColor: stitchColors.background,
    flex: 1
  },
  skipTxt: {
    color: stitchColors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20
  },
  slideCenter: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: stitchSpace.containerMargin,
    paddingVertical: stitchSpace.md,
    width: "100%"
  },
  slidePage: {
    flexGrow: 1
  },
  tierTxt: {
    color: "rgba(255,251,255,0.7)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
    lineHeight: 16,
    marginTop: stitchSpace.xs,
    textAlign: "center"
  },
  titleSpacing: {
    marginBottom: stitchSpace.md
  },
  topBar: {
    alignItems: "center",
    backgroundColor: stitchColors.surface,
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    paddingHorizontal: stitchSpace.containerMargin,
    width: "100%"
  },
  unlockTxt: {
    color: stitchColors.onPrimaryContainer,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    opacity: 0.9,
    textAlign: "center"
  }
});
