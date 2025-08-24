import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBox from '../../../../components/Molecules/SearchBox';
import HeaderTitleWithBackButton from './HeaderTitleWithBackButton';
import HeaderRight from './HeaderRight';
import useManageAccounts from '../../../../hooks/useManageAccounts';

const AccountsHeader = () => {
  const theme = useTheme();
  const [renderSearch, setRenderSearch] = useState(false);
  const { selectedAccountsCount } = useManageAccounts();

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
          <HeaderTitleWithBackButton />
          <View style={[styles.box, styles.gap]}>
            {selectedAccountsCount === 0 && (
              <MaterialIcon
                onPress={() => setRenderSearch(true)}
                name="magnify"
                size={25}
                color={theme.colors.onBackground}
              />
            )}
            <HeaderRight />
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
    // height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  gap: {
    gap: 10,
  },
});
export default AccountsHeader;
