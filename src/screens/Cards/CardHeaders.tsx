import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBox from '../../components/Molecules/SearchBox';
import { useCardStore } from '../../store/cardStore';
import CardHeaderRight from './CardHeaderRight';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';

const CardHeaders = () => {
  const theme = useTheme();
  const [renderSearch, setRenderSearch] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {renderSearch ? (
        <SearchBox
          mode="cards"
          onClose={() => setRenderSearch(false)}
          visible={renderSearch}
        />
      ) : (
        <View style={styles.box}>
          <CardHeaderTitleWithBackButton />
          <View style={[styles.box, styles.gap]}>
            {selectedCards.length === 0 && (
              <MaterialIcon
                onPress={() => setRenderSearch(true)}
                name="magnify"
                size={25}
                color={theme.colors.onBackground}
              />
            )}
            <CardHeaderRight />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  gap: {
    gap: 10,
  },
});
export default CardHeaders;
