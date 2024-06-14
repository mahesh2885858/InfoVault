import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {colors} from '../globals';
function Home(): React.JSX.Element {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={style.container}>
        <Text>Home</Text>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default Home;
