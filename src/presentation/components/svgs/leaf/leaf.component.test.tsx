import { render } from "@testing-library/react-native";

import { Leaf } from "@presentation/components/svgs/leaf";

describe("leaf-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Leaf />);

    expect(getByTestId("leaf-svg")).toBeTruthy();
  });
});
