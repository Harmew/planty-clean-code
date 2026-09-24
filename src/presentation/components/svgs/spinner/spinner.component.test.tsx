import { render } from "@testing-library/react-native";

import { Spinner } from "@presentation/components/svgs/spinner";

describe("spinner-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<Spinner />);

    expect(getByTestId("spinner-svg")).toBeTruthy();
  });
});
