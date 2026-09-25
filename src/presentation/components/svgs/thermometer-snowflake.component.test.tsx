import { render } from "@testing-library/react-native";

import { ThermometerSnowflake } from "@presentation/components/svgs/thermometer-snowflake.component";

describe("thermometer-snowflake-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<ThermometerSnowflake />);

    expect(getByTestId("thermometer-snowflake-svg")).toBeTruthy();
  });
});
