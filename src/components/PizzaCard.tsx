import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Pizza, RootStackMainParams } from '../types';
import { colors, getPriceEnUsd, heightFullScreen } from '../utils';
import BtnLinearGradient from './BtnLinearGradient';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useGlobalStore } from '../store/globalStore';

type NavigationProp = StackScreenProps<RootStackMainParams, 'PizzaDetails'>;

interface Props {
  pizza: Pizza;
}

export const PizzaCard: FC<Props> = ({ pizza }) => {
  const {
    content,
    imageCard,
    textBox,
    titleText,
    descriptionText,
    priceText,
    textBtn,
  } = styles;
  const { setInitialState } = useGlobalStore();
  const navigation = useNavigation<NavigationProp['navigation']>();

  const goPizzaDetail = () => {
    setInitialState();
    navigation.navigate('PizzaDetails', { pizzaId: pizza.id });
  };

  return (
    <View style={content}>
      <Image resizeMethod="none" source={pizza.imageUrl} style={imageCard} />
      <View style={textBox}>
        <Text style={titleText}>{pizza.name}</Text>
        <Text style={descriptionText}>{pizza.description}</Text>
        <View style={{ flex: 1 }} />
        <Text style={priceText}>{getPriceEnUsd(pizza.price)}</Text>
      </View>
      <BtnLinearGradient actionOnPress={goPizzaDetail}>
        <Text style={textBtn}>Add</Text>
      </BtnLinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.background,
    height: heightFullScreen * 0.13,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: colors.tertiary,
    marginBottom: heightFullScreen * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageCard: {
    width: heightFullScreen * 0.1,
    height: heightFullScreen * 0.1,
    borderRadius: 10,
  },
  textBox: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.secondary,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.tertiary,
  },

  textBtn: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
