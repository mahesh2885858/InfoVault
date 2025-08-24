import React from 'react';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../../../components/PressableWithFeedback';
import useManageAccounts from '../../../../hooks/useManageAccounts';

const CardHeaderRight = () => {
  const theme = useTheme();
  const { deleteSelectedAccounts, selectedAccountsCount } = useManageAccounts();

  if (selectedAccountsCount === 0) return null;

  return (
    <>
      <PressableWithFeedback onPress={() => {}}>
        <MaterialIcon
          onPress={deleteSelectedAccounts}
          name="delete"
          size={24}
          color={theme.colors.onBackground}
        />
      </PressableWithFeedback>
      {selectedAccountsCount === 1 && (
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
