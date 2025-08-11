import { useId } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { pizzas } from '../utils';
import { PizzaCard } from './PizzaCard';

export const FlatListPizzas = () => {
  const flatListId = useId();

  return (
    <FlatList
      contentContainerStyle={{ alignItems: 'center' }} // Center items horizontally
      style={styles.flatListWrapper}
      data={pizzas} // Data source for the list
      renderItem={({ item }) => {
        return <PizzaCard key={item.id.toString()} pizza={item} />;
      }}
      key={flatListId} // Unique key
      keyExtractor={item => item.id.toString()} // Key extractor for each item
      numColumns={1} // Single column layout
      showsVerticalScrollIndicator={false} // Hide scroll bar
      scrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  flatListWrapper: {
    width: '100%',
  },
});
