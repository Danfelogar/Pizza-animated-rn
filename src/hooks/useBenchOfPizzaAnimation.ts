import { useEffect, useRef } from 'react';
import { Animated, ImageStyle, StyleProp, TextStyle } from 'react-native';
import { useGlobalStore } from '../store';
import { heightFullScreen, PizzaSize, widthFullScreen } from '../utils';

export const useBenchOfPizzaAnimation = () => {
  const pizzaSizeSmall = heightFullScreen * 0.49;
  const dishSizeSmall = widthFullScreen * 0.56;
  const sizeDish = useRef(new Animated.Value(1)).current;
  const translateDish = useRef(new Animated.Value(0)).current;
  const rotateDish = useRef(new Animated.Value(0)).current;
  const sizePizza = useRef(new Animated.Value(1)).current;
  const translatePizza = useRef(new Animated.Value(0)).current;
  const rotatePizza = useRef(new Animated.Value(0)).current;
  const translatePriceText = useRef(new Animated.Value(0)).current;
  const opacityPriceText = useRef(new Animated.Value(1)).current;
  const { pizzaSize, totalPizzaPrice, pizzaPriceSelectedSize } =
    useGlobalStore();

  const handleTranslateAndRotatePizza = () => {
    Animated.parallel([
      Animated.timing(translatePizza, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(rotatePizza, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        rotatePizza.setValue(0);
      }
    });
  };

  const handleTranslateAndRotateDish = () => {
    Animated.parallel([
      Animated.timing(translateDish, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(rotateDish, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        rotateDish.setValue(0);
      }
    });
  };

  const handleSize = () => {
    Animated.parallel([
      Animated.spring(sizeDish, {
        toValue:
          pizzaSize === PizzaSize.Small
            ? 1
            : pizzaSize === PizzaSize.Medium
            ? 1.2
            : 1.5,
        friction: 6,
        useNativeDriver: false,
      }),
      Animated.timing(rotatePizza, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.spring(sizePizza, {
        toValue:
          pizzaSize === PizzaSize.Small
            ? 1
            : pizzaSize === PizzaSize.Medium
            ? 1.2
            : 1.5,
        friction: 6,
        useNativeDriver: false,
      }),
      Animated.timing(rotateDish, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        rotateDish.setValue(0);
        rotatePizza.setValue(0);
      }
    });
  };

  const handlePriceText = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(translatePriceText, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityPriceText, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(translatePriceText, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityPriceText, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  //Initial presentation
  useEffect(() => {
    handleTranslateAndRotatePizza();
    handleTranslateAndRotateDish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update price text animation
  useEffect(() => {
    handlePriceText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPizzaPrice]);

  //update size when pizza size changes
  useEffect(() => {
    //prevent rotations from being canceled
    if (pizzaPriceSelectedSize != null) {
      handleSize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pizzaSize]);

  const pizzaAnimated: StyleProp<ImageStyle> = {
    transform: [
      { scale: sizePizza },
      {
        translateY: translatePizza.interpolate({
          inputRange: [0, 1],
          outputRange: [-pizzaSizeSmall, 0],
        }),
      },
      {
        rotate: rotateDish.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const dishAnimated: StyleProp<ImageStyle> = {
    transform: [
      { scale: sizeDish },
      {
        translateX: translateDish.interpolate({
          inputRange: [0, 1],
          outputRange: [-dishSizeSmall, 0],
        }),
      },
      {
        rotate: rotateDish.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const priceTextAnimated: StyleProp<TextStyle> = {
    transform: [
      {
        translateY: translatePriceText.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -2.2],
        }),
      },
    ],
    opacity: opacityPriceText,
  };
  return {
    //state
    pizzaAnimated,
    dishAnimated,
    priceTextAnimated,
    //methods
    //actions
  };
};
