import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {useCardStore} from '../../Store/cardStore';
import {CardProps} from '../../Types/Navigation';
import AddCardModal from '../../components/Card/AddCardModal';
import {colors} from '../../globals';
import RenderCard from './RenderCard';
import Container from '../../components/atoms/Container';
import {myTheme} from '../../../theme';
const Cards = (props: CardProps) => {
  const [visible, setVisibility] = useState(false);
  const {cards} = useCardStore();
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
            console.log('Pressed');
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
