let hasPinged = false;

const SIS_PING_TIMEOUT_MS = 4000;

export function pingSisMemoryOnStartup(): void {
  if (hasPinged || typeof window !== "undefined") {
    return;
  }
  hasPinged = true;

  const pingUrl =
    process.env.SIS_MEMORY_PING_URL ||
    process.env.NEXT_PUBLIC_SIS_MEMORY_PING_URL;

  if (!pingUrl) {
    return;
  }

  const timeoutSignal =
    typeof AbortSignal.timeout === "function"
      ? AbortSignal.timeout(SIS_PING_TIMEOUT_MS)
      : undefined;

  void fetch(pingUrl, {
    method: "HEAD",
    cache: "no-store",
    signal: timeoutSignal,
    headers: {
      "x-arcanea-service": "web-startup",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.warn(
          `[SIS] Memory ping returned HTTP ${response.status} (${response.statusText})`
        );
        return;
      }

      console.info("[SIS] Memory ping successful");
    })
    .catch((error) => {
      console.warn(
        "[SIS] Memory ping failed during startup:",
        error instanceof Error ? error.message : String(error)
      );
    });
}
