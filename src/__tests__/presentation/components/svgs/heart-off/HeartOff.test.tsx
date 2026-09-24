import { render } from "@testing-library/react-native";

import { HeartOff } from "@presentation/components/svgs/heart-off";

describe("HeartOff", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<HeartOff />);

    expect(getByTestId("heart-off-svg")).toBeTruthy();
  });
});
