import { use, useRef } from 'react';
import { Animated } from 'react-native';

export const useBenchOfPizzaAnimation = () => {
  const sizeDish = useRef(new Animated.Value(1)).current;
  const sizePizza = useRef(new Animated.Value(1)).current;
  const translateDish = useRef(new Animated.Value(0)).current;
  const translatePizza = useRef(new Animated.Value(0)).current;

  const handleTranslatePizza = () => {
    Animated.timing(translatePizza, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return {
    //state
    //methods
    //actions
  };
};
