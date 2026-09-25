import { render } from "@testing-library/react-native";

import { UndrawWelcoming } from "@presentation/components/svgs/undraw-welcoming.component";

describe("undraw-welcoming-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<UndrawWelcoming />);

    expect(getByTestId("undraw-welcoming-svg")).toBeTruthy();
  });
});
