import { ImageSourcePropType } from 'react-native';

export type Pizza = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  imageUrl: ImageSourcePropType;
};
