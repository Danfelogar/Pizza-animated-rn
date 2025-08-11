import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { colors, widthFullScreen } from '../utils';
import { ExtraIngredient } from '../types';
import { useGlobalStore } from '../store';
interface Props {
  ingredient: ExtraIngredient;
}
export const IngredientCard: FC<Props> = ({ ingredient }) => {
  const { addExtraIngredient, removeExtraIngredient, extraIngredientsAdded } =
    useGlobalStore();

  const checkIfIngredientIsAdded = () => {
    return extraIngredientsAdded.find(item => item.id === ingredient.id);
  };

  const addOrRemoveIngredient = () => {
    if (checkIfIngredientIsAdded()) {
      return removeExtraIngredient(ingredient);
    } else {
      return addExtraIngredient(ingredient);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={addOrRemoveIngredient}
      style={{
        ...styles.containerCircle,
        ...(checkIfIngredientIsAdded() && {
          borderWidth: 3,
          borderColor: colors.secondary,
        }),
      }}
    >
      <Image source={ingredient.ingredientImage} style={styles.img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCircle: {
    width: widthFullScreen * 0.18,
    height: widthFullScreen * 0.18,
    borderRadius: widthFullScreen * 0.36,
    marginHorizontal: 4,
    backgroundColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: widthFullScreen * 0.15,
    height: widthFullScreen * 0.15,
    objectFit: 'contain',
  },
});
