import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils';
import { FC, ReactNode } from 'react';

interface Props {
  actionOnPress: () => void;
  children: ReactNode;
  extraPropertiesBtn?: StyleProp<ViewStyle>;
  extraPropertiesLinearGradient?: StyleProp<ViewStyle>;
}

export const BtnLinearGradient: FC<Props> = ({
  actionOnPress,
  children,
  extraPropertiesBtn,
  extraPropertiesLinearGradient,
}) => {
  const { linearBackgroundStyle, btn } = styles;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={colors.gradientPrimary}
      style={[linearBackgroundStyle, extraPropertiesLinearGradient]}
    >
      <TouchableOpacity
        style={[btn, extraPropertiesBtn]}
        activeOpacity={0.82}
        onPress={actionOnPress}
      >
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default BtnLinearGradient;

const styles = StyleSheet.create({
  linearBackgroundStyle: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    borderRadius: 5,
    width: 60,
    height: 40,
  },
});
