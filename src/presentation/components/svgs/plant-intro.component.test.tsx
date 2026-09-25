import { render } from "@testing-library/react-native";

import { PlantIntro } from "@presentation/components/svgs/plant-intro.component";

describe("plant-intro-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<PlantIntro />);

    expect(getByTestId("plant-intro-svg")).toBeTruthy();
  });
});
