import { useEffect } from 'react';
import { useGlobalStore } from '../store';
import { Pizza } from '../types';
import { PizzaSize } from '../utils';

interface Props {
  pizza: Pizza;
}

export const useBenchOfPizza = ({ pizza }: Props) => {
  const {
    pizzaSize,
    totalPizzaPrice,
    extraIngredientsAdded,
    getFirstDataPizza,
    setPizzaPriceSelectedSize,
  } = useGlobalStore();

  const sizeOptionList = [
    {
      id: 1,
      text: 'S',
      action: () =>
        setPizzaPriceSelectedSize(pizza.priceSmall, PizzaSize.Small),
      type: PizzaSize.Small,
    },
    {
      id: 2,
      text: 'M',
      action: () =>
        setPizzaPriceSelectedSize(pizza.priceMedium, PizzaSize.Medium),
      type: PizzaSize.Medium,
    },
    {
      id: 3,
      text: 'L',
      action: () =>
        setPizzaPriceSelectedSize(pizza.priceLarge, PizzaSize.Large),
      type: PizzaSize.Large,
    },
  ];

  useEffect(() => {
    getFirstDataPizza(pizza.priceSmall);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    //state
    pizzaSize,
    totalPizzaPrice,
    sizeOptionList,
    extraIngredientsAdded,
    //methods
    //actions
    setPizzaPriceSelectedSize,
  };
};
