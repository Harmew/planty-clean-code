import { render } from "@testing-library/react-native";

import { ListArrowDown } from "@presentation/components/svgs/list-arrow-down.component";

describe("list-arrow-down-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ListArrowDown />);

    expect(getByTestId("list-arrow-down-svg")).toBeTruthy();
  });
});
