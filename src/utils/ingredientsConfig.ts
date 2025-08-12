type IngredientPosition = {
  topMultiplier: number;
  leftMultiplier: number;
};

type IngredientConfig = {
  [key: string]: IngredientPosition[];
};

export const INGREDIENTS_CONFIG: IngredientConfig = {
  POTATOES: [
    { topMultiplier: 0.22, leftMultiplier: 0.18 },
    { topMultiplier: 0.45, leftMultiplier: 0.48 },
    { topMultiplier: 0.32, leftMultiplier: 0.25 },
    { topMultiplier: 0.19, leftMultiplier: 0.45 },
  ],
  CHILIES: [
    { topMultiplier: 0.5, leftMultiplier: 0.21 },
    { topMultiplier: 0.19, leftMultiplier: 0.47 },
    { topMultiplier: 0.35, leftMultiplier: 0.35 },
    { topMultiplier: 0.28, leftMultiplier: 0.52 },
  ],
  MUSHROOMS: [
    { topMultiplier: 0.41, leftMultiplier: 0.22 },
    { topMultiplier: 0.27, leftMultiplier: 0.33 },
    { topMultiplier: 0.5, leftMultiplier: 0.49 },
    { topMultiplier: 0.19, leftMultiplier: 0.21 },
  ],
  OLIVES: [
    { topMultiplier: 0.25, leftMultiplier: 0.5 },
    { topMultiplier: 0.19, leftMultiplier: 0.39 },
    { topMultiplier: 0.32, leftMultiplier: 0.15 },
    { topMultiplier: 0.45, leftMultiplier: 0.25 },
  ],
  ONIONS: [
    { topMultiplier: 0.19, leftMultiplier: 0.35 },
    { topMultiplier: 0.5, leftMultiplier: 0.52 },
    { topMultiplier: 0.15, leftMultiplier: 0.45 },
    { topMultiplier: 0.32, leftMultiplier: 0.25 },
  ],
  PEAS: [
    { topMultiplier: 0.45, leftMultiplier: 0.15 },
    { topMultiplier: 0.19, leftMultiplier: 0.43 },
    { topMultiplier: 0.32, leftMultiplier: 0.25 },
    { topMultiplier: 0.5, leftMultiplier: 0.35 },
  ],
  PICKLES: [
    { topMultiplier: 0.19, leftMultiplier: 0.47 },
    { topMultiplier: 0.5, leftMultiplier: 0.25 },
    { topMultiplier: 0.32, leftMultiplier: 0.25 },
    { topMultiplier: 0.45, leftMultiplier: 0.48 },
  ],
};
