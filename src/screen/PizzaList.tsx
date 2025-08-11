import { StyleSheet, View } from 'react-native';
import { FlatListPizzas, Header, StandardWrapper } from '../components';
import { colors, heightFullScreen } from '../utils';

export const PizzaList = () => {
  return (
    <StandardWrapper>
      <Header title="Select your favorite flavor" />
      <View style={styles.container}>
        <FlatListPizzas />
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: heightFullScreen * 0.025,
    backgroundColor: colors.secondBackground,
  },
});
