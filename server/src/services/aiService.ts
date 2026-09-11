type GenerateProjectPlanInput = {
  description: string;
  projectType: string;
};

export type ProjectPlan = {
  type: string;
  complexity: string;
  timeline: string;
  features: string[];
};

type CloudflareAIResponse = {
  success: boolean;
  result?: {
    response?: string;
  };
  errors?: Array<{
    code?: number;
    message?: string;
  }>;
};

const MODEL = "@cf/zai-org/glm-4.7-flash";

export const generateProjectPlan = async ({
  description,
  projectType,
}: GenerateProjectPlanInput): Promise<ProjectPlan> => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const apiToken = process.env.CLOUDFLARE_AI_TOKEN;

  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is not configured.");
  }

  if (!apiToken) {
    throw new Error("CLOUDFLARE_AI_TOKEN is not configured.");
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiToken}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        messages: [
          {
            role: "system",

            content: `
You are a senior web product consultant.

Analyse the user's project idea and create a concise,
realistic plan for a freelance web development project.

Return ONLY valid JSON.

The response must have exactly this structure:

{
  "type": "string",
  "complexity": "Low | Medium | High",
  "timeline": "string",
  "features": [
    "string"
  ]
}

Rules:
- Return between 3 and 6 features.
- Do not include markdown.
- Do not include explanations outside the JSON.
- Keep recommendations realistic.
- Do not oversell.
- Keep the timeline concise.
            `.trim(),
          },

          {
            role: "user",

            content: `
Project type: ${projectType}

Project description:
${description}
            `.trim(),
          },
        ],

        max_tokens: 500,
        temperature: 0.3,
      }),
    },
  );

  const data = (await response.json()) as CloudflareAIResponse;

  if (!response.ok || !data.success) {
    console.error("Cloudflare AI error:", data.errors);

    throw new Error(
      data.errors?.[0]?.message || "Cloudflare AI request failed.",
    );
  }

  const output = data.result?.response;

  if (!output) {
    throw new Error("Cloudflare AI returned an empty response.");
  }

  let parsed: ProjectPlan;

  try {
    parsed = JSON.parse(output) as ProjectPlan;
  } catch {
    console.error("Invalid Cloudflare AI response:", output);

    throw new Error("Cloudflare AI returned invalid JSON.");
  }

  if (
    !parsed.type ||
    !parsed.complexity ||
    !parsed.timeline ||
    !Array.isArray(parsed.features)
  ) {
    throw new Error("Cloudflare AI returned an invalid project plan.");
  }

  return {
    type: parsed.type,
    complexity: parsed.complexity,
    timeline: parsed.timeline,
    features: parsed.features.slice(0, 6),
  };
};
