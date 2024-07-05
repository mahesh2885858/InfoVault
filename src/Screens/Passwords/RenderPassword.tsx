import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../Store/cardStore';
import {TCard} from '../../Types/Card.types';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import LightText from '../../components/atoms/LightText';
import * as LocalAuthentication from 'expo-local-authentication';
import {TPassword} from '../../Types/Passwords.type';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const RenderPassword = (password: TPassword) => {
  const [showPassword, setShowPassword] = useState(false);
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
        const t = await LocalAuthentication.authenticateAsync();
        if (t.success) {
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
    // if (selectedPasswords.length >= 1) {
    //   toggleCardSelection(password.cardNumber);
    // }
  };

  const handleLongPress = (_event: GestureResponderEvent) => {
    // if (selectedPasswords.length === 0) {
    //   toggleCardSelection(password.cardNumber);
    // }
  };
  console.log(":it's rendering");
  return (
    <Container style={styles.card}>
      <PressableWithFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={styles.cardContainer}>
        <Box
          style={[
            styles.cardContent,
            {
              backgroundColor: password.isSelected
                ? myTheme.cardSelectedBg
                : myTheme.cardBg,
            },
          ]}>
          <View style={styles.cardNameAndNumber}>
            <LightText style={styles.cardNumberText}>
              {password.website}
            </LightText>
          </View>
          <View style={styles.cardUsername}>
            <View style={styles.username}>
              <LightText style={styles.title}>User name</LightText>
              <LightText style={styles.cardText}>{password.username}</LightText>
            </View>

            <PressableWithFeedback
              onPress={() => togglePasswordVisibility()}
              style={styles.Button}>
              <MaterialIcon name="content-copy" size={15} />
            </PressableWithFeedback>
          </View>
          <View style={styles.passwordBox}>
            <View>
              <LightText style={styles.title}>Password</LightText>

              <LightText style={styles.cardText}>{'*********'}</LightText>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Animated.View style={slidingStyle}>
                <PressableWithFeedback
                  onPress={() => togglePasswordVisibility()}
                  style={[styles.Button]}>
                  {showPassword ? (
                    <MaterialIcon name="content-copy" size={15} />
                  ) : (
                    <MaterialIcon name="eye-outline" size={15} />
                  )}
                  {/* <MaterialIcon name="eye-off-outline" size={15} /> */}
                </PressableWithFeedback>
              </Animated.View>
              {showPassword && (
                <Animated.View style={animatedStyle}>
                  <PressableWithFeedback
                    onPress={() => togglePasswordVisibility()}
                    style={styles.Button}>
                    <MaterialIcon name="eye-off-outline" size={15} />
                  </PressableWithFeedback>
                </Animated.View>
              )}
            </View>
          </View>
        </Box>
      </PressableWithFeedback>
    </Container>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
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
  cardNameAndNumber: {
    paddingTop: 10,
    gap: 2,
  },
  cardUsername: {
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
    backgroundColor: '#bf03ab',
  },
  title: {
    color: myTheme.cardTitleText,
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
