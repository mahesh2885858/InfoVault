import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import DarkText from '../../components/atoms/DarkText';
import {useNavigation} from '@react-navigation/native';
import PressableWithFeedback from '../../components/PressableWithFeedback';

const Home = () => {
  const navigate = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={styles.container}>
        <Box style={styles.item}>
          <PressableWithFeedback onPress={() => navigate.navigate('Cards')}>
            <DarkText style={styles.text}>Cards</DarkText>
          </PressableWithFeedback>
        </Box>
        <Box style={styles.item}>
          <PressableWithFeedback onPress={() => navigate.navigate('Passwords')}>
            <DarkText style={styles.text}>Passwords</DarkText>
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
  },
  text: {
    fontSize: 20,
  },
});
export default Home;
