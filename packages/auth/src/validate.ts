/**
 * HTTP validation helpers for provider API keys.
 */

export async function httpValidate(
  url: string,
  headers: Record<string, string>,
): Promise<{ ok: boolean; status: number; body: unknown }> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        'User-Agent': 'Arcanea-Auth/1.0',
      },
      signal: AbortSignal.timeout(10000),
    });

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    return { ok: response.ok, status: response.status, body };
  } catch (error) {
    return { ok: false, status: 0, body: String(error) };
  }
}

export function maskCredential(credential: string): string {
  if (credential.length <= 8) return '••••••••';
  const prefix = credential.slice(0, 7);
  const suffix = credential.slice(-4);
  return `${prefix}•••${suffix}`;
}
