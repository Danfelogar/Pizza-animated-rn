import { useEffect, useMemo, useRef } from 'react';
import { Animated, ImageStyle, StyleProp, TextStyle } from 'react-native';
import { useGlobalStore } from '../store';
import {
  createAnimation,
  createIngredient,
  heightFullScreen,
  PizzaSize,
  widthFullScreen,
} from '../utils';
import { ExtraIngredientPerUnit, Pizza } from '../types';

interface Props {
  pizza: Pizza;
}

export const useBenchOfPizzaAnimation = ({ pizza }: Props) => {
  const pizzaSizeSmall = heightFullScreen * 0.49;
  const dishSizeSmall = widthFullScreen * 0.56;

  const sizeDish = useRef(new Animated.Value(1)).current;
  const translateDish = useRef(new Animated.Value(0)).current;
  const rotateDish = useRef(new Animated.Value(0)).current;
  const opacityDish = useRef(new Animated.Value(1)).current;
  const sizePizza = useRef(new Animated.Value(1)).current;
  const translatePizza = useRef(new Animated.Value(0)).current;
  const rotatePizza = useRef(new Animated.Value(0)).current;
  const opacityPizza = useRef(new Animated.Value(1)).current;
  const translatePriceText = useRef(new Animated.Value(0)).current;
  const opacityPriceText = useRef(new Animated.Value(1)).current;

  const opacityBoxTop = useRef(new Animated.Value(0)).current;
  const rotateBoxTop = useRef(new Animated.Value(0)).current;
  const sizeBoxTop = useRef(new Animated.Value(1)).current;
  const translateBoxTop = useRef(new Animated.Value(0)).current;
  const translateSecondFaseBoxTop = useRef(new Animated.Value(0)).current;
  const translateThirdFaseBoxTop = useRef(new Animated.Value(0)).current;
  const opacityBoxBottom = useRef(new Animated.Value(0)).current;
  const translateBoxBottom = useRef(new Animated.Value(0)).current;

  const {
    pizzaSize,
    transitionOrder,
    totalPizzaPrice,
    pizzaPriceSelectedSize,
    extraIngredientsAdded,
    addOrderToCounter,
    getFirstDataPizza,
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

  const handleTranslateAndRotateDish = (callback?: () => void) => {
    createAnimation
      .translateAndRotate(translateDish, rotateDish)
      .start(({ finished }) => {
        if (finished) {
          rotateDish.setValue(0);
          callback?.();
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

  const animateIngredients = (
    ingredientType: string,
    isAdding: boolean,
    timing?: number,
  ) => {
    const ingredientsArray = getIngredientsArray(ingredientType);

    ingredientsArray.forEach((ingredient, index) => {
      createAnimation
        .ingredient(
          ingredient.animationOpacityVal,
          ingredient.animationTranslateVal,
          index,
          isAdding,
          timing,
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
    //clean ingredients when finish the order
    if (transitionOrder) {
      prevIngredients.current = [];
      extraIngredientsAdded.forEach(ingredient =>
        animateIngredients(ingredient.name, false, 20),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraIngredientsAdded, transitionOrder]);

  //active listening if order done
  useEffect(() => {
    if (transitionOrder) {
      Animated.parallel([
        createAnimation.hiddenAndReduceSize(
          sizeDish,
          opacityDish,
          PizzaSize.SendPizza,
        ),
        createAnimation.hiddenAndReduceSize(
          sizePizza,
          opacityPizza,
          PizzaSize.SendPizza,
        ),
        createAnimation.wrapperPizza(
          opacityBoxTop,
          translateBoxTop,
          opacityBoxBottom,
          translateBoxBottom,
        ),
      ]).start(({ finished }) => {
        if (finished) {
          createAnimation
            .sendPizza(
              sizeBoxTop,
              translateSecondFaseBoxTop,
              translateThirdFaseBoxTop,
              opacityBoxTop,
              rotateBoxTop,
              opacityBoxBottom,
            )
            .start(({ finished: finishSon }) => {
              if (finishSon) {
                addOrderToCounter();
                //resetAll animated Values
                sizeDish.setValue(1);
                translateDish.setValue(0);
                rotateDish.setValue(0);
                opacityDish.setValue(1);
                sizePizza.setValue(1);
                translatePizza.setValue(0);
                rotatePizza.setValue(0);
                opacityPizza.setValue(1);
                translatePriceText.setValue(0);
                opacityPriceText.setValue(1);
                opacityBoxTop.setValue(0);
                rotateBoxTop.setValue(0);
                sizeBoxTop.setValue(1);
                translateBoxTop.setValue(0);
                translateSecondFaseBoxTop.setValue(0);
                translateThirdFaseBoxTop.setValue(0);
                opacityBoxBottom.setValue(0);
                translateBoxBottom.setValue(0);
                handleTranslateAndRotatePizza();
                handleTranslateAndRotateDish(() =>
                  getFirstDataPizza(pizza.priceSmall),
                );
              }
            });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionOrder]);

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
    opacity: opacityPizza,
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
    opacity: opacityDish,
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

  const boxTopAnimated: StyleProp<ImageStyle> = {
    opacity: opacityBoxTop,
    transform: [
      { scale: sizeBoxTop },
      {
        translateY: translateBoxTop.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [-90, -89.7, -88.74],
        }),
      },
      {
        translateX: translateThirdFaseBoxTop.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 660],
        }),
      },
      {
        translateY: translateSecondFaseBoxTop.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -820],
        }),
      },
      {
        rotate: rotateBoxTop.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '30deg'],
        }),
      },
    ],
  };

  const boxBottomAnimated: StyleProp<ImageStyle> = {
    opacity: opacityBoxBottom,
    transform: [
      {
        translateY: translateBoxBottom.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [90, 90.2, 90.2],
        }),
      },
    ],
  };

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
    boxTopAnimated,
    boxBottomAnimated,
    //methods
    //actions
    animateIngredients,
  };
};
