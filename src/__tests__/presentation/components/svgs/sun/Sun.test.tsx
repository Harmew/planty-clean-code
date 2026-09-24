import { render } from "@testing-library/react-native";

import { Sun } from "@presentation/components/svgs/sun";

describe("Sun", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Sun />);

    expect(getByTestId("sun-svg")).toBeTruthy();
  });
});
