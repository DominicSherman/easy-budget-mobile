import {ViewStyle} from 'react-native';

import {Color} from '../constants/color';

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
    borderColor: Color.offBlack,
    borderWidth: 0,
    elevation: 3,
    shadowColor: Color.offBlack,
    shadowOffset: {
        height: 3,
        width: 0
    },
    shadowOpacity: 0.15,
    shadowRadius: 4
};

export const textWrapperUnderlined: ViewStyle = {
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
    width: '80%'
};

export const textWrapperRounded: ViewStyle = {
    alignSelf: 'flex-start',
    backgroundColor: Color.backgroundBlue,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4
};
