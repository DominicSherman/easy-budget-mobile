import {TextStyle} from 'react-native';

import {colors} from '../constants/colors';

interface ITextStyles {
    large: TextStyle
    regularDark: TextStyle
}

export const textStyles: ITextStyles = {
    large: {
        color: colors.darkFont,
        fontSize: 22,
        fontWeight: '600'
    },
    regularDark: {
        color: colors.darkFont,
        fontSize: 18,
        fontWeight: '400'
    }
};
