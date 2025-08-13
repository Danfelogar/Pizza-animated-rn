import { FC } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Pizza } from '../types';
import { colors, getPriceEnUsd, widthFullScreen } from '../utils';
import { useBenchOfPizza, useBenchOfPizzaAnimation } from '../hooks';
import { IngredientPerUnit } from './IngredientPerUnit';

interface Props {
  pizza: Pizza;
}

export const BenchOfPizza: FC<Props> = ({ pizza }) => {
  const {
    container,
    pizzaContainer,
    imgBoxTop,
    imgBoxBottom,
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
    sizeOptionList,
    //methods
    //actions
  } = useBenchOfPizza({ pizza });
  const {
    //state
    pizzaAnimated,
    dishAnimated,
    priceTextAnimated,
    potatoes,
    chilies,
    mushrooms,
    olives,
    onions,
    peas,
    pickles,
    boxTopAnimated,
    boxBottomAnimated,
    //methods
    //actions
  } = useBenchOfPizzaAnimation({ pizza });

  return (
    <View style={container}>
      <View style={pizzaContainer}>
        <Animated.Image
          source={require('../assets/box_front.png')}
          style={[imgBoxTop, boxTopAnimated]}
        />
        <Animated.Image
          source={require('../assets/box_inside.png')}
          style={[imgBoxBottom, boxBottomAnimated]}
        />
        <Animated.Image
          source={require('../assets/dish.png')}
          style={[imgDish, dishAnimated]}
        />
        <Animated.Image
          source={pizza.imageUrl}
          style={[imgPizza, pizzaAnimated]}
        />
        {/* potatoes */}
        {IngredientPerUnit(potatoes, require('../assets/potato_unit.png'))}
        {/* chilies */}
        {IngredientPerUnit(chilies, require('../assets/chili_unit.png'))}
        {/* mushrooms */}
        {IngredientPerUnit(mushrooms, require('../assets/mushroom_unit.png'))}
        {/* olives */}
        {IngredientPerUnit(olives, require('../assets/olive_unit.png'))}
        {/* onions */}
        {IngredientPerUnit(onions, require('../assets/onion.png'))}
        {/* peas */}
        {IngredientPerUnit(peas, require('../assets/pea_unit.png'))}
        {/* pickles */}
        {IngredientPerUnit(pickles, require('../assets/pickle_unit.png'))}
      </View>
      <Animated.Text style={[priceText, priceTextAnimated]}>
        {getPriceEnUsd(totalPizzaPrice ?? 0)}
      </Animated.Text>
      <View style={sizeContainer}>
        {sizeOptionList.map(sizeOption => (
          <TouchableOpacity
            key={sizeOption.id}
            onPress={sizeOption.action}
            style={{
              ...btnCircle,
              ...(pizzaSize === sizeOption.type && shadowCircleBtn),
            }}
            activeOpacity={0.8}
          >
            <Text style={textBtnCircle}>{sizeOption.text}</Text>
          </TouchableOpacity>
        ))}
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
  imgBoxTop: {
    width: widthFullScreen * 0.45,
    height: widthFullScreen * 0.45,
    position: 'absolute',
    objectFit: 'fill',
    // top: 77,
    // top: 0,
    zIndex: 1,
  },
  imgBoxBottom: {
    width: widthFullScreen * 0.45,
    height: widthFullScreen * 0.45,
    position: 'absolute',
    objectFit: 'fill',
    // bottom: 77,
    // bottom: 0,
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
