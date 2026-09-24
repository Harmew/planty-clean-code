import { render } from "@testing-library/react-native";

import { Scissors } from "@presentation/components/svgs/scissors";

describe("scissors-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Scissors />);

    expect(getByTestId("scissors-svg")).toBeTruthy();
  });
});
