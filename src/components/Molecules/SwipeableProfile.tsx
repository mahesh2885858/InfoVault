import React from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Typography from '../atoms/Typography';

type TProps = {
  profile: string;
};

const SwipeableProfile = (props: TProps) => {
  return (
    <Swipeable>
      <Typography>{props.profile}</Typography>
    </Swipeable>
  );
};

export default SwipeableProfile;
