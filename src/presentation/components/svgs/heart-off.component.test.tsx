import { render } from "@testing-library/react-native";

import { HeartOff } from "@presentation/components/svgs/heart-off.component";

describe("heart-off-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<HeartOff />);

    expect(getByTestId("heart-off-svg")).toBeTruthy();
  });
});
