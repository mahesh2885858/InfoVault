import React from 'react';
import {View, StyleSheet} from 'react-native';
import Typography from '../../components/atoms/Typography';
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
      <Typography style={styles.text}>{item.name}</Typography>
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
