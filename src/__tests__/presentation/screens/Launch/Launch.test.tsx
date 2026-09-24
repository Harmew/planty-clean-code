import { render } from "@testing-library/react-native";

import { LaunchScreen } from "@presentation/screens/Launch";

describe("LaunchScreen", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<LaunchScreen />);

    expect(getByTestId("screen-wrapper")).toBeTruthy();
    expect(getByTestId("plant-intro-svg")).toBeTruthy();
  });
});
