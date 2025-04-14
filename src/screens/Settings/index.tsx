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
import {useProfileStore} from '../../store/profileStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import {useTranslation} from 'react-i18next';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import ThemeSwitcherModal from './ThemeSwitcherModal';
import {useUiStore} from '../../store/UiStore';
import {uCFirst} from 'commonutil-core';
const FILE_NAME = 'data.json';
const DIR_PATH = 'exportPath';

const Settings = () => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation();
  const {cData, setCards} = useCardStore(state => ({
    cData: state.cards,
    setCards: state.setCards,
  }));
  const {pData, setPasswords} = usePasswordsStore(state => ({
    pData: state.passwords,
    setPasswords: state.setPasswords,
  }));

  const {profiles, setProfiels} = useProfileStore(state => ({
    profiles: state.profiles,
    setProfiels: state.setProfiles,
  }));

  const {theme} = useUiStore(state => ({
    theme: state.theme,
  }));

  const [isExporting, setIsExporting] = useState(false);
  const [openThemeSwitcher, setOpenThemeSwitcher] = useState(false);

  const pickTheDirectory = async () => {
    return (await ScopedStorage.openDocumentTree(true)).uri;
  };

  const exportData = async () => {
    try {
      setIsExporting(true);
      const dataToExport = JSON.stringify({
        cards: cData,
        passwords: pData,
        profiles,
      });
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

          if (response.profiles && response.profiles.length > 0) {
            setProfiels(response.profiles);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container style={styles.container}>
      <PressableWithFeedback
        onPress={importData}
        style={[styles.setting, {paddingTop: 20}]}>
        <Typography style={styles.text}>{t('common.import')}</Typography>
      </PressableWithFeedback>
      <PressableWithFeedback onPress={exportData} style={styles.setting}>
        <Typography style={styles.text}>{t('common.export')}</Typography>
      </PressableWithFeedback>
      <PressableWithFeedback
        onPress={() => setOpenThemeSwitcher(true)}
        style={styles.setting}>
        <Typography style={styles.text}>{t('common.theme')}</Typography>
        <Typography style={styles.subText}>{uCFirst(theme ?? '')}</Typography>
      </PressableWithFeedback>
      {openThemeSwitcher && (
        <ThemeSwitcherModal
          onClose={() => setOpenThemeSwitcher(false)}
          visible={openThemeSwitcher}
        />
      )}
    </Container>
  );
};

export default Settings;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    gap: 20,
  },
  button: {},
  setting: {
    paddingBottom: 10,
    borderBottomColor: '#ffffff10',
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  text: {
    fontSize: 18,
  },
  subText: {
    fontSize: 13,
    color: 'text-secondary',
  },
});
