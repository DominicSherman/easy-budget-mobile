import {StyleProp, ViewStyle} from 'react-native';

import {colors} from '../constants/colors';

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

export const shadow = {
    borderColor: colors.white,
    borderWidth: 0,
    elevation: 3,
    shadowColor: colors.white,
    shadowOffset: {
        height: 2,
        width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 2
};
