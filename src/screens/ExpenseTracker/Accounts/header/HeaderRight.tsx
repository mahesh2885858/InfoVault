import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../../../components/PressableWithFeedback';

const CardHeaderRight = () => {
  const theme = useTheme();

  const selectedCards: any[] = [];

  if (selectedCards.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => {}}
        style={[
          styles.switch,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}
      >
        <MaterialIcon
          onPress={() => {}}
          name="chevron-down"
          color={theme.colors.onBackground}
          size={25}
        />
      </PressableWithFeedback>
    );
  }

  return (
    <>
      <PressableWithFeedback onPress={() => {}}>
        <MaterialIcon
          name="delete"
          size={24}
          color={theme.colors.onBackground}
        />
      </PressableWithFeedback>
      {selectedCards.length === 1 && (
        <PressableWithFeedback onPress={() => {}}>
          <MaterialIcon
            name="pin"
            size={24}
            color={theme.colors.onBackground}
          />
        </PressableWithFeedback>
      )}
    </>
  );
};

export default CardHeaderRight;

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
