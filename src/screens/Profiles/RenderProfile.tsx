import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useTheme } from 'react-native-paper';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../components/atoms/Typography';
import { TProfile } from '../../types';
import RenderDeleteProfileModal from './RenderDeleteProfileModal';
import { DEFAULT_PROFILE_ID } from '../../constants';

type TProps = {
  item: TProfile;
  onEditPress: (id: string) => void;
};
function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete: () => void,
  onEdit: () => void,
) {
  console.log({ prog, drag });
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: 100 + drag.value }],
    };
  });
  const theme = useTheme();

  return (
    <Reanimated.View style={[styleAnimation, styles.rightPanel]}>
      <MaterialIcon
        onPress={() => onDelete()}
        name="delete"
        size={24}
        color={theme.colors.onTertiary}
        style={[
          styles.icon,
          {
            backgroundColor: theme.colors.tertiary,
          },
        ]}
      />

      <MaterialIcon
        onPress={() => onEdit()}
        name="pencil"
        size={24}
        color={theme.colors.onTertiary}
        style={[
          styles.icon,
          {
            backgroundColor: theme.colors.tertiary,
          },
        ]}
      />
    </Reanimated.View>
  );
}

const RenderProfile = (props: TProps) => {
  const { item } = props;
  const [renderDeleteProfileModal, setRenderDeleteProfileModal] =
    useState(false);
  if (!item) return null;
  return (
    <>
      <Swipeable
        renderRightActions={(pr, trs) =>
          props.item.id === DEFAULT_PROFILE_ID
            ? null
            : RightAction(
                pr,
                trs,
                () => {
                  setRenderDeleteProfileModal(true);
                },
                () => props.onEditPress(item.id),
              )
        }
        containerStyle={styles.container}
      >
        <Typography style={styles.text}>{item.name}</Typography>
      </Swipeable>
      {renderDeleteProfileModal && (
        <RenderDeleteProfileModal
          profile={item}
          visible={renderDeleteProfileModal}
          onClose={() => setRenderDeleteProfileModal(false)}
        />
      )}
    </>
  );
};

export default RenderProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  text: {
    flex: 1,
    fontSize: 20,
  },
  rightPanel: {
    width: 100,

    alignItems: 'center',
    gap: 2,
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
