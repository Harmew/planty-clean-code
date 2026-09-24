import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="my-plants"
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "#ffffff" } }}
    >
      <Tabs.Screen name="my-plants" />
      <Tabs.Screen name="my-cares" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
