import { widthFullScreen } from './phoneDimensions';
import { PizzaSize } from './pizzaSize';
// top: widthFullScreen * 0.5,
// top: widthFullScreen * 0.19,
// left: widthFullScreen * 0.15,
// left: widthFullScreen * 0.57,
// topCenter and leftCenter: widthFullScreen * 0.35
export const sizeMultiplier = (originalNum: number, size: PizzaSize) => {
  //validation if near of Center that pizza
  const validationMultiplier: boolean = originalNum >= widthFullScreen * 0.35;
  switch (size) {
    case PizzaSize.Small:
      return 1;
    case PizzaSize.Medium:
      return validationMultiplier ? 1.1 : 0.9;
    case PizzaSize.Large:
      return validationMultiplier ? 1.2 : 0.8;
    default:
      return 1;
  }
};
