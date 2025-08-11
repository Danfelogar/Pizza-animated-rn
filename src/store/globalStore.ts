import { ExtraIngredient, GlobalStore, GlobalStoreState } from '../types';
import { create } from 'zustand';
import { getPizzaById, PizzaSize } from '../utils';

const INITIAL_STATE: GlobalStoreState = {
  pizzaPriceSelectedSize: null,
  extraIngredientsAdded: [],
  totalPizzaPrice: null,
  pizzaSize: PizzaSize.Small,
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  ...INITIAL_STATE,
  getFirstDataPizza: (id: number) => {
    const { calculatePriceByExtraIngredientsAndSize } = get();
    const pizza = getPizzaById(id);
    set({ pizzaPriceSelectedSize: pizza?.priceSmall });
    calculatePriceByExtraIngredientsAndSize();
  },
  setPizzaPriceSelectedSize: (price: number, size: PizzaSize) => {
    const { calculatePriceByExtraIngredientsAndSize } = get();
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
  setInitialState: () => set(INITIAL_STATE),
}));
