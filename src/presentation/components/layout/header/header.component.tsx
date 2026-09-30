import { useRouter } from "expo-router";
import { Platform, View } from "react-native";

import { Button, Row, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";
import { HeaderProps } from "./types";

const HEADER_HEIGHT = 36;
export function Header({ title, showBackButton = true, isModal = false, rightContent }: Readonly<HeaderProps>) {
  const { dark } = useTheme();
  const router = useRouter();

  return (
    <Row>
      <View style={{ width: HEADER_HEIGHT, aspectRatio: 1 }}>
        {showBackButton ? (
          <Button
            isIconOnly
            onPress={() => router.back()}
            color={getSurfaceColor(dark)}
            size="sm"
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            {Platform.OS === "ios" && isModal ? (
              <Icons.ChevronDown color={getIconTextColor(dark)} />
            ) : (
              <Icons.ChevronLeft color={getIconTextColor(dark)} />
            )}
          </Button>
        ) : null}
      </View>

      {/* centro REAL */}
      <Typography style={{ flex: 1 }} size={18} weight={500} align="center" numberOfLines={1}>
        {title}
      </Typography>

      {/* direita (espelho) */}
      <View style={{ width: HEADER_HEIGHT, aspectRatio: 1 }}>{rightContent}</View>
    </Row>
  );
}
