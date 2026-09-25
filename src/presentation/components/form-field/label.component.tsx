import React from "react";

import { View } from "react-native";

import { Typography } from "@presentation/components/common";

import { useFormField } from "./form-field.component";

export const LabelComponent = React.forwardRef<View, React.PropsWithChildren>(({ children }, ref) => {
  const { isInvalid, isRequired } = useFormField();

  if (!children) return null;
  return (
    <View ref={ref}>
      <Typography size={12} color={isInvalid ? "red500" : "black"}>
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
