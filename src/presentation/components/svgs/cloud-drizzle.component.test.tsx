import { render } from "@testing-library/react-native";

import { CloudDrizzle } from "@presentation/components/svgs/cloud-drizzle.component";

describe("cloud-drizzle-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CloudDrizzle />);

    expect(getByTestId("cloud-drizzle-svg")).toBeTruthy();
  });
});
