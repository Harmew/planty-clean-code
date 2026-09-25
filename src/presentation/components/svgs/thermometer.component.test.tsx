import { render } from "@testing-library/react-native";

import { Thermometer } from "@presentation/components/svgs/thermometer.component";

describe("thermometer-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Thermometer />);

    expect(getByTestId("thermometer-svg")).toBeTruthy();
  });
});
