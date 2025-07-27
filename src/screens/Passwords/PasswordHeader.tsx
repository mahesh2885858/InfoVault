import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBox from '../../components/Molecules/SearchBox';
import {usePasswordsStore} from '../../store/passwordStore';
import PasswordHeaderRight from './PasswordHeaderRight';
import PasswordHeaderTitleWithBackButton from './PasswordHeaderTitleWithBackButton';

const PasswordHeader = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [renderSearch, setRenderSearch] = useState(false);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);

  return (
    <View style={[styles.container]}>
      {renderSearch ? (
        <SearchBox
          mode="passwords"
          onClose={() => setRenderSearch(false)}
          visible={renderSearch}
        />
      ) : (
        <View style={styles.box}>
          <PasswordHeaderTitleWithBackButton />
          <View style={[styles.box, styles.gap]}>
            {selectedPasswords.length === 0 && (
              <MaterialIcon
                onPress={() => setRenderSearch(true)}
                name="magnify"
                color={theme['text-primary']}
                size={25}
              />
            )}
            <PasswordHeaderRight />
          </View>
        </View>
      )}
    </View>
  );
};
export default PasswordHeader;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  box: {flexDirection: 'row', alignItems: 'center'},
  gap: {
    gap: 10,
  },
});
