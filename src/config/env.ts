const getRequiredEnv = (name: string, value: string | undefined): string => {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
};

export const API_URL = getRequiredEnv(
  "VITE_API_URL",
  import.meta.env.VITE_API_URL,
).replace(/\/+$/, "");

export const TURNSTILE_SITE_KEY = getRequiredEnv(
  "VITE_TURNSTILE_SITE_KEY",
  import.meta.env.VITE_TURNSTILE_SITE_KEY,
);
