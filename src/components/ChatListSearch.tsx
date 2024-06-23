import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {colors} from '../globals.ts';

const ChatListSearch = () => {
  return (
    <View>
      <View>
        <Pressable style={styles.searchIcon}>
          <FeatherIcon name="search" color="grey" size={25} />
        </Pressable>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor={'#ffffff70'}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    top: 10,
    left: 20,
  },
  searchInput: {
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
    borderRadius: 30,
    paddingLeft: 45,
    fontSize: 16,
    height: 50,
  },

  icons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginRight: 10,
  },
});
export default ChatListSearch;
