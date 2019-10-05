import {ViewStyle, StyleProp} from 'react-native';

export const screenWrapper: StyleProp<ViewStyle> = {
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
};

const centered: Object = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

export const centeredRow: Object = {
  ...centered,
  flexDirection: 'row',
};
export const centeredColumn: Object = {
  ...centered,
  flexDirection: 'column',
};
