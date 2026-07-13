export type PushMessage = {
  userIds?: string[];
  segments?: string[];
  title: string;
  body: string;
  data?: Record<string, unknown>;
};

export async function sendPushMessage(message: PushMessage): Promise<Response> {
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    throw new Error("Missing OneSignal configuration");
  }

  return fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      authorization: `Basic ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      app_id: appId,
      include_external_user_ids: message.userIds,
      included_segments: message.segments,
      headings: { en: message.title, fr: message.title },
      contents: { en: message.body, fr: message.body },
      data: message.data
    })
  });
}
