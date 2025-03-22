import React from 'react';
import {StyleSheet, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../PressableWithFeedback';

type TProps = {
  children: React.ReactNode;
  onRightActionPress: () => void;
  getSwipedValue: (value: boolean) => void;
};

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onRightActionPress: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.rightPanel]}>
      <PressableWithFeedback
        onPress={() => onRightActionPress()}
        style={styles.deleteIcon}>
        <MaterialIcon
          onPress={() => onRightActionPress()}
          name="delete"
          size={30}
          color={'#FFAAAA'}
        />
      </PressableWithFeedback>
    </Reanimated.View>
  );
}

const SwipeContainer = (props: TProps) => {
  return (
    <Swipeable
      renderRightActions={(prog, drag) =>
        RightAction(prog, drag, props.onRightActionPress)
      }
      onSwipeableOpen={() => {
        props.getSwipedValue(true);
      }}
      onSwipeableClose={() => {
        props.getSwipedValue(false);
      }}
      friction={2}
      overshootRight={false}
      childrenContainerStyle={styles.swipeableChild}
      containerStyle={[styles.cardContainer]}>
      {props.children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },

  swipeableChild: {
    alignItems: 'center',
  },
  rightPanel: {
    width: 50,
    backgroundColor: '#AA3939',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default SwipeContainer;
