import React from "react";

// Components
import { MenuContent } from "./components/menu-content.component";
import { MenuItem } from "./components/menu-item.component";
import { MenuTrigger } from "./components/menu-trigger.component";
import { MenuContext } from "./menu.context";
import type { MenuProps } from "./types";

export function MenuRoot({ children }: Readonly<MenuProps>) {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setOpen,
    }),
    [isOpen],
  );

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>;
}

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
});
