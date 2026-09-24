export const spacings = {
  /** NONE */
  0: 0,

  /** XXS */
  4: 4,

  /** XS */
  8: 8,

  /** SM */
  12: 12,

  /** MD */
  16: 16,

  /** LG */
  18: 18,

  /** XL */
  20: 20,
} as const;

export type Spacings = typeof spacings;
