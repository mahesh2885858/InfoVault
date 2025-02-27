import React, {useState} from 'react';
import {View} from 'react-native';
import LightText from '../../components/atoms/LightText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import Fab from '../../components/Fab';
import AddProfileModal from './AddProfileModal';

const Profiles = () => {
  const [renderAddModal, setRenderAddModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <LightText>Profiles</LightText>
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
});
