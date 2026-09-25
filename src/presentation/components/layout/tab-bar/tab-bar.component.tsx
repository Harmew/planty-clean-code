import { BottomTabBarProps } from "expo-router/build/layouts/Tabs";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

// DI
import { container } from "@di/container";

// Presentation
import { Surface } from "@presentation/components/common";
import { useTheme } from "@presentation/hooks/use-theme";

import { createStyles } from "./styles";
import { TabBarButton } from "./tab-bar-button.component";

export function TabBar({ state, navigation, insets }: Readonly<BottomTabBarProps>) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const leftRoutes = state.routes.slice(0, 2); // plants and cares
  const rightRoutes = state.routes.slice(2); // settings

  const renderTab = (route: (typeof state.routes)[number], index: number, group: "left" | "right") => {
    const isFocused = state.index === index;

    const onPress = () => {
      container.hapticsService.tabPress();

      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <TabBarButton
        key={route.key}
        route={route}
        isFocused={isFocused}
        group={group}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  };

  return (
    <View style={StyleSheet.compose(styles.container, { bottom: insets.bottom })} testID="tab-bar-container">
      {/* Esquerda */}
      <Animated.View entering={FadeInLeft.delay(40)}>
        <Surface style={styles.content}>{leftRoutes.map((route, i) => renderTab(route, i, "left"))}</Surface>
      </Animated.View>

      {/* Direita */}
      <Animated.View entering={FadeInRight.delay(40)}>
        <Surface style={styles.content}>
          {rightRoutes.map((route, i) => renderTab(route, i + leftRoutes.length, "right"))}
        </Surface>
      </Animated.View>
    </View>
  );
}
