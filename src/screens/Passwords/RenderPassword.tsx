import Clipboard from '@react-native-clipboard/clipboard';
import { getMaxText } from 'commonutil-core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { useTheme as usePaper } from 'react-native-paper';
import Animated, {
  Easing,
  FadeIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { runOnJS } from 'react-native-worklets';
import Box from '../../components/atoms/Box';
import Typography from '../../components/atoms/Typography';
import SwipeContainer from '../../components/Molecules/SwipeContainer';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import { usePasswordsStore } from '../../store/passwordStore';
import { useProfileStore } from '../../store/profileStore';
import { TPassword } from '../../types/passwords';
import AddPasswordModal from './AddPasswordModal';
import { useToastContext } from '../../context/ToastContext';
const RenderPassword = (password: TPassword) => {
  const theme = usePaper();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const [renderEditModal, setRenderEditModal] = useState(false);

  const opacityForNewItem = useSharedValue(1);

  const breath = useAnimatedStyle(() => ({
    opacity: opacityForNewItem.value,
  }));

  const togglePasswordSelection = usePasswordsStore(
    state => state.togglePasswordSelection,
  );
  const focusedId = usePasswordsStore(state => state.focusedPassword);
  const setFocusedId = usePasswordsStore(state => state.setFocusedPassword);
  const unpinPassword = usePasswordsStore(state => state.unPinPassword);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);

  const removeItem = usePasswordsStore(state => state.removePassword);
  const selectProfileForAddingANewRecord = useProfileStore(
    state => state.selectProfileForAddingANewRecord,
  );
  const { show: showToast } = useToastContext();

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 500 }),
    };
  });
  const slidingStyle = useAnimatedStyle(() => {
    return {
      translateX: withSpring(translateX.value, { duration: 1000 }),
    };
  });

  const togglePasswordVisibility = async () => {
    try {
      if (!showPassword) {
        setShowPassword(true);
        opacity.value = 1;
        translateX.value = -20;
      } else {
        setShowPassword(false);
        translateX.value = 0;
        opacity.value = 0;
      }
    } catch (e) {
      console.log({ e });
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
    showToast(t('common.copied'));
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
    <>
      <Animated.View
        style={[styles.card, breath]}
        entering={FadeIn}
        exiting={ZoomOut}
      >
        <PressableWithFeedback
          onLongPress={handleLongPress}
          onPress={handlePress}
          style={styles.cardContainer}
        >
          <SwipeContainer
            getSwipedValue={value => setIsSwiped(value)}
            onDelete={() => removeItem(password.id)}
            onEdit={() => {
              selectProfileForAddingANewRecord(password.profileId);
              setRenderEditModal(true);
            }}
          >
            <Box
              style={[
                styles.cardContent,
                {
                  backgroundColor: password.isSelected
                    ? theme.colors.surfaceDisabled
                    : theme.colors.surfaceVariant,
                },
              ]}
            >
              <View style={styles.webSiteBox}>
                <Typography
                  style={[
                    styles.cardNumberText,
                    {
                      color: theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {password.website}
                </Typography>
                {password.isPinned && (
                  <MaterialIcon
                    name="pin"
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                    onPress={() => {
                      unpinPassword(password.id);
                    }}
                  />
                )}
              </View>
              <View style={styles.usernameBox}>
                <View style={styles.username}>
                  <Typography
                    style={[
                      styles.title,
                      {
                        color: theme.colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    {t('passwords.username')}
                  </Typography>
                  <Typography
                    style={[
                      styles.cardText,
                      {
                        color: theme.colors.onSurface,
                      },
                    ]}
                  >
                    {getMaxText(password.username, 20)}
                  </Typography>
                </View>

                <PressableWithFeedback
                  onPress={() => copyContent('username')}
                  style={[
                    styles.Button,
                    {
                      backgroundColor: theme.colors.inverseSurface,
                    },
                  ]}
                >
                  <MaterialIcon
                    color={theme.colors.inverseOnSurface}
                    name="content-copy"
                    size={15}
                  />
                </PressableWithFeedback>
              </View>
              <View style={styles.passwordBox}>
                <View>
                  <Typography
                    style={[
                      styles.title,
                      {
                        color: theme.colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    {t('passwords.password')}
                  </Typography>
                  <Typography
                    style={[
                      styles.cardText,
                      {
                        color: theme.colors.onSurface,
                      },
                    ]}
                  >
                    {showPassword
                      ? getMaxText(password.password, 15)
                      : '*********'}
                  </Typography>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Animated.View style={slidingStyle}>
                    <PressableWithFeedback
                      onPress={() => togglePasswordVisibility()}
                      style={[
                        styles.Button,
                        {
                          backgroundColor: theme.colors.inverseSurface,
                        },
                      ]}
                    >
                      {showPassword ? (
                        <MaterialIcon
                          onPress={() => togglePasswordVisibility()}
                          color={theme.colors.inverseOnSurface}
                          name="eye-off-outline"
                          size={15}
                        />
                      ) : (
                        <MaterialIcon
                          onPress={() => togglePasswordVisibility()}
                          color={theme.colors.inverseOnSurface}
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
                        style={[
                          styles.Button,
                          {
                            backgroundColor: theme.colors.inverseSurface,
                          },
                        ]}
                      >
                        <MaterialIcon
                          onPress={() => copyContent('password')}
                          color={theme.colors.inverseOnSurface}
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
      {renderEditModal && (
        <AddPasswordModal
          passwordToEdit={password}
          setVisible={setRenderEditModal}
          visible={renderEditModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
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
    // paddingTop: 10,
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 14,
    fontWeight: '600',
  },
  cardNumberText: {
    fontSize: 15,
    fontWeight: '700',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '500',
  },
  passwordBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RenderPassword;
