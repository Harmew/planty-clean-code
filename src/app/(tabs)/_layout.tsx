import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="minhas-plantas"
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "#ffffff" } }}
    >
      <Tabs.Screen name="minhas-plantas" />
    </Tabs>
  );
}
