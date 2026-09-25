import type { TextInputProps, ViewProps } from "react-native";

export type FormFieldContextValue = {
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
};

export type FormFieldProps = ViewProps & {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
};

export type InputProps = TextInputProps & {
  isInvalid?: boolean;
  isDisabled?: boolean;
};
