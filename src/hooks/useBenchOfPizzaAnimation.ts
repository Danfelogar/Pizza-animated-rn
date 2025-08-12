import { useEffect, useMemo, useRef } from 'react';
import { Animated, ImageStyle, StyleProp, TextStyle } from 'react-native';
import { useGlobalStore } from '../store';
import {
  createAnimation,
  createIngredient,
  heightFullScreen,
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

  const ingredientsRef = useRef<Record<string, ExtraIngredientPerUnit[]>>({});

  const prevIngredients = useRef(extraIngredientsAdded);

  const ingredients = useMemo(() => {
    const ingredientTypes = [
      'POTATOES',
      'CHILIES',
      'MUSHROOMS',
      'OLIVES',
      'ONIONS',
      'PEAS',
      'PICKLES',
    ];
    const newIngredients: Record<string, ExtraIngredientPerUnit[]> = {};

    ingredientTypes.forEach(type => {
      newIngredients[type] = createIngredient(
        type,
        pizzaSize,
        ingredientsRef.current?.[type],
      );
    });

    ingredientsRef.current = newIngredients;
    return newIngredients;
  }, [pizzaSize]);

  const handleTranslateAndRotatePizza = () => {
    createAnimation
      .translateAndRotate(translatePizza, rotatePizza)
      .start(({ finished }) => {
        if (finished) {
          rotatePizza.setValue(0);
        }
      });
  };

  const handleTranslateAndRotateDish = () => {
    createAnimation
      .translateAndRotate(translateDish, rotateDish)
      .start(({ finished }) => {
        if (finished) {
          rotateDish.setValue(0);
        }
      });
  };

  const handleSize = () => {
    //prevent rotations from being canceled
    if (pizzaPriceSelectedSize == null) return;

    Animated.parallel([
      createAnimation.sizeChange(sizeDish, rotateDish, pizzaSize),
      createAnimation.sizeChange(sizePizza, rotatePizza, pizzaSize),
    ]).start(({ finished }) => {
      if (finished) {
        rotateDish.setValue(0);
        rotatePizza.setValue(0);
      }
    });
  };

  const handlePriceText = () => {
    createAnimation.priceText(translatePriceText, opacityPriceText).start();
  };

  const getIngredientsArray = (
    ingredientType: string,
  ): ExtraIngredientPerUnit[] => {
    const ingredientsMap: Record<string, ExtraIngredientPerUnit[]> = {
      Potato: ingredients.POTATOES,
      Chili: ingredients.CHILIES,
      Mushroom: ingredients.MUSHROOMS,
      Olive: ingredients.OLIVES,
      Onion: ingredients.ONIONS,
      Pea: ingredients.PEAS,
      Pickle: ingredients.PICKLES,
    };

    return ingredientsMap[ingredientType] || [];
  };

  const animateIngredients = (ingredientType: string, isAdding: boolean) => {
    const ingredientsArray = getIngredientsArray(ingredientType);

    ingredientsArray.forEach((ingredient, index) => {
      createAnimation
        .ingredient(
          ingredient.animationOpacityVal,
          ingredient.animationTranslateVal,
          index,
          isAdding,
        )
        .start();
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
    handleSize();
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
    added.forEach(ingredient => animateIngredients(ingredient.name, true));

    // Animating ingredients removed
    removed.forEach(ingredient => animateIngredients(ingredient.name, false));

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
  console.log(
    ingredients.POTATOES[0].staticStyle,
    ingredients.POTATOES[0].animationOpacityVal,
  );
  return {
    //state
    pizzaAnimated,
    dishAnimated,
    priceTextAnimated,
    potatoes: ingredients.POTATOES,
    chilies: ingredients.CHILIES,
    mushrooms: ingredients.MUSHROOMS,
    olives: ingredients.OLIVES,
    onions: ingredients.ONIONS,
    peas: ingredients.PEAS,
    pickles: ingredients.PICKLES,
    //methods
    //actions
    animateIngredients,
  };
};
