import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';
import Fab from '../../components/Fab';
import AddProfileModal from './AddProfileModal';
import {useProfileStore} from '../../store/profileStore';
import {FlatList} from 'react-native';
import RenderProfile from './RenderProfile';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const Profiles = () => {
  const styles = useStyleSheet(themedStyles);
  const [renderAddModal, setRenderAddModal] = useState(false);
  const [mode, setMode] = useState<'new' | 'edit'>('new');

  const {profiles, selectProfile, reset} = useProfileStore(state => ({
    profiles: state.profiles,
    selectProfile: state.selectProfile,
    reset: state.resetProfileSelection,
  }));

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
    <View style={styles.container}>
      <FlatList
        data={profiles}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
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
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'bg-main',
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
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
