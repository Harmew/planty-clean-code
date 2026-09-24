import { render } from "@testing-library/react-native";

import { Gallery } from "@presentation/components/svgs/gallery";

describe("Gallery", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Gallery />);

    expect(getByTestId("gallery-svg")).toBeTruthy();
  });
});
