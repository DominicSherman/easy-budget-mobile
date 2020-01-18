import {StyleProp, ViewStyle} from 'react-native';

export const screenWrapper: StyleProp<ViewStyle> = {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
};

const centered: Record<string, any> = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
};

export const centeredRow: Record<string, any> = {
    ...centered,
    flexDirection: 'row'
};
export const centeredColumn: Record<string, any> = {
    ...centered,
    flexDirection: 'column'
};
