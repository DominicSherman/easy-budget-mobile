import {TextStyle} from 'react-native';

import {colors} from '../constants/colors';

interface ITextStyles {
    large: TextStyle
    medium: TextStyle
    regularDark: TextStyle
}

export const textStyles: ITextStyles = {
    large: {
        color: colors.darkFont,
        fontSize: 22,
        fontWeight: '600'
    },
    medium: {
        color: colors.darkFont,
        fontSize: 20,
        fontWeight: '400'
    },
    regularDark: {
        color: colors.darkFont,
        fontSize: 18,
        fontWeight: '400'
    }
};
