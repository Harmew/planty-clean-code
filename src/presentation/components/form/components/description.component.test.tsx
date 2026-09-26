import { render } from "@testing-library/react-native";

// Components

import { DescriptionComponent } from "./description.component";

describe("form-field-description-component", () => {
  it("does not render when there is no description", async () => {
    const { queryByTestId } = await render(<DescriptionComponent />);

    expect(queryByTestId("form-field-description")).toBeNull();
  });

  it("renders the description", async () => {
    const { getByTestId } = await render(<DescriptionComponent>Temperatura máxima recomendada</DescriptionComponent>);

    expect(getByTestId("form-field-description")).toBeTruthy();
    expect(getByTestId("form-field-description-text")).toHaveTextContent("Temperatura máxima recomendada");
  });
});
