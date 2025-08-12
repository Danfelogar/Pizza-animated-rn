import { Animated, ImageSourcePropType, StyleSheet } from 'react-native';
import { ExtraIngredientPerUnit } from '../types';
import { widthFullScreen } from '../utils';

export const IngredientPerUnit = (
  array: ExtraIngredientPerUnit[],
  imageSource: ImageSourcePropType,
) => {
  return array.map(item => (
    <Animated.Image
      key={item.id}
      source={imageSource}
      style={[
        styles.unitIngredients,
        item.staticStyle,
        {
          opacity: item.animationOpacityVal,
          transform: [
            {
              translateY: item.animationTranslateVal.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0], // dash from down
              }),
            },
          ],
        },
      ]}
    />
  ));
};

const styles = StyleSheet.create({
  unitIngredients: {
    position: 'absolute',
    objectFit: 'contain',
    width: widthFullScreen * 0.1,
    height: widthFullScreen * 0.1,
  },
});
