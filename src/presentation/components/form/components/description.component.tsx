import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Presentation
import { Typography } from "@presentation/components/common";

import { ANIMATION_DURATION, ANIMATION_EASING } from "../constants";

export function DescriptionComponent({ children }: Readonly<React.PropsWithChildren>) {
  if (!children) {
    return null;
  }

  return (
    <Animated.View
      testID="form-field-description"
      entering={FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING)}
      exiting={FadeOut.duration(ANIMATION_DURATION).easing(ANIMATION_EASING)}
    >
      <Typography size={12} color="gray500" testID="form-field-description-text">
        {children}
      </Typography>
    </Animated.View>
  );
}

DescriptionComponent.displayName = "FormField.Description";
