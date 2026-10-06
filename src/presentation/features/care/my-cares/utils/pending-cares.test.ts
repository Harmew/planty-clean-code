import { getPendingCares } from "./pending-cares";

import type { PlantWithCares } from "../types";

const plant: PlantWithCares = {
  id: 1,
  name: "Jiboia",
  image: null,
  location: "Sala",
  sunlight: "medium",
  temperatureMin: null,
  temperatureMax: null,
  humidity: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  cares: [],
};

describe("getPendingCares", () => {
  const now = new Date(2026, 9, 6, 12);

  it("retorna atrasados, hoje e amanhã em ordem", () => {
    const result = getPendingCares(
      [
        {
          ...plant,
          cares: [
            {
              id: 1,
              plantId: 1,
              type: "water",
              intervalDays: 3,
              lastDone: null,
              nextDue: "2026-10-07T09:00:00",
              createdAt: "2026-01-01",
            },
            {
              id: 2,
              plantId: 1,
              type: "prune",
              intervalDays: 7,
              lastDone: null,
              nextDue: "2026-10-05T09:00:00",
              createdAt: "2026-01-01",
            },
            {
              id: 3,
              plantId: 1,
              type: "repot",
              intervalDays: 30,
              lastDone: null,
              nextDue: "2026-10-06T09:00:00",
              createdAt: "2026-01-01",
            },
            {
              id: 4,
              plantId: 1,
              type: "fertilize",
              intervalDays: 14,
              lastDone: null,
              nextDue: "2026-11-01T09:00:00",
              createdAt: "2026-01-01",
            },
          ],
        },
      ],
      now,
    );

    expect(result.map((item) => item.type)).toEqual(["prune", "repot", "water"]);
    expect(result[0].isOverdue).toBe(true);
    expect(result[1].isToday).toBe(true);
    expect(result[2].isToday).toBe(false);
  });
});
