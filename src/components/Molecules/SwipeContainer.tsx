import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../PressableWithFeedback';
import { useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

type TProps = {
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
  getSwipedValue: (value: boolean) => void;
  ref?: React.RefObject<SwipeableMethods | null>;
};

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete: () => void,
  onEdit: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });
  const theme = useTheme();

  return (
    <Reanimated.View style={[styleAnimation, styles.rightPanel]}>
      <PressableWithFeedback
        onPress={() => onDelete()}
        style={[
          styles.deleteIcon,
          {
            backgroundColor: theme.colors.tertiary,
          },
        ]}
      >
        <MaterialIcon
          onPress={() => onDelete()}
          name="delete"
          size={30}
          color={theme.colors.onTertiary}
        />
      </PressableWithFeedback>
      <PressableWithFeedback
        onPress={() => onEdit()}
        style={[
          styles.deleteIcon,
          {
            backgroundColor: theme.colors.tertiary,
          },
        ]}
      >
        <MaterialIcon
          onPress={() => onEdit()}
          name="pencil"
          size={30}
          color={theme.colors.onTertiary}
        />
      </PressableWithFeedback>
    </Reanimated.View>
  );
}

const SwipeContainer = (props: TProps) => {
  const swipeRef = useRef<SwipeableMethods | null>(null);
  useFocusEffect(
    useCallback(() => {
      const swipe = swipeRef.current;
      return () => {
        swipe?.close();
      };
    }, []),
  );
  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={(prog, drag) =>
        RightAction(
          prog,
          drag,
          () => {
            props.onDelete();
            swipeRef.current?.close();
          },
          () => {
            props.onEdit();
            swipeRef.current?.close();
          },
        )
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
      containerStyle={[styles.cardContainer]}
    >
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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 2,
  },
  deleteIcon: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    width: 50,
  },
});
export default SwipeContainer;
