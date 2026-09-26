import type { TextInputProps, ViewProps } from "react-native";

export type FormFieldContextValue = {
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
};

export type FormFieldProps = ViewProps & Partial<FormFieldContextValue>;

export type InputProps = TextInputProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

type SelectOption<T> = {
  label: string;
  value: T;
};

export type SelectProps<T> = {
  value?: T;
  onChange?: (value: T | undefined) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  icon?: React.JSX.Element;
};
