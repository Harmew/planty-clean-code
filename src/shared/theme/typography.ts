export const fontSizes = {
  /** XXS */
  10: 10,
  /** XS */
  12: 12,
  /** SM */
  14: 14,
  /** MD */
  16: 16,
  /** LG */
  18: 18,
  /** XL */
  24: 24,
  /** XXL */
  28: 28,
  /** XXXL */
  48: 48,
} as const;

/**
 * Relação entre fontSize e lineHeight. (NAO EXPONHO UM OBJETO DE LINEHEIGHTS EU FAÇO UM DE-PARA COM RELAÇÕES)
 */
export const fontLineHeights = {
  /** XXS */
  10: 14,
  /** XS */
  12: 16,
  /** SM */
  14: 18,
  /** MD */
  16: 20,
  /** LG */
  18: 22,
  /** XL */
  24: 28,
  /** XXL */
  28: 32,
  /** XXXL */
  48: 56,
} as const;

export const fontWeights = {
  /** Normal */
  400: "400",
  /** Medium */
  500: "500",
  /** SemiBold */
  600: "600",
  /** Bold */
  700: "700",
} as const;

export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
