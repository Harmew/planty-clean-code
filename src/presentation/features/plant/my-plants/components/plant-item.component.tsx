import { Pressable, View } from "react-native";

import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Row, Surface, Typography } from "@presentation/components/common";

import { useTheme } from "@presentation/hooks/use-theme";

import type { Plant } from "@domain/entities/plant.entity";

type PlantItemProps = {
  item: Plant;
  index: number;
  onPress: (id: number) => void;
};

export function PlantItem({ item, onPress, index }: Readonly<PlantItemProps>) {
  const { theme } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(Math.min(160 + index * 40, 480))}>
      <Pressable onPress={() => onPress(item.id)}>
        <Surface style={{ padding: theme.spacings[8] }}>
          <Row align="center">
            <Image
              testID="plant-image"
              source={item.image ? { uri: item.image } : undefined}
              placeholder={require("@assets/images/placeholder.png")}
              style={{
                width: 80,
                height: 80,
                borderRadius: theme.radius[18],
                // @ts-expect-error - borderCurve is not a valid style property types but in render has available
                borderCurve: "continuous",
              }}
              contentFit="cover"
            />

            <View style={{ flex: 1 }}>
              <Typography numberOfLines={1} size={18}>
                {item.name}
              </Typography>

              <Typography numberOfLines={1} size={12} color="gray500">
                {item.location}
              </Typography>
            </View>
          </Row>
        </Surface>
      </Pressable>
    </Animated.View>
  );
}

PlantItem.displayName = "PlantItem";
