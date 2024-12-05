import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';
import Button from '../../components/atoms/Button';
import Container from '../../components/atoms/Container';
import {useCardStore} from '../../Store/cardStore';
import LoadingIndicator from '../../components/Molecules/LoadingIndicator';

const Settings = () => {
  const cData = useCardStore(state => state.cards);
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async () => {
    try {
      setIsExporting(true);
      let dir = await AsyncStorage.getItem('exportPath');
      if (!dir) {
        dir = (await ScopedStorage.openDocumentTree(true)).uri;
        await AsyncStorage.setItem('exportPath', dir);
      }
      if (dir) {
        await ScopedStorage.writeFile(
          dir,
          JSON.stringify({data: cData}),
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

  return (
    <Container style={styles.container}>
      {isExporting ? (
        <LoadingIndicator />
      ) : (
        <Button label="Export existing data" onButtonPress={exportData} />
      )}
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},

  text: {
    fontSize: 20,
  },
});
