import { render } from "@testing-library/react-native";

import { Bot } from "@presentation/components/svgs/bot.component";

describe("bot-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Bot />);

    expect(getByTestId("bot-svg")).toBeTruthy();
  });
});
