import { useEffect, useRef } from 'react';
import { Animated, ImageStyle, StyleProp, TextStyle } from 'react-native';
import { useGlobalStore } from '../store';
import {
  heightFullScreen,
  PizzaSize,
  sizeMultiplier,
  widthFullScreen,
} from '../utils';
import { ExtraIngredientPerUnit } from '../types';

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

  const {
    pizzaSize,
    totalPizzaPrice,
    pizzaPriceSelectedSize,
    extraIngredientsAdded,
  } = useGlobalStore();
  const prevIngredients = useRef(extraIngredientsAdded);

  const potatoes: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.22 *
          sizeMultiplier(widthFullScreen * 0.22, pizzaSize),
        left:
          widthFullScreen *
          0.18 *
          sizeMultiplier(widthFullScreen * 0.18, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
        left:
          widthFullScreen *
          0.48 *
          sizeMultiplier(widthFullScreen * 0.48, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.32 *
          sizeMultiplier(widthFullScreen * 0.32, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const chilies: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
        left:
          widthFullScreen *
          0.21 *
          sizeMultiplier(widthFullScreen * 0.21, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.47 *
          sizeMultiplier(widthFullScreen * 0.47, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.35 *
          sizeMultiplier(widthFullScreen * 0.35, pizzaSize),
        left:
          widthFullScreen *
          0.35 *
          sizeMultiplier(widthFullScreen * 0.35, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.28 *
          sizeMultiplier(widthFullScreen * 0.28, pizzaSize),
        left:
          widthFullScreen *
          0.52 *
          sizeMultiplier(widthFullScreen * 0.52, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const mushrooms: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.41 *
          sizeMultiplier(widthFullScreen * 0.41, pizzaSize),
        left:
          widthFullScreen *
          0.22 *
          sizeMultiplier(widthFullScreen * 0.22, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.27 *
          sizeMultiplier(widthFullScreen * 0.27, pizzaSize),
        left:
          widthFullScreen *
          0.33 *
          sizeMultiplier(widthFullScreen * 0.33, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
        left:
          widthFullScreen *
          0.49 *
          sizeMultiplier(widthFullScreen * 0.49, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.21 *
          sizeMultiplier(widthFullScreen * 0.21, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const olives: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
        left:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.39 *
          sizeMultiplier(widthFullScreen * 0.39, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.32 *
          sizeMultiplier(widthFullScreen * 0.32, pizzaSize),
        left:
          widthFullScreen *
          0.15 *
          sizeMultiplier(widthFullScreen * 0.15, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const onions: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.35 *
          sizeMultiplier(widthFullScreen * 0.35, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
        left:
          widthFullScreen *
          0.52 *
          sizeMultiplier(widthFullScreen * 0.52, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.15 *
          sizeMultiplier(widthFullScreen * 0.15, pizzaSize),
        left:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.32 *
          sizeMultiplier(widthFullScreen * 0.32, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const peas: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
        left:
          widthFullScreen *
          0.15 *
          sizeMultiplier(widthFullScreen * 0.15, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.43 *
          sizeMultiplier(widthFullScreen * 0.43, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.32 *
          sizeMultiplier(widthFullScreen * 0.32, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
        left:
          widthFullScreen *
          0.35 *
          sizeMultiplier(widthFullScreen * 0.35, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

  const pickles: ExtraIngredientPerUnit[] = [
    {
      id: 1,
      staticStyle: {
        top:
          widthFullScreen *
          0.19 *
          sizeMultiplier(widthFullScreen * 0.19, pizzaSize),
        left:
          widthFullScreen *
          0.47 *
          sizeMultiplier(widthFullScreen * 0.47, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 2,
      staticStyle: {
        top:
          widthFullScreen *
          0.5 *
          sizeMultiplier(widthFullScreen * 0.5, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 3,
      staticStyle: {
        top:
          widthFullScreen *
          0.32 *
          sizeMultiplier(widthFullScreen * 0.32, pizzaSize),
        left:
          widthFullScreen *
          0.25 *
          sizeMultiplier(widthFullScreen * 0.25, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
    {
      id: 4,
      staticStyle: {
        top:
          widthFullScreen *
          0.45 *
          sizeMultiplier(widthFullScreen * 0.45, pizzaSize),
        left:
          widthFullScreen *
          0.48 *
          sizeMultiplier(widthFullScreen * 0.48, pizzaSize),
      },
      animationOpacityVal: useRef(new Animated.Value(0)).current,
      animationTranslateVal: useRef(new Animated.Value(0)).current,
    },
  ];

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

  const getIngredientsArray = (
    ingredientType: string,
  ): ExtraIngredientPerUnit[] => {
    switch (ingredientType) {
      case 'Potato':
        return potatoes;
      case 'Chili':
        return chilies;
      case 'Mushroom':
        return mushrooms;
      case 'Olive':
        return olives;
      case 'Onion':
        return onions;
      case 'Pea':
        return peas;
      case 'Pickle':
        return pickles;
      default:
        return [];
    }
  };

  const animateIngredientIn = (ingredientType: string) => {
    const ingredientsArray = getIngredientsArray(ingredientType);

    ingredientsArray.forEach((ingredient, index) => {
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.parallel([
          Animated.timing(ingredient.animationOpacityVal, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(ingredient.animationTranslateVal, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  };

  const animateIngredientOut = (ingredientType: string) => {
    const ingredientsArray = getIngredientsArray(ingredientType);

    ingredientsArray.forEach((ingredient, index) => {
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.parallel([
          Animated.timing(ingredient.animationOpacityVal, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(ingredient.animationTranslateVal, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
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

  //active listening when changing an ingredient on the pizza
  useEffect(() => {
    const added = extraIngredientsAdded.filter(
      x => !prevIngredients.current.includes(x),
    );
    const removed = prevIngredients.current.filter(
      x => !extraIngredientsAdded.includes(x),
    );

    // Animating ingredients added
    added.forEach(ingredient => {
      animateIngredientIn(ingredient.name);
    });

    // Animating ingredients removed
    removed.forEach(ingredient => {
      animateIngredientOut(ingredient.name);
    });

    prevIngredients.current = [...extraIngredientsAdded];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraIngredientsAdded]);

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
    potatoes,
    chilies,
    mushrooms,
    olives,
    onions,
    peas,
    pickles,
    //methods
    //actions
    animateIngredientIn,
    animateIngredientOut,
  };
};
