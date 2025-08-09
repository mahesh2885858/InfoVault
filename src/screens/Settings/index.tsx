import AsyncStorage from '@react-native-async-storage/async-storage';
import { uCFirst } from 'commonutil-core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import * as ScopedStorage from 'react-native-scoped-storage';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Container from '../../components/atoms/Container';
import Typography from '../../components/atoms/Typography';
import { useToastContext } from '../../context/ToastContext';
import { useUiStore } from '../../store/UiStore';
import { useCardStore } from '../../store/cardStore';
import { usePasswordsStore } from '../../store/passwordStore';
import { useProfileStore } from '../../store/profileStore';
import { TCard, TPassword, TProfile } from '../../types';
import { validateImportedData } from '../../utils/validateImportedData';
import SettingsHeader from './Header';
import ThemeSwitcherModal from './ThemeSwitcherModal';
const FILE_NAME = 'data.json';
const DIR_PATH = 'exportPath';

const Settings = () => {
  const { t } = useTranslation();
  const cData = useCardStore(state => state.cards);
  const setCards = useCardStore(state => state.setCards);
  const paper = useTheme();

  const { show: showToast } = useToastContext();

  const pData = usePasswordsStore(state => state.passwords);
  const setPasswords = usePasswordsStore(state => state.setPasswords);

  const profiles = useProfileStore(state => state.profiles);
  const setProfiles = useProfileStore(state => state.setProfiles);

  const theme = useUiStore(state => state.theme);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
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

  const getUniqueData = <T extends { [key: string]: any }>(
    input: T[],
    field: keyof T,
  ): T[] => {
    const unique = input.filter(
      (item, index, self) =>
        index === self.findIndex(t => t[field] === item[field]),
    );
    return unique;
  };

  const importData = async () => {
    try {
      setIsImporting(true);
      let dir = await ScopedStorage.openDocument(true);
      if (dir && dir.data) {
        const response = JSON.parse(dir.data);
        if (!response) {
          console.log('No data found');
          return;
        }
        if (validateImportedData(response)) {
          if (response.cards && response.cards.length > 0) {
            const data: TCard[] = [...cData, ...response.cards];
            const uniqueData = getUniqueData(data, 'cardNumber');

            setCards(uniqueData);
          }
          if (response.passwords && response.passwords.length > 0) {
            const data: TPassword[] = [...pData, ...response.passwords];
            const uniqueData = getUniqueData(data, 'id');
            setPasswords(uniqueData);
          }

          if (response.profiles && response.profiles.length > 0) {
            const data: TProfile[] = [...profiles, ...response.profiles];
            const uniqueData = getUniqueData(data, 'id');
            setProfiles(uniqueData);
          }
          showToast('Import success');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Container style={styles.container}>
      <SettingsHeader />
      <PressableWithFeedback
        disabled={isImporting}
        onPress={importData}
        style={[styles.setting]}
      >
        <Typography style={styles.text}>{t('common.import')}</Typography>
        {isImporting && <ActivityIndicator size="small" />}
      </PressableWithFeedback>
      <PressableWithFeedback
        disabled={isExporting}
        onPress={exportData}
        style={styles.setting}
      >
        <Typography style={styles.text}>{t('common.export')}</Typography>
        {isExporting && <ActivityIndicator size="small" />}
      </PressableWithFeedback>
      <PressableWithFeedback
        onPress={() => setOpenThemeSwitcher(true)}
        style={[styles.setting, styles.themeSetting]}
      >
        <Typography style={styles.text}>{t('common.theme')}</Typography>
        <Typography
          style={[
            styles.subText,
            {
              color: paper.colors.onSurfaceDisabled,
            },
          ]}
        >
          {uCFirst(theme ?? '')}
        </Typography>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  button: {},
  setting: {
    paddingBottom: 10,
    borderBottomColor: '#ffffff10',
    borderBottomWidth: 1,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingRight: 10,
  },
  themeSetting: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingRight: 0,
  },
  text: {
    fontSize: 18,
  },
  subText: {
    fontSize: 13,
  },
});
