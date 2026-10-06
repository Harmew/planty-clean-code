import { Pressable } from "react-native";

// Presentation
import { Row, Spinner, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  isLoading?: boolean;
}

export function SettingsItem({ icon, label, onPress, isLoading }: Readonly<SettingsItemProps>) {
  return (
    <Pressable onPress={onPress} disabled={isLoading}>
      <Row justify="space-between">
        <Row flex={1}>
          {icon}
          <Typography style={{ flex: 1 }} numberOfLines={1}>
            {label}
          </Typography>
        </Row>

        {isLoading && <Spinner size={20} />}
        {!isLoading && onPress && <Icons.ChevronRight color="gray500" />}
      </Row>
    </Pressable>
  );
}
