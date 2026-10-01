import type { Care } from "@domain/entities/care.entity";
import type { Plant } from "@domain/entities/plant.entity";

export type PlantWithCares = Plant & {
  cares: Care[];
};