import { ExtraIngredient, GlobalStore, GlobalStoreState } from '../types';
import { create } from 'zustand';
import { PizzaSize } from '../utils';

const INITIAL_STATE: GlobalStoreState = {
  pizzaPriceSelectedSize: null,
  extraIngredientsAdded: [],
  totalPizzaPrice: null,
  pizzaSize: PizzaSize.Small,
  counterOrders: 0,
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  ...INITIAL_STATE,

  calculatePriceByExtraIngredientsAndSize: () => {
    const { extraIngredientsAdded, pizzaPriceSelectedSize } = get();
    if (!pizzaPriceSelectedSize) return;

    const extraIngredientsPrice = extraIngredientsAdded.reduce(
      (total, ingredient) => total + ingredient.price,
      0,
    );

    const totalPrice = pizzaPriceSelectedSize + extraIngredientsPrice;
    set({ totalPizzaPrice: totalPrice });
  },

  getFirstDataPizza: (price: number) => {
    const { calculatePriceByExtraIngredientsAndSize } = get();
    set({ pizzaPriceSelectedSize: price });
    calculatePriceByExtraIngredientsAndSize();
  },

  setPizzaPriceSelectedSize: (price: number, size: PizzaSize) => {
    const { calculatePriceByExtraIngredientsAndSize, pizzaSize } = get();
    if (size === pizzaSize) return;
    set({ pizzaPriceSelectedSize: price, pizzaSize: size });
    calculatePriceByExtraIngredientsAndSize();
  },

  addExtraIngredient: (ingredient: ExtraIngredient) => {
    const { calculatePriceByExtraIngredientsAndSize } = get();
    set(state => ({
      extraIngredientsAdded: [...state.extraIngredientsAdded, ingredient],
    }));
    calculatePriceByExtraIngredientsAndSize();
  },

  removeExtraIngredient: (ingredient: ExtraIngredient) => {
    const { calculatePriceByExtraIngredientsAndSize } = get();
    set(state => ({
      extraIngredientsAdded: state.extraIngredientsAdded.filter(
        i => i.id !== ingredient.id,
      ),
    }));
    calculatePriceByExtraIngredientsAndSize();
  },

  addOrderToCounter: () =>
    set(state => ({ counterOrders: state.counterOrders + 1 })),

  setInitialState: () => set(INITIAL_STATE),
}));
