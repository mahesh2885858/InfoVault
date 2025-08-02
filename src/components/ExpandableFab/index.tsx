import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface ExpandableFabProps {
  onFirstAction: () => void;
  onSecondAction: () => void;
  firstIcon?: string;
  secondIcon?: string;
  firstLabel?: string;
  secondLabel?: string;
}

const ExpandableFab = ({
  onFirstAction,
  onSecondAction,
  firstIcon = 'note-plus',
  secondIcon = 'folder-plus',
}: ExpandableFabProps) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const animatedValue = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;

    animatedValue.value = withSpring(toValue, {
      damping: 15,
      stiffness: 150,
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
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -70]);
    const translateX = interpolate(animatedValue.value, [0, 1], [0, -70]);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1]);

    return {
      transform: [{ translateY }, { translateX }],
      opacity,
    };
  });

  const secondButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -70]);
    const translateX = interpolate(animatedValue.value, [0, 1], [0, +70]);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1]);

    return {
      transform: [{ translateY }, { translateX }],
      opacity,
    };
  });

  return (
    <View style={[styles.container, { bottom: bottom }]}>
      {/* Second Action Button */}
      <Animated.View style={[styles.subButton, secondButtonAnimatedStyle]}>
        <FAB
          mode="elevated"
          icon={secondIcon}
          onPress={handleSecondAction}
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        />
      </Animated.View>

      {/* First Action Button */}
      <Animated.View style={[styles.subButton, firstButtonAnimatedStyle]}>
        <FAB
          mode="elevated"
          icon={firstIcon}
          onPress={handleFirstAction}
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        />
      </Animated.View>

      {/* Main FAB */}
      <Animated.View style={[styles.mainFab, mainFabAnimatedStyle]}>
        <FAB
          mode="elevated"
          icon="plus"
          onPress={toggleExpanded}
          rippleColor={theme.colors.onSurface}
          style={{
            backgroundColor: theme.colors.tertiaryContainer,
          }}
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
  },
});

export default ExpandableFab;
