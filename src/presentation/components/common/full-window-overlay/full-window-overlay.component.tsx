import React from "react";

// React Native
import { Modal, Platform } from "react-native";

// React Native Screen
import { FullWindowOverlay as NativeFullWindowOverlay } from "react-native-screens";

/**
 * Props for the FullWindowOverlay component
 *
 * @description
 * FullWindowOverlay renders content in a separate native window on iOS
 * and a React Native Modal on Android.
 */
export function FullWindowOverlay({ children }: Readonly<React.PropsWithChildren>) {
  if (Platform.OS === "ios") {
    return <NativeFullWindowOverlay>{children}</NativeFullWindowOverlay>;
  }

  return (
    <Modal style={{ flex: 1 }} transparent>
      {children}
    </Modal>
  );
}
