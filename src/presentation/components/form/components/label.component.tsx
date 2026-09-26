import React from "react";
import { View } from "react-native";

// Presentation
import { Typography } from "@presentation/components/common";

import { useFormField } from "../form-field.component";

export const LabelComponent = React.forwardRef<View, React.PropsWithChildren>(({ children }, ref) => {
  const { isRequired } = useFormField();

  if (!children) {
    return null;
  }

  return (
    <View ref={ref} testID="form-field-label">
      <Typography size={12} testID="form-field-label-text">
        {children}
        {isRequired ? (
          <Typography size={12} color="red500">
            {" *"}
          </Typography>
        ) : null}
      </Typography>
    </View>
  );
});

LabelComponent.displayName = "FormField.Label";
