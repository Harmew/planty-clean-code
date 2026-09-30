import { z } from "zod";

export const schema = z
  .object({
    imageUri: z.string().nullable().optional(),
    name: z.string().trim().min(1, {
      error: "O nome da planta é obrigatório",
    }),
    location: z.string().trim().min(1, {
      error: "A localização da planta é obrigatória",
    }),
    sunlight: z.enum(["low", "medium", "high"]),
    temperatureMin: z.string().optional(),
    temperatureMax: z.string().optional(),
    humidity: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.temperatureMin || !data.temperatureMax || Number(data.temperatureMin) <= Number(data.temperatureMax),
    {
      message: "Temperatura mínima não pode ser maior que a máxima",
      path: ["temperatureMin"],
    },
  );

export type Schema = z.infer<typeof schema>;
