import { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import {
  BenchOfPizza,
  BtnLinearGradient,
  DragDropIngredients,
  Header,
  StandardWrapper,
} from '../components';
import { colors, getPizzaById, heightFullScreen } from '../utils';
import { RootStackMainParams } from '../types';

interface Props extends StackScreenProps<RootStackMainParams, 'PizzaDetails'> {}

export const PizzaDetails: FC<Props> = ({ route }) => {
  const {
    container,
    secondContainer,
    extraPropertiesLinearGradient,
    extraPropertiesBtn,
  } = styles;

  const { pizzaId } = route.params;
  const pizzaDetails = getPizzaById(pizzaId);
  return (
    <StandardWrapper>
      <Header title="New Order Pizza" isGoBack />
      <View style={container}>
        <View style={secondContainer}>
          <BenchOfPizza pizza={pizzaDetails!} />
          <DragDropIngredients />
          <BtnLinearGradient
            extraPropertiesLinearGradient={extraPropertiesLinearGradient}
            extraPropertiesBtn={extraPropertiesBtn}
            actionOnPress={() => {}}
          >
            <FontAwesome6
              iconStyle="solid"
              name="cart-shopping"
              size={heightFullScreen * 0.03}
              color={colors.background}
            />
          </BtnLinearGradient>
        </View>
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.secondBackground,
    padding: heightFullScreen * 0.025,
  },
  secondContainer: {
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 18,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  extraPropertiesLinearGradient: {
    position: 'absolute',
    bottom: -heightFullScreen * 0.025,
  },
  extraPropertiesBtn: {
    width: 54,
    height: 48,
  },
});
