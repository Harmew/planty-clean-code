export const radius = {
  0: 0,
  12: 12,
  14: 14,
  16: 16,
  18: 18,

  // Button Only
  26: 26,

  // Full
  999: 999,
} as const;

export type Radius = typeof radius;
