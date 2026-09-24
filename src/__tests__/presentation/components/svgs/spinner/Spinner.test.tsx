import { render } from "@testing-library/react-native";

import { Spinner } from "@presentation/components/svgs/spinner";

describe("Spinner", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Spinner />);

    expect(getByTestId("spinner-svg")).toBeTruthy();
  });
});
