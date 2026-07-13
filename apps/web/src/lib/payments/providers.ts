export type CheckoutInput = {
  amountDt: number;
  description: string;
  customerEmail?: string | null;
  successUrl: string;
  failUrl: string;
};

export type CheckoutSession = {
  provider: "flouci" | "konnect";
  paymentId: string;
  paymentUrl: string;
};

export async function createCheckoutSession(input: CheckoutInput): Promise<CheckoutSession> {
  if (process.env.FLOUCI_APP_TOKEN && process.env.FLOUCI_APP_SECRET) {
    return createFlouciCheckout(input);
  }

  if (process.env.KONNECT_API_KEY) {
    return createKonnectCheckout(input);
  }

  throw new Error("No Tunisian payment provider configured");
}

async function createFlouciCheckout(input: CheckoutInput): Promise<CheckoutSession> {
  const response = await fetch("https://developers.flouci.com/api/generate_payment", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      app_token: process.env.FLOUCI_APP_TOKEN,
      app_secret: process.env.FLOUCI_APP_SECRET,
      amount: Math.round(input.amountDt * 1000),
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: input.successUrl,
      fail_link: input.failUrl,
      developer_tracking_id: crypto.randomUUID()
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message ?? "Flouci checkout failed");
  }

  return {
    provider: "flouci",
    paymentId: payload.result?.payment_id ?? payload.result?.token,
    paymentUrl: payload.result?.link
  };
}

async function createKonnectCheckout(input: CheckoutInput): Promise<CheckoutSession> {
  const response = await fetch("https://api.preprod.konnect.network/api/v2/payments/init-payment", {
    method: "POST",
    headers: {
      "x-api-key": process.env.KONNECT_API_KEY ?? "",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      receiverWalletId: process.env.KONNECT_WALLET_ID,
      token: "TND",
      amount: Math.round(input.amountDt * 1000),
      type: "immediate",
      description: input.description,
      acceptedPaymentMethods: ["bank_card", "wallet"],
      lifespan: 20,
      checkoutForm: true,
      addPaymentFeesToAmount: false,
      firstName: "FastPass",
      lastName: "Tunisia",
      email: input.customerEmail,
      orderId: crypto.randomUUID(),
      webhook: process.env.PAYMENT_WEBHOOK_URL,
      silentWebhook: true,
      successUrl: input.successUrl,
      failUrl: input.failUrl
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message ?? "Konnect checkout failed");
  }

  return {
    provider: "konnect",
    paymentId: payload.paymentRef,
    paymentUrl: payload.payUrl
  };
}
