import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../globals.ts';

const Archive = (props: {
  setArchiveMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          props.setArchiveMode(true);
        }}>
        <View style={styles.icon}>
          <MaterialIcon
            name="archive-arrow-down-outline"
            color={colors.primaryText}
            size={24}
          />
        </View>
        <Text style={styles.text}>Archived</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // paddingLeft: 25,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  text: {
    color: colors.primaryText,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default Archive;
