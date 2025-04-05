import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {myTheme} from '../../../theme';

import {GestureHandlerRootView} from 'react-native-gesture-handler/';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  return (
    <Reanimated.View
      style={[
        styleAnimation,
        {width: 50, backgroundColor: myTheme.cardSelectedBg},
      ]}>
      <View
        style={{
          // backgroundColor: 'yellow',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>Soon!!</Text>
      </View>
    </Reanimated.View>
  );
}

const Chat = () => {
  const legacyRef = useRef<SwipeableMethods>(null);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <View
          style={{
            backgroundColor: myTheme.cardBg,
          }}>
          <Swipeable
            overshootRight={false}
            ref={legacyRef}
            renderRightActions={RightAction}
            friction={1}
            containerStyle={{
              width: '100%',
            }}>
            <View
              style={{
                padding: 20,
              }}>
              <Text>Swipe me left</Text>
            </View>
          </Swipeable>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.main,
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
});
