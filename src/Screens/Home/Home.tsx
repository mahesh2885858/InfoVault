import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import DarkText from '../../components/atoms/DarkText';
import {useNavigation} from '@react-navigation/native';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {myTheme} from '../../../theme';
import LightText from '../../components/atoms/LightText';

const Home = () => {
  const navigate = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={styles.container}>
        <Box style={styles.item}>
          <PressableWithFeedback onPress={() => navigate.navigate('Cards')}>
            <LightText style={styles.text}>Cards</LightText>
          </PressableWithFeedback>
        </Box>
        <Box style={styles.item}>
          <PressableWithFeedback onPress={() => navigate.navigate('Passwords')}>
            <LightText style={styles.text}>Passwords</LightText>
          </PressableWithFeedback>
        </Box>
      </Container>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  item: {
    padding: 10,
    width: '90%',
    borderRadius: 5,
    backgroundColor: myTheme.cardBg,
  },
  text: {
    fontSize: 20,
  },
});
export default Home;
