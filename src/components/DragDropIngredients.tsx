import { FlatList, StyleSheet, Text, View } from 'react-native';
import { extraIngredients, heightFullScreen } from '../utils';
import { useId } from 'react';
import { IngredientCard } from './IngredientCard';
import { useGlobalStore } from '../store';

export const DragDropIngredients = () => {
  const { container, flatListIngredients, subTitleText } = styles;
  const flatListId = useId();
  const { extraIngredientsAdded } = useGlobalStore();

  return (
    <View style={container}>
      <Text
        style={subTitleText}
      >{`Ingredients added so far: ${extraIngredientsAdded.length}`}</Text>
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        style={flatListIngredients}
        data={extraIngredients}
        renderItem={({ item }) => {
          return <IngredientCard key={item.id.toString()} ingredient={item} />;
        }}
        horizontal
        key={flatListId}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  flatListIngredients: {
    width: '100%',
    paddingTop: heightFullScreen * 0.02,
    paddingBottom: heightFullScreen * 0.06,
  },
});
