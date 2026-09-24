import { renderHook } from "@testing-library/react-native";

import { useAppTheme } from "@presentation/hooks/useAppTheme";

import { themes } from "@shared/theme";

import { useColorScheme } from "react-native";

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("useAppTheme", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve usar o tema claro quando o sistema estiver no modo claro", async () => {
    mockUseColorScheme.mockReturnValue("light");

    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.dark).toBe(false);
    expect(result.current.theme).toBe(themes.light);
  });

  it("deve usar o tema escuro quando o sistema estiver no modo escuro", async () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.dark).toBe(true);
    expect(result.current.theme).toBe(themes.dark);
  });
});
