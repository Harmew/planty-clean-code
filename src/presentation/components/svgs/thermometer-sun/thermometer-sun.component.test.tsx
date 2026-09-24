import { render } from "@testing-library/react-native";

import { ThermometerSun } from "@presentation/components/svgs/thermometer-sun";

describe("thermometer-sun-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ThermometerSun />);

    expect(getByTestId("thermometer-sun-svg")).toBeTruthy();
  });
});
