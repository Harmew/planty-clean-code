import { render } from "@testing-library/react-native";

import { Shovel } from "@presentation/components/svgs/shovel";

describe("shovel-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Shovel />);

    expect(getByTestId("shovel-svg")).toBeTruthy();
  });
});
