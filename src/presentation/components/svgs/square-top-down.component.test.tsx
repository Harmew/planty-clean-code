import { render } from "@testing-library/react-native";

import { SquareTopDown } from "@presentation/components/svgs/square-top-down.component";

describe("square-top-down-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<SquareTopDown />);

    expect(getByTestId("square-top-down-svg")).toBeTruthy();
  });
});
