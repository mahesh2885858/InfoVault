import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {useCardStore} from '../../Store/cardStore';
import {CardProps} from '../../Types/Navigation';
import AddCardModal from '../../components/Card/AddCardModal';
import {colors} from '../../globals';
import RenderCard from './RenderCard';
const Cards = (props: CardProps) => {
  const [visible, setVisibility] = useState(false);
  const {cards} = useCardStore();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} />
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
          onPress={() => {
            console.log('Pressed');
            setVisibility(true);
          }}
          rippleColor={colors.primaryLightTransparent}
          style={{
            backgroundColor: colors.primaryGreen,
          }}
        />
      </View>
      <AddCardModal setVisible={setVisibility} visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
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
