import { render } from "@testing-library/react-native";

import { ClipboardCheck } from "@presentation/components/svgs/clipboard-check";

describe("clipboard-check-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ClipboardCheck />);

    expect(getByTestId("clipboard-check-svg")).toBeTruthy();
  });
});
