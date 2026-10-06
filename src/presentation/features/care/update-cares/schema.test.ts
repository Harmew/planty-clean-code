import { schema } from "./schema";

describe("update cares schema", () => {
  const disabled = { enabled: false, interval_days: "" };

  it("aceita cuidados desabilitados sem frequência", () => {
    expect(schema.parse({ water: disabled, fertilize: disabled, prune: disabled, repot: disabled })).toBeTruthy();
  });

  it("exige frequência para cuidado habilitado", () => {
    const result = schema.safeParse({
      water: { enabled: true, interval_days: "0" },
      fertilize: disabled,
      prune: disabled,
      repot: disabled,
    });

    expect(result.success).toBe(false);
  });

  it("aceita frequência positiva", () => {
    const result = schema.safeParse({
      water: { enabled: true, interval_days: "3" },
      fertilize: disabled,
      prune: disabled,
      repot: disabled,
    });

    expect(result.success).toBe(true);
  });
});
