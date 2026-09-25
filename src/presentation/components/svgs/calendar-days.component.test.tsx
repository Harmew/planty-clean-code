import { render } from "@testing-library/react-native";

import { CalendarDays } from "@presentation/components/svgs/calendar-days.component";

describe("calendar-days-component", () => {
  it("deve renderizar corretamente", async () => {
    const { getByTestId } = await render(<CalendarDays />);

    expect(getByTestId("calendar-days-svg")).toBeTruthy();
  });
});
