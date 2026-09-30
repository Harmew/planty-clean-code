export type MenuContextValue = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MenuProps = React.PropsWithChildren;

export type MenuTriggerProps = React.PropsWithChildren;

export type MenuContentProps = React.PropsWithChildren;

export type MenuItemProps = React.PropsWithChildren<{
  onPress?: () => void;
}>;
