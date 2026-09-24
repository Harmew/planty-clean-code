import { render } from "@testing-library/react-native";

import { HeartPulse } from "@presentation/components/svgs/heart-pulse";

describe("HeartPulse", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<HeartPulse />);

    expect(getByTestId("heart-pulse-svg")).toBeTruthy();
  });
});
