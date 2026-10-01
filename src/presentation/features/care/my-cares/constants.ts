export const CARE_MAP = {
  water: {
    label: "Regar",
    icon: "Droplet",
    history: "Regou",
  },
  fertilize: {
    label: "Adubar",
    icon: "Leaf",
    history: "Adubou",
  },
  prune: {
    label: "Podar",
    icon: "Scissors",
    history: "Podou",
  },
  repot: {
    label: "Replantar",
    icon: "Shovel",
    history: "Replantou",
  },
} as const;

export type CareType = keyof typeof CARE_MAP;

export const CARE_TYPES = Object.keys(CARE_MAP) as CareType[];
