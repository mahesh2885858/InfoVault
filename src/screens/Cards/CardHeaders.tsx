import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBox from '../../components/Molecules/SearchBox';
import {useCardStore} from '../../store/cardStore';
import CardHeaderRight from './CardHeaderRight';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';

const CardHeaders = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [renderSearch, setRenderSearch] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);

  return (
    <View style={[styles.container]}>
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
                color={theme['text-primary']}
                size={25}
              />
            )}
            <CardHeaderRight />
          </View>
        </View>
      )}
    </View>
  );
};
const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  box: {flexDirection: 'row', alignItems: 'center'},
  gap: {
    gap: 10,
  },
});
export default CardHeaders;
