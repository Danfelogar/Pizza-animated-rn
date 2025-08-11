import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pizza } from '../types';
import { colors, getPriceEnUsd, PizzaSize, widthFullScreen } from '../utils';
import { useBenchOfPizza } from '../hooks';

interface Props {
  pizza: Pizza;
}

export const BenchOfPizza: FC<Props> = ({ pizza }) => {
  const {
    container,
    pizzaContainer,
    imgDish,
    imgPizza,
    priceText,
    sizeContainer,
    btnCircle,
    textBtnCircle,
    shadowCircleBtn,
  } = styles;
  const {
    //state
    pizzaSize,
    totalPizzaPrice,
    //methods
    //actions
    setPizzaPriceSelectedSize,
  } = useBenchOfPizza({ pizza });

  return (
    <View style={container}>
      <View style={pizzaContainer}>
        <Image source={require('../assets/dish.png')} style={imgDish} />
        <Image source={pizza.imageUrl} style={imgPizza} />
      </View>
      <Text style={priceText}>{getPriceEnUsd(totalPizzaPrice ?? 0)}</Text>
      <View style={sizeContainer}>
        <TouchableOpacity
          onPress={() =>
            setPizzaPriceSelectedSize(pizza.priceSmall, PizzaSize.Small)
          }
          style={{
            ...btnCircle,
            ...(pizzaSize === PizzaSize.Small && shadowCircleBtn),
          }}
          activeOpacity={0.8}
        >
          <Text style={textBtnCircle}>S</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setPizzaPriceSelectedSize(pizza.priceMedium, PizzaSize.Medium)
          }
          style={{
            ...btnCircle,
            ...(pizzaSize === PizzaSize.Medium && shadowCircleBtn),
          }}
          activeOpacity={0.8}
        >
          <Text style={textBtnCircle}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setPizzaPriceSelectedSize(pizza.priceLarge, PizzaSize.Large)
          }
          style={{
            ...btnCircle,
            ...(pizzaSize === PizzaSize.Large && shadowCircleBtn),
          }}
          activeOpacity={0.8}
        >
          <Text style={textBtnCircle}>L</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  pizzaContainer: {
    position: 'relative',
    width: widthFullScreen * 0.8,
    height: widthFullScreen * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgDish: {
    objectFit: 'contain',
    position: 'relative',
    //small
    width: widthFullScreen * 0.56,
    height: widthFullScreen * 0.56,
    //medium
    // width: widthFullScreen * 0.66,
    // height: widthFullScreen * 0.66,
    //large
    // width: widthFullScreen * 0.8,
    // height: widthFullScreen * 0.8,
  },
  imgPizza: {
    //small
    width: widthFullScreen * 0.48,
    height: widthFullScreen * 0.48,
    //medium
    // width: widthFullScreen * 0.58,
    // height: widthFullScreen * 0.58,
    //large
    // width: widthFullScreen * 0.72,
    // height: widthFullScreen * 0.72,
    position: 'absolute',
    objectFit: 'contain',
  },
  priceText: {
    marginTop: 16,
    marginBottom: 12,
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 24,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    minWidth: widthFullScreen * 0.45,
  },
  btnCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnCircle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shadowCircleBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
