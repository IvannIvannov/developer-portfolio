type TurnstileVerificationResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export const verifyTurnstileToken = async (token: string) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured.");
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to verify Turnstile token.");
  }

  const result = (await response.json()) as TurnstileVerificationResponse;

  return result;
};
