import * as Notifications from "expo-notifications";

export async function registerForPushNotifications(): Promise<string | null> {
  const permission = await Notifications.getPermissionsAsync();
  const finalPermission =
    permission.status === "granted" ? permission : await Notifications.requestPermissionsAsync();

  if (finalPermission.status !== "granted") {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

export async function registerTokenWithApi(input: {
  endpoint: string;
  token: string;
  accessToken: string;
  locale: "fr" | "ar";
}): Promise<boolean> {
  const response = await fetch(`${input.endpoint}/api/notifications/register`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.accessToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ token: input.token, locale: input.locale })
  });

  return response.ok;
}
