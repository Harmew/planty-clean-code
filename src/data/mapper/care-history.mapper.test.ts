import { careHistoryMapper } from "@data/mapper/care-history.mapper";

describe("care-history-mapper", () => {
  it("mapeia um careHistoryMapper completo para a entidade CareHistory", () => {
    const careHistory = careHistoryMapper({
      id: 1,
      plant_id: 1,
      care_schedule_id: 1,
      type: "prune",
      interval_days: 7,
      done_at: "2023-01-01T00:00:00Z",
    });

    expect(careHistory).toEqual({
      id: 1,
      plantId: 1,
      careScheduleId: 1,
      type: "prune",
      intervalDays: 7,
      doneAt: "2023-01-01T00:00:00Z",
    });
  });

  it("usa valores padrão quando campos opcionais estão ausentes", () => {
    const careHistory = careHistoryMapper({
      id: 2,
      plant_id: 2,
      care_schedule_id: null,
      type: "fertilizer",
      interval_days: 7,
      done_at: "2023-01-01T00:00:00Z",
    });

    expect(careHistory).toEqual({
      id: 2,
      plantId: 2,
      careScheduleId: null,
      type: "fertilizer",
      intervalDays: 7,
      doneAt: "2023-01-01T00:00:00Z",
    });
  });
});
