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
const DIR_PATH = 'exportPath';

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

  const pickTheDirectory = async () => {
    return (await ScopedStorage.openDocumentTree(true)).uri;
  };

  const exportData = async () => {
    try {
      setIsExporting(true);
      const dataToExport = JSON.stringify({cards: cData, passwords: pData});
      // check the existing path in asyncStorage
      let dir = await AsyncStorage.getItem(DIR_PATH);
      if (!dir) {
        // open picker for choosing destination
        dir = await pickTheDirectory();
        await AsyncStorage.setItem(DIR_PATH, dir);
      } else {
        const persistedUris = await ScopedStorage.getPersistedUriPermissions();

        // Check if the directory uri exists in the list of uris where we have access to read/write.
        const isPersisted = persistedUris.some(persistedUri =>
          dir!.startsWith(persistedUri),
        );

        // check whether the existing path is valid path or not.
        const exists = await ScopedStorage.listFiles(dir);
        if (!exists || !isPersisted) {
          // if the path is invalid or we don't have permission to write ask for the path again
          dir = await pickTheDirectory();
          if (dir) {
            // since the existing path is invalid replace the valid path in asyncStorage
            await AsyncStorage.setItem(DIR_PATH, dir);
          }
        }
      }

      if (dir) {
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
      AsyncStorage.removeItem(DIR_PATH);
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
