import { render } from "@testing-library/react-native";

import { PlantIntro } from "@presentation/components/svgs/plant-intro";

describe("plant-intro-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<PlantIntro />);

    expect(getByTestId("plant-intro-svg")).toBeTruthy();
  });
});
