import {DrawerHeaderProps} from '@react-navigation/drawer';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBox from '../../components/Molecules/SearchBox';
import CardHeaderRight from './CardHeaderRight';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';
import {useCardStore} from '../../store/cardStore';

const CardHeaders = (_props: DrawerHeaderProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [renderSearch, setRenderSearch] = useState(false);
  const selectedCards = useCardStore(state => state.selectedCards);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
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
    paddingVertical: 10,
  },
  box: {flexDirection: 'row', alignItems: 'center'},
  gap: {
    gap: 10,
  },
});
export default CardHeaders;
