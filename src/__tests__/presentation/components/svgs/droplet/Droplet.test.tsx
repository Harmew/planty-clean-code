import { render } from "@testing-library/react-native";

import { Droplet } from "@presentation/components/svgs/droplet";

describe("Droplet", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Droplet />);

    expect(getByTestId("droplet-svg")).toBeTruthy();
  });
});
