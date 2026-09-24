import { render } from "@testing-library/react-native";

import { SquareTopUp } from "@presentation/components/svgs/square-top-up";

describe("square-top-up-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<SquareTopUp />);

    expect(getByTestId("square-top-up-svg")).toBeTruthy();
  });
});
