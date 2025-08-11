import { createStackNavigator } from '@react-navigation/stack';
import { RootStackMainParams } from '../types';
import { View } from 'react-native';
import { PizzaList } from './PizzaList';
import { PizzaDetails } from './PizzaDetails';

const Stack = createStackNavigator<RootStackMainParams>();

export const NavigationRoot = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="PizzaList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PizzaList" component={PizzaList} />
        <Stack.Screen name="PizzaDetails" component={PizzaDetails} />
      </Stack.Navigator>
    </View>
  );
};
