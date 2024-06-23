import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../globals.ts';
import {TFilterProps} from '../Types/ChatList.types.ts';

const ChatListFilters = (props: TFilterProps) => {
  const filterItems = ['All', 'Unread', 'Groups'] as const;

  return (
    <View style={styles.filterBox}>
      {filterItems.map(item => {
        return (
          <Pressable
            key={item}
            onPress={() => props.setFilters(item)}
            style={[
              styles.filter,
              {
                backgroundColor:
                  props.selectedFilter === item
                    ? colors.primaryGreen
                    : colors.secondary,
              },
            ]}>
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    props.selectedFilter === item
                      ? colors.primaryGreen
                      : colors.secondaryText,
                },
              ]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
    padding: 15,
  },
  filter: {
    // backgroundColor: colors..primary,
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.secondaryText,
  },
});
export default ChatListFilters;
