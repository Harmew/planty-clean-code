export const radius = {
  /** NONE */
  0: 0,

  /** SM */
  12: 12,

  /** MD */
  18: 18,

  /** LG */
  26: 26,

  /** FULL */
  999: 999,
} as const;

export type Radius = typeof radius;
