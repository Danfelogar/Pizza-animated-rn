import { ImageSourcePropType } from 'react-native';

export type ExtraIngredient = {
  id: number;
  name: string;
  price: number;
  ingredientImage: ImageSourcePropType;
  unitImage: ImageSourcePropType;
};
