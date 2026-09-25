import { render } from "@testing-library/react-native";

import { ArrowRight } from "@presentation/components/svgs/arrow-right.component";

describe("arrow-right-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ArrowRight />);

    expect(getByTestId("arrow-right-svg")).toBeTruthy();
  });
});
