import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../globals';

const Fab = (props: { callBack: () => void }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.fab, { bottom: bottom }]}>
      <FAB
        mode="elevated"
        icon="plus"
        onPress={props.callBack}
        rippleColor={colors.primaryLightTransparent}
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
