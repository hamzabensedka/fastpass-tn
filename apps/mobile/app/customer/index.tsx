import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { StitchSplash } from "../../src/features/customer/stitch/StitchSplash";
import {
  hasCompletedCustomerOnboarding,
  hasCustomerSession
} from "../../src/features/customer/onboarding/storage";

const SPLASH_MS = 2600;

export default function CustomerSplashRoute() {
  const router = useRouter();
  const navigated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled || navigated.current) return;
      const session = await hasCustomerSession();
      const onboardingDone = await hasCompletedCustomerOnboarding();

      if (session) {
        navigated.current = true;
        router.replace("/customer/wallet");
        return;
      }

      if (!onboardingDone) {
        navigated.current = true;
        router.replace("/customer/onboarding");
        return;
      }

      navigated.current = true;
      router.replace("/customer/login");
    }, SPLASH_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [router]);

  return <StitchSplash />;
}
