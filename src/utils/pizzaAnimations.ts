import { Animated } from 'react-native';
import { PizzaSize } from './pizzaSize';

interface SizeToValueMap {
  [key: string]: number;
}

const SIZE_TO_VALUE_MAP: SizeToValueMap = {
  [PizzaSize.Small]: 1,
  [PizzaSize.Medium]: 1.2,
  [PizzaSize.Large]: 1.5,
};

export const createAnimation = {
  //rotate change
  translateAndRotate: (
    translateValue: Animated.Value,
    rotateValue: Animated.Value,
  ) => {
    return Animated.parallel([
      Animated.timing(translateValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]);
  },
  //scale change
  sizeChange: (
    sizeValue: Animated.Value,
    rotateValue: Animated.Value,
    size: PizzaSize,
  ) => {
    return Animated.parallel([
      Animated.spring(sizeValue, {
        toValue: SIZE_TO_VALUE_MAP[size],
        friction: 6,
        useNativeDriver: false,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]);
  },
  //text opacity and translation change
  priceText: (translateValue: Animated.Value, opacityValue: Animated.Value) => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(translateValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(translateValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]);
  },
  //multiply opacity and translate ingredients change
  ingredient: (
    opacityValue: Animated.Value,
    translateValue: Animated.Value,
    index: number,
    isAdding: boolean,
  ) => {
    return Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: isAdding ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
        isAdding
          ? Animated.spring(translateValue, {
              toValue: 1,
              friction: 5,
              useNativeDriver: true,
            })
          : Animated.timing(translateValue, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
      ]),
    ]);
  },
};
