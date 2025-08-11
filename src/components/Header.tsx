import { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Feather } from '@react-native-vector-icons/feather';

import { colors, heightFullScreen } from '../utils';
import { useGlobalStore } from '../store';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  isGoBack?: boolean;
}

export const Header: FC<Props> = ({ title, isGoBack }) => {
  const {
    container,
    titleBox,
    titleText,
    cartBox,
    circleCounter,
    textCounter,
  } = styles;

  const { counterOrders, setInitialState } = useGlobalStore();
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.goBack();
    setInitialState();
  }, [navigation, setInitialState]);

  return (
    <View style={container}>
      <View style={titleBox}>
        {isGoBack && (
          <Ionicons
            onPress={goBack}
            name="chevron-back"
            size={heightFullScreen * 0.03}
            color={colors.secondary}
          />
        )}
        <Text style={titleText}>{title}</Text>
      </View>
      <View style={cartBox}>
        <Feather
          name="shopping-cart"
          size={heightFullScreen * 0.03}
          color={colors.secondary}
        />
        {/* use display none do that ios crashing when do an action */}
        {counterOrders > 0 && (
          <View style={circleCounter}>
            <Text style={textCounter}>{counterOrders}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.secondBackground,
    paddingHorizontal: heightFullScreen * 0.025,
    paddingTop: heightFullScreen * 0.03,
    paddingBottom: heightFullScreen * 0.02,
  },
  titleBox: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: heightFullScreen * 0.01,
    fontSize: heightFullScreen * 0.025,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  cartBox: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleCounter: {
    display: 'flex',
    position: 'absolute',
    right: -15,
    top: -20,
    zIndex: 10,
    backgroundColor: colors.tertiary,
    borderRadius: heightFullScreen * 0.015,
    width: heightFullScreen * 0.03,
    height: heightFullScreen * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCounter: {
    color: colors.background,
    fontSize: heightFullScreen * 0.015,
    fontWeight: '500',
  },
});
