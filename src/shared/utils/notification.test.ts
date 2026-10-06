import { formatNotificationDate, getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

describe("notification", () => {
  describe("getNotificationTitle", () => {
    it("retorna o título para água", () => {
      expect(getNotificationTitle("water")).toBe("Hora de regar");
    });

    it("retorna o título para adubação", () => {
      expect(getNotificationTitle("fertilize")).toBe("Hora de adubar");
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
      expect(getNotificationBody("Jiboia", "fertilize")).toBe("Chegou a hora de adubar a planta Jiboia");
    });

    it("retorna o corpo para poda", () => {
      expect(getNotificationBody("Jiboia", "prune")).toBe("A planta Jiboia precisa ser podada");
    });

    it("retorna o corpo para replantio", () => {
      expect(getNotificationBody("Jiboia", "repot")).toBe("A planta Jiboia precisa ser replantada");
    });
  });

  describe("formatNotificationDate", () => {
    const now = new Date(2026, 9, 6, 15, 0, 0); // 06/10/2026 15:00 (local)

    it("deve formatar notificações de hoje", () => {
      const value = new Date(2026, 9, 6, 14, 30).toISOString();

      expect(formatNotificationDate(value, now)).toEqual({ label: "Hoje às 14:30", relative: "há 30 minutos" });
    });

    it("deve formatar notificações de ontem", () => {
      const value = new Date(2026, 9, 5, 9, 5).toISOString();

      expect(formatNotificationDate(value, now).label).toBe("Ontem às 09:05");
    });

    it("deve usar o dia da semana para menos de 7 dias", () => {
      const value = new Date(2026, 9, 3, 8, 0).toISOString(); // sábado

      expect(formatNotificationDate(value, now)).toEqual({ label: "sábado às 08:00", relative: "há 3 dias" });
    });

    it("deve usar a data completa para 7 dias ou mais", () => {
      const value = new Date(2026, 8, 20, 18, 45).toISOString();

      expect(formatNotificationDate(value, now).label).toBe("20/09/2026 18:45");
    });

    it("deve retornar o valor original quando a data for inválida", () => {
      expect(formatNotificationDate("invalida", now)).toEqual({ label: "invalida", relative: "" });
    });
  });
});
