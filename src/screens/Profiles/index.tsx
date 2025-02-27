import React, {useState} from 'react';
import {View} from 'react-native';
import LightText from '../../components/atoms/LightText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import Fab from '../../components/Fab';
import AddProfileModal from './AddProfileModal';
import {useProfileStore} from '../../store/profileStore';
import {FlatList} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profiles = () => {
  const [renderAddModal, setRenderAddModal] = useState(false);
  const {profiles} = useProfileStore(state => ({profiles: state.profiles}));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profiles}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <LightText style={{flex: 1}}>{item.name}</LightText>
              <MaterialIcon name="pencil" />
            </View>
          );
        }}
      />
      <Fab
        callBack={() => {
          setRenderAddModal(true);
        }}
      />
      {renderAddModal && (
        <AddProfileModal
          onClose={() => setRenderAddModal(false)}
          visible={renderAddModal}
        />
      )}
    </SafeAreaView>
  );
};
export default Profiles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.main,
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
