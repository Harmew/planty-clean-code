import { careMapper } from "@data/mapper/careMapper";

describe("careMapper", () => {
  it("mapeia um careMapper completo para a entidade Care", () => {
    const care = careMapper({
      id: 1,
      plant_id: 1,
      type: "prune",
      interval_days: 7,
      last_done: "2023-01-01T00:00:00Z",
      next_due: "2023-01-08T00:00:00Z",
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(care).toEqual({
      id: 1,
      plantId: 1,
      type: "prune",
      intervalDays: 7,
      lastDone: "2023-01-01T00:00:00Z",
      nextDue: "2023-01-08T00:00:00Z",
      createdAt: "2023-01-01T00:00:00Z",
    });
  });

  it("usa valores padrão quando campos opcionais estão ausentes", () => {
    const care = careMapper({
      id: 2,
      plant_id: 2,
      type: "fertilizer",
      interval_days: 1,
      last_done: null,
      next_due: "2023-01-08T00:00:00Z",
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(care).toEqual({
      id: 2,
      plantId: 2,
      type: "fertilizer",
      intervalDays: 1,
      lastDone: null,
      nextDue: "2023-01-08T00:00:00Z",
      createdAt: "2023-01-01T00:00:00Z",
    });
  });
});
