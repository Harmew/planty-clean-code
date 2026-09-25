import { render } from "@testing-library/react-native";

import { Gallery } from "@presentation/components/svgs/gallery.component";

describe("gallery-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Gallery />);

    expect(getByTestId("gallery-svg")).toBeTruthy();
  });
});
