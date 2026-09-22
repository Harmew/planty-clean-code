import { Redirect } from "expo-router";

export default function Index() {
  console.log("Redirecting to (tabs)/minhas-plantas");

  return <Redirect href="/(tabs)/minhas-plantas" />;
}
