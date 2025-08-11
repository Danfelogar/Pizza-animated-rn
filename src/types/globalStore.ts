import { PizzaSize } from '../utils';
import { ExtraIngredient } from './extraIngredient';

export interface GlobalStore {
  //state
  pizzaPriceSelectedSize: number | null;
  pizzaSize: PizzaSize;
  extraIngredientsAdded: ExtraIngredient[];
  totalPizzaPrice: number | null;
  counterOrders: number;
  //action
  getFirstDataPizza: (id: number) => void;
  setPizzaPriceSelectedSize: (price: number, size: PizzaSize) => void;
  calculatePriceByExtraIngredientsAndSize: () => void;
  addExtraIngredient: (ingredient: ExtraIngredient) => void;
  removeExtraIngredient: (ingredient: ExtraIngredient) => void;
  setInitialState: () => void;
  addOrderToCounter: () => void;
}

export interface GlobalStoreState
  extends Omit<
    GlobalStore,
    | 'getFirstDataPizza'
    | 'setPizzaPriceSelectedSize'
    | 'addExtraIngredient'
    | 'removeExtraIngredient'
    | 'setInitialState'
    | 'calculatePriceByExtraIngredientsAndSize'
    | 'addOrderToCounter'
  > {}
