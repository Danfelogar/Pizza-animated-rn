import { useEffect } from 'react';
import { useGlobalStore } from '../store';
import { Pizza } from '../types';

interface Props {
  pizza: Pizza;
}

export const useBenchOfPizza = ({ pizza }: Props) => {
  const {
    pizzaSize,
    totalPizzaPrice,
    getFirstDataPizza,
    setPizzaPriceSelectedSize,
  } = useGlobalStore();

  useEffect(() => {
    getFirstDataPizza(pizza.priceSmall);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    //state
    pizzaSize,
    totalPizzaPrice,
    //methods
    //actions
    setPizzaPriceSelectedSize,
  };
};
