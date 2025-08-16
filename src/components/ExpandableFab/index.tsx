import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../atoms/Typography';
import PressableWithFeedback from '../PressableWithFeedback';

interface ExpandableFabProps {
  onFirstAction: () => void;
  onSecondAction: () => void;

  firstLabel: string;
  secondLabel: string;
}

const ExpandableFab = ({
  onFirstAction,
  onSecondAction,
  firstLabel,
  secondLabel,
}: ExpandableFabProps) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const animatedValue = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;

    animatedValue.value = withTiming(toValue, {
      duration: 500,
    });

    rotateValue.value = withTiming(toValue, {
      duration: 200,
    });

    setIsExpanded(!isExpanded);
  };

  const handleFirstAction = () => {
    onFirstAction();
    toggleExpanded();
  };

  const handleSecondAction = () => {
    onSecondAction();
    toggleExpanded();
  };

  const mainFabAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotateValue.value, [0, 1], [0, 45]);

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const firstButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -80]);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const secondButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -140]);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View style={[styles.container, { bottom: bottom }]}>
      {/* Second Action Button */}
      <Animated.View style={[styles.subButton, secondButtonAnimatedStyle]}>
        <PressableWithFeedback
          onPress={handleSecondAction}
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.onSurface },
          ]}
        >
          <Typography
            style={[
              styles.buttonLabel,
              {
                color: theme.colors.surface,
              },
            ]}
          >
            {secondLabel}
          </Typography>
        </PressableWithFeedback>
      </Animated.View>

      {/* First Action Button */}
      <Animated.View style={[styles.subButton, firstButtonAnimatedStyle]}>
        <PressableWithFeedback
          onPress={handleFirstAction}
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.onSurface },
          ]}
        >
          <Typography
            style={[
              styles.buttonLabel,
              {
                color: theme.colors.surface,
              },
            ]}
          >
            {firstLabel}
          </Typography>
        </PressableWithFeedback>
      </Animated.View>

      {/* Main FAB */}
      <Animated.View style={[styles.mainFab, mainFabAnimatedStyle]}>
        <FAB
          mode="elevated"
          icon="plus"
          onPress={toggleExpanded}
          rippleColor={theme.colors.surface}
          style={{
            backgroundColor: theme.colors.onSurface,
          }}
          color={theme.colors.surface}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  mainFab: {
    zIndex: 3,
  },
  subButton: {
    position: 'absolute',
    zIndex: 2,
  },
  actionButton: {
    elevation: 4,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  buttonLabel: {
    fontSize: 15,
  },
});

export default ExpandableFab;
