import { Tabs } from "expo-router";

import { TabBar } from "@presentation/components/layout";
import { useTheme } from "@presentation/hooks/use-theme";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      initialRouteName="my-plants"
      tabBar={(props) /** NOSONAR */ => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: theme.tokens.background } }}
    >
      <Tabs.Screen name="my-plants" />
      <Tabs.Screen name="my-cares" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
