import { render } from "@testing-library/react-native";

import { Pencil } from "@presentation/components/svgs/pencil";

describe("Pencil", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Pencil />);

    expect(getByTestId("pencil-svg")).toBeTruthy();
  });
});
