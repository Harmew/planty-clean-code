import { render } from "@testing-library/react-native";

import { Plus } from "@presentation/components/svgs/plus";

describe("plus-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Plus />);

    expect(getByTestId("plus-svg")).toBeTruthy();
  });
});
