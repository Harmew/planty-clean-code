import { render } from "@testing-library/react-native";

import { Trash } from "@presentation/components/svgs/trash";

describe("trash-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Trash />);

    expect(getByTestId("trash-svg")).toBeTruthy();
  });
});
