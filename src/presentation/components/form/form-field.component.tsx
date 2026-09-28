import React from "react";

import { View } from "react-native";

// Presentation
import { useTheme } from "@presentation/hooks/use-theme";

// Components
import { DescriptionComponent } from "./components/description.component";
import { ErrorComponent } from "./components/error.component";
import { InputComponent } from "./components/input.component";
import { LabelComponent } from "./components/label.component";
import { SelectComponent } from "./components/select.component";
import { FormFieldContext } from "./form-field.context";
import type { FormFieldProps } from "./types";

export const FormFieldRoot = React.forwardRef<View, FormFieldProps>(
  ({ children, isDisabled = false, isInvalid = false, isRequired = false, style, ...props }, ref) => {
    const { theme } = useTheme();

    const contextValue = React.useMemo(
      () => ({ isDisabled, isInvalid, isRequired }),
      [isDisabled, isInvalid, isRequired],
    );

    return (
      <FormFieldContext.Provider value={contextValue}>
        <View ref={ref} {...props} style={[{ gap: theme.spacings[8], opacity: isDisabled ? 0.6 : 1 }, style]}>
          {children}
        </View>
      </FormFieldContext.Provider>
    );
  },
);

FormFieldRoot.displayName = "FormFieldRoot";

export const FormField = Object.assign(FormFieldRoot, {
  Label: LabelComponent,
  Description: DescriptionComponent,
  Error: ErrorComponent,
  Input: InputComponent,
  Select: SelectComponent,
});
