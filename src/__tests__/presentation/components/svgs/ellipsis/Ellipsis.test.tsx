import { render } from "@testing-library/react-native";

import { Ellipsis } from "@presentation/components/svgs/ellipsis";

describe("Ellipsis", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Ellipsis />);

    expect(getByTestId("ellipsis-svg")).toBeTruthy();
  });
});
