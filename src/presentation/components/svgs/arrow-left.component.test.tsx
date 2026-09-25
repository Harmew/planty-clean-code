import { render } from "@testing-library/react-native";

import { ArrowLeft } from "@presentation/components/svgs/arrow-left.component";

describe("arrow-left-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ArrowLeft />);

    expect(getByTestId("arrow-left-svg")).toBeTruthy();
  });
});
