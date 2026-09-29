import { z } from "zod";

export const plantAISchema = z
  .object({
    sunlight: z.enum(["low", "medium", "high"]),
    minTemperature: z.coerce.number().min(0).max(50),
    maxTemperature: z.coerce.number().min(0).max(50),
    humidity: z.coerce.number().min(0).max(100),
  })
  .refine((data) => data.minTemperature <= data.maxTemperature, {
    message: "minTemperature must be less than or equal to maxTemperature",
    path: ["minTemperature"],
  });

export type PlantAI = z.infer<typeof plantAISchema>;
