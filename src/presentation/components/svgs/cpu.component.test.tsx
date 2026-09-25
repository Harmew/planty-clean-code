import { render } from "@testing-library/react-native";

import { CPU } from "@presentation/components/svgs/cpu.component";

describe("cpu-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CPU />);

    expect(getByTestId("cpu-svg")).toBeTruthy();
  });
});
