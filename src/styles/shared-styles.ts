import {ViewStyle} from 'react-native';

import {colors} from '../constants/colors';

export const screenWrapper: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
};

const centered: Record<string, any> = {
    alignItems: 'center',
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
    borderColor: colors.black,
    borderWidth: 0,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
        height: 2,
        width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 2
};
