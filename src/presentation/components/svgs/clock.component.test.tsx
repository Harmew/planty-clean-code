import { render } from "@testing-library/react-native";

import { Clock } from "@presentation/components/svgs/clock.component";

describe("clock-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Clock />);

    expect(getByTestId("clock-svg")).toBeTruthy();
  });
});
