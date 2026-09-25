import { render } from "@testing-library/react-native";

import { Home } from "@presentation/components/svgs/home.component";

describe("home-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Home />);

    expect(getByTestId("home-svg")).toBeTruthy();
  });
});
