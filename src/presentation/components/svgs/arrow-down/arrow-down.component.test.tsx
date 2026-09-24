import { render } from "@testing-library/react-native";

import { ArrowDown } from "@presentation/components/svgs/arrow-down";

describe("arrow-down-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ArrowDown />);

    expect(getByTestId("arrow-down-svg")).toBeTruthy();
  });
});
