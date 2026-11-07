/**
 * Jobber request form configuration.
 *
 * Submissions go to the owner's Jobber account. Do not add a parallel
 * quote database or custom POST handler for this flow.
 *
 * Jobber → Settings → Requests and Bookings → More actions → Share links
 *   Copy code  → paste iframe src into NEXT_PUBLIC_JOBBER_EMBED_SRC
 *   Copy link  → paste into NEXT_PUBLIC_JOBBER_REQUEST_URL
 */
const JOBBER_HOSTS = new Set(["clienthub.getjobber.com", "www.jobberonline.com"]);

function firstEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return "";
}

function parseJobberUrl(raw: string): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    if (!JOBBER_HOSTS.has(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Extract iframe src from Jobber "Copy code" HTML, or accept a URL as-is. */
export function parseJobberEmbedSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const candidate = srcMatch?.[1] ?? trimmed;
  return parseJobberUrl(candidate);
}

export function getJobberConfig() {
  const embedSrc = parseJobberEmbedSrc(
    firstEnv("NEXT_PUBLIC_JOBBER_EMBED_SRC", "NEXT_PUBLIC_JOBBER_EMBED_CODE"),
  );
  const requestUrl =
    parseJobberUrl(firstEnv("NEXT_PUBLIC_JOBBER_REQUEST_URL")) ?? embedSrc;

  return {
    embedSrc,
    requestUrl,
    isLive: Boolean(embedSrc),
  } as const;
}

export const jobberQuoteCopy = {
  eyebrow: "Free quote",
  headline: "Get Your Free Lawn Care Quote",
  explanation:
    "Use this form for lawn care requests. Submissions go to our Jobber account so we can follow up with a quote. For general questions, use Contact Us instead — do not send the same request twice.",
  cta: "Get a Free Quote",
} as const;
