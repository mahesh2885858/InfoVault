import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {BackHandler, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../Store/cardStore';
import {CardProps} from '../../Types/Navigation';
import AddCardModal from '../../components/Card/AddCardModal';
import Container from '../../components/atoms/Container';
import {colors} from '../../globals';
import RenderCard from './RenderCard';
const Cards = (_props: CardProps) => {
  const [visible, setVisibility] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const {cards} = useCardStore();

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
    <Container style={styles.container}>
      <StatusBar backgroundColor={myTheme.main} />

      <FlatList
        data={cards}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderCard {...item.item} />;
        }}
      />

      <View style={styles.fab}>
        <FAB
          mode="elevated"
          icon="plus"
          color={myTheme.accent}
          onPress={() => {
            setVisibility(true);
          }}
          rippleColor={colors.primaryLightTransparent}
          style={{
            backgroundColor: myTheme.secondary,
          }}
        />
      </View>
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
