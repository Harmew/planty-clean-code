import React from "react";

import { Platform, Text } from "react-native";

import { render } from "@testing-library/react-native";

import { FullWindowOverlay } from "./full-window-overlay.component";

const mockNativeFullWindowOverlay = jest.fn(({ children }: React.PropsWithChildren) => children);

jest.mock("react-native-screens", () => ({
  FullWindowOverlay: (props: React.PropsWithChildren) => mockNativeFullWindowOverlay(props),
}));

describe("full-window-overlay-component", () => {
  afterEach(() => {
    mockNativeFullWindowOverlay.mockClear();
  });

  it("renders children inside the native overlay on iOS", async () => {
    jest.replaceProperty(Platform, "OS", "ios");

    const { getByTestId } = await render(
      <FullWindowOverlay>
        <Text testID="content">Conteúdo</Text>
      </FullWindowOverlay>,
    );

    expect(getByTestId("content")).toBeTruthy();
    expect(mockNativeFullWindowOverlay).toHaveBeenCalledTimes(1);
  });

  it("renders children inside a modal on non-iOS platforms", async () => {
    jest.replaceProperty(Platform, "OS", "android");

    const { getByTestId } = await render(
      <FullWindowOverlay>
        <Text testID="content">Conteúdo</Text>
      </FullWindowOverlay>,
    );

    expect(getByTestId("content")).toBeTruthy();
    expect(mockNativeFullWindowOverlay).not.toHaveBeenCalled();
  });
});
