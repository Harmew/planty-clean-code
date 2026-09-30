import React from "react";

import type { MenuContextValue } from "./types";

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export function useMenu() {
  const context = React.useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used inside Menu");
  }

  return context;
}
