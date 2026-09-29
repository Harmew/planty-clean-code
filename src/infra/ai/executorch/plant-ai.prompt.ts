export const buildPlantAIPrompt = (name: string) => `
You are a plant care expert.

Analyze the plant: "${name}".

Return ONLY a valid JSON object without any markdown, explanations, or additional text.

The response must contain exactly:

{
  "sunlight": "low" | "medium" | "high",
  "minTemperature": number,
  "maxTemperature": number,
  "humidity": number
}

Rules:
- sunlight must be "low", "medium", or "high".
- minTemperature and maxTemperature are Celsius values.
- humidity must be between 0 and 100.
- minTemperature must be less than or equal to maxTemperature.
- Do not include units.
- Do not include explanations.
- Do not use Markdown.
- If the plant is unknown, make a reasonable estimate based on similar plants.

Example response:

{
  "sunlight": "medium",
  "minTemperature": 18,
  "maxTemperature": 30,
  "humidity": 70
}

`;
