import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

import {useToast} from 'react-native-toast-notifications';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Box from '../../components/atoms/Box';
import LightText from '../../components/atoms/LightText';
import {useCardStore} from '../../store/cardStore';
import {TCard} from '../../types/card';
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
} from 'react-native-reanimated';
import {CARD_HEIGHT} from '../../constants';

const RenderCard = (card: TCard) => {
  const opacity = useSharedValue(1);

  const breath = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const {selectedCards, toggleCardSelection, focusedId, setFocusedCard} =
    useCardStore(state => ({
      toggleCardSelection: state.toggleCardSelection,
      selectedCards: state.selectedCards,
      deSelectAll: state.deSelectAll,
      focusedId: state.focusedCard,
      setFocusedCard: state.setFocusedCard,
    }));
  const removeCards = useCardStore(state => state.removeCards);

  const [showCVV, setShowCVV] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const toast = useToast();

  const toggleCvv = async () => {
    try {
      if (!showCVV) {
        const result = await authenticateLocal();
        if (result) {
          setShowCVV(true);
        }
      } else {
        setShowCVV(false);
      }
    } catch (e) {
      console.log({e});
    }
  };

  const handlePress = (_event: GestureResponderEvent) => {
    if (isSwiped) return;
    if (selectedCards.length >= 1) {
      toggleCardSelection(card.cardNumber);
    }
  };

  const handleLongPress = (_event?: GestureResponderEvent) => {
    if (isSwiped) return;

    if (selectedCards.length === 0) {
      toggleCardSelection(card.cardNumber);
    }
  };

  const copyContent = async (whatToCopy: 'NameOnCard' | 'cardNumber') => {
    Clipboard.setString(card[whatToCopy].replaceAll('-', ''));
    toast.show(`${whatToCopy} is copied.`, {duration: 1500});
  };

  useEffect(() => {
    if (focusedId === card.cardNumber) {
      opacity.value = withRepeat(
        withTiming(0.5, {
          duration: 1000,
          easing: Easing.ease,
        }),
        2,
        true,
        () => {
          opacity.value = 1;
          runOnJS(setFocusedCard)('');
        },
      );
    }
    return () => {
      opacity.value = 1;
    };
  }, [card.cardNumber, focusedId, opacity, setFocusedCard]);

  return (
    <Animated.View
      entering={FadeIn}
      style={[styles.card, breath]}
      exiting={ZoomOut}>
      <PressableWithFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        delayLongPress={1000}
        style={[styles.cardContainer]}>
        <SwipeContainer
          getSwipedValue={value => {
            setIsSwiped(value);
          }}
          onRightActionPress={() => removeCards([card.cardNumber])}>
          <Animated.View
            style={[
              styles.cardContent,
              {
                backgroundColor: card.isSelected
                  ? myTheme.cardSelectedBg
                  : myTheme.cardBg,
              },
              breath,
            ]}>
            <View style={styles.cardNameAndNuberBox}>
              <View style={styles.cardNameAndNumber}>
                <LightText style={styles.title}>{card.cardName}</LightText>
                <LightText style={styles.cardNumberText}>
                  {card.cardNumber}
                </LightText>
              </View>
              <PressableWithFeedback
                onPress={() => copyContent('cardNumber')}
                style={styles.Button}>
                <MaterialIcon
                  onPress={() => copyContent('cardNumber')}
                  color={myTheme.secondary}
                  name="content-copy"
                  size={15}
                />
              </PressableWithFeedback>
            </View>
            <View style={styles.cardExpiryCvvButtonBox}>
              <View style={styles.expiryAndCvvBox}>
                <LightText style={styles.title}>Valid Thru</LightText>
                <LightText style={styles.cardText}> {card.expiry}</LightText>
              </View>
              <View style={styles.expiryAndCvvBox}>
                <LightText style={styles.title}>CVV</LightText>
                <LightText style={styles.cardText}>
                  {showCVV ? card.CVV : '***'}
                </LightText>
              </View>
              <PressableWithFeedback
                onPress={() => toggleCvv()}
                style={styles.cvvButton}>
                <LightText>{showCVV ? 'Hide CVV' : 'View CVV'}</LightText>
              </PressableWithFeedback>
            </View>
            <View>
              <LightText style={styles.cardText}>{card.NameOnCard}</LightText>
            </View>
          </Animated.View>
        </SwipeContainer>
      </PressableWithFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    height: CARD_HEIGHT,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    width: '87%',
    borderRadius: 10,
    padding: 15,
    gap: 20,
    flexDirection: 'column',
  },
  cardNameAndNuberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNameAndNumber: {
    paddingTop: 10,
    gap: 2,
  },
  Button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
  },
  cardExpiryCvvButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryAndCvvBox: {
    flexDirection: 'column',
    gap: 2,
  },
  cvvButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
  },
  title: {
    color: myTheme.cardTitleText,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardNumberText: {
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
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
export default RenderCard;
