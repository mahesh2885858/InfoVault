import React from 'react';
import {StyleSheet} from 'react-native';
import Container from '../../components/atoms/Container';
import LightText from '../../components/atoms/LightText';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import RNFS from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const exportData = async () => {
    try {
      let dir = await AsyncStorage.getItem('exportPath');
      if (!dir) {
        dir = (await ScopedStorage.openDocumentTree(true)).uri;
        AsyncStorage.setItem('exportPath', dir);
      } else {
        dir = JSON.parse(dir);
      }
      if (!dir) return;

      const persistedUris = await ScopedStorage.getPersistedUriPermissions();

      if (persistedUris.indexOf(dir) !== -1) {
        // If uri is found, we can proceed to write/read data.
        const data = await ScopedStorage.writeFile(
          dir,
          JSON.stringify({data: 'data'}),
          'data.json',
          'application/json',
          'utf8',
        );
      } else {
        // We can request for permission again and store the new directory if access has been revoked by user here.
        dir = (await ScopedStorage.openDocumentTree(true)).uri;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container style={styles.container}>
      <PressableWithFeedback onPress={exportData} style={{padding: 10}}>
        <LightText style={{fontSize: 20}}>Export</LightText>
      </PressableWithFeedback>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
