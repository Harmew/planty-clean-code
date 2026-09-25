import { render } from "@testing-library/react-native";

import { ArrowUp } from "@presentation/components/svgs/arrow-up.component";

describe("arrow-up-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ArrowUp />);

    expect(getByTestId("arrow-up-svg")).toBeTruthy();
  });
});
