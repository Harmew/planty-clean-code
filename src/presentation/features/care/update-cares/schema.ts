import { z } from "zod";

const care = z
  .object({
    enabled: z.boolean(),
    interval_days: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.enabled) return;

    if (!data.interval_days || Number(data.interval_days) < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["interval_days"],
        message: "Informe a frequência",
      });
    }
  });

export const schema = z.object({
  water: care,
  fertilize: care,
  prune: care,
  repot: care,
});

export type Schema = z.infer<typeof schema>;
