import Clipboard from '@react-native-clipboard/clipboard';
import React, {useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import LightText from '../../components/atoms/LightText';
import {useCardStore} from '../../store/cardStore';
import {TCard} from '../../types/card';
import {authenticateLocal} from '../../utils/authenticateLocal';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 50}],
    };
  });
  const removeCard = useCardStore(state => state.removeCard);

  return (
    <Reanimated.View style={[styleAnimation, styles.rightPanel]}>
      <View style={styles.deleteIcon}>
        <MaterialIcon
          onPress={() => removeCard()}
          name="delete"
          size={30}
          color={'#FFAAAA'}
        />
      </View>
    </Reanimated.View>
  );
}

const RenderCard = (card: TCard) => {
  const toggleCardSelection = useCardStore(state => state.toggleCardSelection);
  const selectedCards = useCardStore(state => state.selectedCards);

  const [showCVV, setShowCVV] = useState(false);
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
    if (selectedCards.length >= 1) {
      toggleCardSelection(card.cardNumber);
    }
  };

  const handleLongPress = (_event?: GestureResponderEvent) => {
    if (selectedCards.length === 0) {
      toggleCardSelection(card.cardNumber);
    }
  };

  const copyContent = async (whatToCopy: 'NameOnCard' | 'cardNumber') => {
    Clipboard.setString(card[whatToCopy].replaceAll('-', ''));
    toast.show(`${whatToCopy} is copied.`, {duration: 1500});
  };
  return (
    <Container style={styles.card}>
      <PressableWithFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={[styles.cardContainer]}>
        <Swipeable
          renderRightActions={RightAction}
          onSwipeableOpen={() => {
            handleLongPress();
          }}
          friction={1}
          overshootRight={false}
          childrenContainerStyle={styles.swipeableChild}
          containerStyle={[styles.cardContainer]}>
          <Box
            style={[
              styles.cardContent,
              {
                backgroundColor: card.isSelected
                  ? myTheme.cardSelectedBg
                  : myTheme.cardBg,
              },
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
          </Box>
        </Swipeable>
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
