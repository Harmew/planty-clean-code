import { render } from "@testing-library/react-native";

import { ChevronUp } from "@presentation/components/svgs/chevron-up";

describe("chevron-up-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ChevronUp />);

    expect(getByTestId("chevron-up-svg")).toBeTruthy();
  });
});
