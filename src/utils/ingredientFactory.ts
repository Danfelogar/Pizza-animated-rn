import { Animated } from 'react-native';
import { ExtraIngredientPerUnit } from '../types';
import { widthFullScreen } from './phoneDimensions';
import { sizeMultiplier } from './sizeMultiplier';
import { PizzaSize } from './pizzaSize';
import { INGREDIENTS_CONFIG } from './ingredientsConfig';

export const createIngredient = (
  type: string,
  pizzaSize: PizzaSize,
  existingIngredients?: ExtraIngredientPerUnit[],
): ExtraIngredientPerUnit[] => {
  const config = INGREDIENTS_CONFIG[type];
  if (!config) return [];

  return config.map((position, index) => {
    const id = index + 1;
    const existing = existingIngredients?.find(ing => ing.id === id);

    return {
      id,
      staticStyle: {
        top:
          widthFullScreen *
          position.topMultiplier *
          sizeMultiplier(widthFullScreen * position.topMultiplier, pizzaSize),
        left:
          widthFullScreen *
          position.leftMultiplier *
          sizeMultiplier(widthFullScreen * position.leftMultiplier, pizzaSize),
      },
      animationOpacityVal:
        existing?.animationOpacityVal || new Animated.Value(0),
      animationTranslateVal:
        existing?.animationTranslateVal || new Animated.Value(0),
    };
  });
};
