import { render } from "@testing-library/react-native";

import { ChevronUp } from "@presentation/components/svgs/chevron-up";

describe("ChevronUp", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ChevronUp />);

    expect(getByTestId("chevron-up-svg")).toBeTruthy();
  });
});
