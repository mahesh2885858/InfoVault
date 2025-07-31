import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Fab = (props: { callBack: () => void }) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View style={[styles.fab, { bottom: bottom }]}>
      <FAB
        mode="elevated"
        icon="plus"
        onPress={props.callBack}
        rippleColor={theme.colors.onSurface}
        style={{
          backgroundColor: theme.colors.tertiaryContainer,
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
