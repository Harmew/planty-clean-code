// Presentation
import { Menu, Typography } from "@presentation/components/common";
import { Header } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor } from "@shared/utils/theme";

export function NotificationsHeader() {
  const { dark } = useTheme();

  return (
    <Header
      title="Notificações"
      rightContent={
        <Menu>
          <Menu.Trigger>
            <Icons.Info color={getIconTextColor(dark)} />
          </Menu.Trigger>

          <Menu.Content>
            <Menu.Item>
              <Typography style={{ flex: 1 }} align="center">
                Notificações são mantidas por até 3 meses e depois são removidas automaticamente
              </Typography>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      }
    />
  );
}
