import React from "react";

// React Native
import { Modal } from "react-native";

export function FullWindowOverlay({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Modal style={{ flex: 1 }} transparent>
      {children}
    </Modal>
  );
}
