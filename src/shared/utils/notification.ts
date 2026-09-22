import type { CareType } from "@domain/entities/care";

export const getNotificationTitle = (type: CareType): string => {
  switch (type) {
    case "water":
      return "Hora de regar";

    case "fertilizer":
      return "Hora de adubar";

    case "prune":
      return "Hora de podar";

    case "repot":
      return "Hora de replantar";
  }
};

export const getNotificationBody = (plantName: string, type: CareType): string => {
  switch (type) {
    case "water":
      return `A planta ${plantName} precisa de água!`;

    case "fertilizer":
      return `Chegou a hora de adubar a planta ${plantName}`;

    case "prune":
      return `A planta ${plantName} precisa ser podada`;

    case "repot":
      return `A planta ${plantName} precisa ser replantada`;
  }
};
