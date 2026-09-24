import { render } from "@testing-library/react-native";

import { MapPinHouse } from "@presentation/components/svgs/map-pin-house";

describe("MapPinHouse", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<MapPinHouse />);

    expect(getByTestId("map-pin-house-svg")).toBeTruthy();
  });
});
