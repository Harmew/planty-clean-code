import { render } from "@testing-library/react-native";

import { UndrawRelaxedReading } from "@presentation/components/svgs/undraw-relaxed-reading";

describe("UndrawRelaxedReading", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<UndrawRelaxedReading />);

    expect(getByTestId("undraw-relaxed-reading-svg")).toBeTruthy();
  });
});
