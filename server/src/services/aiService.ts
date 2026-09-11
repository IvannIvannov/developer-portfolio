import OpenAI from "openai";

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

export const generateProjectPlan = async ({
  description,
  projectType,
}: GenerateProjectPlanInput): Promise<ProjectPlan> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const openai = new OpenAI({
    apiKey,
  });

  const response = await openai.responses.create({
    model: "gpt-5.6-luna",

    input: [
      {
        role: "system",
        content:
          "You are a senior web product consultant. Analyse the user project idea and return a concise, realistic project plan for a freelance web development project. Do not oversell and keep recommendations practical.",
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

    text: {
      format: {
        type: "json_schema",
        name: "project_plan",
        strict: true,

        schema: {
          type: "object",

          properties: {
            type: {
              type: "string",
            },

            complexity: {
              type: "string",
              enum: ["Low", "Medium", "High"],
            },

            timeline: {
              type: "string",
            },

            features: {
              type: "array",

              items: {
                type: "string",
              },

              minItems: 3,
              maxItems: 6,
            },
          },

          required: ["type", "complexity", "timeline", "features"],

          additionalProperties: false,
        },
      },
    },
  });

  const output = response.output_text;

  if (!output) {
    throw new Error("OpenAI returned an empty response.");
  }

  return JSON.parse(output) as ProjectPlan;
};
