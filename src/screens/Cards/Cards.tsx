import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {BackHandler, FlatList, StatusBar, StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../store/cardStore';
import AddCardModal from '../../components/Card/AddCardModal';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import RenderCard from './RenderCard';
import BootSplash from 'react-native-bootsplash';
import {useProfileStore} from '../../store/profileStore';
const Cards = () => {
  const [visible, setVisibility] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const cards = useCardStore(state => state.cards);
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const cardsToRender = cards.filter(
    card => card.profileId === selectedProfile,
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

      <FlatList
        data={cardsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderCard {...item.item} />;
        }}
      />

      <Fab
        callBack={() => {
          setVisibility(true);
        }}
      />

      <AddCardModal setVisible={setVisibility} visible={visible} />
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
