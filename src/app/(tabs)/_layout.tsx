import { Tabs } from "expo-router";

// Presentation
import { TabBar } from "@presentation/components/layout";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getThemeColors } from "@shared/utils/theme";

export default function TabsLayout() {
  const { dark } = useTheme();
  const { background } = getThemeColors(dark);

  return (
    <Tabs
      initialRouteName="my-plants"
      tabBar={(props) /** NOSONAR */ => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: background } }}
    >
      <Tabs.Screen name="my-plants" />
      <Tabs.Screen name="my-cares" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
