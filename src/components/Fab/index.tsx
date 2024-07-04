import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {myTheme} from '../../../theme';
import {colors} from '../../globals';

const Fab = (props: {callBack: () => void}) => {
  return (
    <View style={styles.fab}>
      <FAB
        mode="elevated"
        icon="plus"
        color={myTheme.accent}
        onPress={props.callBack}
        rippleColor={colors.primaryLightTransparent}
        style={{
          backgroundColor: myTheme.secondary,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});
export default Fab;
