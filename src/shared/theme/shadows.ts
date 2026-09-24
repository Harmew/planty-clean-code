export const shadows = {
  default: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6.5,
    elevation: 3,
  },
} as const;

export type Shadows = typeof shadows;
