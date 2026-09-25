import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Typography } from "@presentation/components/common";

import { ANIMATION_DURATION, ANIMATION_EASING } from "./constants";
import { useFormField } from "./form-field.component";

export const ErrorComponent = React.forwardRef<View, React.PropsWithChildren>(({ children }, ref) => {
  const { isInvalid } = useFormField();

  if (!isInvalid || !children) return null;
  return (
    <Animated.View
      ref={ref}
      entering={FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING)}
      exiting={FadeOut.duration(ANIMATION_DURATION).easing(ANIMATION_EASING)}
    >
      <Typography size={12} color="red500">
        {children}
      </Typography>
    </Animated.View>
  );
});

ErrorComponent.displayName = "FormField.Error";
