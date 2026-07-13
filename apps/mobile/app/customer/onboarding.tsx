import { useRouter } from "expo-router";
import { StitchOnboarding } from "../../src/features/customer/stitch/StitchOnboarding";
import { setCustomerOnboardingComplete } from "../../src/features/customer/onboarding/storage";

export default function CustomerOnboardingRoute() {
  const router = useRouter();

  return (
    <StitchOnboarding
      onGetStarted={async () => {
        await setCustomerOnboardingComplete();
        router.replace("/customer/register");
      }}
      onHaveAccount={async () => {
        await setCustomerOnboardingComplete();
        router.replace("/customer/login");
      }}
    />
  );
}
