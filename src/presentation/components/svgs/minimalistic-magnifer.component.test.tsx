import { render } from "@testing-library/react-native";

import { MinimalisticMagnifer } from "@presentation/components/svgs/minimalistic-magnifer.component";

describe("minimalistic-magnifer-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<MinimalisticMagnifer />);

    expect(getByTestId("minimalistic-magnifer-svg")).toBeTruthy();
  });
});
