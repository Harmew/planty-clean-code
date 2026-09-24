import { render } from "@testing-library/react-native";

import { ChevronRight } from "@presentation/components/svgs/chevron-right";

describe("chevron-right-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ChevronRight />);

    expect(getByTestId("chevron-right-svg")).toBeTruthy();
  });
});
