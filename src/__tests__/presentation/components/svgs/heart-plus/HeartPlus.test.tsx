import { render } from "@testing-library/react-native";

import { HeartPlus } from "@presentation/components/svgs/heart-plus";

describe("HeartPlus", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<HeartPlus />);

    expect(getByTestId("heart-plus-svg")).toBeTruthy();
  });
});
