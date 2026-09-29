import { render } from "@testing-library/react-native";

import { RotateCCW } from "@presentation/components/svgs/rotate-ccw.component";

describe("rotate-ccw-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<RotateCCW />);

    expect(getByTestId("rotate-ccw-svg")).toBeTruthy();
  });
});
