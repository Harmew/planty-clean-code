import { render } from "@testing-library/react-native";

import { ChevronDown } from "@presentation/components/svgs/chevron-down";

describe("chevron-down-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ChevronDown />);

    expect(getByTestId("chevron-down-svg")).toBeTruthy();
  });
});
