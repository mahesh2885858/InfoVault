import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React from 'react';
import {TextInput, View} from 'react-native';
import BackButton from './BackButton';
import {useMiscStore} from '../../store/miscStore';
type TProps = {
  visible?: boolean;
  onClose: () => void;
  mode: 'cards' | 'passwords' | 'profiles';
};
const SearchBox = (props: TProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const search = useMiscStore(state => state.search);
  const setSearch = useMiscStore(state => state.setSearch);
  if (!props.visible) return null;
  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => {
          setSearch('');
          props.onClose();
        }}
      />
      <TextInput
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder="Search..."
        placeholderTextColor={theme['text-secondary']}
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchBox;
const themedStyles = StyleService.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    fontSize: 20,
    color: 'text-primary',
    flex: 1,
  },
});
