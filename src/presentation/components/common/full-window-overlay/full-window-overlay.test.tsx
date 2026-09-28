import { Text } from "react-native";

import { render } from "@testing-library/react-native";

import { FullWindowOverlay } from "./full-window-overlay.component";

describe("full-window-overlay-component", () => {
  it("renders children inside a modal", async () => {
    const { getByTestId } = await render(
      <FullWindowOverlay>
        <Text testID="content">Conteúdo</Text>
      </FullWindowOverlay>,
    );

    expect(getByTestId("content")).toBeTruthy();
  });
});
