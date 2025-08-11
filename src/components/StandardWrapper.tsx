import { JSX, ReactNode } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

export const StandardWrapper = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#0000' : '#FFFF',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={isDarkMode ? '#0000' : '#FFFF'}
        showHideTransition="slide"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};
