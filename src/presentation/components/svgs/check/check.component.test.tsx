import { render } from "@testing-library/react-native";

import { Check } from "@presentation/components/svgs/check";

describe("check-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Check />);

    expect(getByTestId("check-svg")).toBeTruthy();
  });
});
