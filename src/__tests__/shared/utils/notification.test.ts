import { getNotificationTitle, getNotificationBody } from "@shared/utils/notification";

describe("notification", () => {
  describe("getNotificationTitle", () => {
    it("retorna o título para água", () => {
      expect(getNotificationTitle("water")).toBe("Hora de regar");
    });

    it("retorna o título para adubação", () => {
      expect(getNotificationTitle("fertilizer")).toBe("Hora de adubar");
    });

    it("retorna o título para poda", () => {
      expect(getNotificationTitle("prune")).toBe("Hora de podar");
    });

    it("retorna o título para replantio", () => {
      expect(getNotificationTitle("repot")).toBe("Hora de replantar");
    });
  });

  describe("getNotificationBody", () => {
    it("retorna o corpo para água", () => {
      expect(getNotificationBody("Jiboia", "water")).toBe("A planta Jiboia precisa de água!");
    });

    it("retorna o corpo para adubação", () => {
      expect(getNotificationBody("Jiboia", "fertilizer")).toBe("Chegou a hora de adubar a planta Jiboia");
    });

    it("retorna o corpo para poda", () => {
      expect(getNotificationBody("Jiboia", "prune")).toBe("A planta Jiboia precisa ser podada");
    });

    it("retorna o corpo para replantio", () => {
      expect(getNotificationBody("Jiboia", "repot")).toBe("A planta Jiboia precisa ser replantada");
    });
  });
});
