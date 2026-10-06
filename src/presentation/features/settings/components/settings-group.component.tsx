import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Surface } from "@presentation/components/common";

interface SettingsGroupProps extends React.PropsWithChildren {
  delay: number;
}

export function SettingsGroup({ delay, children }: Readonly<SettingsGroupProps>) {
  return (
    <Animated.View entering={FadeInDown.delay(delay)}>
      <Surface>{children}</Surface>
    </Animated.View>
  );
}
