type GenerateProjectPlanInput = {
  description: string;
  projectType: string;
};

export type ProjectPlan = {
  type: string;
  complexity: "Low" | "Medium" | "High";
  timeline: string;
  features: string[];
};

type CloudflareAIResponse = {
  choices?: Array<{
    message?: {
      role?: string;
      content?: string | null;
    };
    finish_reason?: string | null;
  }>;
  error?: {
    message?: string;
  };
};

const MODEL = "@cf/zai-org/glm-4.7-flash";

const parseProjectPlan = (content: string): ProjectPlan => {
  const cleanedContent = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleanedContent) as Partial<ProjectPlan>;

  if (
    typeof parsed.type !== "string" ||
    typeof parsed.complexity !== "string" ||
    typeof parsed.timeline !== "string" ||
    !Array.isArray(parsed.features)
  ) {
    throw new Error("Cloudflare AI returned an invalid project plan.");
  }

  if (!["Low", "Medium", "High"].includes(parsed.complexity)) {
    throw new Error("Cloudflare AI returned an invalid complexity value.");
  }

  const features = parsed.features
    .filter((feature): feature is string => typeof feature === "string")
    .slice(0, 6);

  if (features.length < 3) {
    throw new Error("Cloudflare AI returned too few features.");
  }

  return {
    type: parsed.type,
    complexity: parsed.complexity as ProjectPlan["complexity"],
    timeline: parsed.timeline,
    features,
  };
};

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
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiToken}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: "system",

            content: `
You are a senior web product consultant.

Analyse the user's project idea and create a concise,
realistic plan for a freelance web development project.

Return only valid JSON.

Required structure:

{
  "type": "string",
  "complexity": "Low | Medium | High",
  "timeline": "string",
  "features": [
    "string"
  ]
}

Rules:
- include between 3 and 6 concise features
- keep the timeline realistic
- do not use Markdown
- do not include explanations
- do not add text before or after the JSON
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

        reasoning_effort: "low",

        response_format: {
          type: "json_object",
        },

        temperature: 0.2,

        max_completion_tokens: 1400,
      }),
    },
  );

  const data = (await response.json()) as CloudflareAIResponse;

  if (!response.ok) {
    console.error("Cloudflare AI error:", data);

    throw new Error(data.error?.message || "Cloudflare AI request failed.");
  }

  const choice = data.choices?.[0];

  if (choice?.finish_reason === "length") {
    console.error("Cloudflare AI hit token limit:", data);

    throw new Error("Cloudflare AI response exceeded the token limit.");
  }

  const content = choice?.message?.content;

  if (!content) {
    console.error(
      "Unexpected Cloudflare response:",
      JSON.stringify(data, null, 2),
    );

    throw new Error("Cloudflare AI returned an empty response.");
  }

  return parseProjectPlan(content);
};
