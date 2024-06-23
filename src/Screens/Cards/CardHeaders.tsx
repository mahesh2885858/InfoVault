import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../globals';

const CardHeaders = () => {
  return (
    <View style={styles.container}>
      <Text>CardHeaders</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});
export default CardHeaders;
