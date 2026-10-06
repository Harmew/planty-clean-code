import { DAY_MS, formatNotificationDate, getNotificationBody, getNotificationTitle } from "@shared/utils/notification";

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
    const now = new Date(2026, 9, 6, 15, 0, 0);

    it("deve formatar notificações de hoje", () => {
      const value = new Date(2026, 9, 6, 14, 30).toISOString();

      expect(formatNotificationDate(value, now)).toEqual({
        label: "Hoje às 14:30",
        relative: "há 30 minutos",
      });
    });

    it("deve formatar notificações de ontem", () => {
      const value = new Date(2026, 9, 5, 9, 5).toISOString();

      expect(formatNotificationDate(value, now).label).toBe("Ontem às 09:05");
    });

    it("deve usar o dia da semana para menos de 7 dias", () => {
      const value = "2026-10-04T09:30:00-03:00";

      expect(formatNotificationDate(value, now)).toEqual({
        label: "domingo às 09:30",
        relative: "há 2 dias",
      });
    });

    it("deve retornar o valor original quando a data for inválida", () => {
      expect(formatNotificationDate("invalida", now)).toEqual({
        label: "invalida",
        relative: "",
      });
    });

    it("deve formatar segundos, minuto, hora e horas", () => {
      expect(formatNotificationDate(new Date(now.getTime() - 30 * 1000).toISOString(), now).relative).toBe(
        "há alguns segundos",
      );

      expect(formatNotificationDate(new Date(now.getTime() - 60 * 1000).toISOString(), now).relative).toBe(
        "há um minuto",
      );

      expect(formatNotificationDate(new Date(now.getTime() - 60 * 60 * 1000).toISOString(), now).relative).toBe(
        "há uma hora",
      );

      expect(formatNotificationDate(new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), now).relative).toBe(
        "há 5 horas",
      );
    });

    it("deve formatar como um mês e como meses", () => {
      expect(formatNotificationDate(new Date(now.getTime() - 40 * DAY_MS).toISOString(), now).relative).toBe(
        "há um mês",
      );

      expect(formatNotificationDate(new Date(now.getTime() - 90 * DAY_MS).toISOString(), now).relative).toBe(
        "há 3 meses",
      );
    });

    it("deve formatar como um ano e como anos", () => {
      expect(formatNotificationDate(new Date(now.getTime() - 365 * DAY_MS).toISOString(), now).relative).toBe(
        "há um ano",
      );

      expect(formatNotificationDate(new Date(now.getTime() - 3 * 365 * DAY_MS).toISOString(), now).relative).toBe(
        "há 3 anos",
      );
    });

    it("deve usar 'em' para uma data futura", () => {
      const value = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();

      expect(formatNotificationDate(value, now).relative).toBe("em 2 horas");
    });

    it("deve usar a data completa para 7 dias ou mais", () => {
      const value = "2026-09-20T18:45:00-03:00";

      expect(formatNotificationDate(value, now)).toEqual({
        label: "20/09/2026 18:45",
        relative: "há 16 dias",
      });
    });

    it("deve usar a data atual quando now não for informado", () => {
      const value = new Date().toISOString();

      expect(formatNotificationDate(value)).toEqual({
        label: expect.stringMatching(/^Hoje às \d{2}:\d{2}$/),
        relative: "há alguns segundos",
      });
    });
  });
});
