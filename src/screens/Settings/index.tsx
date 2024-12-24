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
      setIsExporting(true);
      let dir = await AsyncStorage.getItem('exportPath');
      if (!dir) {
        dir = (await ScopedStorage.openDocumentTree(true)).uri;
        await AsyncStorage.setItem('exportPath', dir);
      }
      const dataToExport = {cards: cData, passwords: pData};
      if (dir) {
        await ScopedStorage.writeFile(
          dir,
          JSON.stringify(dataToExport),
          'data.json',
          'application/json',
          'utf8',
        );
      }
    } catch (e) {
      console.error(e);
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
