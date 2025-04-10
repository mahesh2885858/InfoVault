import React from 'react';
import {View} from 'react-native';
import Typography from '../../components/atoms/Typography';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TProfile} from '../../types';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';

type TProps = {
  item: TProfile;
  onEditPress: (id: string) => void;
};

const RenderProfile = (props: TProps) => {
  const {item} = props;
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  if (!item) return null;
  return (
    <View style={styles.item}>
      <Typography style={styles.text}>{item.name}</Typography>
      <MaterialIcon
        name="pencil"
        onPress={() => props.onEditPress(item.id)}
        size={20}
        color={theme['text-primary']}
      />
    </View>
  );
};

export default RenderProfile;

const themedStyles = StyleService.create({
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
