import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import Box from '../../components/atoms/Box';
import Typography from '../../components/atoms/Typography';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../store/passwordStore';
import {TPassword} from '../../types/passwords';
import {authenticateLocal} from '../../utils/authenticateLocal';
import SwipeContainer from '../../components/Molecules/SwipeContainer';
import Animated, {
  Easing,
  FadeIn,
  ZoomOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {PASSWORD_HEIGHT} from '../../constants';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
const RenderPassword = (password: TPassword) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);

  const opacityForNewItem = useSharedValue(1);

  const breath = useAnimatedStyle(() => ({
    opacity: opacityForNewItem.value,
  }));

  const {togglePasswordSelection, focusedId, setFocusedId} = usePasswordsStore(
    state => ({
      togglePasswordSelection: state.togglePasswordSelection,
      focusedId: state.focusedPassword,
      setFocusedId: state.setFocusedPassword,
    }),
  );
  const toast = useToast();
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);

  const {removeItem} = usePasswordsStore(state => ({
    removeItem: state.removePassword,
  }));

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {duration: 500}),
    };
  });
  const slidingStyle = useAnimatedStyle(() => {
    return {
      translateX: withSpring(translateX.value, {duration: 1000}),
    };
  });

  const togglePasswordVisibility = async () => {
    try {
      if (!showPassword) {
        const result = await authenticateLocal();
        if (result) {
          setShowPassword(true);
          opacity.value = 1;
          translateX.value = -20;
        }
      } else {
        setShowPassword(false);
        translateX.value = 0;
        opacity.value = 0;
      }
    } catch (e) {
      console.log({e});
    }
  };

  const handlePress = (_event: GestureResponderEvent) => {
    if (isSwiped) return;
    if (selectedPasswords.length >= 1) {
      togglePasswordSelection(password.id);
    }
  };

  const handleLongPress = (_event: GestureResponderEvent) => {
    if (isSwiped) return;

    if (selectedPasswords.length === 0) {
      togglePasswordSelection(password.id);
    }
  };

  const copyContent = async (whatToCopy: 'username' | 'password') => {
    Clipboard.setString(password[whatToCopy]);
    toast.show(`${whatToCopy} is copied.`, {duration: 1500});
  };

  useEffect(() => {
    if (focusedId === password.id) {
      opacityForNewItem.value = withRepeat(
        withTiming(0.5, {
          duration: 1000,
          easing: Easing.ease,
        }),
        2,
        true,
        () => {
          opacityForNewItem.value = 1;
          runOnJS(setFocusedId)('');
        },
      );
    }
    return () => {
      opacityForNewItem.value = 1;
    };
  }, [password.id, focusedId, opacityForNewItem, setFocusedId]);

  return (
    <Animated.View
      style={[styles.card, breath]}
      entering={FadeIn}
      exiting={ZoomOut}>
      <PressableWithFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={styles.cardContainer}>
        <SwipeContainer
          getSwipedValue={value => setIsSwiped(value)}
          onRightActionPress={() => removeItem(password.id)}>
          <Box
            style={[
              styles.cardContent,
              {
                backgroundColor: password.isSelected
                  ? myTheme.cardSelectedBg
                  : theme['bg-card'],
              },
            ]}>
            <View style={styles.webSiteBox}>
              <Typography style={styles.cardNumberText}>
                {password.website}
              </Typography>
            </View>
            <View style={styles.usernameBox}>
              <View style={styles.username}>
                <Typography style={styles.title}>User name</Typography>
                <Typography style={styles.cardText}>
                  {password.username}
                </Typography>
              </View>

              <PressableWithFeedback
                onPress={() => copyContent('username')}
                style={styles.Button}>
                <MaterialIcon
                  color={theme['bg-main']}
                  name="content-copy"
                  size={15}
                />
              </PressableWithFeedback>
            </View>
            <View style={styles.passwordBox}>
              <View>
                <Typography style={styles.title}>Password</Typography>
                <Typography style={styles.cardText}>
                  {showPassword ? password.password : '*********'}
                </Typography>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Animated.View style={slidingStyle}>
                  <PressableWithFeedback
                    onPress={() => togglePasswordVisibility()}
                    style={[styles.Button]}>
                    {showPassword ? (
                      <MaterialIcon
                        onPress={() => togglePasswordVisibility()}
                        color={theme['bg-main']}
                        name="eye-off-outline"
                        size={15}
                      />
                    ) : (
                      <MaterialIcon
                        onPress={() => togglePasswordVisibility()}
                        color={theme['bg-main']}
                        name="eye-outline"
                        size={15}
                      />
                    )}
                  </PressableWithFeedback>
                </Animated.View>
                {showPassword && (
                  <Animated.View style={animatedStyle}>
                    <PressableWithFeedback
                      onPress={() => copyContent('password')}
                      style={styles.Button}>
                      <MaterialIcon
                        onPress={() => copyContent('password')}
                        color={theme['bg-main']}
                        name="content-copy"
                        size={15}
                      />
                    </PressableWithFeedback>
                  </Animated.View>
                )}
              </View>
            </View>
          </Box>
        </SwipeContainer>
      </PressableWithFeedback>
    </Animated.View>
  );
};

const themedStyles = StyleService.create({
  card: {
    width: '100%',
    alignItems: 'center',
    height: PASSWORD_HEIGHT,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardContent: {
    width: '87%',
    borderRadius: 10,
    padding: 15,
    gap: 15,
    flexDirection: 'column',
  },
  webSiteBox: {
    paddingTop: 10,
    gap: 2,
  },
  usernameBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    flexDirection: 'column',
    gap: 2,
  },
  Button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: 'text-primary',
  },
  title: {
    color: 'text-secondary',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardNumberText: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  passwordBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RenderPassword;
