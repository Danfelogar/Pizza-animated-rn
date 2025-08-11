export const getPriceEnUsd = (price: number): string => {
  return `$${price.toFixed(2)} USD`;
};
