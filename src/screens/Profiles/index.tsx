import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fab from '../../components/Fab';
import { useProfileStore } from '../../store/profileStore';
import AddProfileModal from './AddProfileModal';
import ProfileHeader from './ProfileHeader';
import RenderProfile from './RenderProfile';
import { FlashList } from '@shopify/flash-list';

const Profiles = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const [renderAddModal, setRenderAddModal] = useState(false);
  const [mode, setMode] = useState<'new' | 'edit'>('new');
  const profiles = useProfileStore(state => state.profiles);
  const selectProfile = useProfileStore(state => state.selectProfile);
  const reset = useProfileStore(state => state.resetProfileSelection);

  const onEditPress = (id: string) => {
    selectProfile(id);
    setMode('edit');
    setRenderAddModal(true);
  };

  const onModalClose = () => {
    reset();
    setRenderAddModal(false);
    setMode('new');
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 20,
          paddingBottom: bottom,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ProfileHeader />
      <FlashList
        data={profiles}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RenderProfile item={item} onEditPress={onEditPress} />
        )}
      />
      <Fab
        callBack={() => {
          setRenderAddModal(true);
        }}
      />
      {renderAddModal && (
        <AddProfileModal
          mode={mode === 'edit' ? 'edit' : 'new'}
          onClose={onModalClose}
          visible={renderAddModal}
        />
      )}
    </View>
  );
};
export default Profiles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  listContainer: {
    paddingVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
