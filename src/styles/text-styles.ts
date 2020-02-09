import {StyleSheet} from 'react-native';

import {colors} from '../constants/colors';

export const textStyles = StyleSheet.create({
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
    regular: {
        color: colors.darkFont,
        fontSize: 18,
        fontWeight: '400'
    },
    small: {
        color: colors.lightFont,
        fontSize: 14,
        fontWeight: '400'
    },
    title: {
        color: colors.darkFont,
        fontSize: 26,
        fontWeight: '700'
    }
});
