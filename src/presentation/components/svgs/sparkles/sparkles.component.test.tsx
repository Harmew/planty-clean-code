import { render } from "@testing-library/react-native";

import { Sparkles } from "@presentation/components/svgs/sparkles";

describe("sparkles-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Sparkles />);

    expect(getByTestId("sparkles-svg")).toBeTruthy();
  });
});
