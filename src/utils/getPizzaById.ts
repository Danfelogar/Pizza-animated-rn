import { Pizza } from '../types';
import { pizzas } from './pizzas';

export const getPizzaById = (id: number): Pizza | undefined => {
  return pizzas.find(pizza => pizza.id === id);
};
