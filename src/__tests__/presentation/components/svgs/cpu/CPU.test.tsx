import { render } from "@testing-library/react-native";

import { CPU } from "@presentation/components/svgs/cpu";

describe("CPU", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CPU />);

    expect(getByTestId("cpu-svg")).toBeTruthy();
  });
});
