import { render } from "@testing-library/react-native";

import { ChevronLeft } from "@presentation/components/svgs/chevron-left";

describe("ChevronLeft", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ChevronLeft />);

    expect(getByTestId("chevron-left-svg")).toBeTruthy();
  });
});
