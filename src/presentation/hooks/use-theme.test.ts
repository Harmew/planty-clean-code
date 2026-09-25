import { renderHook } from "@testing-library/react-native";

import { useTheme } from "@presentation/hooks/use-theme";

import { theme } from "@shared/theme";

import { useColorScheme } from "react-native";

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("use-theme-hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve usar o tema claro quando o sistema estiver no modo claro", async () => {
    mockUseColorScheme.mockReturnValue("light");

    const { result } = await renderHook(() => useTheme());

    expect(result.current.dark).toBe(false);
    expect(result.current.theme).toBe(theme);
  });

  it("deve usar o tema escuro quando o sistema estiver no modo escuro", async () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { result } = await renderHook(() => useTheme());

    expect(result.current.dark).toBe(true);
    expect(result.current.theme).toBe(theme);
  });
});
