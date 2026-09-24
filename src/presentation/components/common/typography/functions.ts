import type { ReactNode } from "react";

import type { Theme } from "@shared/theme";

import type { TextTransform, TypographyColor } from "./types";

export function capitalize(value: string): string {
  return value.replace(/(^|\s)(\S)/gu, (_, separator, character) => `${separator}${character.toUpperCase()}`);
}

export function transformText(value: string, transform: TextTransform): string {
  switch (transform) {
    case "uppercase":
      return value.toUpperCase();

    case "lowercase":
      return value.toLowerCase();

    case "capitalize":
      return capitalize(value);

    case "none":
    default:
      return value;
  }
}

export function transformChildren(children: ReactNode, transform: TextTransform): ReactNode {
  if (transform === "none") {
    return children;
  }

  return Array.isArray(children)
    ? children.map((child) => transformChild(child, transform))
    : transformChild(children, transform);
}

function transformChild(child: ReactNode, transform: TextTransform): ReactNode {
  if (typeof child === "string") {
    return transformText(child, transform);
  }

  if (typeof child === "number") {
    return transformText(String(child), transform);
  }

  return child;
}

export function getTextColor(theme: Theme, color: TypographyColor): string {
  /**
   * Caso especifiquei a cor "text", então vamos retornar a cor do token de texto do tema, caso contrário, vamos retornar a cor especificada no tema.
   */
  if (color === "text") {
    return theme.tokens.text;
  }

  return theme.colors[color];
}
