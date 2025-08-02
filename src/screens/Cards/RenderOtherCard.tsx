import Clipboard from '@react-native-clipboard/clipboard';
import { getMaxText } from 'commonutil-core';
import React, { RefObject, useEffect, useState } from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { useTheme as usePaper } from 'react-native-paper';
import Animated, {
  Easing,
  FadeIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { runOnJS } from 'react-native-worklets';
import { textSize } from '../../../theme';
import AddOtherCardModal from '../../components/Card/AddOtherCardModal';
import SwipeContainer from '../../components/Molecules/SwipeContainer';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import { OTHER_CARD_HEIGHT } from '../../constants';
import { useCardStore } from '../../store/cardStore';
import { TCard, TCardOther } from '../../types/card';
import { FlashListRef } from '@shopify/flash-list';
type TProps = {
  card: TCardOther;
  listRef: RefObject<FlashListRef<TCard> | null>;
};
const RenderOtherCard = (props: TProps) => {
  const opacity = useSharedValue(1);
  const paper = usePaper();
  const { card } = props;
  const breath = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const selectedCards = useCardStore(state => state.selectedCards);
  const toggleCardSelection = useCardStore(state => state.toggleCardSelection);
  const focusedId = useCardStore(state => state.focusedCard);
  const setFocusedCard = useCardStore(state => state.setFocusedCard);
  const unPinCard = useCardStore(state => state.unPinCard);
  const removeCards = useCardStore(state => state.removeCards);
  const [isSwiped, setIsSwiped] = useState(false);
  const [renderEditModalFor, setRenderEditModalFor] =
    useState<TCardOther | null>(null);
  const toast = useToast();

  const handlePress = (_event: GestureResponderEvent) => {
    if (isSwiped) return;
    if (selectedCards.length >= 1) {
      toggleCardSelection(card.id);
    }
  };

  const handleLongPress = (_event?: GestureResponderEvent) => {
    if (isSwiped) return;

    if (selectedCards.length === 0) {
      toggleCardSelection(card.id);
    }
  };

  const copyContent = async (whatToCopy: 'cardName' | 'cardNumber') => {
    Clipboard.setString(card[whatToCopy].replaceAll('-', ''));
    toast.show(`${whatToCopy} is copied.`, { duration: 1500 });
  };

  useEffect(() => {
    if (focusedId === card.id) {
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
  }, [card.id, focusedId, opacity, setFocusedCard]);

  return (
    <>
      <Animated.View
        entering={FadeIn}
        style={[styles.card, breath]}
        exiting={ZoomOut}
      >
        <PressableWithFeedback
          onLongPress={handleLongPress}
          onPress={handlePress}
          delayLongPress={1000}
          style={[styles.cardContainer]}
        >
          <SwipeContainer
            getSwipedValue={value => {
              setIsSwiped(value);
            }}
            onDelete={() => removeCards([card.id])}
            onEdit={() => {
              setRenderEditModalFor(card);
            }}
          >
            <Animated.View
              style={[
                styles.cardContent,
                {
                  backgroundColor: card.isSelected
                    ? paper.colors.surfaceDisabled
                    : paper.colors.surfaceVariant,
                },
                breath,
              ]}
            >
              <View style={styles.cardNameAndNumberBox}>
                <View style={styles.cardNameAndNumber}>
                  <Typography
                    style={[
                      styles.cardNumberText,

                      { color: paper.colors.onSurface },
                    ]}
                  >
                    {getMaxText(card.cardName, 22)}
                  </Typography>
                </View>
              </View>

              <View style={styles.nameOnCard}>
                <Typography style={styles.cardText}>
                  {getMaxText(card.cardNumber, 25)}
                </Typography>
                <PressableWithFeedback
                  onPress={() => copyContent('cardNumber')}
                  style={[
                    styles.Button,
                    {
                      backgroundColor: paper.colors.inverseSurface,
                    },
                  ]}
                >
                  <MaterialIcon
                    onPress={() => copyContent('cardNumber')}
                    color={paper.colors.inverseOnSurface}
                    name="content-copy"
                    size={15}
                  />
                </PressableWithFeedback>
              </View>
              <View style={styles.nameOnCard}>
                <Typography style={styles.cardText}>
                  {card.otherDetails}
                </Typography>
                {card.isPinned && (
                  <MaterialIcon
                    name="pin"
                    size={20}
                    color={paper.colors.onSurfaceVariant}
                    onPress={() => {
                      props.listRef?.current?.prepareForLayoutAnimationRender();
                      unPinCard(card.id);
                    }}
                  />
                )}
              </View>
            </Animated.View>
          </SwipeContainer>
        </PressableWithFeedback>
      </Animated.View>
      {renderEditModalFor && (
        <AddOtherCardModal
          visible={renderEditModalFor !== null}
          setVisible={() => setRenderEditModalFor(null)}
          editCard={renderEditModalFor}
          mode="edit"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    height: OTHER_CARD_HEIGHT,
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
  cardNameAndNumberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNameAndNumber: {
    gap: 2,
  },
  Button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: 'text-primary',
  },
  title: {
    fontSize: textSize.sm,
    fontWeight: '600',
  },
  cardNumberText: {
    fontSize: textSize.md,
    fontWeight: '700',
  },
  cardText: {
    fontSize: textSize.md,
    fontWeight: '500',
  },
  nameOnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default RenderOtherCard;
