import React from 'react';
import {Menu, MenuItemProps} from 'react-native-paper';

const MenuItemWithHideOption = (props: MenuItemProps & {hidden?: boolean}) => {
  return props.hidden ? null : <Menu.Item {...props} />;
};

export default MenuItemWithHideOption;
