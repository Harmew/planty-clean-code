import { render } from "@testing-library/react-native";

import { LaunchScreen } from "@presentation/features/startup/launch/launch.component";

describe("launch-screen-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<LaunchScreen />);

    expect(getByTestId("screen-wrapper")).toBeTruthy();
    expect(getByTestId("plant-intro-svg")).toBeTruthy();
  });
});
