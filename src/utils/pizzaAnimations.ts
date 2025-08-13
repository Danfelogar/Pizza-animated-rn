import { Animated } from 'react-native';
import { PizzaSize } from './pizzaSize';

interface SizeToValueMap {
  [key: string]: number;
}

const SIZE_TO_VALUE_MAP: SizeToValueMap = {
  [PizzaSize.Small]: 1,
  [PizzaSize.Medium]: 1.2,
  [PizzaSize.Large]: 1.5,
  [PizzaSize.SendPizza]: 0.7,
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
  //reduce and hidden component
  hiddenAndReduceSize(
    sizeValue: Animated.Value,
    opacityValue: Animated.Value,
    size: PizzaSize,
  ) {
    return Animated.sequence([
      Animated.spring(sizeValue, {
        toValue: SIZE_TO_VALUE_MAP[size],
        friction: 6,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
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
    timing?: number,
  ) => {
    return Animated.sequence([
      Animated.delay(index * (timing ?? 100)),
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: isAdding ? 1 : 0,
          duration: timing ?? 300,
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
  wrapperPizza: (
    opacityTop: Animated.Value,
    translateTop: Animated.Value,
    opacityBottom: Animated.Value,
    translateBottom: Animated.Value,
  ) => {
    return Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(opacityTop, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(opacityBottom, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.spring(translateTop, {
          toValue: 77,
          friction: 9,
          useNativeDriver: false,
        }),
        Animated.spring(translateBottom, {
          toValue: -77,
          friction: 7,
          useNativeDriver: false,
        }),
      ]),
    ]);
  },
  sendPizza: (
    sizeTop: Animated.Value,
    translateTop: Animated.Value,
    translateTopX: Animated.Value,
    opacityTop: Animated.Value,
    rotateTop: Animated.Value,
    opacityBottom: Animated.Value,
  ) => {
    return Animated.sequence([
      Animated.parallel([
        Animated.spring(sizeTop, {
          toValue: 1.1,
          friction: 5,
          useNativeDriver: false,
        }),
        Animated.timing(opacityBottom, {
          toValue: 0,
          duration: 30,
          useNativeDriver: false,
        }),
      ]),
      Animated.delay(4),
      Animated.spring(sizeTop, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false,
      }),

      Animated.parallel([
        Animated.spring(sizeTop, {
          toValue: 0.25,
          friction: 5,
          useNativeDriver: false,
        }),
        Animated.timing(opacityTop, {
          toValue: 0,
          duration: 980,
          useNativeDriver: false,
        }),
        Animated.timing(rotateTop, {
          toValue: 1,
          duration: 330,
          useNativeDriver: false,
        }),
        Animated.timing(translateTop, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(translateTopX, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ]);
  },
};
