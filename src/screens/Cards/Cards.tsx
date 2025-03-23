import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../store/cardStore';
import AddCardModal from '../../components/Card/AddCardModal';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import RenderCard from './RenderCard';
import BootSplash from 'react-native-bootsplash';
import {useProfileStore} from '../../store/profileStore';
import {DEFAULT_PROFILE_ID} from '../../constants';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {View} from 'react-native';

const Cards = () => {
  const [visible, setVisibility] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const cards = useCardStore(state => state.cards);
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
  return (
    <Container
      onLayout={() => {
        BootSplash.hide();
      }}
      style={styles.container}>
      <StatusBar backgroundColor={myTheme.main} />

      <Animated.FlatList
        data={cardsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderCard {...item.item} />;
        }}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={item => item.cardNumber}
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
