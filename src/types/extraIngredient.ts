import {
  Animated,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export type ExtraIngredient = {
  id: number;
  name: string;
  price: number;
  ingredientImage: ImageSourcePropType;
  unitImage: ImageSourcePropType;
};

export interface ExtraIngredientPerUnit {
  id: number;
  staticStyle: StyleProp<ImageStyle>;
  animationOpacityVal: Animated.Value;
  animationTranslateVal: Animated.Value;
}
