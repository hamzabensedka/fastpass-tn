import { useRouter } from "expo-router";
import { StitchRegistration } from "../../src/features/customer/stitch/StitchRegistration";

export default function CustomerRegisterRoute() {
  const router = useRouter();

  return (
    <StitchRegistration
      onBack={() => {
        if (router.canGoBack()) router.back();
        else router.replace("/customer/onboarding");
      }}
      onContinue={async ({ fullName, phoneDigits }) => {
        router.push({
          params: { fullName, phoneDigits },
          pathname: "/customer/verify-phone"
        });
      }}
      onSignIn={() => router.replace("/customer/login")}
    />
  );
}
