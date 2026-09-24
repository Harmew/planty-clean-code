import type { AlertOptions } from "react-native";

export function getAlertOptions(dark: boolean): AlertOptions {
  return {
    cancelable: false,
    userInterfaceStyle: dark ? "dark" : "light",
  };
}
