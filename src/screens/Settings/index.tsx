import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';
import Button from '../../components/atoms/Button';
import Container from '../../components/atoms/Container';
import {useCardStore} from '../../store/cardStore';
import LoadingIndicator from '../../components/Molecules/LoadingIndicator';
import {validateImportedData} from '../../utils/validateImportedData';
import {usePasswordsStore} from '../../store/passwordStore';

const FILE_NAME = 'data.json';

const Settings = () => {
  const {cData, setCards} = useCardStore(state => ({
    cData: state.cards,
    setCards: state.setCards,
  }));
  const {pData, setPasswords} = usePasswordsStore(state => ({
    pData: state.passwords,
    setPasswords: state.setPasswords,
  }));
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async () => {
    try {
      // await AsyncStorage.removeItem('exportPath');
      // return;
      setIsExporting(true);

      const dataToExport = JSON.stringify({cards: cData, passwords: pData});
      console.log({dataToExport});

      // check the existing path in asyncStorage

      let dir = await AsyncStorage.getItem('exportPath');

      if (!dir) {
        console.log('dir not found opening picker');
        // open picker for choosing destination
        dir = (await ScopedStorage.openDocumentTree(true)).uri;

        await AsyncStorage.setItem('exportPath', dir);

        console.log({selectedPath: dir});
      } else {
        // check whether the existing path is valid path or not.
        console.log('checking the file existence', dir);
        // const exists = await RNFS.readDir(dir);
        //
        const persistedUris = await ScopedStorage.getPersistedUriPermissions();

        // Check if the directory uri exists in the list of uris where we have access to read/write.
        const isPersisted = persistedUris.indexOf(dir) !== -1;

        const exists = await ScopedStorage.listFiles(dir);
        console.log({exists});

        if (!exists || !isPersisted) {
          // if the path is invalid ask for the path again
          dir = (await ScopedStorage.openDocumentTree(true)).uri;

          if (dir) {
            // since the existing path is invalid replace the valid path in asyncStorage
            await AsyncStorage.setItem('exportPath', dir);
          }
        }
      }

      if (dir) {
        console.log({selectedDir: dir});
        await ScopedStorage.writeFile(
          dir,
          dataToExport,
          FILE_NAME,
          'application/json',
          'utf8',
          false,
        );
      }
    } catch (e) {
      console.error(e);
      AsyncStorage.removeItem('exportPath');
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async () => {
    try {
      let dir = await ScopedStorage.openDocument(true);
      if (dir && dir.data) {
        const response = JSON.parse(dir.data);
        if (!response) {
          console.log('No data found');
          return;
        }
        if (validateImportedData(response)) {
          if (response.cards && response.cards.length > 0) {
            setCards(response.cards);
          }
          if (response.passwords && response.passwords.length > 0) {
            setPasswords(response.passwords);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container style={styles.container}>
      {isExporting ? (
        <LoadingIndicator />
      ) : (
        <Button label="Export existing data" onButtonPress={exportData} />
      )}
      <Button label="Import data" onButtonPress={importData} />
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {},

  text: {
    fontSize: 20,
  },
});
