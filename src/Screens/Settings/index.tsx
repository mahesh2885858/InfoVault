import React from 'react';
import {StyleSheet} from 'react-native';
import Container from '../../components/atoms/Container';
import LightText from '../../components/atoms/LightText';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import RNFS from 'react-native-fs';
const Settings = () => {
  const exportData = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/data.json';
      await RNFS.writeFile(path, JSON.stringify({name: 'mahesh'}), 'utf8');
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
