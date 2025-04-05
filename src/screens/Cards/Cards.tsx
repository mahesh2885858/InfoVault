import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {BackHandler, FlatList, StatusBar, StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../store/cardStore';
import AddCardModal from '../../components/Card/AddCardModal';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import RenderCard from './RenderCard';
import BootSplash from 'react-native-bootsplash';
import {useProfileStore} from '../../store/profileStore';
import {CARD_HEIGHT, DEFAULT_PROFILE_ID} from '../../constants';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {View} from 'react-native';

const Cards = () => {
  const [visible, setVisibility] = useState(false);
  const {selectedCards, cards, deSelectAll, focusedId} = useCardStore(
    state => ({
      selectedCards: state.selectedCards,
      deSelectAll: state.deSelectAll,
      cards: state.cards,
      focusedId: state.focusedCard,
    }),
  );

  const listRef = useRef<FlatList>(null);
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const cardsToRender = cards.filter(
    card =>
      selectedProfile === DEFAULT_PROFILE_ID ||
      card.profileId === selectedProfile,
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (selectedCards.length > 0) {
          deSelectAll();
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => subscription.remove();
    }, [selectedCards, deSelectAll]),
  );

  useFocusEffect(
    useCallback(() => {
      if (focusedId.trim().length === 0) return;
      const indexOfFocusedId = cards.findIndex(
        card => card.cardNumber === focusedId,
      );

      if (indexOfFocusedId >= 0) {
        listRef.current!.scrollToIndex({
          index: indexOfFocusedId,
          animated: true,
        });
      }
    }, [focusedId, cards]),
  );

  return (
    <Container
      onLayout={() => {
        BootSplash.hide();
      }}
      style={styles.container}>
      <StatusBar backgroundColor={myTheme.main} />

      <Animated.FlatList
        extraData={focusedId}
        data={cardsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderCard {...item.item} />;
        }}
        ref={listRef}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={item => item.cardNumber}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT,
          index,
          offset: CARD_HEIGHT * index,
        })}
      />

      <Fab
        callBack={() => {
          setVisibility(true);
        }}
      />
      <View>
        <AddCardModal setVisible={setVisibility} visible={visible} />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardConatiner: {
    gap: 13,
    paddingBottom: 100,
    paddingTop: 20,
    minHeight: '100%', // should be added to fix an issue refer:https://github.com/software-mansion/react-native-reanimated/issues/5728#issuecomment-2551570107
  },

  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});

export default Cards;
