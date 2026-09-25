export interface SwitchProps {
  isSelected: boolean;
  onSelectedChange?: (value: boolean) => void;
  disabled?: boolean;
}
