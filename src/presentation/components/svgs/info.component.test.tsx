import { render } from "@testing-library/react-native";

import { Info } from "@presentation/components/svgs/info.component";

describe("info-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Info />);

    expect(getByTestId("info-svg")).toBeTruthy();
  });
});
