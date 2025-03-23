import React from 'react';
import {View, StyleSheet} from 'react-native';
import LightText from '../../components/atoms/LightText';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TProfile} from '../../types';

type TProps = {
  item: TProfile;
  onEditPress: (id: string) => void;
};

const RenderProfile = (props: TProps) => {
  const {item} = props;
  if (!item) return null;
  return (
    <View style={styles.item}>
      <LightText style={styles.text}>{item.name}</LightText>
      <MaterialIcon
        name="pencil"
        onPress={() => props.onEditPress(item.id)}
        size={20}
        color={'white'}
      />
    </View>
  );
};

export default RenderProfile;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
});
