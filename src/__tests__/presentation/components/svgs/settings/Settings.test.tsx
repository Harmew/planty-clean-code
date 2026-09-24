import { render } from "@testing-library/react-native";

import { Settings } from "@presentation/components/svgs/settings";

describe("Settings", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Settings />);

    expect(getByTestId("settings-svg")).toBeTruthy();
  });
});
