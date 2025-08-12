import { Animated, ImageSourcePropType, StyleSheet } from 'react-native';
import { ExtraIngredientPerUnit } from '../types';
import { widthFullScreen } from '../utils';

export const IngredientPerUnit = (
  array: ExtraIngredientPerUnit[],
  imageSource: ImageSourcePropType,
) => {
  return array.map((item, index) => {
    let translateXRange = [0, 0];
    let translateYRange = [0, 0];
    //we divide by 4 to get the correct position
    switch (index % 4) {
      case 0: //item1 -> translate from left to right
        translateXRange = [-50, 0];
        break;
      case 1: //item2 -> translate from top to bottom
        translateYRange = [-50, 0];
        break;
      case 2: //item3 -> translate from right to left
        translateXRange = [50, 0];
        break;
      case 3: //item4 -> translate from bottom to top
        translateYRange = [50, 0];
        break;
    }
    const translateX = item.animationTranslateVal.interpolate({
      inputRange: [0, 1],
      outputRange: translateXRange,
    });

    const translateY = item.animationTranslateVal.interpolate({
      inputRange: [0, 1],
      outputRange: translateYRange,
    });
    return (
      <Animated.Image
        key={item.id}
        source={imageSource}
        style={[
          styles.unitIngredients,
          item.staticStyle,
          {
            opacity: item.animationOpacityVal,
            transform: [{ translateX }, { translateY }],
          },
        ]}
      />
    );
  });
};

const styles = StyleSheet.create({
  unitIngredients: {
    position: 'absolute',
    objectFit: 'contain',
    width: widthFullScreen * 0.1,
    height: widthFullScreen * 0.1,
  },
});
