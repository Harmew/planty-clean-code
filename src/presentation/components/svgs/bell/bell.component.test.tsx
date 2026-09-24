import { render } from "@testing-library/react-native";

import { Bell } from "@presentation/components/svgs/bell";

describe("bell-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Bell />);

    expect(getByTestId("bell-svg")).toBeTruthy();
  });
});
