import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PressableWithFeedback from '../../../components/PressableWithFeedback';
import {colors} from '../../../globals';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStore} from '../../../Store/store';

const HomeHeaderTitle = () => {
  const archiveMode = useStore(state => state.archiveMode);
  const selectedChats = useStore(state => state.selectedChats);
  const ToggleSelectAllChats = useStore(state => state.ToggleSelectAllChats);
  return (
    <View style={styles.headerLeft}>
      {archiveMode && (
        <PressableWithFeedback
          onPress={() => {
            // props.setArchiveMode(false);
          }}>
          <MaterialIcon
            name="keyboard-backspace"
            color={colors.primaryText}
            size={24}
          />
        </PressableWithFeedback>
      )}
      {selectedChats.length === 0 ? (
        <Text style={styles.headerLeftText}>
          {archiveMode ? 'Archived' : 'WhatsApp'}
        </Text>
      ) : (
        <>
          <PressableWithFeedback onPress={() => ToggleSelectAllChats()}>
            <MaterialIcon
              name="keyboard-backspace"
              color={colors.primaryText}
              size={24}
            />
          </PressableWithFeedback>
          <Text style={styles.headerLeftText}>{selectedChats.length}</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 20,
  },
  headerLeftText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    color: colors.primaryText,
  },
});
export default HomeHeaderTitle;
