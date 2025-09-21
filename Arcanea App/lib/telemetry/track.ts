const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

interface TelemetryPayload {
  event: string;
  properties?: Record<string, unknown>;
}

export async function trackEvent({ event, properties = {} }: TelemetryPayload) {
  if (!POSTHOG_API_KEY) {
    return;
  }

  try {
    await fetch(`${POSTHOG_HOST.replace(/\/$/, '')}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        event,
        properties: {
          distinct_id: properties?.distinct_id ?? 'arcanea-anonymous',
          ...properties,
        },
      }),
    });
  } catch (error) {
    console.warn('Telemetry capture failed', error);
  }
}
