import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import BackButton from './BackButton';
import { useMiscStore } from '../../store/miscStore';
import { useTheme } from 'react-native-paper';
type TProps = {
  visible?: boolean;
  onClose: () => void;
  mode: 'cards' | 'passwords' | 'profiles';
};
const SearchBox = (props: TProps) => {
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
        placeholderTextColor={theme.colors.onSurfaceDisabled}
        style={[
          styles.textInput,
          {
            color: theme.colors.onSurface,
          },
        ]}
      />
    </View>
  );
};

export default SearchBox;
const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  textInput: {
    fontSize: 20,
    flex: 1,
  },
});
